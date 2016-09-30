/**
 * @file truncate-string.pipe.ts.
 *
 * @summary Pipe that limits a string to the requested limit (defaults to 100) appending  '...' at the end.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 28 2016
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

import { Pipe, PipeTransform } from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This pipe that truncates a string to the requested limit (defaults to 100) appending  '...' at the end.
 */
@Pipe({name: 'truncateString'})
export class TruncateStringPipe implements PipeTransform
{

    /**
     * @summary Truncates a string to the requested size (defaults to 100) appending  '...' at the end.
     *
     * @param {string} value The string to be truncated.
     * @param {number} limit The requested size (defaults to 100)
     * @param {string} end   The string to be appended at the end (defaults to '...')
     *
     * @returns {*} If the string length is greater than the given limit, the string is truncated to the given limit
     * and '...' dots are appended at the end; otherwise; the given value is returned.
     */
    public transform(value: String, limit = 100, end = '...'): any
    {
        return value.length > limit ? value.substring(0, limit) + end : value;
    }
}
