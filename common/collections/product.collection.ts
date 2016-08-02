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

import { Mongo }              from 'meteor/mongo';
import { ProductSchema }      from '../schemas/product.schema';
import { Slugger, Slugifier } from './helpers/slugifier';
import { slugify }            from 'transliteration';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary adds insert/update/etc hooks to alter the document before insertion.
 *
 * Since this library does not implement pre-hooks like mongoose, we have to extend
 * the class and override the methods we want to act as pre-hooks. This also provides the database
 * collection to query the database from since it seems that collection2 autoValue does not.
 *
 * @todo check if post-hooks are doable.
 */
class ProductCollection extends Mongo.Collection<Product> {

    /**
     * @summary This constructor adds the slug service to the mix.
     *
     * @param {string} name
     * @param {Slugger} slugService Creates slug strings.
     * @param {Object=} options
     * @param {Object=} options.connection
     * @param {string=} options.idGeneration
     * @param {Function=} options.transform
     */

    /**
     * @summary Needed to make slugs from the product title.
     */
    private _slugService: Slugger;

    constructor(name: string,
        slugService: Slugger,
        options?: {connection?: Object; idGeneration?: string; transform?: Function}) {
        super(name, options);

        this._slugService = slugService;
    }

    /**
     * @summary Changes the insert to add the product slugs.
     *
     * @param {Product} product
     * @param {Function} callback
     * @returns {string}
     */
    public insert(product: Product, callback: Function) {
        if (!product.title) throw new Error('A Product must have a title.');

        let data = [];

        product.title.forEach((obj: I18nString) => {
            let slug      = this._slugService.slugify(obj.value);
            const results = this.find({slug: /slug/}, {sort: {slug: -1}}).fetch();

            if (results.length) {
                slug += `-${results.length++}`;
            }

            data.push({language: obj.language, value: slug});
        });

        if (data.length === 0) {
            throw new Error('Invalid title, cannot generate slugs.');
        }

        product.slug = data;

        // Call the original `insert` method, which will validate
        // against the schema
        return super.insert(product, callback);
    }
}

// TODO IOC container
const slugifier   = new Slugifier(slugify);
let Products: any = new ProductCollection('products', slugifier);

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }
