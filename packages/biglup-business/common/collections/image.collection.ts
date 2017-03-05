/**
 * @file image.collection.ts
 *
 * @summary This is the image collection client side definition.
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
import { Image }    from '../models';

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
export const ImagesStore = new UploadFS.store.GoogleCloudStorage({
    collection: Images,
    name: 'images',
    chunkSize: 1024 * 255,
    filter: new UploadFS.Filter(
    {
        contentTypes: ['image/*']
    }),
});