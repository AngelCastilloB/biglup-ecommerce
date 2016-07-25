/**
 * @file backoffice.component.ts
 *
 * @summary The backoffice root component.
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

import { ROUTER_DIRECTIVES } from '@angular/router';
import { Component }         from '@angular/core';
import { SidebarComponent }  from './components/sidebar/sidebar.component'

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
//noinspection TypeScriptCheckImport
import template from './backoffice.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The back office root component.
 */
@Component({
    template,
    styleUrls: ['css/style.css'],
    directives: [ROUTER_DIRECTIVES, SidebarComponent]
})
export class BackofficeComponent { }