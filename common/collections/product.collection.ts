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

import { ProductSchema } from '../schemas/product.schema';
import { Product }       from '../../common/models/models';

// IMPLEMENTATION *****************************************************************************************************/

const Products: any = new Mongo.Collection<Product>('products');

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }

// RULES **************************************************************************************************************/

Products.deny(
{
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
