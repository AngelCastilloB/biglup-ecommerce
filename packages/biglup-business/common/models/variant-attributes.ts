/**
 * @file color-variant-attribute.ts
 *
 * @summary The product color variant attribute model.
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

// IMPORTS ************************************************************************************************************/

import { I18nString } from 'meteor/biglup:i18n';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product color variant attribute.
 */
export class ColorVariantAttribute
{
    /**
     * @summary Initialises a new instance of the ColorVariantAttribute class.
     *
     * @param _id  The id on the database.
     * @param name The color name.
     * @param value The color value.
     */
    constructor(public _id: string = null, public name: Array<I18nString> = Array<I18nString>(), public value: string = '#FFFFFF')
    {
    }
}

/**
 * @summary The size variant attribute.
 */
export class SizeVariantAttribute
{
    /**
     * @summary Initialises a new instance of the SizeVariantAttribute class.
     *
     * @param _id  The id on the database.
     * @param size The size.
     */
    constructor(public _id: string = null, public size: Array<I18nString> = Array<I18nString>())
    {
    }
}

/**
 * @summary The material variant attribute.
 */
export class MaterialVariantAttribute
{
    /**
     * @summary Initialises a new instance of the MaterialVariantAttribute class.
     *
     * @param _id  The id on the database.
     * @param material The material.
     */
    constructor(public _id: string = null, public material: Array<I18nString> = Array<I18nString>())
    {
    }
}
