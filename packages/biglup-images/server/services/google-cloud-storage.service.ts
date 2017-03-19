/**
 * @file google-cloud-storage.ts
 *
 * @summary Google cloud storage class.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 07 2017
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import * as gcloud from 'google-cloud';
import * as Future from 'fibers/future';

import { Images }              from '../../common/collections/image.collection';
import { ReadStream }          from 'fs';
import { ImageMimeTypeHelper } from '../../common/utils/image-mime-types';

// CONSTANTS **********************************************************************************************************/

const GOOGLE_CLOUD_STORAGE_URL           = 'https://storage.googleapis.com/';
const SIGNED_URL_EXPIRATION_OFFSET       = 600000;
const IMAGE_SERVICE_END_PONT_NAME        = 'getImageUrl';
const DELETE_IMAGE_SERVICE_END_PONT_NAME = 'deleteImageUrl';
const RETRY_COUNT                        = 5;

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Google storage service class.
 */
export class GoogleStorageService
{
    private static _instance: GoogleStorageService = new GoogleStorageService();

    private _options:            any     = Meteor.settings['google-cloud-storage'];
    private _googleCloudStorage: any     = null;
    private _isActive:           boolean = false;
    private _bucket:             any     = null;
    private _folder:             string  = "";
    /**
     * @summary Gets the singleton instance of the GoogleStorageService class.
     *
     * @returns {GoogleStorageService} The singleton instance.
     */
    public static getInstance(): GoogleStorageService
    {
        return GoogleStorageService._instance;
    }

    /**
     * @summary Lazy initialise a new instance of the I18nSingletonService singleton class.
     */
    constructor()
    {
        if (GoogleStorageService._instance)
            throw new Error('Error: Instantiation failed: Use GoogleStorageService.getInstance() instead of new.');

        this._isActive = !!this._options;

        if (this._isActive)
        {
            this._googleCloudStorage = gcloud.storage({
                projectId: this._options.projectId,
                credentials: this._options.credentials
            });

            this._bucket = this._googleCloudStorage.bucket(this._options.bucket);

            this._folder = this._options.folder;

            if (typeof this._folder === "string" && this._folder.length)
            {
                if (this._folder.slice(0, 1) === "/")
                    this._folder = this._folder.slice(1);

                if (this._folder.slice(-1) !== "/")
                    this._folder += "/";
            }
            else
            {
                this._folder = "";
            }
        }

        GoogleStorageService._instance = this;
    }

    /**
     * @summary Gets whether this service is active or not.
     *
     * @return {boolean} True if the service is active, otherwise, false.
     */
    public isActive(): boolean
    {
        return this._isActive;
    }

    /**
     * @summary Signed URLs provide a way to give time-limited read or write access to anyone in possession of the URL,
     * regardless of whether they have a Google account.
     *
     * @param fileName      The name of the file.
     * @param fileType      The type of the file.
     * @param size          The size of the file.
     *
     * @return {string} The signed url.
     */
    public getSignedUrl(fileName: string, fileType: string, size: number): string
    {
        var future = new Future();

        let extension = ImageMimeTypeHelper.mimeToExtension[fileType];

        if (!extension)
        {
            future.throw(new Meteor.Error(
                'GoogleStorageService.getSignedUrl.error',
                'The format of the image file (' + fileType + ') is not supported.'));
        }

        let id: any = Images.insert({
            name: fileName,
            type: fileType,
            store: 'images',
            complete: false,
            path: this._options.folder + '/' + fileName,
            progress: 0,
            size: size,
            toke: '',
            uploading: true,
            uploadedAt: Date.now(),
            url: '',
            isMagic: false });

        let filename = this._folder + id + '.' + extension;
        let futureUrl: string = GOOGLE_CLOUD_STORAGE_URL + this._options.bucket + '/' + filename;

        Images.update({ _id: id }, {$set: {url: futureUrl, path: filename}});

        let retryCount: number = RETRY_COUNT;
        let gotSigned: boolean = false;

        while (retryCount !== 0 && !gotSigned)
        {
            let getSignedFuture = new Future();

            try
            {
                this._bucket.file(filename).getSignedUrl({
                    action: 'write',
                    expires: Date.now() + SIGNED_URL_EXPIRATION_OFFSET,
                    contentType: fileType
                }, (error, signedUrl) =>
                {
                    if (error == null)
                    {
                        let response: any = {id: id , signedUrl: signedUrl, filename: filename, servingUrl: futureUrl};
                        future.return(response);
                        getSignedFuture.return(true);
                    }
                    else
                    {
                        future.throw(new Meteor.Error(
                            'GoogleStorageService.getSignedUrl.error',
                            'There was an error requesting the signed url ' + error));

                        --retryCount;
                        getSignedFuture.return(false);
                    }
                });
            }
            catch(error)
            {
                future.throw(new Meteor.Error(
                    'GoogleStorageService.getSignedUrl.error',
                    'There was an error requesting the signed url ' + error));

                --retryCount;
                getSignedFuture.return(false);
            }

            gotSigned = getSignedFuture.wait();
        }

        return future.wait();
    }

    /**
     * @summary Confirms that a file exists and that it is also present in the database.
     *
     * @param id     The id of the image in the data base.
     * @param result The upload result.
     *
     * @return {any} The database object.
     */
    public confirmUpload(id: string, result: boolean): any
    {
        var future = new Future();

        let image: any = Images.findOne({_id: id});

        if (!image)
        {
            throw new Meteor.Error(
                'confirmGoogleCloudStorageUpload.error',
                'The image with the given ID (' + id + ') was not found.');
        }

        if (!result)
        {
            Images.remove({_id: id});
            return;
        }

        let extension = ImageMimeTypeHelper.mimeToExtension[image.type];

        if (!extension)
        {
            future.throw(new Meteor.Error(
                'confirmGoogleCloudStorageUpload.getSignedUrl.error',
                'The format of the image file (' + image.type + ') is not supported.'));

            Images.remove({_id: id});
            return;
        }

        let filename = this._folder + id + '.' + extension;

        let retryCount: number = RETRY_COUNT;
        let gotConfirmed: boolean = false;
        while (retryCount !== 0 && !gotConfirmed)
        {
            let gotConfirmedFuture = new Future();
            try
            {
                this._bucket.file(filename).exists(
                    Meteor.bindEnvironment((error, exists) =>
                    {
                        try
                        {
                            if (error)
                            {
                                if (retryCount > 0)
                                {
                                    --retryCount;
                                    gotConfirmedFuture.return(false);
                                    return;
                                }

                                Images.remove({_id: id});

                                console.error('There was an error with the confirmation of the file (Verifying file existence): ' + error);

                                future.throw(new Meteor.Error(
                                    'GoogleStorageService.confirmUpload.error',
                                    'There was an error with the confirmation of the file '));

                                gotConfirmedFuture.return(true);
                                return;
                            }

                            if (!exists)
                            {
                                Images.remove({_id: id});

                                future.throw(new Meteor.Error(
                                    'GoogleStorageService.confirmUpload.error',
                                    'There was an error with the confirmation of the file. The file does not exists'));

                                gotConfirmedFuture.return(true);
                                return;
                            }

                            this._bucket.file(filename).makePublic();

                            let imageServletUrl = this._options.imageService;

                            if (!imageServletUrl)
                            {
                                future.return(image);
                                gotConfirmedFuture.return(true);
                                return;
                            }

                            if (imageServletUrl.slice(-1) !== "/")
                                imageServletUrl += "/";

                            imageServletUrl += IMAGE_SERVICE_END_PONT_NAME;

                            setTimeout(Meteor.bindEnvironment(() =>
                                {
                                    try
                                    {
                                        let response = HTTP.get(imageServletUrl,
                                            {
                                                timeout: 5000,
                                                params: {
                                                    "key": filename,
                                                    "bucket": this._options.bucket
                                                }
                                            });

                                        if (response.statusCode === 200)
                                        {
                                            let magicUrl: string = response.content;

                                            Images.update({_id: id}, {$set: {url: magicUrl, isMagic: true}});

                                            image.url = magicUrl;

                                            future.return(image);
                                            gotConfirmedFuture.return(true);
                                            return;
                                        }
                                        else
                                        {
                                            if (retryCount > 0)
                                            {
                                                --retryCount;

                                                if (retryCount === 0)
                                                {
                                                    future.throw(new Meteor.Error(
                                                        'GoogleStorageService.confirmUpload.error',
                                                        'There was an error with the confirmation of the file'));
                                                }

                                                gotConfirmedFuture.return(false);
                                                return;
                                            }

                                            console.warn('There was an error acquiring the magic url: ' + response);
                                            console.warn('The image will be serve directly');

                                            future.return(image);
                                            gotConfirmedFuture.return(true);
                                            return;
                                        }
                                    }
                                    catch (error)
                                    {
                                        console.error(error);

                                        if (retryCount > 0)
                                        {
                                            --retryCount;

                                            if (retryCount === 0)
                                            {
                                                future.throw(new Meteor.Error(
                                                    'GoogleStorageService.confirmUpload.error',
                                                    'There was an error with the confirmation of the file'));
                                            }

                                            gotConfirmedFuture.return(false);

                                            return;
                                        }
                                    }
                                },
                                ()=>
                                {
                                    console.log('Failed to bind environment');

                                    if (retryCount > 0)
                                    {
                                        --retryCount;

                                        if (retryCount === 0)
                                        {
                                            future.throw(new Meteor.Error(
                                                'GoogleStorageService.confirmUpload.error',
                                                'There was an error with the confirmation of the file'));
                                        }

                                        gotConfirmedFuture.return(false);
                                        return;
                                    }
                                }), 500);
                        }
                        catch (error)
                        {
                            console.error(error);
                            if (retryCount > 0)
                            {
                                --retryCount;

                                if (retryCount === 0)
                                {
                                    future.throw(new Meteor.Error(
                                        'GoogleStorageService.confirmUpload.error',
                                        'There was an error with the confirmation of the file'));
                                }

                                gotConfirmedFuture.return(false);
                                return;
                            }
                        }

                    },
                    ()=>
                    {
                        console.log('Failed to bind environment');

                        if (retryCount > 0)
                        {
                            --retryCount;

                            if (retryCount === 0)
                            {
                                future.throw(new Meteor.Error(
                                    'GoogleStorageService.confirmUpload.error',
                                    'There was an error with the confirmation of the file'));
                            }

                            gotConfirmedFuture.return(false);
                            return;
                        }
                    }));
            }
            catch (error)
            {
                console.error('There was an error with the confirmation of the file: ' + error);
                console.error('Retrying (' + (retryCount - 1) + '/' + retryCount + ')');

                if (retryCount > 0)
                {
                    --retryCount;
                    gotConfirmedFuture.return(false);
                    continue;
                }

                future.throw(new Meteor.Error(
                    'GoogleStorageService.confirmUpload.error',
                    'There was an error with the confirmation of the file'));

                console.error('There was an error with the confirmation of the file: ' + error);
                Images.remove({_id: id});
                gotConfirmedFuture.return(true);
                return;
            }

            gotConfirmed = gotConfirmedFuture.wait();
        }

        let result = future.wait();

        if (!gotConfirmed)
        {
            throw new Meteor.Error(
                'GoogleStorageService.confirmUpload.error',
                'The image with the given ID (' + id + ') could not be confirmed.');
        }

        return result;
    }

    /**
     * @summary Deletes the given image from both the storage bucket and the database.
     *
     * @param id The id of the image in the database.
     */
    public deleteImage(id: string)
    {
        let image: any = Images.findOne({_id: id});

        if (!image)
        {
            console.warn('The image with the given ID (' + id + ') was not found.');
            return;
        }

        var future = new Future();

        let retryCount: number  = RETRY_COUNT;
        let gotDeleted: boolean = false;

        while (retryCount !== 0 && !gotDeleted)
        {
            let deleteFuture = new Future();

            try
            {
                this._bucket.file(image.path).delete(Meteor.bindEnvironment((error) =>
                        {
                            if (error)
                            {
                                console.warn('The image with the given ID (' + id + ') could not be deleted from the bucket.');
                                Images.remove({_id: id});

                                deleteFuture.return(true);
                                future.return();
                                return;
                            }

                            Images.remove({_id: id});

                            let imageServletUrl = this._options.imageService;

                            if (!imageServletUrl)
                            {
                                deleteFuture.return(true);
                                future.return();
                                return;
                            }

                            if (imageServletUrl.slice(-1) !== "/")
                                imageServletUrl += "/";

                            imageServletUrl += DELETE_IMAGE_SERVICE_END_PONT_NAME;

                            HTTP.get(imageServletUrl,
                                {
                                    timeout: 5000,
                                    params: {
                                        "key": image.path,
                                        "bucket": this._options.bucket
                                    }
                                }, ()=> {});

                            deleteFuture.return(true);
                            future.return();
                            return;
                    },
                    ()=>
                    {
                        console.log('Failed to bind environment');
                    }));
            }
            catch (error)
            {
                console.error('There was an error with the deletion of the file: ' + error);
                console.error('Retrying (' + (retryCount - 1) + '/' + retryCount + ')');

                if (retryCount > 0)
                {
                    --retryCount;
                    deleteFuture.return(false);
                    continue;
                }

                deleteFuture.return(false);
                future.return();
            }

            gotDeleted = deleteFuture.wait();
        }

        future.wait();
    }

    /**
     * @summary Directly uploads an image to the storage.
     */
    public uploadImage(stream: ReadStream, fileName: string, fileType: string, size: number): any
    {
        var future = new Future();

        let extension = ImageMimeTypeHelper.mimeToExtension[fileType];

        if (!extension)
        {
            future.throw(new Meteor.Error(
                'GoogleStorageService.uploadImage.error',
                'The format of the image file (' + fileType + ') is not supported.'));
        }

        let id: any = Images.insert({
            name: fileName,
            type: fileType,
            store: 'images',
            complete: false,
            path: this._options.folder + '/' + fileName,
            progress: 0,
            size: size,
            toke: '',
            uploading: true,
            uploadedAt: Date.now(),
            url: '',
            isMagic: true});

        var filename = this._folder + id + '.' + extension;
        let futureUrl: string = GOOGLE_CLOUD_STORAGE_URL + this._options.bucket + '/' + filename;

        Images.update({ _id: id }, {$set: {url: futureUrl}});

        let image: any = Images.findOne({_id: id});

        const file = this._bucket.file(filename);

        var remoteWriteStream = file.createWriteStream({
            metadata: {
                contentType: fileType
            }
        });

        remoteWriteStream.on('finish', ()=>
        {
            file.makePublic();
            future.return(image);
        });

        remoteWriteStream.on('error', (error) =>
        {
            future.throw(new Meteor.Error(
                'GoogleStorageService.uploadImage.error',
                error));
        });

        stream.pipe(remoteWriteStream);
        return future.wait();
    }
}