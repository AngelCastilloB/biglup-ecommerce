/**
 * @file product.ts
 *
 * @summary The variant attributes publication file.
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

import { VariantSizes,
         VariantMaterials,
         VariantColors }   from '../../common/collections/variant-attributes.collections';
import { Meteor }          from 'meteor/meteor';

// PUBLICATIONS *******************************************************************************************************/

/**
 * @summary Publishes all color variant attributes.
 */
Meteor.publish('variant-colors', () => VariantColors.find());

/**
 * @summary Publishes all the material variant attributes.
 */
Meteor.publish('variant-materials', () => VariantMaterials.find());

/**
 * @summary Publishes all sizes variant attributes.
 */
Meteor.publish('variant-sizes', () => VariantSizes.find());
