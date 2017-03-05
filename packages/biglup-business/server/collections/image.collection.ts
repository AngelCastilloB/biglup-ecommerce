/**
 * @file image.collection.ts
 *
 * @summary This is the image collection server side definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Mongo }    from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';
import { Image }    from '../../common/models';

// VALIDATORS *********************************************************************************************************/

/**
 * @summary Rule validation for image insertion.
 *
 * @returns {boolean} true if the operation is allowed, otherwise, false.
 */
const isAllowed = () =>
{
    return true; // TODO: [USER-LOGIN] Only certain user roles can perform this operations (Admin, Editor etc...).
};

// PERMISIONS *********************************************************************************************************/

// Set default permissions for all stores
UploadFS.config.defaultStorePermissions = new UploadFS.StorePermissions({
    insert: isAllowed,
    update: isAllowed,
    remove: isAllowed
});

// EXPORTS ************************************************************************************************************/

/**
 * @summary The images collection. This collection store products and categories images.
 *
 * @type {Collection<Image>}
 */
export const Images = new Mongo.Collection<Image>('images');

/**
 * @summary The images store.
 *
 * @type {UploadFS.store.GoogleCloudStorage} The image store
 */

export const ImagesStore = new UploadFS.store.GoogleCloudStorage(
{
    collection: Images,
    name: 'images',
    chunkSize: 1024 * 255,
    bucket: "biglup-images-dev-test",                                                 //required
    projectId: "taiwan-test-149606",                                                  // Google Cloud storage project id; required if not set in environment variables
    credentials: JSON.parse(Assets.getText('private/google-cloud-service-key.json')), // Google Cloud storage storage access key.
    folder: "/uploads/images",                                                        //optional, which folder (key prefix) in the container to use
    filter: new UploadFS.Filter(
    {
        contentTypes: ['image/*']
    }),
});

// VALIDATORS *********************************************************************************************************/

/**
 * @summary Rule validation for image insertion.
 *
 * @returns {boolean} true if the operation is allowed, otherwise, false.
 */
const isAllowed = () =>
{
    return true; // TODO: [USER-LOGIN] Only certain user roles can perform this operations (Admin, Editor etc...).
};

// RULES **************************************************************************************************************/

Images.allow(
{
    insert: isAllowed,
    update: isAllowed,
    remove: isAllowed
});
