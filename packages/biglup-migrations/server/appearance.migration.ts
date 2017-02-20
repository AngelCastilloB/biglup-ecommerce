/**
 * @file appearance.migration.ts
 *
 * @summary The default appearance values.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 20 2017
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// INTERNALS **********************************************************************************************************/

/**
 * @summary Performs a copy of the appearance model.
 *
 * @return The cloned instance.
 */
const copyAppearance = (appearance: Appearance) =>
{
    let clone: any = JSON.parse(JSON.stringify(appearance));

    // Fix the dates type safety.
    clone.createdAt   = new Date(clone.createdAt.toString());
    clone.updatedAt   = new Date(clone.updatedAt.toString());

    return <Appearance>clone;
};

// IMPORTS ************************************************************************************************************/

import { Appearance, Appearances } from 'meteor/biglup:business';
import { IMigratable }             from './interfaces/i-migratable';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles all the appearance migrations.
 */
export class AppearanceMigration implements IMigratable
{
    /**
     * @summary Initializes a new instance of the class AppearanceMigration.
     */
    constructor()
    {
    }

    /**
     * @summary Adds the default product variant attributes to the database.
     */
    public up(): void
    {
        console.log('Starting Default Appearance.');

        let defaultAppearance = copyAppearance(new Appearance(null, 'default'));

        defaultAppearance.isEditable = false;

        Appearances.insert(defaultAppearance);
    }

    /**
     * @summary Undoes the migration.
     */
    public down(): void
    {
        // TODO: See docs to implement properly.
    }
}
