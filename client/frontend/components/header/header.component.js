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
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// IMPORTS ************************************************************************************************************/
require('reflect-metadata');
var core_1 = require('@angular/core');
var angular2_meteor_1 = require('angular2-meteor');
var i18n_singleton_service_1 = require('../../../services/i18n/i18n-singleton.service');
var user_auth_service_1 = require('../../../services/user-auth.service');
var categories_service_1 = require('../../../services/categories.service');
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var header_component_html_1 = require('./header.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This is the application header.
 */
var HeaderComponent = (function (_super) {
    __extends(HeaderComponent, _super);
    /**
     * @summary Initializes a new instance of the Header class.
     *
     * @param {UserAuthService} _userAuthService The authentication service.
     * @param {CategoriesService} _categoriesService The categories collection service.
     */
    function HeaderComponent(_userAuthService, _categoriesService) {
        _super.call(this);
        this._userAuthService = _userAuthService;
        this._categoriesService = _categoriesService;
    }
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isLogged = this._userAuthService.isLogged();
        this._isLoggedSubscription =
            this._userAuthService.isLoggedStream().subscribe(function (status) { return _this._isLogged = status; });
    };
    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    HeaderComponent.prototype.ngOnDestroy = function () {
        this._isLoggedSubscription.unsubscribe();
    };
    /**
     * @summary language change event handler
     * @param language The language to se bet.
     */
    HeaderComponent.prototype._changeLanguage = function (language) {
        i18n_singleton_service_1.I18nSingletonService.getInstance().setLocale(language);
    };
    /**
     * @summary Logs the current user out of the system.
     * @private
     */
    HeaderComponent.prototype._logout = function () {
        this._userAuthService.logout();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            template: header_component_html_1.default,
            styleUrls: ['header.component.css']
        }), 
        __metadata('design:paramtypes', [user_auth_service_1.UserAuthService, categories_service_1.CategoriesService])
    ], HeaderComponent);
    return HeaderComponent;
}(angular2_meteor_1.MeteorComponent));
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map