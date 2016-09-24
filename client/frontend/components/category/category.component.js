/**
 * @file category.component.ts
 *
 * @summary The category component.
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
var router_1 = require('@angular/router');
var products_service_1 = require('../../../services/products.service');
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var category_component_html_1 = require('./category.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component displays a list of all the products inside a category.
 */
var CategoryComponent = (function (_super) {
    __extends(CategoryComponent, _super);
    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     */
    function CategoryComponent(_route, _productsService) {
        _super.call(this);
        this._route = _route;
        this._productsService = _productsService;
    }
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this._categoryId = params['categoryId'];
        });
    };
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'category',
            template: category_component_html_1.default
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, products_service_1.ProductsService])
    ], CategoryComponent);
    return CategoryComponent;
}(angular2_meteor_1.MeteorComponent));
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map