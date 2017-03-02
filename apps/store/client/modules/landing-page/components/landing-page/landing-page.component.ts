/**
 * @file lading-page.component.ts
 *
 * @summary Tha landing page of the ecommerce site.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component } from '@angular/core';
import { EntryType } from '../internals/components/landing-page-entry/landing-page-entry.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './landing-page.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the landing page of the site
 */
@Component({
    selector: 'landing-page',
    template
})
export class LandingPageComponent
{
    private _entries: Array<any> = [
        {
            type: EntryType.WideSlider,
            params: {
                speed: 2000,
                autoplay: 5000,
                loop: true,
                isFillWidth: true
            }
        },
        {
            type: EntryType.HelloWorld,
        }];

    /**
     * @summary Initializes a new instance of the LandingPageComponent class.
     */
    constructor()
    {
    }
}
