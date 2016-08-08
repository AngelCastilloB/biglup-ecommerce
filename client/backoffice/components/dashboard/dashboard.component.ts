/**
 * @file dashboard.component.ts
 *
 * @summary The admin panel dashboard.
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

import { AfterViewInit }     from '@angular/core';
import { Component }         from '@angular/core';
import { MeteorComponent }   from 'angular2-meteor';
import { ROUTER_DIRECTIVES } from '@angular/router';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './dashboard.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the admin panel dashboard.
 */
@Component({
    selector: 'dashboard',
    template,
    directives: [ROUTER_DIRECTIVES]
})
export class DashboardComponent extends MeteorComponent implements AfterViewInit {

    /**
     * @summary Initializes a new instance of the DashboardComponent class.
     */
    constructor() {
        super();
    }

    /**
     * @summary This function is called when your component's view _has been fully initialized.
     */
    public ngAfterViewInit() {
    }
}
