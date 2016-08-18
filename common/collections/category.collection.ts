/**
 * @file category.collection.ts
 *
 * @summary The product category collection.
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

import { CategorySchema }     from '../schemas/category.schema';
import { slugify }            from 'transliteration';
import { Slugifier }          from '../helpers/slugifier';
import { WithSlugCollection } from './with-slug-collection';

// IMPLEMENTATION *****************************************************************************************************/

// TODO IOC container
const slugifier     = new Slugifier(slugify);
let Categories: any = WithSlugCollection.create<Category>('categories', 'name', slugifier);

Categories.attachSchema(CategorySchema);

// EXPORTS ************************************************************************************************************/

export { Categories }

// VALIDATORS *********************************************************************************************************/

/**
 * @summary Rule validation for category insert, update and delete.
 *
 * @returns {boolean} true if the operation is allowed, otherwise, false.
 */
function isAllowed() {
    return true; // TODO: [USER-LOGIN] Only certain user roles can perform this operations (Admin, Editor etc...).
}

// API RULES **********************************************************************************************************/

Categories.allow({
    insert: isAllowed,
    update: isAllowed,
    remove: isAllowed
});
