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

import { AbstractMigration }        from './abstract-migration';
import { AbstractContentGenerator } from './generators/abstract-content-generator';
import { Category, Product }        from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles all the product migrations.
 */
export class ProductMigration extends AbstractMigration
{

    /**
     * @summary This migration will have the default amount of documents.
     *
     * @type {number}
     * @private
     */
    private _amount = 20;

    /**
     * @summary The collection of products that will be stored into the DB.
     *
     * @type {Array}
     * @private
     */
    private _products: Product[] = [];

    /**
     * @summary All the existing categories that could be associated with new products.
     *
     * @type {Array}
     * @private
     */
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
    }

    /**
     * @summary Adds the categories to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void
    {
        console.log('Starting Default Products.');

        this.fetchCategories();
        this._generateProducts();

        this._products.forEach(product =>
        {
            this._collection.insert(product);
        });
    }

    /**
     * @summary Gets the existing categories non reactively.
     */
    private fetchCategories()
    {
        this._categories = this._categoriesCollection.find({}, {reactive: false}).fetch();
    }

    /**
     * @summary Generates new products to be added to the products bag.
     *
     * @private
     */
    private _generateProducts(): void
    {
        this._categories.forEach((category) =>
        {
            for (let j = 0; j < this._amount; j++)
            {
                const product = this._createPartialProduct(category);

                this._generators.forEach((generator: AbstractContentGenerator) =>
                {
                    product.title.push({language: generator.getLocale(), value: generator.getProductTitle()});
                    product.description.push({language: generator.getLocale(), value: generator.getParagraph()});

                    //TODO: [Angel] Add variants
                    //product.color.push({language: generator.getLocale(), value: generator.getColor()});
                    //product.size.push({language: generator.getLocale(), value: generator.getSize()});
                });

                this._products.push(product);
            }
        });
    }

    /**
     * @summary creates an incomplete product object, this lacks title, color, size and other fields.
     *
     * @returns {Product} The new product partial.
     * @private
     */
    private _createPartialProduct(category): Product
    {
        const generator        = this._getGenerator();
        const product: Product = new Product();

        product.categories       = [category._id, category.parentCategory];
        product.sku              = generator.getWords(1).toLowerCase() + '-' + generator.getRandomNumber(10000);
        product.barcode          = generator.getWords(2).replace(' ', '=').concat('.').toLowerCase();
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
     * @summary Tries to get the 'en' generator, if it fails, returns the first one.
     *
     * @param {string} locale The default locale to return, defaults to english locale generator.
     *
     * @returns {AbstractContentGenerator}
     * @private
     */
    private _getGenerator(locale = 'en'): AbstractContentGenerator
    {
        const generator = this._generators.find(gen => gen.getLocale() === locale);

        return generator || this._generators[0];
    }
}
