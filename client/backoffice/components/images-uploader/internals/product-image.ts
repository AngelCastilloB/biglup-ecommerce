/**
 * @file product-image.ts
 *
 * @summary The product image model definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// EXPORTS ************************************************************************************************************/

/**
 * @summary Image model for the image uploader.
 */
export class UploaderImage {

    /**
     * @summary Initializes a new instance of the class UploaderImage.
     *
     * @param file        The image file.
     * @param isUploaded  True if this image is already uploaded, otherwise, false.
     * @param databaseId  If this image is already uploaded this contains the database id.
     * @param remoteUrl   If this image is already uploaded this contains the remote url.
     */
    constructor(
        public file:       File    = <File>{},
        public isUploaded: boolean =  false,
        public databaseId: string  = '',
        public remoteUrl:  string  = '') {
    }
}
