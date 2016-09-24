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
"use strict";
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
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var frontend_component_html_1 = require('./frontend.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary The front end root component.
 */
var FrontendComponent = (function () {
    function FrontendComponent() {
    }
    FrontendComponent = __decorate([
        core_1.Component({ template: frontend_component_html_1.default }), 
        __metadata('design:paramtypes', [])
    ], FrontendComponent);
    return FrontendComponent;
}());
exports.FrontendComponent = FrontendComponent;
//# sourceMappingURL=frontend.component.js.map