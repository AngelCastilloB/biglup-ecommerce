/**
 * @file slugifier.ts.
 *
 * @summary TODO add summary.
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
    private _service;

    constructor(slugify: Function) {
        this._service = slugify;
    }

    public slugify(str: string) {
        return this._service(str);
    };
}

export interface Slugger {
    slugify(str: string);
}
