/**
 * @file category.migration.ts.
 *
 * @summary Adds categories to the database.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 31 2016
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

import { AbstractContentGenerator } from '../../common/helpers/generator/abstract-content-generator';
import { AbstractMigration }        from './abstract-migration';
import { Mongo }                    from 'meteor/mongo';
import { Category }                 from '../../common/models';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This class handles all the category migrations.
 */
export class CategoryMigration extends AbstractMigration
{

    /**
     * @summary All the categories to be inserted.
     */
    private _categories: Array<Category> = Array<Category>();

    /**
     * @summary This migration will have the default amount of documents.
     *
     * @type {number}
     * @private
     */
    private _amount = AbstractMigration.defaultAmount;

    /**
     * @summary Initializes a new instances of the class CategoryMigration.
     *
     * @param collection The mongo collection.
     * @param generators The content generators.
     */
    constructor(collection: Mongo.Collection<Category>, generators)
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
        console.log('Starting Default Categories.');
        this._generateCategories();

        // for some unholy reason they didn't implement the insert according to the mongo API
        // https://docs.mongodb.com/manual/reference/method/db.collection.insert/
        // which accepts an array of documents, so we have to insert each one like animals.
        this._categories.forEach(category => this._collection.insert(category));
    }

    /**
     * Adds a category to the categories array according to the amount.
     *
     * @private
     */
    private _generateCategories()
    {
        for (let i = 0; i < this._amount; i++)
        {
            const category: Category = new Category();

            this._generators.forEach((generator: AbstractContentGenerator) =>
            {
                category.name.push({language: generator.getLocale(), value: generator.getWords(1)});
                category.info.push({language: generator.getLocale(), value: generator.getWords(10)});
            });

            this._categories.push(category);
        }
    }
}
