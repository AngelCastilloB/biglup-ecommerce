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

interface SubCategory {
    _id?: string;
    slug?: string;
    name: Array<I18nString>;
    info: Array<I18nString>;
    image?: string;
    active?: boolean;
    createdAt?: Date;
    updated?: Date;
}

interface Category {
    _id?: string;
    slug?: string;
    name: Array<I18nString>;
    info: Array<I18nString>;
    image?: string;
    active?: boolean;
    createdAt?: Date;
    updated?: Date;
    subCategories?: Array<SubCategory>;
}
