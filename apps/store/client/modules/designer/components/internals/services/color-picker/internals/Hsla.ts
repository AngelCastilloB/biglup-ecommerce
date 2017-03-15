/**
 * @file Hsla.ts
 *
 * @summary HSAL structure definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 20 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* EXPORTS ************************************************************************************************************/

/**
 * @summary HSLA structure. An HSLA color value is specified with: hsla(hue, saturation, lightness, alpha), where the
 * alpha parameter defines the opacity.
 *
 * The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
 */
export class Hsla
{
    /**
     * @summary Initializes a new instance of the Hsla structure.
     *
     * @param h The hue.
     * @param s The saturation.
     * @param l The lightness.
     * @param a The alpha.
     */
    constructor(public h: number, public s: number, public l: number, public a: number)
    {
    }
}
