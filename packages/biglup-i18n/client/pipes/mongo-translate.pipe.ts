/**
 * @file mong-translate.pipe.ts.
 *
 * @summary Pipe that gets the right translation out of a i18n string collection from a mongo db field.
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

import { Pipe, PipeTransform }  from  '@angular/core';
import { I18nSingletonService } from '../services/i18n-singleton.service';
import { I18nString }           from '../../common/models/i18n-string';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Translation pipe. This gets the correct string out of a i18n string collection from a mongo db field.
 */
@Pipe({
    name: 'mongoTranslate',
    pure: false
})
export class MongoTranslatePipe implements PipeTransform
{
    private _locale: string = '';
    private _value:  string = '';

    /**
     * @summary Selects the correct translation given a I18nString collection.
     *
     * @param i18nStrings The collection with all the available translations.
     *
     * @returns {string} The translation result. If no translation was found for the current locale, the translation
     * for the default language is returned instead.
     */
    public transform(i18nStrings: [I18nString]): any
    {
        let defaultLocale: string = I18nSingletonService.getInstance().getDefaultLocale();
        let currentLocale: string = I18nSingletonService.getInstance().getLocale();

        if (currentLocale === this._locale)
            return this._value;

        let currentLocaleString: string = this._getLocaleString(i18nStrings, currentLocale);

        if (currentLocaleString)
        {
            this._value = currentLocaleString;

            return currentLocaleString;
        }

        let defaultLocaleString: string = this._getLocaleString(i18nStrings, defaultLocale);

        if (defaultLocaleString)
        {
            this._value = defaultLocaleString;

            return defaultLocaleString;
        }

        return '';
    }

    /**
     * @summary Retrieves the right translation from the I18nString collection, if the translation can not be found
     * return undefined.
     *
     * @param i18nStrings The collection of translation strings.
     * @param locale      The desired locale.
     *
     * @returns {string} The translation (undefined if no translation is found).
     * @private
     */
    private _getLocaleString(i18nStrings: [I18nString], locale: string)
    {
        let value: string;

        let found: I18nString = i18nStrings.find(i18nString => i18nString.language === locale);

        if (found)
            value = found.value;

        return value;
    }
}
