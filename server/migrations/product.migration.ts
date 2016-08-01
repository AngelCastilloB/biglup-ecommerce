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

// EXPORTS ************************************************************************************************************/

export class ProductMigration extends Migration {

    /**
     * The products to be inserted.
     *
     * @type {Product[]}
     * @private
     */
    private _products: Product[] = [];

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
        for (let i = 0; i < 1; i++) {
            let title = Fake.sentence(4);

            this._products.push({
                slug: title.toLowerCase().replace(/[ ]/gi, '-'),
                title: [
                    {language: 'en', value: title},
                    {language: 'zh', value: this._chineseSentences.pop()},
                ],
                sku: Fake.word().toLowerCase() + Math.floor(Math.random() * 1000),
                categoryId: ['C0000000001'], // TODO
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
}
