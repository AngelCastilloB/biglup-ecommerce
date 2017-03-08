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

import { configureDefaultMigrations,
         configureMockMigrations,
         configureBothMigrations }   from './server/create-migrations';
import { Meteor }                    from 'meteor/meteor';

/* CONSTANTS **********************************************************************************************************/

const MIGRATIONS_SETTINGS = {
    migrate: false,
    reset: false,
    locales: ['en', 'zh', 'kr', 'es'],
    initialize: false,
    mock: false
};

/* METEOR SERVER START UP *********************************************************************************************/

Meteor.startup(() =>
{
    let settings: any = Meteor.settings['migrations'];

    if (!settings)
        settings = MIGRATIONS_SETTINGS;

    if (settings.migrate)
    {
        if (settings.reset)
        {
            // the library doesn't provide public APIs to properly reset the collection.
            // Even though we could Migrations.migrateTo(0)
            // this fails when the migration is locked and needs to be unlocked.
            Migrations._collection.update({_id: 'control'}, {$set: {locked: false}});
            Migrations.migrateTo(0);
        }

        if (settings.mock && settings.initialize)
        {
            configureBothMigrations();
        }
        if (settings.mock)
        {
            configureMockMigrations();
        }
        else if (settings.initialize)
        {
            configureDefaultMigrations();
        }

        Migrations.migrateTo('latest');
    }
});
