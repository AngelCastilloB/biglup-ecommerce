/**
 * @file category.ts
 *
 * @summary The product category model.
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

import { I18nString }  from 'meteor/biglup:i18n';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The product category model.
 */
export class Category
{
    /**
     * @summary Initialises a new instance of the SubCategory class.
     *
     * @param _id            The id of the category on the database.
     * @param slug           The slug url for this category.
     * @param name           The name of the category.
     * @param info           The info of the category.
     * @param image          The associated image category.
     * @param active         The is active flag (true if the category is to be displayed at the store, otherwise, false).
     * @param createdAt      The category date of creation.
     * @param updatedAt      The last time this category was updated.
     * @param isRootCategory The is root category flag.
     * @param parentCategory The parent Category.
     * @param denormalizedSubcategories Denormalization field for subcategory..
     * @param denormalizedParent        Denormalization field for parent category.
     */
    constructor(
        public _id:            string             = null,
        public slug:           string             = '',
        public name:           Array<I18nString>  = Array<I18nString>(),
        public info:           Array<I18nString>  = Array<I18nString>(),
        public image:          string             = '',
        public active:         boolean            = false,
        public createdAt:      Date               = new Date(),
        public updatedAt:      Date               = new Date(),
        public isRootCategory: boolean            = false,
        public parentCategory: string             = '',
        public denormalizedSubcategories: Array<Category> = Array<Category>(),
        public denormalizedParent : Category = null)
    {
    }
}
