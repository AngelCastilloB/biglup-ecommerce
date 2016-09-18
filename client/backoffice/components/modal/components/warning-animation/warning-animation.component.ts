/**
 * @file warning-animation.component.ts
 *
 * @summary CSS only warning icon animation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 18 2016
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

import { Component } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './warning-animation.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that displays a error icon animation.
 */
@Component({
    selector: 'warning-animation',
    template,
    styleUrls: ['./warning-animation.component.css']
})
export class WarningAnimationComponent extends Component
{
}
