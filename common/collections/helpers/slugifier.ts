/**
 * @file slugifier.ts.
 *
 * @summary Creates slugs from provided strings.
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

export class Slugifier implements Slugger {

    /**
     * @summary The Slugifier constructor.
     *
     * @param {Function} _service This function should return a slug with the provided string.
     */
    constructor(private _service: Function) {
    }

    /**
     * @summary Creates a slug from provided string.
     *
     * @param {string} str
     * @returns {*}
     */
    public slugify(str: string) {
        return this._service(str);
    }

    /**
     * @summary Returns an array of string according to the I18nString interface.
     *
     * @param {I18nString[]} field
     * @returns {I18nString[]}
     */
    public slugifyI18nString(field: I18nString[]): I18nString[] {
        let slugs: I18nString[] = [];

        field.forEach((obj: I18nString) => {
            slugs.push({
                language: obj.language,
                value: this.slugify(obj.value)
            });
        });

        if (slugs.length === 0) {
            throw new Error('Invalid field, cannot generate slugs.');
        }

        return slugs;
    }
}

export interface Slugger {
    slugify(str: string): string;
    slugifyI18nString(field: I18nString[]): I18nString[];
}
