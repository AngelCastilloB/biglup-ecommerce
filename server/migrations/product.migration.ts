/**
 * @file product.migration.ts.
 *
 * @summary Creates new product documents to insert to the database.
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

/**
 * @summary Handles all the product migrations.
 */
export class ProductMigration extends AbstractMigration
{

    protected _amount: number    = 10; // 1 to 10 products per category.
    private _products: Product[] = [];
    private _categories: Category[];
    private _sizes               = [
        'xs: Extra Small',
        's: Small',
        'ms: Medium Small',
        'm: Medium',
        'ml: Medium Large',
        'l: Large',
        'xl: Extra Large',
    ];

    /**
     * @summary Initializes a new instance of the class ProductMigration.
     *
     * @param collection            The collection to migrate the data to.
     * @param generators            The content generators.
     * @param _categoriesCollection The category collection.
     */
    constructor(collection: Mongo.Collection<Object>,
        generators,
        private _categoriesCollection: Mongo.Collection<Category>)
    {
        super(collection, generators);
    }

    /**
     * @summary Adds the categories to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void
    {
        console.log('Starting Default Products.');
        this._generateProducts();

        this._products.forEach(product => this._collection.insert(product));
    }

    /**
     * @summary Generates new products to be added to the products bag.
     *
     * @private
     */
    private _generateProducts(): void
    {
        this._categories = this._categoriesCollection.find({}).fetch();

        for (let i = 0; i < this._categories.length; ++i)
        {
            let productCount: number = Math.max(Math.floor(Math.random() * this._amount), 1);

            for (let j = 0; j < productCount; j++)
            {
                this._products.push({
                    title: [
                        {language: 'en', value: faker.commerce.productName()},
                        {language: 'zh', value: this._generators.zh.getWords(3).join(' ')},
                        {language: 'kr', value: this._generators.kr.getWords(3).join(' ')},
                    ],
                    sku: faker.lorem.words(1).toLowerCase() + Math.floor(Math.random() * 10000),
                    barcode: faker.lorem.words(2).replace(' ', '=').concat('.').toLowerCase(),
                    categoryId: this._addRandomIds(this._categories[i]._id),
                    description: [
                        {language: 'en', value: faker.lorem.paragraph(3)},
                        {language: 'zh', value: this._generators.zh.getParagraph()},
                        {language: 'kr', value: this._generators.kr.getParagraph()},
                    ],
                    color: [
                        {language: 'en', value: faker.commerce.color()},
                        {language: 'zh', value: this._generators.zh.getWords(3).join(' ')},
                        {language: 'kr', value: this._generators.kr.getWords(3).join(' ')},
                    ],
                    size: [
                        {language: 'en', value: this._getRandomSize()},
                        {language: 'zh', value: this._generators.zh.getWords(3).join(' ')},
                        {language: 'kr', value: this._generators.kr.getWords(3).join(' ')},
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
    }

    /**
     * @summary Returns a random size from the array.
     *
     * @returns {string} The ranomd size.
     */
    private _getRandomSize(): string
    {
        let randomIndex: number = Math.floor(Math.random() * this._sizes.length);

        return this._sizes[randomIndex];
    }

    /**
     * @summary Gives a random set of ids, from 1 to 5
     *
     * @param {string} id The id of a category to be guaranteed an spot on the product.
     * @returns {string[]} A random set of ids.
     * @private
     */
    private _addRandomIds(id: string): string[]
    {
        let results = [];

        results.push(id);

        let randomIndex: number = Math.floor(Math.random() * this._categories.length);

        results.push(this._categories[randomIndex]._id);

        return results;
    }
}
