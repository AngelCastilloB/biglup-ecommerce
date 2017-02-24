/**
 * @file SliderDimension
 *
 * @summary Slider dimension structure.
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
 * @summary The Slider dimension.
 */
export class SliderDimension
{
    /**
     * @summary The slider position structure.
     *
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @param a The alpha channel.
     */
    constructor(public h: number, public s: number, public v: number, public a: number)
    {
    }
}