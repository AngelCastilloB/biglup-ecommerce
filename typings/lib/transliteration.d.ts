/**
 * @file transliteration.d.ts.
 *
 * @summary Translates different alphabets to roman.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 01 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

declare module 'transliteration' {
    export function transliterate(str: string | TransliterateOptions, options?: TransliterateOptions);

    export function slugify(str: string | TransliterateOptions, options?: TransliterateOptions);
}

interface TransliterateOptions {
    /* Unicode characters that are not in the database will be replaced with `unknown` */
    unknown?: string; // default: [?]

    /**
     * Custom replacement of the strings before transliteration
     * [[source1, target1], [source2, target2], ...], // default: []
     */
    replace?: Array<string[]>; // default: []

    /* Strings in the ignore list will be bypassed from transliteration */
    ignore?: string[]; // default: []
}

interface SlugifyOptions {
    /* Whether to force slags to be lowercased */
    lowercase: boolean; // default: true

    /* Separator of the slug */
    separator: string; // default: '-'

    /**
     * Custom replacement of the strings before transliteration
     * [[source1, target1], [source2, target2], ...], // default: []
     */
    replace?: Array<string[]>; // default: []

    /* Strings in the ignore list will be bypassed from transliteration */
    ignore?: string[]; // default: []

    /* Custom replacement of the strings before transliteration */
    replace?: Array<string[]>; // default: []

    /**
     * Strings in the ignore list will be bypassed from transliteration
     * [str1, str2]
     */
    ignore?: string[]; // default: []
}
