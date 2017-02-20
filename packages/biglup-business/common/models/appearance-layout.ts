/**
 * @file AppearanceLayout.ts
 *
 * @summary The appearance layout model.
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

// EXPORTS ************************************************************************************************************/

/**
 * @summary Defines the appearance layout model.
 */
export class AppearanceLayout
{
    /**
     * @summary Initializes a new instance of the AppearanceLayout class.
     * @param name          The name of the layout.
     * @param configuration The configuration object of the layout.
     */
    constructor(
        public name:           string = '',
        public configuration:  any    = null)
    {
    }
}
