/**
 * @file Hsva.ts
 *
 * @summary HSVA structure definition.
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
 * @summary HSVA structure. An HSVA color value is specified with: hsva(hue, saturation, value, alpha), where the
 * alpha parameter defines the opacity.
 *
 * The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
 */
export class Hsva
{
    /**
     * @summary Initializes a new instance of the Hsva structure.
     *
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @param a The alpha.
     */
    constructor(public h: number, public s: number, public v: number, public a: number)
    {
    }
}
