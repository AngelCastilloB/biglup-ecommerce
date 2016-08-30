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

// IMPORTS ************************************************************************************************************/

import 'reflect-metadata';

import { Component, Input, OnInit }       from '@angular/core';
import { MeteorComponent }                from 'angular2-meteor';
import { Images }                         from '../../../../common/collections/image.collection';
import { MongoTranslatePipe }             from '../../../pipes/mongo-translate.pipe';
import { TranslatePipe }                  from '../../../pipes/translate.pipe';
import { TruncateStringPipe }             from '../../../pipes/truncate-string.pipe';
import { ROUTER_DIRECTIVES }              from '@angular/router';
import { ProductImagesCarouselComponent } from '../product/product-images-carousel/product-images-carousel';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './category-item.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a given product in the category.
 */
@Component({
    selector: 'category-item',
    template,
    directives: [ROUTER_DIRECTIVES, ProductImagesCarouselComponent],
    pipes: [MongoTranslatePipe, TranslatePipe, TruncateStringPipe]
})
export class CategoryItemComponent extends MeteorComponent implements OnInit {
    @Input()
    public model: Product;
    @Input()
    public  category:       string;
    private _productImages: Array<ProductImage> = Array<ProductImage>();

    /**
     * @summary Initializes a new instance of the CategoryItemComponent class.
     */
    constructor() {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit() {
        this.subscribe('images', () => {

            for (let i: number = 0; i < this.model.images.length; ++i) {
                let image: ProductImage = Images.findOne({ _id: this.model.images[i].id });

                if (image) {
                    this._productImages.push(image);
                }
            }

        }, true);
    }
}
