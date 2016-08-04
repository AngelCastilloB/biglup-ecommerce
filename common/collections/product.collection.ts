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

import { ProductSchema }              from '../schemas/product.schema';
import { Slugifier }                  from '../helpers/slugifier';
import { slugify }                    from 'transliteration';
import { Mongo }                      from 'meteor/mongo';
import { AbstractWithSlugCollection } from './abstract-with-slug-collection';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary adds insert/update/etc hooks to alter the document before insertion.
 * @see AbstractWithSlugCollection
 */
class ProductCollection extends AbstractWithSlugCollection {

    private _fieldName = 'title';

    /**
     * @summary Alters the insert to allow slugs into the document.
     *
     * @param document
     * @param callback
     * @returns {string}
     */
    public insert(document: Product, callback?: Function): string {
        return this._insert(document, this._fieldName, callback);
    }

    /**
     * @summary Alters the update to allow new slugs changes.
     *
     * @param {Object} selector
     * @param {Object} modifier
     * @param {Object=} options
     * @param {Object=} options.multi
     * @param {Object=} options.upsert
     * @param {Function=} callback
     * @returns {number}
     */
    public update(selector: Mongo.Selector,
        modifier: Mongo.Modifier,
        options?: {multi?: boolean; upsert?: boolean},
        callback?: Function): number {
        return this._update(selector, modifier, this._fieldName, options, callback);
    }
}

// TODO IOC container
const slugifier     = new Slugifier(slugify);
const Products: any = new ProductCollection('products', slugifier);

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }
