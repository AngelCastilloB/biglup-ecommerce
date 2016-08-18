/**
 * @file product.migration.ts.
 *
 * @summary Creates new product documents to insert to the database.
 * @todo slug to slugs
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 01 2016
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

import { AbstractMigration } from './abstract-migration';
import { Mongo }             from 'meteor/mongo';
import * as faker            from 'faker/locale/en';

// EXPORTS ************************************************************************************************************/

export class ProductMigration extends AbstractMigration {

    /**
     * @summary Each category will have at least 3 products.
     *
     * @type {number}
     * @private
     */
    protected _amount = 50;

    /**
     * The products to be inserted.
     *
     * @type {Product[]}
     * @private
     */
    private _products: Product[] = [];

    /**
     * @summary The categories to be associated to products.
     *
     * @type {Distinguishable[]}
     * @private
     */
    private _categoriesIds: Distinguishable[];

    private _categoriesCollection: Mongo.Collection<Category>;

    /**
     * @summary The product must have a size.
     *
     * @type {string[]}
     * @private
     */
    private _sizes = [
        'xs: Extra Small',
        's: Small',
        'ms: Medium Small',
        'm: Medium',
        'ml: Medium Large',
        'l: Large',
        'xl: Extra Large',
    ];

    constructor(collection: Mongo.Collection<Object>,
        generators,
        categoriesCollection: Mongo.Collection<Category>) {
        super(collection, generators);

        this._categoriesCollection = categoriesCollection;
    }

    /**
     * @summary Adds the categories to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void {
        console.log('Starting Default Products.');
        this._addProduct();

        // @see CategoryMigration.up()
        this._products.forEach(product => {
            this._collection.insert(product);
        });
    }

    /**
     * @summary Creates new products to be added to the products bag.
     *
     * @private
     */
    private _addProduct(): void {
        this._getCategoriesIds();
        for (let i = 0; i < this._amount; i++) {
            this._products.push({
                title: [
                    {language: 'en', value: faker.commerce.productName()},
                    {language: 'zh', value: this._generators.zh.words(3).join(' ')},
                    {language: 'kr', value: this._generators.kr.words(3).join(' ')},
                ],
                sku: faker.lorem.words(1).toLowerCase() + Math.floor(Math.random() * 10000),
                barcode: faker.lorem.words(2).replace(' ', '=').concat('.').toLowerCase(),
                categoryId: this._getRandomIds(),
                description: [
                    {language: 'en', value: faker.lorem.paragraph(3)},
                    {language: 'zh', value: this._generators.zh.paragraph()},
                    {language: 'kr', value: this._generators.kr.paragraph()},
                ],
                color: [
                    {language: 'en', value: faker.commerce.color()},
                    {language: 'zh', value: this._generators.zh.words(3).join(' ')},
                    {language: 'kr', value: this._generators.kr.words(3).join(' ')},
                ],
                size: [
                    {language: 'en', value: this._getRandomSize()},
                    {language: 'zh', value: this._generators.zh.words(3).join(' ')},
                    {language: 'kr', value: this._generators.kr.words(3).join(' ')},
                ],
                price: Math.floor(Math.random() * 10000),
                discount: Math.floor(Math.random() * 100),
                hashtags: faker.lorem.words(3).split(' '),
                isVisible: faker.random.boolean(),
                trackInventory: true,
                isLowQuantity: faker.random.boolean(),
                stock: Math.floor(Math.random() * 500),
                isBackorder: faker.random.boolean(),
                requiresShipping: faker.random.boolean()
            });
        }
    }

    /**
     * @summary Returns a random size from the array.
     *
     * @returns {string}
     */
    private _getRandomSize(): string {
        return this._sizes.filter((size, i) => {
            return i === Math.random() * this._sizes.length;
        })[0];
    }

    /**
     * @summary Gets the categories Ids from the database.
     * @private
     */
    private _getCategoriesIds() {
        this._categoriesIds = <Distinguishable[]>this._categoriesCollection.find({}, {fields: {_id: 1}}).fetch();
    }

    /**
     * @summary Gives a random set of ids, from 1 to 5
     *
     * @returns {string[]}
     * @private
     */
    private _getRandomIds(): string[] {
        const array = this._categoriesIds.slice(0);
        let results = [];

        for (let i = 0; i < (Math.ceil(Math.random() * 5) || 1); i++) {
            results.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
        }

        return results.map((obj: Distinguishable) => {
            return obj._id;
        });
    }
}
