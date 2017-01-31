/**
 * @file string.format.ts.
 *
 * @summary Sets of utility functions to format strings.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   Jan 31 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPLEMENTATION *****************************************************************************************************/

/**
 * Formats a given string by interpolating the given parameters.
 *
 * @param format    The string to be interpolated.
 * @param arguments The arguments.
 *
 * @return {String} The resulting interpolated string.
 */
export const StringFormat = (format, arguments) => {
    var regex   = /%s/;
    var reducer = (p , c) => p.replace(regex,c);

    return arguments.reduce(reducer, format);
};