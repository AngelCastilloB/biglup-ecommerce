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

import { Mongo }                  from 'meteor/mongo';
import { IMigratable }            from './interfaces/i-migratable';
import {
    SimplifiedChineseContentGenerator
}                                 from '../../common/helpers/generator/simplified-chinese-content-generator';
import { KoreanContentGenerator } from '../../common/helpers/generator/korean-content-generator';

// EXPORTS ************************************************************************************************************/

/**
 * @summary sets the structure needed to add a new document to the mongo database.
 */
export abstract class Migration implements IMigratable {

    /**
     * @summary The amount to be added by default.
     *
     * @type {number}
     * @protected
     */
    protected _amount = 10;

    constructor(protected _collection: Mongo.Collection<Object>,
        protected _generators: GeneratorsOptions) {
    }

    /**
     * @summary Needs to have the logic required to add a new document.
     */
    public abstract up(): void;

    /**
     * @summary Must have the logic to undo the 'up' method without disrupting the database.
     */
    public down(): void {
        console.log('removing collection!');
        this._collection.remove({});
    }
}

interface GeneratorsOptions {
    zh: SimplifiedChineseContentGenerator;
    kr: KoreanContentGenerator;
}
