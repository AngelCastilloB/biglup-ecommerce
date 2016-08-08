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

declare module 'meteor/jalik:ufs' {
    module UploadFS {
        // https://github.com/jalik/jalik-ufs#plugins
        let store: {
                Local: {new (...args): Store},
                GridFS: {new (...args): Store},
                WABS: {new (...args): Store},
                S3: {new (...args): Store},
            },
            Filter: Function;
    }

    import { ReadStream } from 'fs';

    interface Store {
        create(file: Object): string;
        write(file: ReadStream, id: string, callback?: Function): string;
    }
}

interface ProgressEvent {
    type: string;
    target: any;
}
