/**
 * @file biglup-i18n.d.ts
 *
 * @summary The internazionalization project typings.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* MODULES ************************************************************************************************************/

declare module I18n
{
// MODULES ************************************************************************************************************/

    export class BiglupI18nModule {}

// SERVICES ***********************************************************************************************************/

    class I18nSingletonService
    {
        public static getInstance(): I18nSingletonService;
        public addTranslation(json, locale: string);
        public getSupportedLanguages();
        public getText(key: string): string;
        public getMongoText(i18nStrings: I18nString[]): string;
        public getDefaultLocale(): string;
        public setLocale(locale: string): void;
        public getLocale(): string;
        public getLocaleChangeEmitter();
        public loadTranslations(json): {[key: string]: string};
    }

// MODELS *************************************************************************************************************/

    export class I18nString
    {
        constructor(
            public language: string = '',
            public value:    string = '')
    }

// PIPES **************************************************************************************************************/

    export class TranslatePipe
    {
        public transform(message: string): any;
    }

    export class MongoTranslatePipe
    {
        public transform(i18nStrings: [I18nString]): any
    }

// FUNCTIONS **********************************************************************************************************/

    export function _T(key: string): string;
}

// MODULE EXPORT ******************************************************************************************************/

declare module 'meteor/biglup:i18n'
{
    export = I18n;
}
