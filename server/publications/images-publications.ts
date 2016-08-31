/**
 * @file images.ts
 *
 * @summary The images publications
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 17 2016
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

import { Images, Thumbnails } from '../../common/collections/image.collection';
import { Meteor }             from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publishes all images.
 */
Meteor.publish('images', () => Images.find());

/**
 * @summary Publishes all thumbnails.
 */
Meteor.publish('thumbnails', () => Thumbnails.find());

/**
 * @summary Publishes a image given an image id.
 *
 * @param {string} id The image id.
 */
Meteor.publish('image', (id: string) => Images.find({_id: id}));

/**
 * @summary Publishes a thumbnail given a thumbnail id.
 *
 * @param {string} id The thumbnail id.
 */
Meteor.publish('thumbnail', (id: string) => Images.find({_id: id}));
