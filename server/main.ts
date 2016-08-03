/**
 * @file main.ts
 *
 * @summary Entry point on the server app.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import { Meteor }           from 'meteor/meteor';
import { createMigrations } from './migrations/create-migrations';

// TODO DELETE THIS
import { Products } from '../common/collections/product.collection';

/* CONSTANTS ***********************************************************************************************************/

/**
 * We set the settings as any because Typescript complaints about unknown types (coming from the settings file).
 * @type {Object}
 */
const SETTINGS: any = Meteor.settings;

/* METEOR SERVER START UP *********************************************************************************************/

Meteor.startup(() => {
    if (SETTINGS.migrations && SETTINGS.migrations.migrate) {
        createMigrations();
        if (SETTINGS.migrations.reset) {
            // the library doesn't provide public APIs to properly reset the collection.
            // Even though we could Migrations.migrateTo(0)
            // this fails when the migration is locked and needs to be unlocked.
            Migrations._collection.update({_id: 'control'}, {$set: {'locked': false}});
            Migrations.migrateTo(0);
        }

        Migrations.migrateTo('latest');
    }

    // TODO DELETE THIS
    const p = Products.findOne();
    Products.update({_id: p._id}, {$set: {title: [{language: 'en', value: 'Ayy Lmao'}]}});
});
