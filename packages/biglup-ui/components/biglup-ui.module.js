/**
 * @file biglup-ui.module.ts
 *
 * @summary This module export all the components on this package.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 25 2016
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
var biglup_button_component_1 = require('./button/biglup-button.component');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This module export all the biglup user interface components.
 */
var BiglupUiModule = (function () {
    function BiglupUiModule() {
    }
    BiglupUiModule = __decorate([
        core_1.NgModule({
            declarations: [
                biglup_button_component_1.BiglupButtonComponent
            ],
            exports: [
                biglup_button_component_1.BiglupButtonComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BiglupUiModule);
    return BiglupUiModule;
}());
exports.BiglupUiModule = BiglupUiModule;
//# sourceMappingURL=biglup-ui.module.js.map