/**
 * @file translate.pipe.ts
 *
 * @summary String translation Pipe.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 24 2016
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

import { Pipe, PipeTransform }      from  '@angular/core';
import { I18nSingletonService, _T } from '../services/i18n/i18n-singleton.service';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Translation pipe. This pipe tries to translate the given text to the current locale.
 *
 * @remark This is an impure pipe. Use with caution.
 */
@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform
{
    private _locale: string = '';
    private _value:  string = '';

    /**
     * @summary Translate the given text.
     *
     * @param message The text to be translated.
     *
     * @returns {string} The translation result. If no translation was found for the current locale, the original message
     * is returned.
     */
    public transform(message: string): any
    {
        let currentLocale: string = I18nSingletonService.getInstance().getLocale();

        if (currentLocale !== this._locale)
        {
            this._locale = currentLocale;
            this._value  = _T(message);
        }

        return !this._value ? message : this._value;
    }
}
