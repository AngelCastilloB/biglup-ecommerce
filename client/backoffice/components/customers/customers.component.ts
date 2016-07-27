/**
 * @file customers.component.ts
 *
 * @summary The customers admin panel.
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
//noinspection TypeScriptCheckImport
import template from './customers.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the customers of the site.
 */
@Component({
    selector: 'customers',
    template,
    directives: [ROUTER_DIRECTIVES]
})
export class CustomersComponent extends MeteorComponent {

    /**
     * @summary Initializes a new instance of the CustomersComponent class.
     */
    constructor() {
        super();
    }
}