/**
 * @file lading-page.component.ts
 *
 * @summary Tha landing page of the ecommerce site.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var landing_page_component_html_1 = require('./landing-page.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component displays the landing page of the site
 */
var LandingPageComponent = (function (_super) {
    __extends(LandingPageComponent, _super);
    /**
     * @summary Initializes a new instance of the LandingPageComponent class.
     */
    function LandingPageComponent() {
        _super.call(this);
    }
    LandingPageComponent = __decorate([
        core_1.Component({
            selector: 'landing-page',
            template: landing_page_component_html_1.default,
            styles: ["\n        .app-content \n        {\n            padding: 20px;\n        }\n        .app-content md-card \n        {\n            margin: 20px;\n        }"
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LandingPageComponent);
    return LandingPageComponent;
}(angular2_meteor_1.MeteorComponent));
exports.LandingPageComponent = LandingPageComponent;
//# sourceMappingURL=landing-page.component.js.map