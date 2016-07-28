/**
 * @file str-limit.pipe.ts.
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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'strLimit'})
export class StrLimitPipe implements PipeTransform {
    public transform(value: any, limit = 100, end = '...'): any {
        if (typeof value === 'string') {
            if (value.length > limit) {
                return value.substring(0, limit) + end;
            }
        }

        return value;
    }
}
