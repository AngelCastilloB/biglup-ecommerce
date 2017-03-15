/**
 * @file appearance.collection.ts
 *
 * @summary This are the  appearance collections.
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

import { AppearanceSchema } from '../schemas/appearance.schema';
import { Appearance }       from '../models';
import { Mongo }            from 'meteor/mongo';

// IMPLEMENTATION *****************************************************************************************************/

export const Appearances = new Mongo.Collection<Appearance>('appearances');

Appearances.attachSchema(AppearanceSchema);

// RULES **************************************************************************************************************/

Appearances.deny(
{
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
