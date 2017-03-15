/**
 * @file Image
 *
 * @summary The image model.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 05 2016
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
 * @summary The image model.
 */
export class Image
{
    /**
     * @summary Initializes a new instance of the Image class.
     *
     * @param _id        The id of the image in the database.
     * @param complete   Flag to specify if the upload of the image is completed.
     * @param extension  The file extension of the image.
     * @param name       The name of the image.
     * @param progress   The upload progress of the image.
     * @param size       The size of the image (in bytes).
     * @param token      The token.
     * @param type       The image type.
     * @param uploadedAt The uploaded time timestamp.
     * @param uploading  Flag that indicates if the images is currently being uploaded.
     * @param url        The image URL on the server.
     * @param isMagic    Gets whether the image URL is magic.
     */
    constructor(
        public _id:        string  = null,
        public complete:   boolean = false,
        public extension:  string  = '',
        public name:       string  = '',
        public progress:   number  = 0,
        public size:       number  = 0,
        public token:      string  = '',
        public type:       string  = '',
        public uploadedAt: Date    = new Date(),
        public uploading:  boolean = false,
        public url:        string  = '',
        public isMagic:    boolean = false)
    {
    }
}
