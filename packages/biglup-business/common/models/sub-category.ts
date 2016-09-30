/**
 * @file sub-category.ts.
 *
 * @summary The subcategory model.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 08 2016
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
 * @summary The subcategory model. Allows a nested categories.
 */
export class SubCategory
{
    /**
     * @summary Initialises a new instance of the SubCategory class.
     *
     * @param _id       The id of the category on the database.
     * @param slug      The slug url for this category.
     * @param name      The name of the category.
     * @param info      The info of the category.
     * @param image     The associated image category.
     * @param active    The is active flag (true if the category is to be displayed at the store, otherwise, false).
     * @param createdAt The category date of creation.
     * @param updatedAt The last time this category was updated.
     */
    constructor(public _id:       string            = null,
                public slug:      string            = '',
                public name:      Array<I18nString> = Array<I18nString>(),
                public info:      Array<I18nString> = Array<I18nString>(),
                public image:     string            = null,
                public active:    boolean           = false,
                public createdAt: Date              = new Date(),
                public updatedAt: Date              = new Date())
    {
    }
}
