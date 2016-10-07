/**
 * @file user-publications.ts.
 *
 * @summary The user collection publication file.
 *
 * TODO add admin validations to user publications.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 13 2016
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

import { Meteor } from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publishes all users.
 */
Meteor.publish('users', () => Meteor.users.find({}));

/**
 * @summary Publishes an user according to the id given.
 *
 * @param {string} _id The user id.
 */
Meteor.publish('user', _id => Meteor.users.find({_id}));
