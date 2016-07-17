/**
 * @file image.collection.ts
 *
 * @summary This is the image collection.
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

import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The images collection. This collection store products and categories images.
 *
 * @type {Collection<Image>}
 */
export const Images = new Mongo.Collection<Image>('images');

/**
 * @summary The thumbnails collection. This collection stores reduced products and categories images.
 *
 * @type {Collection<Image>}
 */
export const Thumbnails = new Mongo.Collection<Thumbnail>('thumbnails');

/**
 * @summary The thumbnails store.
 *
 * @type {UploadFS.store.Local}
 */
export const ThumbnailsStore = new UploadFS.store.Local({
    collection: Thumbnails,
    name: 'thumbnails',
    path: '/uploads/thumbnails',
    mode: '0744',
    writeMode: '0744',
    transformWrite(from, to, fileId, file) {
        // Resize to 32x32
        const gm = require('gm');

        gm(from, file.name)
            .resize(32, 32)
            .gravity('Center')
            .extent(32, 32)
            .quality(75)
            .stream()
            .pipe(to);
    }
});

/**
 * @brief The images store.
 *
 * @type {UploadFS.store.Local}
 */
export const ImagesStore = new UploadFS.store.Local({
    collection: Images,
    name: 'images',
    path: '/uploads/images',
    mode: '0744',
    writeMode: '0744',
    filter: new UploadFS.Filter({
        contentTypes: ['image/*']
    }),
    copyTo: [
        ThumbnailsStore
    ]
});

function loggedIn() {
    return true;
}

Thumbnails.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});

Images.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});