/**
 * @file sanitize-html.pipe.ts.ts.
 *
 * @summary Bypass the sanitize html validation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 19 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Pipe, PipeTransform }    from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Sanitizes the given html content
 */
@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform
{
    /**
     * @summary Initializes a new instance of the SanitizeHtmlPipe class.
     * @param _sanitizer The dom sanitizer service.
     */
    constructor(private _sanitizer:DomSanitizer)
    {
    }

    /**
     * @summary Sanitizes the gicen HTML content.
     *
     * @param html The Html content.
     *
     * @return {SafeHtml} The safe HTML
     */
    transform(html:string):SafeHtml
    {
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
}