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

// IMPORTS ************************************************************************************************************/

import 'reflect-metadata';

import { Component, Input  }  from '@angular/core';
import { IdGeneratorService } from '../../../../services/id-generator.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './product-images-carousel.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Creates a carousel with the images provided, expects a Mongo Cursor.
 */
@Component({
    selector: 'product-images-carousel',
    template
})
export class ProductImagesCarouselComponent
{
    @Input()
    public images: Array<ProductImage>;
    private _id:   string;

    /**
     * @summary Initializes a new instance of the ProductImagesCarouselComponent class.
     *
     * @param _idGenerator The unique id service generator.
     */
    constructor(private _idGenerator: IdGeneratorService)
    {
        this._id = this._idGenerator.generate();
    }
}
