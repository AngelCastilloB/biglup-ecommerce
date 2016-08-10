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

import { Component, Input } from '@angular/core';

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
export class ProductImagesCarouselComponent {

    /**
     * @summary The images to be iterated over at the view.
     */
    @Input() public images: Mongo.Cursor<Image>;

    /**
     * @summary sets an unique ID for the carousel component, needed for the anchor tags.
     *
     * @type {string}
     * @private
     */
    private _id: string = Math.random().toString(36).slice(-16);
}
