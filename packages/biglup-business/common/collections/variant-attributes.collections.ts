/**
 * @file variant-attributes.collection.ts
 *
 * @summary This are the  variant attributes collections..
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

import { ColorVariantAttributeSchema,
         SizeVariantAttributeSchema,
         MaterialVariantAttributeSchema } from '../schemas/variant-attributes.schema';
import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute }       from '../models';
import { Mongo }                          from 'meteor/mongo';

// IMPLEMENTATION *****************************************************************************************************/

export const VariantColors    = new Mongo.Collection<ColorVariantAttribute>('variantColors');
export const VariantSizes     = new Mongo.Collection<Array<SizeVariantAttribute>>('variantSizes');
export const VariantMaterials = new Mongo.Collection<Array<MaterialVariantAttribute>>('variantMaterials');

VariantColors.attachSchema(ColorVariantAttributeSchema);
VariantSizes.attachSchema(SizeVariantAttributeSchema);
VariantMaterials.attachSchema(MaterialVariantAttributeSchema);

// RULES **************************************************************************************************************/

VariantColors.deny(
{
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

VariantSizes.deny(
{
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

VariantMaterials.deny(
{
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
