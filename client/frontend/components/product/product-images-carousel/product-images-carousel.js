/**
 * @file product-images-carousel.ts.
 *
 * @summary Basic MDB images carousel component.
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
var id_generator_service_1 = require('../../../../services/id-generator.service');
// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
var product_images_carousel_html_1 = require('./product-images-carousel.html');
// EXPORTS ************************************************************************************************************/
/**
 * @summary Creates a carousel with the images provided, expects a Mongo Cursor.
 */
var ProductImagesCarouselComponent = (function () {
    /**
     * @summary Initializes a new instance of the ProductImagesCarouselComponent class.
     *
     * @param _idGenerator The unique id service generator.
     */
    function ProductImagesCarouselComponent(_idGenerator) {
        this._idGenerator = _idGenerator;
        this._id = this._idGenerator.generate();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProductImagesCarouselComponent.prototype, "images", void 0);
    ProductImagesCarouselComponent = __decorate([
        core_1.Component({
            selector: 'product-images-carousel',
            template: product_images_carousel_html_1.default
        }), 
        __metadata('design:paramtypes', [id_generator_service_1.IdGeneratorService])
    ], ProductImagesCarouselComponent);
    return ProductImagesCarouselComponent;
}());
exports.ProductImagesCarouselComponent = ProductImagesCarouselComponent;
//# sourceMappingURL=product-images-carousel.js.map