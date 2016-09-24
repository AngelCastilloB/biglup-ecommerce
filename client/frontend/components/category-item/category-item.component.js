/**
 * @file category-item.component.ts
 *
 * @summary The category item component definition.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 29 2016
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
var models_1 = require('../../../../common/models');
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var category_item_component_html_1 = require('./category-item.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component displays a given product in the category.
 */
var CategoryItemComponent = (function (_super) {
    __extends(CategoryItemComponent, _super);
    /**
     * @summary Initializes a new instance of the CategoryItemComponent class.
     */
    function CategoryItemComponent() {
        _super.call(this);
    }
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    CategoryItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.Product)
    ], CategoryItemComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CategoryItemComponent.prototype, "category", void 0);
    CategoryItemComponent = __decorate([
        core_1.Component({
            selector: 'category-item',
            template: category_item_component_html_1.default
        }), 
        __metadata('design:paramtypes', [])
    ], CategoryItemComponent);
    return CategoryItemComponent;
}(angular2_meteor_1.MeteorComponent));
exports.CategoryItemComponent = CategoryItemComponent;
//# sourceMappingURL=category-item.component.js.map