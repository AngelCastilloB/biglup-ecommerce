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

import { Mongo }                    from 'meteor/mongo';
import { AbstractMigration }        from './abstract-migration';
import { AbstractContentGenerator } from '../../common/helpers/generator/abstract-content-generator';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles all the product migrations.
 */
export class ProductMigration extends AbstractMigration
{

    protected _amount: number    = 10; // 1 to 10 products per category.
    private _products: Product[] = [];
    private _categories: Category[];

    /**
     * @summary Initializes a new instance of the class ProductMigration.
     *
     * @param collection            The collection to migrate the data to.
     * @param generators            The content generators.
     * @param _categoriesCollection The category collection.
     */
    constructor(
        collection: Mongo.Collection<Object>,
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
                const product = this._createPartialProduct(i);

                this._generators.forEach((generator: AbstractContentGenerator) =>
                {
                    product.title.push({language: generator.getLocale(), value: generator.getProductTitle()});
                    product.description.push({language: generator.getLocale(), value: generator.getParagraph()});
                    product.color.push({language: generator.getLocale(), value: generator.getColor()});
                    product.size.push({language: generator.getLocale(), value: generator.getSize()});
                });

                this._products.push(product);
            }
        }
    }

    /**
     * @summary creates an incomplete product object, this lacks title, color, size and other fields.
     *
     * @param index The category index this new product will be guaranteed to have.
     *
     * @returns {Product} The new product partial.
     * @private
     */
    private _createPartialProduct(index: number): Product
    {
        const generator = this._generators[0];

        return {
            title: [],
            description: [],
            color: [],
            size: [],
            sku: generator.getWords(1).toLowerCase() + generator.getRandomNumber(10000),
            barcode: generator.getWords(1).replace(' ', '=').concat('.').toLowerCase(),
            categoryId: this._addRandomIds(this._categories[index]._id),
            price: generator.getRandomNumber(10000),
            discount: generator.getRandomNumber(),
            hashtags: generator.getWordsArray(3),
            isVisible: generator.getRandomBoolean(),
            trackInventory: generator.getRandomBoolean(),
            isLowQuantity: generator.getRandomBoolean(),
            stock: generator.getRandomNumber(500),
            isBackorder: generator.getRandomBoolean(),
            requiresShipping: generator.getRandomBoolean()
        };
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
