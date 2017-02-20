/**
 * @file nav-menu.component.ts
 *
 * @summary The navigation menu section of the header.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 14 2017
 *
 * @copyright Copyright 2014 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component, OnInit, OnDestroy, Input }      from '@angular/core';
import { CategoriesService, AppearanceHeaderStyle } from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './nav-menu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the navigation menu section of the header.
 */
@Component({
    selector: 'header-nav-menu',
    template
})
export class HeaderNavMenuComponent implements OnInit, OnDestroy
{
    @Input('headerStyle')
    private _style: AppearanceHeaderStyle;

    /**
     * @summary Initializes a new instance of the HeaderNavMenuComponent class.
     */
    constructor(private _categoriesService: CategoriesService)
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
