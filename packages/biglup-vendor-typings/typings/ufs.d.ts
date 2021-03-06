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
        let Uploader;
        let config;
        let StorePermissions;
        let store: {
                Local: {new (...args): Store},
                GridFS: {new (...args): Store},
                WABS: {new (...args): Store},
                S3: {new (...args): Store},
                GoogleCloudStorage: {new (...args): Store}
            },
            Filter: {new (...args): any};
    }

    interface Store {
        create(file: Object): string;
        write(file: any, id: string, callback?: Function): string;
    }
}
