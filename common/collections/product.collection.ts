/**
 * @file category.collection.ts
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

import { Mongo } from 'meteor/mongo';
import { ProductSchema } from '../schemas/product.schema';

// EXPORTS ************************************************************************************************************/

export let Products:any = new Mongo.Collection<Product>('products');

// IMPLEMENTATION *****************************************************************************************************/

Products.attachSchema(ProductSchema);