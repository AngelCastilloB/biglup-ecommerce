/**
 * @file i18n-string.schema.ts
 *
 * @summary Internationalization string schema.
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

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The internationalization string schema.
 */
export let I18nStringSchema: any = new SimpleSchema(
{
    language:
    {
        type: String,
        label: 'The ISO 639-1 code of the language',
    },
    value:
    {
        label: 'Price',
        type: String,
        defaultValue: ''
    }
});
