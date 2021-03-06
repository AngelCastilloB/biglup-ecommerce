/**
 * @file i-migratable.ts.
 *
 * @summary Migration contract.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 01 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// EXPORTS ************************************************************************************************************/

/**
 * @summary Migratable interface definition.
 */
export interface IMigratable
{
    /**
     * @summary Migrates the data to the database.
     */
    up();

    /**
     * @summary Undoes the migration.
     */
    down();
}
