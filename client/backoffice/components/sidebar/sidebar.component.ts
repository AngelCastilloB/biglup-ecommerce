/**
 * @file sidebar.component.ts
 *
 * @summary The admin panel sidebar.
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

import { Component }       from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './sidebar.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the admin panel dashboard.
 */
@Component({
    selector: 'sidebar',
    template
})
export class SidebarComponent extends MeteorComponent {

    /**
     * @summary Initializes a new instance of the DashboardComponent class.
     */
    constructor() {
        super();
    }
}
