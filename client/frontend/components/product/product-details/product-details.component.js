/**
 * @file product-details.component.ts
 *
 * @summary Shows to the user the info associated with a particular product.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 28 2016
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
var router_1 = require('@angular/router');
var angular2_meteor_1 = require('angular2-meteor');
var products_service_1 = require('../../../../services/products.service');
var categories_service_1 = require('../../../../services/categories.service');
var i18n_singleton_service_1 = require('../../../../services/i18n/i18n-singleton.service');
// noinspection TypeScriptCheckImport
var product_details_component_html_1 = require('./product-details.component.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary This component shows specific details about a product.
 */
var ProductDetailsComponent = (function (_super) {
    __extends(ProductDetailsComponent, _super);
    /**
     * @summary Initializes a new instance of the CategoryComponent class.
     *
     * @param _route             The active route.
     * @param _productsService   The product service.
     * @param _categoriesService The category service.
     */
    function ProductDetailsComponent(_route, _productsService, _categoriesService) {
        _super.call(this);
        this._route = _route;
        this._productsService = _productsService;
        this._categoriesService = _categoriesService;
        this._i18nService = i18n_singleton_service_1.I18nSingletonService.getInstance();
    }
    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var categoryId = params['categoryId'];
            var productId = params['productId'];
            _this._productsService.getProduct(productId).subscribe(function (product) {
                _this._product = product;
            });
            _this._categoriesService.getCategory(categoryId)
                .subscribe(function (category) { _this._category = category; });
        });
    };
    /**
     * @summary This method is called right after the data-bound properties have been checked and before view and
     * content children are checked if at least one of them has changed.
     *
     * The changes parameter contains an entry for each of the changed data-bound property.
     * The key is the property name and the value is an instance of SimpleChange.
     * @param changes
     */
    ProductDetailsComponent.prototype.ngOnChanges = function (changes) {
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'product-details',
            template: product_details_component_html_1.default
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, products_service_1.ProductsService, categories_service_1.CategoriesService])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}(angular2_meteor_1.MeteorComponent));
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map