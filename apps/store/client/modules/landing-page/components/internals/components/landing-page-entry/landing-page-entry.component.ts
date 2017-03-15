/**
 * @file lading-page-entry.component.ts
 *
 * @summary Tha landing page entry of the ecommerce site.
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

import { Component, Input } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './landing-page-entry.component.html';

// ENUMS **************************************************************************************************************/

/**
 * @summary The landing page entry type.
 */
export enum EntryType
{
    WideSlider       = 0,
    SliderGrid       = 1,
    ProductGrid      = 2,
    Colage           = 3,
    ImageWithPverlay = 4,
    HelloWorld       = 5
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a landing page entry on the site
 */
@Component({
    selector: 'landing-page-entry',
    template
})
export class LandingPageEntryComponent
{
    @Input('type')
    private _type: any;

    @Input('params')
    private _params: any;

    // Enum hack.
    private EntryType = EntryType;

    /**
     * @summary Initializes a new instance of the LandingPageEntryComponent class.
     */
    constructor()
    {
    }
}
