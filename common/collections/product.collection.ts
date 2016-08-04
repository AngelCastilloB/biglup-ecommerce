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
import { Slugifier }     from '../helpers/slugifier';
import { slugify }       from 'transliteration';
import { Slugger }       from '../helpers/slugifier';
import { Mongo }         from 'meteor/mongo';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary adds insert/update/etc hooks to alter the document before insertion.
 *
 * Since this library does not implement pre-hooks like mongoose, we have to extend
 * the class and override the methods we want to act as pre-hooks. This also provides the database
 * collection to query the database from since it seems that collection2 autoValue does not.
 *
 * @todo check if post-hooks are doable.
 * @todo slug to slugs
 */
class ProductCollection extends Mongo.Collection<Product> {

    /**
     * @summary Needed to make slugs from the product title.
     */
    private _slugService: Slugger;

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
    constructor(name: string,
        slugService: Slugger,
        options?: {connection?: Object; idGeneration?: string; transform?: Function}) {
        super(name, options);

        this._slugService = slugService;
    }

    /**
     * @summary Changes the insert to add the product slugsArray.
     *
     * @param {Product} product
     * @param {Function} callback
     * @returns {string}
     */
    public insert(product: Product, callback: Function) {
        if (product.title.length > 0) {
            product.slug = this._createSlugs(product.title);
        }

        return super.insert(product, callback);
    }

    /**
     * @summary Changes the update to allow new slugs if title changes.
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
        if (this._hasTitle(modifier)) {
            const slugs   = this._createSlugs(modifier['$set']['title']);
            const product = this.findOne(selector);
            this._updateSlugs(slugs, product._id);
        }

        return super.update(selector, modifier, options, callback);
    }

    /**
     * @summary checks the modifier (mongo modifier) and determines if a new slug is needed.
     *
     * @param {Mongo.Modifier} modifier
     * @private
     */
    private _hasTitle(modifier: Mongo.Modifier): boolean {
        for (let key in modifier) {
            // check if the modifier has a 'title', if so creates new slug(s)
            if (modifier.hasOwnProperty(key) && key === '$set' && modifier[key]['title']) {
                return true;
            }
        }

        return false;
    }

    /**
     * @summary Ask slugs from the service and check if those slugs already exist.
     *
     * @private
     */
    private _createSlugs(title: I18nString[]): I18nString[] {
        let slugsArray = this._slugService.slugifyI18nString(title);

        // We need to transform the array if the slug of any language exist in the database.
        slugsArray.map((obj: I18nString) => {
            const regExp  = new RegExp(`^(${obj.value})(\-\d)?$`);
            const results = this.find({'slug.value': regExp}, {fields: {slug: 1}}).fetch();

            if (results.length) {
                if (results.length !== 1) {
                    return obj.value += `-${results.length++}`;
                }
            }

            return obj.value;
        });

        return slugsArray;
    }

    /**
     * @summary Updates the product's slugs.
     *
     * @param {I18nString[]} slugs
     * @param {string} _id
     * @private
     */
    private _updateSlugs(slugs: I18nString[], _id: string): void {
        // we need to update the selector to include the updated languages
        slugs.forEach((slug: I18nString) => {
            const selector = {_id, 'slug.language': slug.language};
            const modifier = {$set: {'slug.$.value': slug.value}};
            this.update(selector, modifier, {}, (err, updatedRows) => {
                if (err) throw err;

                if (updatedRows === 0) {
                    this.update({_id}, {$push: {slug: {language: slug.language, value: slug.value}}});
                }
            });
        });
    }
}

// TODO IOC container
const slugifier     = new Slugifier(slugify);
const Products: any = new ProductCollection('products', slugifier);

Products.attachSchema(ProductSchema);

// EXPORTS ************************************************************************************************************/

export { Products }
