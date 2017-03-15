/**
 * @file image-mime-types.ts
 *
 * @summary Image MIME type helper.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   March 10 2017
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Image MIME type helper.
 */
export class ImageMimeTypeHelper
{
    public static IMAGETYPE_JPEG  = 'image/jpeg';
    public static IMAGETYPE_PNG   = 'image/png';
    public static IMAGETYPE_WBMP  = 'image/vnd.wap.wbmp';
    public static IMAGETYPE_GIF   = 'image/gif';
    public static IMAGETYPE_BMP   = 'image/bmp';
    public static IMAGETYPE_TIFF  = 'image/tiff';
    public static IMAGETYPE_XTIFF = 'image/x-tiff';
    public static IMAGETYPE_ICO   = 'image/vnd.microsoft.icon';
    public static IMAGETYPE_XICO  = 'image/x-icon';

    // Map of extensions to MIME type
    public static extensionToMime = {
        jpeg : 'image/jpeg',
        png : 'image/png',
        wbmp : 'image/vnd.wap.wbmp',
        gif : 'image/gif',
        bmp : 'image/bmp',
        tiff : 'image/tiff',
        ico : 'image/x-icon',
    };

    public static mimeToExtension = {
        'image/jpeg' : 'jpeg',
        'image/png' : 'png',
        'image/vnd.wap.wbmp' : 'wbmp',
        'image/gif' : 'gif',
        'image/bmp' : 'bmp',
        'image/tiff' : 'tiff',
        'image/x-tiff' : 'tiff',
        'image/vnd.microsoft.icon' : 'ico',
        'image/x-icon' : 'ico',
    };

    /**
     * @summary Gets whether the given file extension is a valid image file extension.
     *
     * @return True if the extension is a valid image extension, otherwise, false.
     */
    public static isExtensionValid(extension: string): boolean
    {
        for (var property in ImageMimeTypeHelper.extensionToMime)
        {
            if (ImageMimeTypeHelper.extensionToMime.hasOwnProperty(property))
            {
                if (property.toString() === extension)
                    return true;
            }
        }

        return false;
    }

    /**
     * @summary Gets whether the given mime type is a valid image mime extension.
     *
     * @return True if the extension is a valid image mime type, otherwise, false.
     */
    public static isMimeTypeValid(mime: string): boolean
    {
        for (var property in ImageMimeTypeHelper.mimeToExtension)
        {
            if (ImageMimeTypeHelper.mimeToExtension.hasOwnProperty(property))
            {
                if (property.toString() === mime)
                    return true;
            }
        }

        return false;
    }
}