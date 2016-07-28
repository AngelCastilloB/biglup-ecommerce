/**
 * @file add-product.component.ts
 *
 * @summary The add product admin panel functionality.
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

import 'reflect-metadata';

import { Component }         from '@angular/core';
import { MeteorComponent }   from 'angular2-meteor';
import { ROUTER_DIRECTIVES } from '@angular/router';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-product.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add products to the site.
 */
@Component({
    selector: 'add-products',
    template,
    directives: [ROUTER_DIRECTIVES]
})
export class AddProductComponent extends MeteorComponent {

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor() {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        tinymce.init({selector: 'textarea'});
    }
}
