/**
 * @file header.component.ts
 *
 * @summary The footer of the application.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
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

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppearanceFooterStyle }               from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './footer.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the application footer.
 */
@Component({
    selector: 'footer',
    template
})
export class FooterComponent implements OnInit, OnDestroy
{
    @Input('footerStyle')
    private _style: AppearanceFooterStyle;

    /**
     * @summary Initializes a new instance of the Header class.
     */
    constructor()
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
    }
}
