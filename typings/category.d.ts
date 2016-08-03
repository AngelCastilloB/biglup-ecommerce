/**
 * @file category.d
 *
 * @summary The category type definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

interface Category {
    _id?: string;
    name: Array<I18nString>;
    slug?: Array<I18nString>; // TODO slug to slugs
    info: Array<I18nString>;
    isParentCategory?: boolean;
    parentCategory?: string;
    image: string;
    active?: boolean;
    updated?: Date;
    sub_categories?: Array<Object>;
}
