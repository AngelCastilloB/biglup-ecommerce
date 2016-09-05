/**
 * @file i18n-string.ts
 *
 * @summary The I18n String model.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 05 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// EXPORTS ************************************************************************************************************/

/**
 * @summary Internationalization string model.
 */
export class I18nString
{
    /**
     * @summary Initializes a new instance of the I18nString class.
     *
     * @param language The ISO 639-1 code of the language.
     * @param value    The translation string.
     */
    constructor(
        public language: string = '',
        public value:    string = '') {
    }
}
