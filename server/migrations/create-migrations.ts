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

import {
    SimplifiedChineseContentGenerator
}                                 from '../../common/helpers/generator/simplified-chinese-content-generator';
import { KoreanContentGenerator } from '../../common/helpers/generator/korean-content-generator';
import { CategoryMigration }      from './category.migration';
import { Categories }             from '../../common/collections/category.collection';
import { ProductMigration }       from './product.migration';
import { Products }               from '../../common/collections/product.collection';
import { Migratable }             from './interfaces/Migratable';

// EXPORTS ************************************************************************************************************/

export function createMigrations() {
    // TODO IOC container
    const generators = {
        zh: new SimplifiedChineseContentGenerator(),
        kr: new KoreanContentGenerator()
    };

    // the migrations to be called by the migrate function (order matters).
    let migrations = [
        new CategoryMigration(Categories, generators),
        new ProductMigration(Products, generators, Categories)
    ];

    // Each migration version needs to be added with the add method.
    // @see https://atmospherejs.com/percolate/migrations#advanced
    // Since we could have multiple version (specially in production) we must adapt the migration strategy with multiple
    // database versions in mind, the Migrations library attacks this issue by setting a version number at execution, if
    // we need to add a different version of the database we can just add a new Migration.add with new migrations that
    // will update the database in a non destructive manner.
    Migrations.add({
        version: 1,
        name: 'Add default documents.',
        up() {
            migrations.forEach((migration: Migratable) => {
                migration.up();
            });
            console.log('Migration completed.');
        },
        down() {
            migrations.forEach((migration: Migratable) => {
                migration.down();
            });
            console.log('Migration reset.');
        }
    });
}
