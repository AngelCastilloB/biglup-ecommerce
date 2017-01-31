/**
 * @file backoffice.module.ts.
 *
 * @summary The backoffice feature module.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 30 2016
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

import { NgModule }                      from '@angular/core';
import { SharedModule }                  from '../shared.module';
import { BackofficeRoutesModule }        from './backoffice.routes';
import { BackofficeComponent }           from './backoffice.component';
import { AddCollectionComponent }        from './components/add-collection/add-collection.component';
import { AddProductComponent }           from './components/add-product/add-product.component';
import { CollectionsComponent }          from './components/collections/collections.component';
import { CustomersComponent }            from './components/customers/customers.component';
import { DashboardComponent }            from './components/dashboard/dashboard.component';
import { OrdersComponent }               from './components/orders/orders.component';
import { ProductsComponent }             from './components/products/products.component';
import { ProductImageManagerComponent }  from './components/product-images-manager/product-image-manager.component';
import { ReportsComponent }              from './components/reports/reports.component';
import { CategoriesService }             from 'meteor/biglup:business';
import { ProductsService }               from 'meteor/biglup:business';
import { IdGeneratorService }            from 'meteor/biglup:core';
import { ImageDisplayComponent }         from './components/product-images-manager/components/image-display/image-display.component';
import { ImagePreviewComponent }         from './components/product-images-manager/components/image-preview/image-preview.component';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FileDropDirective }             from './components/product-images-manager/directives/file-drop.directive';
import { FileSelectDirective }           from './components/product-images-manager/directives/file-select.directive';
import { ImagesService }                 from 'meteor/biglup:business';
import { I18nInputComponent }            from './components/i18n-input/i18n-input.component';
import { I18nTextEditorComponent }       from './components/i18n-text-editor/i18n-text-editor.component';
import { CartsService }                  from 'meteor/biglup:business';
import { BiglupToastService }            from 'meteor/biglup:ui';
import { VariantsComponent }             from './components/variants/variants.component';
import { AddColorVariantComponent }      from './components/add-color-variant/add-color-variant.component';
import { AddSizeVariantComponent }       from './components/add-size-variant/add-size-variant.component';
import { AddMaterialVariantComponent }   from './components/add-material-variant/add-material-variant.component';
import { AddProductVariantComponent }    from './components/add-product-variant/add-product-variant.component';
import { InventoryComponent }            from './components/inventory/inventory.component';
import { VariantAttributesService }      from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        BackofficeComponent,

        // TODO: refactor into child feature modules

        // Common
        DashboardComponent,

        // collection
        AddCollectionComponent,
        CollectionsComponent,
        I18nInputComponent,
        I18nTextEditorComponent,

        // product
        AddProductComponent,
        ProductsComponent,
        AddProductVariantComponent,

        // inventory
        InventoryComponent,

        // Variants
        VariantsComponent,
        AddColorVariantComponent,
        AddSizeVariantComponent,
        AddMaterialVariantComponent,

        // customer
        CustomersComponent,

        // orders
        OrdersComponent,

        // images manager
        ProductImageManagerComponent,
        ImageDisplayComponent,
        ImagePreviewComponent,
        FileDropDirective,
        FileSelectDirective,

        // reports
        ReportsComponent
    ],
    imports: [
        SharedModule,
        BackofficeRoutesModule,
        DragulaModule
    ],
    providers: [
        CategoriesService,
        ProductsService,
        ImagesService,
        IdGeneratorService,
        DragulaService,
        CartsService,
        BiglupToastService,
        VariantAttributesService
    ]
})
export class BackofficeModule
{
}
