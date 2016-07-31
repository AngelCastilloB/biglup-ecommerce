/**
 * @file migrate.ts.
 *
 * @summary Adds documents to the database.
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

import { CategoryMigration } from './category.migration';
import { Categories } from '../../common/collections/category.collection';
import { Meteor } from 'meteor/meteor';

/* CONSTANTS ***********************************************************************************************************/

/**
 * @see main.ts
 *
 * @type {Object}
 */
const SETTINGS: any = Meteor.settings;

// EXPORTS ************************************************************************************************************/

export function migrate() {
    // the migrations to be called by the migrate function.
    const catMin = new CategoryMigration(Categories);

    if (SETTINGS.migrations.reset) {
        // the library doesn't provide public APIs to properly reset the collection.
        // Even though we could Migrations.migrateTo(0)
        // this fails when the migration is locked and needs to be unlocked.
        Migrations._reset();
    }

    // Each migration needs to be added with the add method.
    Migrations.add({
        version: catMin.version,
        up: catMin.up.bind(catMin),
        down: catMin.down.bind(catMin)
    });

    Migrations.migrateTo('latest');
}
