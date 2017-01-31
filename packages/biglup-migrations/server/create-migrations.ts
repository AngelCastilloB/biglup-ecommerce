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

import { CategoryMigration }         from './category.migration';
import { Categories }                from 'meteor/biglup:business';
import { ProductMigration }          from './product.migration';
import { Products }                  from 'meteor/biglup:business';
import { IMigratable }               from './interfaces/i-migratable';
import { ImageMigration }            from './image.migration';
import { Images }                    from 'meteor/biglup:business';
import { ContentGeneratorFactory }   from './generators/content-generator-factory';
import { AbstractContentGenerator }  from './generators/abstract-content-generator';
import { VariantAttributeMigration } from './variant-attributes.migration';

// FUNCTIONS **********************************************************************************************************/

/**
 * @summary creates all the content generators according to the meteor.json file settings.
 *
 * @returns {AbstractContentGenerator[]} all the created content generators.
 */
const createGenerators = (): AbstractContentGenerator[] =>
{
    ContentGeneratorFactory.init();

    const data = [];

    Meteor.settings['migrations']['locales'].forEach((locale: string) =>
    {
        data.push(ContentGeneratorFactory.create(locale));
    });

    return data;
};

// EXPORTS ************************************************************************************************************/

/**
 * @summary This method configures the data base migration with mock data generators to populate the database for
 * testing purposes.
 */
export const configureMockMigrations = () =>
{
    let generators: AbstractContentGenerator[] = createGenerators();

    // the migrations to be called by the migrate function (order matters).
    let migrations = [
        new CategoryMigration(Categories, generators),
        new ProductMigration(Products, generators, Categories),
        new ImageMigration(Images, generators, {products: Products, categories: Categories})
    ];

    // Each migration version needs to be added with the add method.
    // @see https://atmospherejs.com/percolate/migrations#advanced
    // Since we could have multiple version (specially in production) we must adapt the migration strategy with multiple
    // database versions in mind, the Migrations library attacks this issue by setting a version number at execution, if
    // we need to add a different version of the database we can just add a new Migration.add with new migrations that
    // will update the database in a non destructive manner.
    Migrations.add({
        version: 1,
        name: 'Add fake documents.',
        up() {
            migrations.forEach((migration: IMigratable) => migration.up());
        },
        down() {
            migrations.forEach((migration: IMigratable) => migration.down());
        }
    });
};

/**
 * @summary This method configures the database migrations to insert in the brand new database the default starting values
 * (I.E Product Variants Attributes, Roles, Initial Users etc...)
 */
export const configureDefaultMigrations = () =>
{
    let migrations = [
        new VariantAttributeMigration()
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
            migrations.forEach((migration: IMigratable) => migration.up());
        },
        down() {
            migrations.forEach((migration: IMigratable) => migration.down());
        }
    });
};