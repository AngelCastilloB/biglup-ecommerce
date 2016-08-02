/**
 * @file product.collection.ts
 *
 * @summary The product collection.
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

import { ProductSchema }     from '../schemas/product.schema';
import { Slugifier }         from './helpers/slugifier';
import { slugify }           from 'transliteration';
import { ProductCollection } from './helpers/product-class.collection';

// IMPLEMENTATION *****************************************************************************************************/

// TODO IOC container
const slugifier   = new Slugifier(slugify);
let Products: any = new ProductCollection('products', slugifier);

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }
