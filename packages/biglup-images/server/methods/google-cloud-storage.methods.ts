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

import { GoogleStorageService } from '../services/google-cloud-storage.service';

// METHODS ************************************************************************************************************/

/**
 * @summary Registers the get google cloud storage signed url to Meteor's DDP system.
 *
 * @param {string}  fileName    The name of the file.
 * @param {number}  fileType    The file type.
 * @param {boolean} size        The size of the file.
 * @param {string}  transaction The transaction Id.
 *
 * @remark An object with the reserved id on the database and the signed url.
 */
Meteor.methods({
    getGoogleCloudStorageSignedUrl(fileName: string, fileType: string, size: number)
    {
        this.unblock();
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'getGoogleCloudStorageSignedUrl.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        check(fileName, String);
        check(fileType, String);
        check(size, Number);

        return GoogleStorageService.getInstance().getSignedUrl(fileName, fileType, size);
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
        this.unblock();

        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'confirmGoogleCloudStorageUpload.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        check(id, String);
        check(result, Boolean);

        return GoogleStorageService.getInstance().confirmUpload(id, result);
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
        this.unblock();

        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'deleteGoogleCloudStorageFile.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        check(id, String);
        return GoogleStorageService.getInstance().deleteImage(id);
    }
});