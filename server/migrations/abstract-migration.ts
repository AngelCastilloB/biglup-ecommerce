/**
 * @file migration.ts.
 *
 * @summary Abstract Migration sets the base for all migration implementations.
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

import { Mongo }                    from 'meteor/mongo';
import { IMigratable }              from './interfaces/i-migratable';
import { AbstractContentGenerator } from '../../common/helpers/generator/abstract-content-generator';

// EXPORTS ************************************************************************************************************/

/**
 * @summary sets the structure needed to add a new document to the mongo database.
 */
export abstract class AbstractMigration implements IMigratable
{
    protected _amount = 10;

    /**
     * @summary Initializes a new instance of the class.
     *
     * @param {Mongo.Collection<{}>} _collection The mongo collection to associate with this migration class.
     * @param {AbstractContentGenerator[]} _generators The fake language content generator.
     */
    constructor(protected _collection: Mongo.Collection<Object>, protected _generators: AbstractContentGenerator[])
    {
    }

    /**
     * @summary Migrates the documents to the database.
     */
    public abstract up(): void;

    /**
     * @summary Un do the migration.
     */
    public down(): void
    {
        console.log('removing collection!');
        this._collection.remove({});
    }

    /**
     * @summary creates a I18nString type compatible array according to enabled locales in settings.
     *
     * @param type The type of element to give back, IE: word, sentence, color, etc.
     * @param amount The quantity to generate.
     *
     * @returns {I18nString[]}
     */
    protected _getI18nStringArray(type: string, amount = 1): I18nString[]
    {
        let data: I18nString[] = [];

        this._generators.forEach((generator: AbstractContentGenerator) =>
        {
            let func = this._getStringGeneratorFunction(type, generator);
            data.push({
                language: generator.getLocale(),
                value: func(amount)
            });
        });

        return data;
    }

    /**
     * @summary Finds the proper function according to the type.
     *
     * @param type the simplified function name, IE: word, sentence, paragraph, color, etc.
     * @param generator the Content generator instance.
     * @returns {Function}
     * @private
     */
    private _getStringGeneratorFunction(type: string, generator: AbstractContentGenerator): Function
    {
        switch (type)
        {
            case 'word':
                return generator.getWords.bind(generator);
            case 'sentence':
                return generator.getSentence.bind(generator);
            case 'paragraph':
                return generator.getParagraph.bind(generator);
            case 'color':
                return generator.getColor.bind(generator);
            case 'size':
                return generator.getSize.bind(generator);
            default:
                throw new Error(`Unable to find proper generator function, '${type}' is invalid.`);
        }
    }
}
