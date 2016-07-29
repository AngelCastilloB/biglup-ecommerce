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
     * @param value The array where to select the value from.
     *
     * @returns {any} The randomly selected value.
     *
     * @Remarks If The array is empty or is not of "object" type, the array itself is returned.
     */
    public transform(value: Array<any>): any {

        if (value.length < 1)
            return value;

        return typeof value === 'object' ?  //TODO: Is this validation really necessary?, 'value' will always be of type 'Array<any>' since the method signature is strongly typed.
                        value[Math.floor(Math.random() * value.length)] :
                        value;
    }
}
