/**
 * @file variants.component.ts
 *
 * @summary The variants configuration panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 22 2016
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

import { Component }                from '@angular/core';
import { VariantAttributesService } from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './variants.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add variants attributes to the site.
 */
@Component({
    selector: 'variants',
    template
})
export class VariantsComponent
{
    /**
     * @summary Initializes a new instance of the VariantsComponent class.
     *
     * @param { VariantAttributesService } _variantsService The variants service.
     */
    constructor(private _variantsService: VariantAttributesService)
    {
    }
}
