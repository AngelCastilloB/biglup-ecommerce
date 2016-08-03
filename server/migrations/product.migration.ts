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

import { Migration } from './migration';
import { Mongo }     from 'meteor/mongo';

// EXPORTS ************************************************************************************************************/

export class ProductMigration extends Migration {

    /**
     * @summary Each category will have at least 3 products.
     *
     * @type {number}
     * @private
     */
    protected _amount = 3;

    /**
     * The products to be inserted.
     *
     * @type {Product[]}
     * @private
     */
    private _products: Product[] = [];

    /**
     * The products to be inserted.
     *
     * @type {CategoryIds[]}
     * @private
     */
    private _categoriesIds: CategoryIds[];

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

    constructor(collection: Mongo.Collection<Object>, categoriesCollection: Mongo.Collection<Category>) {
        super(collection);

        this._categoriesCollection = categoriesCollection;
    }

    /**
     * @summary Adds the categories to the database.
     *
     * @see parent Migration.
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
        for (let i = 0; i < 2; i++) {
            let title = Fake.sentence(4);

            // TODO slug to slugs
            this._products.push({
                slug: [
                    {language: 'en', value: title.toLowerCase().replace(/[ ]/gi, '-')},
                    {language: 'zh', value: this._chineseSentences.pop().replace(/[ ]/gi, '-')} // TODO FIX THIS
                ],
                title: [
                    {language: 'en', value: title},
                    {language: 'zh', value: this._chineseSentences.pop()}, // TODO FIX THIS
                ],
                sku: Fake.word().toLowerCase() + Math.floor(Math.random() * 1000),
                categoryId: this._getRandomIds(),
                description: [
                    {language: 'en', value: Fake.paragraph(1)},
                    {language: 'zh', value: this._chineseParagraph},
                ],
                color: Fake.color(),
                size: this._getSize(),
                price: Math.floor(Math.random() * 10000),
                discount: Math.floor(Math.random() * 100),
                hashtags: Fake.sentence(3).split(' '),
                isVisible: true
            });
        }
    }

    /**
     * @summary Returns a random size from the array.
     *
     * @returns {string}
     */
    private _getSize(): string {
        return this._sizes.filter((size, i) => {
            return i === Math.random() * this._sizes.length;
        })[0];
    }

    /**
     * @summary Gets the categories Ids from the database.
     * @private
     */
    private _getCategoriesIds() {
        this._categoriesIds = this._categoriesCollection.find({}, {fields: {_id: 1}}).fetch();
    }

    private _getRandomIds(): string[] {
        const array = this._categoriesIds.slice(0);
        let results = [];

        for (let i = 0; i < (Math.ceil(Math.random() * 5) || 1); i++) {
            results.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
        }

        return results.map((obj: CategoryIds) => {
            return obj._id;
        });
    }
}

interface CategoryIds {
    _id: string;
}
