/**
 * @file migrations.d.ts.
 *
 * @summary The Migrations package type definition, adds records to the database.
 * @link https://atmospherejs.com/percolate/migrations
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

declare var Migrations: {
    add(options: AddMigrationOptions);
    migrateTo(where: number | string);
    getVersion();
    config(options: MigrationsOptions);
    _reset();
    _collection: Mongo.Collection;
};

interface MigrationsOptions {
    /**
     * Log job run details to console
     */
    log: boolean;

    /**
     * Use a custom logger function (defaults to Meteor's logging package)
     */
    logger: Object;

    /**
     * Enable/disable logging "Not migrating, already at version {number}"
     */
    logIfLatest: boolean;

    /**
     * migrations collection name to use in the database
     */
    collectionName: string;
}

interface AddMigrationOptions {
    name?: string;
    version: number;
    up?();
    down?();
}
