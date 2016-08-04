/**
 * @file i-sluggable.d.ts.
 *
 * @summary The slug contract for collection / documents
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 04 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

interface ISluggable {
    slug?: Array<I18nString>; // TODO slug to slugs
}
