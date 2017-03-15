/**
 * @file AppearanceStyle.ts
 *
 * @summary The appearance style model.
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

// IMPORTS ************************************************************************************************************/

import { AppearanceHeaderStyle }  from './appearance-header-style';
import { AppearanceFooterStyle }  from './appearance-footer-style';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The appearance style model.
 */
export class AppearanceStyle
{
    /**
     * @summary Initializes a new instance of the AppearanceStyle class.
     *
     * @param header The header style.
     * @param footer The footer style.
     */
    constructor(
        public header: AppearanceHeaderStyle = new AppearanceHeaderStyle(),
        public footer: AppearanceFooterStyle = new AppearanceFooterStyle())
    {
    }
}