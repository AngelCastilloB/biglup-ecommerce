/**
 * @file AppearanceHeaderStyle.ts
 *
 * @summary The Appearance Header Style model.
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

import { LogoImage } from './logo-image';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Defines the appearance header style model.
 */
export class AppearanceHeaderStyle
{
    /**
     * @summary Initializes a new instance of the AppearanceHeaderStyle class.
     *
     * @param topBarBackgroundColor  The top bar background color.
     * @param topBarFontColor        The top bar font color.
     * @param logoBackgroundColor    The logo area background color.
     * @param logo                   The sites logo.
     * @param logoAlignment          The logo alignment.
     * @param menuBackgroundColor    The menu background color.
     * @param menuFontColor          The menu font color.
     * @param menuHighlight          The menu highlight
     * @param submenuBackgroundColor The sub menu background color.
     * @param submenuFontColor       The sub menu font color.
     * @param submenuBorderColor     The sub menu border color.
     */
    constructor(
        public topBarBackgroundColor:  string    = '#000000',
        public topBarFontColor:        string    = '#FFFFFF',
        public logoBackgroundColor:    string    = '#FFFFFF',
        public logo:                   LogoImage = new LogoImage('', '/images/logo_placeholder.png'),
        public logoAlignment:          string    = 'center',
        public menuBackgroundColor:    string    = '#000000',
        public menuFontColor:          string    = '#FFFFFF',
        public menuHighlight:          string    = '#5a595a',
        public submenuBackgroundColor: string    = '#FFFFFF',
        public submenuFontColor:       string    = '#5a595a',
        public submenuBorderColor:     string    = '#000000')
    {
    }
}

