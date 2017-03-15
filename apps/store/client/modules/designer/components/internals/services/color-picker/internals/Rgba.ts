/**
 * @file Rgba.ts
 *
 * @summary The rgba structure.
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
 * @summary RGBA structure. An RGBA color value is specified with: rgba(red, green, blue, alpha), where the
 * alpha parameter defines the opacity.
 *
 * The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
 */
export class Rgba
{
    /**
     * @summary Initializes a new instance of the Hsva structure.
     *
     * @param r The red channel.
     * @param g The green channel.
     * @param b The blue channel.
     * @param a The alpha channel.
     */
    constructor(public r: number, public g: number, public b: number, public a: number)
    {
    }
}

