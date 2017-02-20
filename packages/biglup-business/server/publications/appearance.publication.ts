/**
 * @file appearance.ts
 *
 * @summary The appearance publication file.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 20 2017
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

import { Appearances } from '../../common/collections/appearance.collections';
import { Meteor }      from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publish all appearances.
 */
Meteor.publish('appearances', () => Appearances.find());

/**
 * @summary Publishes a appearance given a appearance id.
 *
 * @param {string} id The appearance id.
 */
Meteor.publish('appearance', (id: string) => Appearances.find({_id: id}));
