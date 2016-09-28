/**
 * @file products.component.ts
 *
 * @summary The products admin panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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

import { Component }       from '@angular/core';
import { Router }          from '@angular/router';
import { ProductsService } from 'meteor/biglup:biglup-business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './products.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the products of the site.
 */
@Component({
    selector: 'products',
    template,
})
export class ProductsComponent
{
    /**
     * @summary Initializes a new instance of the ProductsComponent class.
     */
    constructor(private _router: Router, private _productsService: ProductsService)
    {
    }
}
