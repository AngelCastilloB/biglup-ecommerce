/**
 * @file form-error.component.ts.
 *
 * @summary Generic error messages intended for general forms.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 20 2016
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
var id_generator_service_1 = require('../../../services/id-generator.service');
// EXPORTS ************************************************************************************************************/
/**
 * @summary custom component intended as a simple error display message in forms.
 */
var FormErrorComponent = (function () {
    function FormErrorComponent(_idGenerator) {
        this._idGenerator = _idGenerator;
    }
    FormErrorComponent.prototype.ngOnInit = function () {
        this._randomId = this._idGenerator.generate();
    };
    /**
     * @summary Appends -form-error to the current id.
     *
     * @returns {string}
     * @private
     */
    FormErrorComponent.prototype._getId = function () {
        var id = this.formId || this._randomId;
        return id + "-form-error";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormErrorComponent.prototype, "formId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormErrorComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormErrorComponent.prototype, "message", void 0);
    FormErrorComponent = __decorate([
        core_1.Component({
            selector: 'form-error',
            template: "<div [id]=\"_getId()\" class=\"font-italic\" [ngClass]=\"classes\">\n                  {{ message }}\n               </div>"
        }), 
        __metadata('design:paramtypes', [id_generator_service_1.IdGeneratorService])
    ], FormErrorComponent);
    return FormErrorComponent;
}());
exports.FormErrorComponent = FormErrorComponent;
//# sourceMappingURL=form-error.component.js.map