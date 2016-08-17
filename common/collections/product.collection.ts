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

import { ProductSchema }      from '../schemas/product.schema';
import { Slugifier }          from '../helpers/slugifier';
import { slugify }            from 'transliteration';
import { WithSlugCollection } from './with-slug-collection';

// IMPLEMENTATION *****************************************************************************************************/

// TODO IOC container
const slugifier     = new Slugifier(slugify);
const Products: any = WithSlugCollection.create<Product>('products', 'title', slugifier);

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }

// VALIDATORS *********************************************************************************************************/

/**
 * @summary Rule validation for product insert, update and delete.
 *
 * @returns {boolean} true if the operation is allowed, otherwise, false.
 */
function isAllowed() {
    return true; // TODO: [USER-LOGIN] Only certain user roles can perform this operations (Admin, Editor etc...).
}

// API RULES **********************************************************************************************************/

Products.allow({
    insert: isAllowed,
    update: isAllowed,
    remove: isAllowed
});
