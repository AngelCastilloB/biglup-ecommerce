/**
 * @file local-meteor.d.ts.
 *
 * @summary Updates local meteor to include absoluteFilePath method.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 08 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

declare module Assets {
    function getBinary(assetPath: string, asyncCallback ?: Function): EJSON;

    function getText(assetPath: string, asyncCallback ?: Function): string;

    function absoluteFilePath(assetPath: string): string;
}
