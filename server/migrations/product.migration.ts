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
import { Category, Product }        from '../../common/models/models';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles all the product migrations.
 */
export class ProductMigration extends AbstractMigration
{
    protected _amount: number       = 1;
    private _products: Product[]    = [];
    private _categories: Category[] = [];

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

        this._categories = this._categoriesCollection.find({}).fetch();
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
        for (let j = 0; j < this._amount; j++)
        {
            const product = this._createPartialProduct();

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

    /**
     * @summary creates an incomplete product object, this lacks title, color, size and other fields.
     *
     * @returns {Product} The new product partial.
     * @private
     */
    private _createPartialProduct(): Product
    {
        const generator        = this._generators[0];
        const product: Product = new Product();

        product.categories       = this._getRandomCategoryIds();
        product.sku              = generator.getWords(1).toLowerCase() + generator.getRandomNumber(10000);
        product.barcode          = generator.getWords(1).replace(' ', '=').concat('.').toLowerCase();
        product.price            = generator.getRandomNumber(10000);
        product.discount         = generator.getRandomNumber();
        product.hashtags         = generator.getWordsArray(3);
        product.isVisible        = generator.getRandomBoolean();
        product.trackInventory   = generator.getRandomBoolean();
        product.isLowQuantity    = generator.getRandomBoolean();
        product.stock            = generator.getRandomNumber(500);
        product.isBackorder      = generator.getRandomBoolean();
        product.requiresShipping = generator.getRandomBoolean();

        return product;
    }

    /**
     * @summary Gives a random set of ids, from 1 to 5, with a change of no id returned.
     *
     * @returns {string[]} A random set of ids.
     * @private
     */
    private _getRandomCategoryIds(): string[]
    {
        const results = [];

        // 10% chance of a product with no category.
        if (Math.random() <= .1 || this._categories.length === 0)
        {
            return results;
        }

        const array  = this._categories.slice(0);
        const amount = array.length < 5 ? array.length : (Math.floor(Math.random() * 5) || 1);

        for (let i = 0; i < amount; i++)
        {
            const set = array.splice(Math.floor(Math.random() * array.length), 1)[0];

            results.push(set);
        }

        return results.map(category => category._id);
    }
}
