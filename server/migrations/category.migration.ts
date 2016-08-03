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

import { Migration } from './migration';
import { Mongo }     from 'meteor/mongo';
import defaults      from './defaults/category';

// EXPORTS ************************************************************************************************************/

export class CategoryMigration extends Migration {

    /**
     * @summary All the categories to be inserted.
     */
    private _categories: Category[];

    constructor(collection: Mongo.Collection<Category>) {
        super(collection);

        this._categories = defaults;
    }

    /**
     * @summary Adds the categories to the database.
     *
     * @see parent Migration.
     */
    public up(): void {
        console.log('Starting Default Categories.');
        this._addCategory();

        // for some unholy reason they didn't implement the insert according to the mongo API
        // https://docs.mongodb.com/manual/reference/method/db.collection.insert/
        // which accepts an array of documents, so we have to insert each one like animals.
        this._categories.forEach((category) => {
            this._collection.insert(category);
        });
    }

    /**
     * Adds a category to the categories array according to the amount.
     *
     * @private
     */
    private _addCategory() {
        for (let i = 0; i < this._amount; i++) {
            let name = Fake.sentence(5);

            this._categories.push({
                name: [
                    {
                        'language': 'en',
                        'value': name
                    },
                    {
                        'language': 'zh',
                        // TODO extend Fake to allow chinese and other languages
                        'value': `${name} in chinese.`
                    },
                    {
                        language: 'kr',
                        value: `${name} in korean`
                    }
                ],
                info: [
                    {
                        'language': 'en',
                        'value': Fake.sentence(5)
                    },
                    {
                        'language': 'zh',
                        'value': `${Fake.sentence(5)} in chinese.`
                    }
                ],
                image: 'shirts.png'
            });
        }
    }
}
