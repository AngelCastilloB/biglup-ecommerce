/**
 * @file AppearanceFooterStyle.ts
 *
 * @summary The appearance footer style model.
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
 * @summary The footer style model.
 */
export class AppearanceFooterStyle
{
    /**
     * @summary Initializes a new instance of the AppearanceFooterStyle class.
     *
     * @param backgroundColor The background color.
     * @param fontColor       The font color.
     */
    constructor(
        public backgroundColor: string = '#000000',
        public fontColor:       string = '#FFFFFF')
    {
    }
}
 
