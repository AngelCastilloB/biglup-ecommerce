/**
 * @file image.d.ts
 *
 * @summary The image types definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/**
 * @summary Image type definition.
 */
interface Image {
    _id?: string;
    complete: boolean;
    extension: string;
    name: string;
    progress: number;
    size: number;
    token: string;
    type: string;
    uploadedAt: Date;
    uploading: boolean;
    url: string;
    productId?: string;
    categoryId?: string;
    index: number;
}

/**
 * @brief Thumbnail type definition.
 */
interface Thumbnail extends Image {
    originalStore?: string;
    originalId?: string;
}
