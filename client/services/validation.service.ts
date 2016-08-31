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

import { AbstractControl } from '@angular/forms';
import { ControlGroup }    from '@angular/common';
import { Injectable }      from '@angular/core';

// CONSTANTS **********************************************************************************************************/

/**
 * @summary Regex that match a valid email.
 */
// tslint:disable:max-line-length
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// EXPORTS ************************************************************************************************************/

@Injectable()
/**
 * @summary This service performs validations on data fields.
 */
export class ValidationService
{
    /**
     * @summary Checks the value and returns true if is invalid.
     *
     * @param {AbstractControl} control The control to be validated.
     *
     * @returns {{email: boolean}} True if the string is an email with the appropriate format, otherwise, false.
     */
    public static email(control: AbstractControl): {[key: string]: boolean}
    {
        return control.value.match(EMAIL_REGEX) ? null : {email: true};
    }

    /**
     * @summary checks if the values from two different control groups are equal.
     * @see http://stackoverflow.com/a/35642259
     *
     * @param {string} firstControlKey the first group name or key IE: name, password
     * @param {string} secondControlKey the second group name or key IE: another_name, password_confirmation
     *
     * @returns {(group:ControlGroup)=>void} The control group values validator.
     */
    public static matchControlGroupsValues(firstControlKey: string, secondControlKey: string)
    {
        return (group: ControlGroup) =>
        {
            if (!group.controls[firstControlKey])
                throw new Error(`Control group does not posses '${firstControlKey}' as a key.`);

            if (!group.controls[secondControlKey])
                throw new Error(`Control group does not posses '${secondControlKey}' as a key.`);

            if (group.controls[firstControlKey].value !== group.controls[secondControlKey].value)
                return group.controls[secondControlKey].setErrors({'notEqual': true});
        };
    }
}
