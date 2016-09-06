/**
 * @file I18nSingletonService
 *
 * @summary A singleton service that takes care of the application's internationalization.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 23 2016
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

import 'reflect-metadata';

import { EventEmitter } from '@angular/core';
import { I18nString }   from '../../../common/models';

// CONSTANTS **********************************************************************************************************/

const DEFAULT_LOCALE = 'en';

// GLOBALS ************************************************************************************************************/

let g_showWarning = true;

// MACROS *************************************************************************************************************/

/**
 * @brief Gets the localized text for the given key.
 *
 * @param {string} key The key.
 *
 * @remark If the given key is not found, the returned value will be the key.
 *
 * This function should be used over getText. Since the _T() is used to locate translatable string in the code.
 */
export function _T(key: string): string
{
    let result = '';

    g_showWarning = false;

    result = I18nSingletonService.getInstance().getText(key);

    g_showWarning = true;

    return result;
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary Serves localised text.
 */
export class I18nSingletonService
{
    private static _instance:      I18nSingletonService = new I18nSingletonService();
    public         _localeChanged: EventEmitter<string> = new EventEmitter<string>();
    private        _currentLocale: string               = DEFAULT_LOCALE;

    private _translations: {[key: string]: {[key: string]: string}} = {};

    /**
     * @summary Gets the singleton instance of the I18nSingletonService class.
     *
     * @returns {I18nSingletonService} The singleton instance.
     */
    public static getInstance(): I18nSingletonService
    {
        return I18nSingletonService._instance;
    }

    /**
     * @summary Lazy initialise a new instance of the I18nSingletonService singleton class.
     */
    constructor()
    {
        if (I18nSingletonService._instance)
            throw new Error('Error: Instantiation failed: Use I18nSingletonService.getInstance() instead of new.');

        // Add supported languages
        this._translations['en'] = this.loadTranslations(require('./translations/en.json')); // english
        this._translations['zh'] = this.loadTranslations(require('./translations/zh.json')); // chinese

        I18nSingletonService._instance = this;
    }

    /**
     * @summary Gets the localized text for the given key.
     *
     * @param {string} key The key.
     *
     * @remark If the given key is not found, the returned value will be the key.
     *
     * Dont call this function directly. Instead use the _T() since it is used to locate translatable strings in the code.
     */
    public getText(key: string): string
    {
        if (g_showWarning)
            console.warn('Please do not call I18nSingletonService\'s getText() method directly. Use the _T() function instead');

        if (!(key in this._translations[this._currentLocale]))
        {
            console.warn(`Translation for '${key}' not found in <${this._currentLocale}> locale.`);

            return key;
        }

        return this._translations[this._currentLocale][key];
    }

    /**
     * @summary Gets the correct translation out of a I18nString collection.
     *
     * @param i18nStrings The message collection with all the translations.
     *
     * @returns {string} The translation.
     */
    public getMongoText(i18nStrings: I18nString[]): string
    {
        if (!i18nStrings)
            return '';

        let currentLocaleString: string = this._getLocaleString(i18nStrings, this._currentLocale);

        if (currentLocaleString)
            return currentLocaleString;

        let defaultLocaleString: string = this._getLocaleString(i18nStrings, DEFAULT_LOCALE);

        if (defaultLocaleString)
            return defaultLocaleString;

        return '';
    }

    /**
     * @summary Gets the default locale.
     *
     * @returns {string} The default locale.
     */
    public getDefaultLocale(): string
    {
        return DEFAULT_LOCALE;
    }

    /**
     * @summary Sets the ISO 639-1 locale.
     *
     * @param {string} locale The current locale.
     */
    public setLocale(locale: string): void
    {
        if (locale === this._currentLocale)
            return;

        if (!(locale in this._translations))
            console.error(`Locale ${locale} not supported.`);

        this._currentLocale = locale;
        this._localeChanged.emit(locale);
    }

    /**
     * @summary Gets the ISO 639-1 locale.
     *
     * @returns {string} The current locale.
     */
    public getLocale(): string
    {
        return this._currentLocale;
    }

    /**
     * @summary Gets the locale change emitter.
     *
     * @returns {EventEmitter<string>} The emitter.
     */
    public getLocaleChangeEmitter()
    {
        return this._localeChanged;
    }

    /**
     * @summary Load the translations from the json file to the associative array.
     *
     * @param json The json file with the translations.
     *
     * @returns The associative array with all the translations.
     */
    public loadTranslations(json): {[key: string]: string}
    {
        return json.reduce((previous, pair) =>
        {
            previous[pair.key] = pair.value;

            return previous;
        }, {});
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
    private _getLocaleString(i18nStrings: I18nString[], locale: string)
    {
        let value: string;

        let found: I18nString = i18nStrings.find((i18nString: I18nString) => i18nString.language === locale);

        if (found)
            value = found.value;

        return value;
    }
}
