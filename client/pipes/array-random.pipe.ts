/**
 * @file array-random.pipe.ts.ts.
 *
 * @summary Returns a random value from an array.
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
 * @summary This pipe selects a random value from an array.
 */
@Pipe({name: 'arrayRandom'})
export class ArrayRandomPipe implements PipeTransform {

    /**
     * @summary Selects a random value from an array.
     *
     * @param {Array<*>} value The array where to select the value from.
     *
     * @returns {*} The randomly selected value.
     *
     * @Remarks If The value is empty or is not of "object" type, the value itself is returned.
     */
    public transform(value: Array<any>): any {
        // We need to check the type because even though is strongly typed, in the view, we can ask for
        // {{ 0 | randomArray }} and will print undefined (which prints absolutely nothing).
        if (value.length < 1) {
            return value;
        } else if (typeof value !== 'object') {
            throw new Error(`Pipe arrayRandom expects an array, ${typeof value} given.`);
        }

        return value[Math.floor(Math.random() * value.length)];
    }
}
