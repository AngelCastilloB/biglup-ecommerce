/**
 * @file frontend.component.ts
 *
 * @summary
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

import { Component }         from '@angular/core';
import { CategoriesService } from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './frontend.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The front end root component.
 */
@Component({template})
export class FrontendComponent
{
    private _subLoaded:  boolean  = false;
    private _isDevModeOn: boolean = false;
    private _showDrawer: boolean  = false;

    constructor(private _categoriesService: CategoriesService)
    {
        console.error((Date.now() / 1000 | 0) + " Requesting data");
        this._categoriesService.getCategories().subscribe(
            data =>
            {
                console.error((Date.now() / 1000 | 0) + " Got data");
                this._subLoaded = true;
            });
    }

    /**
     * Toggles the designer menu.
     */
    private _onToggleClick()
    {
        this._showDrawer = !this._showDrawer;
    }
}
