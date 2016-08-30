/**
 * @file header.component.ts
 *
 * @summary The header of the application.
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeteorComponent }              from 'angular2-meteor';
import { Mongo }                        from 'meteor/mongo';
import { Categories }                   from '../../../../common/collections/category.collection.ts';
import { I18nSingletonService }         from '../../../services/i18n/i18n-singleton.service';
import { UserAuthService }              from '../../../services/user-auth.service';
import { Subscription }                 from 'rxjs';

import '../../../../common/api/cart.methods';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './header.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the application header.
 */
@Component({
    selector: 'header',
    template
})
export class HeaderComponent extends MeteorComponent implements OnInit, OnDestroy {

    private _categories: Mongo.Cursor<Category>;

    /**
     * @summary the users login status
     */
    private _isLogged: boolean;
    private _isLoggedSubscription: Subscription;

    /**
     * @summary Initializes a new instance of the Header class.
     *
     * @param {UserAuthService} _userAuthService The authentification service.
     */
    constructor(private _userAuthService: UserAuthService) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {

        this.subscribe('categories', () => {

            this._categories = Categories.find();
        }, true);

        this._isLogged = this._userAuthService.isLogged();

        this._isLoggedSubscription =
            this._userAuthService.isLoggedStream().subscribe(status => this._isLogged = status);
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy() {
        this._isLoggedSubscription.unsubscribe();
    }

    /**
     * @summary language change event handler
     * @param language The language to se bet.
     */
    private languageChanged(language: string) {
        I18nSingletonService.getInstance().setLocale(language);
    }

    /**
     * @summary Logs the current user out of the system.
     * @private
     */
    private _logout() {
        this._userAuthService.logout();
    }
}
