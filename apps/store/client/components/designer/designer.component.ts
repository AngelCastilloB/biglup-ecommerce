/**
 * @file designer.component.ts
 *
 * @summary The designer component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 21 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Appearance }                          from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './designer.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows yo to modify.
 */
@Component({
    selector: 'designer',
    template
})
export class DesignerComponent implements OnInit, OnDestroy
{
    @Input('appearance')
    private _appearance: Appearance;

    /**
     * @summary Initializes a new instance of the DesignerComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
    }
}
