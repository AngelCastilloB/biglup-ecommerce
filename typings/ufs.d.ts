/**
 * @file ufs.d.ts
 *
 * @summary TYpe declaration for the jalik:ufs library.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 21 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// HACK: Temporal typing definitions for package meteor/jalik:ufs while typing become available.
    
declare module 'meteor/jalik:ufs' {
    export let UploadFS:any;
}

interface ProgressEvent {
    type: string;
    target: any;
}