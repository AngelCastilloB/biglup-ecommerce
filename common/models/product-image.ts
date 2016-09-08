/**
 * @file product-image.ts.
 *
 * @summary The product image model.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 08 2016
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
 * @summary The product image model.
 */
export class ProductImage
{
    /**
     * @summary Initialises a new instance of the ProductImage class.
     *
     * @param id          The id of the image in the database.
     * @param url         The url of the image.
     * @param isUploaded  Tells whether this image already exists on the server.
     * @param file        The image file.
     */
    constructor(public id:         string  = '',
                public url:        string  = '',
                public isUploaded: boolean = false,
                public file:       File    = null)
    {
    }
}
