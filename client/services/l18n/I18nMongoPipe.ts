/**
 * @file I18nMongoPipe.
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

import { Pipe, PipeTransform } from  '@angular/core';
import { I18nSingletonService } from "./I18nSingletonService";

// EXPORTS ************************************************************************************************************/

/**
 * @summary Translation pipe. This gets the correct string out of a i18n string collection from a mongo db field.
 */
@Pipe({
    name: 'mongoTranslate',
    pure: false
})
export class I18nMongoPipe implements PipeTransform {
    private _locale:string = '';
    private _value:string  = '';
    
    /**
     * @summary Translate the given text.
     *
     * @param messageCollection The collection with all the available translations.
     *
     * @returns {string} The translation result. If no translation was found for the current locale, the translation
     * for the default language is returned instead.
     */
    transform(messageCollection: [I18nString]): any {
        var defaultLocale:string = I18nSingletonService.getInstance().getDefaultLocale();
        var currentLocale:string = I18nSingletonService.getInstance().getLocale();

        if (currentLocale === this._locale) {
            return this._value;
        }

        for (var i = 0, l = messageCollection.length; i < l; i++) {
            if (messageCollection[i].language === currentLocale)
            {
                this._value = messageCollection[i].value;

                return this._value;
            }
        }
        for (var i = 0, l = messageCollection.length; i < l; i++) {
            if (messageCollection[i].language === defaultLocale)
            {
                this._value = messageCollection[i].value;

                return this._value;
            }
        }

        return "STRING_NOT_FOUND";
    }
}