/**
 * @file get-user.ts.
 *
 * @summary Gets an user from the database.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 19 2016
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

// EXPORTS ************************************************************************************************************/

/**
 * @summary Gets an user from the database.
 *
 * @param {string} _id The id of the user.
 */
export const getUser = (_id: string) => Meteor.users.findOne({_id});
