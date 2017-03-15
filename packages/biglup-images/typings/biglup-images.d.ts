/**
 * @file biglup-images.d.ts
 *
 * @summary The images project typings.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* TYPING REFERENCES **************************************************************************************************/

/*/// <reference path="../node_modules/rxjs/Observable.d.ts" /> */

/* MODULES ************************************************************************************************************/

declare module Images {

// COLLECTIONS ********************************************************************************************************/

    const Images: any;
    const ImagesStore: any;

// MODELS *************************************************************************************************************/

    export class Image {
        constructor(public _id: string = null,
            public complete: boolean = false,
            public extension: string = '',
            public name: string = '',
            public progress: number = 0,
            public size: number = 0,
            public token: string = '',
            public type: string = '',
            public uploadedAt: Date = new Date(),
            public uploading: boolean = false,
            public url: string = '')
    }

// UTILS **************************************************************************************************************/

    export class ImageMimeTypeHelper
    {
        public static IMAGETYPE_JPEG;
        public static IMAGETYPE_PNG;
        public static IMAGETYPE_WBMP;
        public static IMAGETYPE_GIF ;
        public static IMAGETYPE_BMP;
        public static IMAGETYPE_TIFF;
        public static IMAGETYPE_XTIFF;
        public static IMAGETYPE_ICO;
        public static IMAGETYPE_XICO;
        public static extensionToMime;
        public static mimeToExtension;
        public static isExtensionValid(extension: string): boolean;
        public static isMimeTypeValid(mime: string): boolean;
    }

// SERVICES ***********************************************************************************************************/

    export class GoogleStorageService {
        public static getInstance(): GoogleStorageService;
        constructor();
        public getSignedUrl(fileName: string, fileType: string, size: number): string;
        public confirmUpload(id: string, result: boolean): any;
        public deleteImage(id: string);
        public uploadImage(stream: any, fileName: string, fileType: string, size: number): any;
        public isActive(): boolean;
    }
}

// MODULE EXPORT ******************************************************************************************************/

declare module 'meteor/biglup:images'
{
    export = Images;
}
