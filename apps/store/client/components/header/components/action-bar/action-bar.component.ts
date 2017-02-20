/**
 * @file action-bar.component.ts
 *
 * @summary The action bar of the header.
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

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { I18nSingletonService }                from 'meteor/biglup:i18n';
import { AppearanceHeaderStyle }               from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './action-bar.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the application header.
 */
@Component({
    selector: 'action-bar',
    template
})
export class ActionbarComponent implements OnInit, OnDestroy
{
    @Input('headerStyle')
    private _style: AppearanceHeaderStyle;

    private _i18nSingletonService: I18nSingletonService = I18nSingletonService.getInstance();

    /**
     * @summary Initializes a new instance of the ActionbarComponent class.
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

    /**
     * @summary language change event handler
     * @param language The language to se bet.
     */
    private _changeLanguage(language: string)
    {
        I18nSingletonService.getInstance().setLocale(language);
    }
}
