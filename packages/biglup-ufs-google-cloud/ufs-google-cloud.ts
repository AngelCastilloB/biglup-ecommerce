/**
 * @file ufs-google-cloud.ts
 *
 * @summary Implementation of the ufs google cloud storage.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 06 2017
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

if (Meteor.isServer)
{
    const gcloud = Npm.require('google-cloud');
}

/**
 * @summary Google Cloud Storage store.
 *
 * @param options The store options.
 * @constructor
 */
UploadFS.store.GoogleCloudStorage = (options) =>
{
    // Set default options
    options = Object.assign({
        chunkSize: 1024 * 255,
        collectionName: 'uploadfs'
    }, options);

    // Check options
    if (!Match.test(options.chunkSize, Number)) {
        throw new TypeError('chunkSize is not a number');
    }

    if (!Match.test(options.collectionName, String)) {
        throw new TypeError('collectionName is not a string');
    }

    var store = new UploadFS.Store(options);

    if (Meteor.isServer)
    {
        var folder = options.folder;

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

        if (!options.bucket)
            throw new Error('UploadFS.store.GoogleCloudStorage you must specify the "bucket" option');

        if (!options.projectId)
            throw new Error('UploadFS.store.GoogleCloudStorage you must specify the "projectId" option');

        if (!options.credentials)
            throw new Error('UploadFS.store.GoogleCloudStorage you must specify the "credentials" option');

        // Create Google Storage Service service
        const gcs = gcloud.storage({
            projectId: options.projectId,
            credentials: options.credentials
        });

        const bucket = gcs.bucket(options.bucket);

        /**
         * @brief Removes the file
         *
         * @param fileId   The id of the image file.
         * @param callback The error handler callback.
         */
        store.delete = (fileId, callback) =>
        {
            if (typeof callback !== 'function')
            {
                callback = (err) =>
                {
                    err && console.error(`ufs: cannot delete file "${ fileId }" at ${ folder } (${ err.message })`);
                }
            }
            else
            {
                bucket.file(fileId).delete(error => callback(error, !error));
            }
        };

        /**
         * @brief Returns the file read stream
         * @param fileId
         * @return {*}
         */
        store.getReadStream = (fileId) =>
        {
            return bucket.file(folder + fileId).createReadStream();
        };

        /**
         * @summary Returns the file write stream
         * @param fileId The id of the file.
         *
         * @return The write stream.
         */
        store.getWriteStream = (fileId, file) =>
        {
            return bucket.file(folder + fileId).createWriteStream({
                public: true,
                resumable: false,
            });
        };
    }

    return store;
};