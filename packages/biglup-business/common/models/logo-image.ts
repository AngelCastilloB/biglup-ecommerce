/**
 * @file logo-image.ts.
 *
 * @summary The logo image model.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 26 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// EXPORTS ************************************************************************************************************/

/**
 * @summary The logo image model.
 */
export class LogoImage
{
    /**
     * @summary Initialises a new instance of the LogoImage class.
     *
     * @param id          The id of the image in the database.
     * @param url         The url of the image.
     * @param isUploaded  Tells whether this image already exists on the server.
     * @param file        The image file.
     */
    constructor(public id:         string  = '',
                public url:        string  = '',
                public isUploaded: boolean = true,
                public file:       File    = null)
    {
    }
}
