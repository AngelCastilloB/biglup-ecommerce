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

import { Mongo } from 'meteor/mongo';

// EXPORTS ************************************************************************************************************/

/**
 * @summary sets the structure needed to add a new document to the mongo database.
 */
export abstract class Migration {

    /**
     * @summary Controls the version of the current migration, the collection can have multiple migrations.
     *
     * @type {number}
     * @protected
     */
    protected _version = 1;

    /**
     * @summary The Mongo collection to be manipulated.
     * @protected
     */
    protected _collection: Mongo.Collection<Object>;

    /**
     * @summary The amount to be added by default.
     *
     * @type {number}
     * @protected
     */
    protected _amount = 10;

    constructor(collection: Mongo.Collection<Object>) {
        this._collection = collection;
    }

    /**
     * @summary version getter.
     *
     * @returns {number}
     */
    public get version(): number {
        return this._version;
    }

    /**
     * @summary version setter, we can't allow a new version.
     *
     * @param {*} v
     */
    public set version(v) {
        throw new Error(`Can't set a new version ${v} on this Migration.`);
    }

    /**
     * @summary sets the amount needed to add documents.
     *
     * @param {number} x the amount to add to the database
     */
    public set amount(x: number) {
        if (x % 1 === 0 && x >= 1) {
            this._amount = x;
        }
    }

    /**
     * @summary Needs to have the logic required to add a new document.
     *
     * @param {number=} amount The amount of documents to add.
     * @access public We must allow this to run on its own.
     */
    public abstract up(amount?): void;

    /**
     * @summary Must have the logic to undo the 'up' method without disrupting the database.
     * @access public We must allow this to run on its own.
     */
    public abstract down(): void;
}
