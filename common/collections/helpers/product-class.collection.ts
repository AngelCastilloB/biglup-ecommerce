/**
 * @file product-class.collection.ts.
 *
 * @summary adds insert/update/etc hooks to alter the document before insertion.
 *
 * Since this library does not implement pre-hooks like mongoose, we have to extend
 * the class and override the methods we want to act as pre-hooks. This also provides the database
 * collection to query the database from since it seems that collection2 autoValue does not.
 *
 * @todo check if post-hooks are doable.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 02 2016
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

import { Slugger } from './slugifier';
import { Mongo }   from 'meteor/mongo';

// EXPORTS ************************************************************************************************************/

export class ProductCollection extends Mongo.Collection<Product> {

    /**
     * @summary Needed to make slugs from the product title.
     */
    private _slugService: Slugger;

    /**
     * @summary The product being manipulated prior to insert/update.
     */
    private _product: Product;

    /**
     * @summary The mongo selector, usually _id: 'something'
     */
    private _selector;

    /**
     * @summary The mongo modifier, usually the $set object
     */
    private _modifier: Mongo.Modifier;

    /**
     * @summary controls whether or not the document is updating.
     */
    private _isUpdating: boolean;

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
        this._product = product;
        this._createOrUpdateSlugs();

        // Call the original `insert` method, which will validate against the schema.
        const results = super.insert(this._product, callback);

        // Since this is a single instance, we need to make sure the
        // internals are reset after this operation.
        this._product = null;

        return results;
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

        // JOHN F***** MADDEN
        // http://i77.photobucket.com/albums/j68/Frag971/flow.jpg
        this._isUpdating = true;
        this._selector   = selector;
        this._modifier   = modifier;
        this._checkAndUpdateModifier();
        const results = super.update(selector, this._modifier, options, callback);
        this._cleanSelf();

        return results;
    }

    /**
     * @summary checks the modifier (mongo modifier) and determines if a new slug is needed.
     * @private
     */
    private _checkAndUpdateModifier(): void {
        for (let key in this._modifier) {
            // check if the modifier has a 'title', if so creates new slug(s)
            if (this._modifier.hasOwnProperty(key) && key === '$set' && this._modifier[key]['title']) {
                this._product       = <Product>{};
                this._product.title = this._modifier[key]['title'];
                this._createOrUpdateSlugs();
                this._modifier[key]['slug'] = this._product.slug;

                // since we found the title, we don't need to iterate anymore.
                break;
            }
        }
    }

    /**
     * @summary Ask slugs from the service and check if those slugs already exist.
     *
     * @private
     */
    private _createOrUpdateSlugs(): void {
        if (!this._product.title) throw new Error('A Product must have a title.');

        let slugsArray = this._slugService.slugifyI18nString(this._product.title); //

        // We need to transform the array if they slug of any language exist in the database.
        slugsArray.map((obj: I18nString) => {
            const regExp = new RegExp(`^(${obj.value})(\-\d)?$`);

            const results = this.find({'slug.value': regExp}, {fields: {slug: true}}).fetch();

            // if there are results we append the count to the end link-so-2 or like-so-3
            if (results.length) {
                // if its updating and there's only one result, we have to check if updating itself or not.
                if (results.length === 1 && this._isUpdatingItself()) {
                    return obj.value;
                }

                return obj.value += `-${results.length++}`;
            }

            return obj.value;
        });

        this._product.slug = slugsArray;
    }

    /**
     * @summary cleans state since this acts like a global variable.
     *
     * Fix this?
     * @private
     */
    private _cleanSelf(): void {
        // Since this is a single instance, we need to make sure the
        // internals are reset after this operation.
        this._modifier = this._isUpdating = this._product = this._selector = null;
    }

    /**
     * @summary checks if the new document is updating itself.
     *
     * @returns {boolean}
     * @private
     */
    private _isUpdatingItself(): boolean {
        if (!this._isUpdating) return false;

        return this.find(this._selector, {fields: {_id: true}}).fetch().length === 1;
    }
}
