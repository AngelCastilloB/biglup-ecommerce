/**
 * @file validation.service.ts.
 *
 * @summary Contains all the App custom validations.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 16 2016
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

import { Injectable }      from '@angular/core';
import { AbstractControl } from '@angular/forms';

// EXPORTS ************************************************************************************************************/

@Injectable()
export class ValidationService {

    /**
     * @summary Checks the value and returns true if is invalid.
     *
     * @param {AbstractControl} control
     * @returns {{email: boolean}}
     */
    public static email(control: AbstractControl): {[key: string]: boolean} {
        /* tslint:disable:max-line-length */
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return control.value.match(regex) ? null : {email: true};
    }
}
