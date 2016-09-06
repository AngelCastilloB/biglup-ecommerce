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

    /**
     * @summary The default amount a migration should have.
     *
     * @type {number}
     */
    public static defaultAmount = 10;

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
}
