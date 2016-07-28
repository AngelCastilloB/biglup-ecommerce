/**
 * @file array-random.pipe.ts.ts.
 *
 * @summary Returns a random index of an array.
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'arrayRandom'})
export class ArrayRandomPipe implements PipeTransform {
    public transform(value: Array<any>): any {
        if (typeof value === 'object') {
            return value[Math.floor(Math.random() * value.length)];
        }

        return value;
    }
}
