/**
 * @file categort.ts
 *
 * @summary The categories publication file.
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

import { Categories } from '../../common/collections/category.collection';
import { Meteor }     from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publish all categories.
 */
Meteor.publish('categories', () => Categories.find());

/**
 * @summary Publishes a category given a category id.
 *
 * @param {string} id The category id.
 */
Meteor.publish('category', function(id: string) {
    return Categories.find({_id: id});
});
