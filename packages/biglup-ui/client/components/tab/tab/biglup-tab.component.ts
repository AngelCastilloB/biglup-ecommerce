/**
 * @file biglup-tab.component.ts
 *
 * @summary Tab component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 13 2016
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
import template from './biglup-tab.component.html';

// EXPORTS ************************************************************************************************************/

@Component({
    selector: 'biglup-tab',
    template
})
export class BiglupTabComponent {
    @Input('active')
    public active: boolean = false;
    @Input('title')
    public title: string = '';
}
