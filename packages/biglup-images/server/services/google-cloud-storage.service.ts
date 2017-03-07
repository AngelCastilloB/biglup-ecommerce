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

// IMPORTS ************************************************************************************************************/

import { Images }     from '../../common/collections/image.collection';
import { ReadStream } from 'fs';

// CONSTANTS **********************************************************************************************************/

const GOOGLE_CLOUD_STORAGE_URL     = 'https://storage.googleapis.com/';
const SIGNED_URL_EXPIRATION_OFFSET = 600000;

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
     * @param fileName  The name of the file.
     * @param fileType  The type of the file.
     * @param size      The size of the file.
     * @return {string} The signed url.
     */
    public getSignedUrl(fileName: string, fileType: string, size: number): string
    {
        var future = new Future();

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
            url: ''});

        var filename = this._folder + id;
        let futureUrl: string = GOOGLE_CLOUD_STORAGE_URL + this._options.bucket + '/' + filename;

        Images.update({ _id: id }, {$set: {url: futureUrl}});

        this._bucket.file(filename).getSignedUrl({
            action: 'write',
            expires: Date.now() + SIGNED_URL_EXPIRATION_OFFSET,
            contentType: fileType
        }, (error, signedUrl) =>
        {
            if (error == null)
            {
                let response: any = {id: id , signedUrl: signedUrl, filename: filename};
                future.return(response);
            }
            else
            {
                future.throw(new Meteor.Error(
                    'GoogleStorageService.getSignedUrl.error',
                    'There was an error requesting the signed url ' + error));
            }
        });

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

        var filename = this._folder + image._id;

        var future = new Future();

        this._bucket.file(filename).exists(
            (error, exists) =>
            {
                if (error)
                {
                    future.throw(new Meteor.Error(
                        'GoogleStorageService.confirmUpload.error',
                        'There was an error with the confirmation of the file ' + error));

                    return;
                }

                if (!exists)
                {
                    future.throw(new Meteor.Error(
                        'GoogleStorageService.confirmUpload.error',
                        'There was an error with the confirmation of the file. The file does not exists'));

                    return;
                }

                this._bucket.file(filename).makePublic();
                future.return(image);
            });

        return future.wait();
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
            throw new Meteor.Error(
                'GoogleStorageService.deleteImage.error',
                'The image with the given ID (' + id + ') was not found.');
        }

        var future = new Future();

        this._bucket.file(this._folder + image._id).delete((error) =>
        {
            if (error)
            {
                future.throw(new Meteor.Error(
                    'GoogleStorageService.deleteImage.error',
                    'There was an error deleting the image (' + id + ')'));

                return;
            }

            Meteor.wrapAsync(Images.remove, {_id: id});
            future.return(true);
        });

        future.wait();
    }

    /**
     * @summary Directly uploads an image to the storage.
     */
    public uploadImage(stream: ReadStream, fileName: string, fileType: string, size: number): any
    {
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
            url: ''});

        var filename = this._folder + id;
        let futureUrl: string = GOOGLE_CLOUD_STORAGE_URL + this._options.bucket + '/' + filename;

        Images.update({ _id: id }, {$set: {url: futureUrl}});

        let image: any = Images.findOne({_id: id});

        const file = this._bucket.file(filename);

        var remoteWriteStream = file.createWriteStream({
            public: true,
            resumable: false,
            metadata: {
                contentType: fileType
            }
        });

        var future = new Future();

        remoteWriteStream.on('finish', ()=>
        {
            file.makePublic();

            future.return(image);
        });

        stream.pipe(remoteWriteStream);
        return future.wait();
    }
}