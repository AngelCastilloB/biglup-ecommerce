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

import 'reflect-metadata';

import { NgModule }                      from '@angular/core';
import { SharedModule }                  from '../shared.module';
import { BackofficeRoutesModule }        from './backoffice.routes';
import { BackofficeComponent }           from './backoffice.component';
import { SidebarComponent }              from './components/sidebar/sidebar.component';
import { BreadcrumbComponent }           from './components/breadcrumbs/breadcrumbs.component';
import { AddCollectionComponent }        from './components/add-collection/add-collection.component';
import { AddProductComponent }           from './components/add-product/add-product.component';
import { CollectionsComponent }          from './components/collections/collections.component';
import { CustomersComponent }            from './components/customers/customers.component';
import { DashboardComponent }            from './components/dashboard/dashboard.component';
import { ModalComponent }                from './components/modal/modal.component';
import { SuccessAnimationComponent }     from './components/modal/components/success-animation/success-animation.component';
import { ErrorAnimationComponent }       from './components/modal/components/error-animation/error-animation.component';
import { WarningAnimationComponent }     from './components/modal/components/warning-animation/warning-animation.component';
import { WaitingAnimationComponent }     from './components/modal/components/waiting-animation/waiting-animation.component';
import { InformationAnimationComponent } from './components/modal/components/information-animation/information-animation.component';
import { OrdersComponent }               from './components/orders/orders.component';
import { ProductsComponent }             from './components/products/products.component';
import { ProductImageManagerComponent }  from './components/product-images-manager/product-image-manager.component';
import { ReportsComponent }              from './components/reports/reports.component';
import { CategoriesService }             from '../services/categories.service';
import { ProductsService }               from '../services/products.service';
import { IdGeneratorService }            from '../services/id-generator.service.ts';
import { ImageDisplayComponent }         from './components/product-images-manager/components/image-display/image-display.component';
import { ImagePreviewComponent }         from './components/product-images-manager/components/image-preview/image-preview.component';
import { DragulaService, Dragula }       from 'ng2-dragula/ng2-dragula';
import { FileDropDirective }             from './components/product-images-manager/directives/file-drop.directive';
import { FileSelectDirective }           from './components/product-images-manager/directives/file-select.directive';
import { TextEditorComponent }           from './components/text-editor/text-editor.component';
import { ColorPickerComponent }          from './components/text-editor/components/color-picker.component';
import { ImagesService }                 from './../services/images.service';
import { I18nInputComponent }            from './components/i18n-input/i18n-input.component';
import { I18nTextEditorComponent }       from './components/i18n-text-editor/i18n-text-editor.component';
import { CartsService }                 from '../services/carts.service';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        BackofficeComponent,

        // TODO: refactor into child feature modules

        // Common
        SidebarComponent,
        BreadcrumbComponent,
        DashboardComponent,
        ModalComponent,
        SuccessAnimationComponent,
        ErrorAnimationComponent,
        WarningAnimationComponent,
        WaitingAnimationComponent,
        InformationAnimationComponent,
        TextEditorComponent,
        ColorPickerComponent,

        // collection
        AddCollectionComponent,
        CollectionsComponent,
        I18nInputComponent,
        I18nTextEditorComponent,

        // product
        AddProductComponent,
        ProductsComponent,

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
        Dragula,

        // reports
        ReportsComponent
    ],
    imports: [
        SharedModule,
        BackofficeRoutesModule
    ],
    providers: [
        CategoriesService,
        ProductsService,
        ImagesService,
        IdGeneratorService,
        DragulaService,
        CartsService
    ]
})
export class BackofficeModule
{
}
