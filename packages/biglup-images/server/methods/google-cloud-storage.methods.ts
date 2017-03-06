/**
 * @file google-cloud-storage.methods.ts.
 *
 * @summary This is the google cloud storage public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 6, 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Images } from '../../common/collections/image.collection';

import * as gcloud from 'google-cloud';
import * as Future from 'fibers/future';

// CONSTANTS **********************************************************************************************************/

const GOOGLE_CLOUD_STORAGE_URL     = 'https://storage.googleapis.com/';
const SIGNED_URL_EXPIRATION_OFFSET = 600000;

// METHODS ************************************************************************************************************/

/**
 * @summary Registers the get google cloud storage signed url to Meteor's DDP system.
 *
 * @param {string}  fileName The name of the file.
 * @param {number}  fileType The file type.
 * @param {boolean} size     The size of the file.
 *
 * @remark An object with the reserved id on the database and the signed url.
 */
Meteor.methods({
    getGoogleCloudStorageSignedUrl(fileName: string, fileType: string, size: number)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'getGoogleCloudStorageSignedUrl.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        let options: any = Meteor.settings['google-cloud-storage'];

        check(fileName, String);
        check(fileType, String);
        check(size, Number);

        const gcs: any = gcloud.storage({
            projectId: options.projectId,
            credentials: options.credentials
        });

        const bucket = gcs.bucket(options.bucket);

        let folder = options.folder;

        if (typeof folder === "string" && folder.length)
        {
            if (folder.slice(0, 1) === "/")
                folder = folder.slice(1);

            if (folder.slice(-1) !== "/")
                folder += "/";
        }
        else
        {
            folder = "";
        }

        var future = new Future();

        let id: any = Images.insert({
                name: fileName,
                type: fileType,
                store: 'images',
                complete: false,
                path: options.folder + '/' + fileName,
                progress: 0,
                size: size,
                toke: '',
                uploading: true,
                uploadedAt: Date.now(),
                url: ''});

        var filename = folder + id;
        let futureUrl: string = GOOGLE_CLOUD_STORAGE_URL + options.bucket + '/' + filename;

        Images.update({ _id: id }, {$set: {url: futureUrl}});

        bucket.file(filename).getSignedUrl({
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
                    'getGoogleCloudStorageSignedUrl.error',
                    'There was an error requesting the signed url ' + error));
            }
        });

        return future.wait();
    }
});

/**
 * @summary Registers the get confirm google cloud storage upload to Meteor's DDP system.
 *
 * @param {id}      The id of the file upload.
 * @param {result}  The result of the upload.
 *
 * @remark The image object.
 */
Meteor.methods({
    confirmGoogleCloudStorageUpload(id: string, result: boolean)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'confirmGoogleCloudStorageUpload.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        let options: any = Meteor.settings['google-cloud-storage'];

        check(id, String);
        check(result, Boolean);

        const gcs: any = gcloud.storage({
            projectId: options.projectId,
            credentials: options.credentials
        });

        const bucket = gcs.bucket(options.bucket);

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

        let folder = options.folder;

        if (typeof folder === "string" && folder.length)
        {
            if (folder.slice(0, 1) === "/")
                folder = folder.slice(1);

            if (folder.slice(-1) !== "/")
                folder += "/";
        }
        else
        {
            folder = "";
        }

        var filename = folder + image._id;

        var future = new Future();

        bucket.file(filename).exists(
        (error, exists) =>
        {
            if (error)
            {
                future.throw(new Meteor.Error(
                    'confirmGoogleCloudStorageUpload.error',
                    'There was an error with the confirmation of the file ' + error));

                return;
            }

            if (!exists)
            {
                future.throw(new Meteor.Error(
                    'confirmGoogleCloudStorageUpload.error',
                    'There was an error with the confirmation of the file. The file does not exists'));

                return;
            }

            bucket.file(filename).makePublic();
            future.return(image);
        });

        return future.wait();
    }
});

/**
 * @summary Registers the delete google cloud storage to Meteor's DDP system.
 *
 * @param {string}  id The id of the file to be deleted.
 *
 * @remark The result of the operation.
 */
Meteor.methods({
    deleteGoogleCloudStorageFile(id: string)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'deleteGoogleCloudStorageFile.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        let options: any = Meteor.settings['google-cloud-storage'];

        check(id, String);

        const gcs: any = gcloud.storage({
            projectId: options.projectId,
            credentials: options.credentials
        });

        const bucket = gcs.bucket(options.bucket);

        let folder = options.folder;

        if (typeof folder === "string" && folder.length)
        {
            if (folder.slice(0, 1) === "/")
                folder = folder.slice(1);

            if (folder.slice(-1) !== "/")
                folder += "/";
        }
        else
        {
            folder = "";
        }

        let image: any = Images.findOne({_id: id});

        if (!image)
        {
            throw new Meteor.Error(
                'confirmGoogleCloudStorageUpload.error',
                'The image with the given ID (' + id + ') was not found.');
        }

        var future = new Future();

        bucket.file(folder + image._id).delete((error) =>
        {
            if (error)
            {
                future.throw(new Meteor.Error(
                    'deleteGoogleCloudStorageFile.error',
                    'There was an error deleting the image (' + id + ')'));

                return;
            }

            Meteor.wrapAsync(Images.remove, {_id: id});
            future.return(true);
        });

        future.wait();
    }
});