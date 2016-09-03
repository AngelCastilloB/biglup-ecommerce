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

import { NgModule }                from '@angular/core';
import { SharedModule }            from '../shared.module';
import { BackofficeRoutesModule }  from './backoffice.routes';
import { BackofficeComponent }     from './backoffice.component';
import { SidebarComponent }        from './components/sidebar/sidebar.component';
import { BreadcrumbComponent }     from './components/breadcrumbs/breadcrumbs.component';
import { AddCollectionComponent }  from './components/add-collection/add-collection.component';
import { AddProductComponent }     from './components/add-product/add-product.component';
import { CollectionsComponent }    from './components/collections/collections.component';
import { CustomersComponent }      from './components/customers/customers.component';
import { DashboardComponent }      from './components/dashboard/dashboard.component';
import { ModalComponent }          from './components/modal/modal.component';
import { OrdersComponent }         from './components/orders/orders.component';
import { ProductsComponent }       from './components/products/products.component';
import { ImagesUploaderComponent } from './components/images-uploader/images-uploader.component';
import { ReportsComponent }        from './components/reports/reports.component';
import { CategoriesService }       from '../services/categories.service';
import { ProductsService }         from '../services/products.service';
import { IdGeneratorService }      from '../services/id-generator.service.ts';
import { ImageDisplayComponent }   from './components/images-uploader/components/image-display/image-display.component';
import { ImagePreviewComponent }   from './components/images-uploader/components/image-preview/image-preview.component';
import { DragulaService, Dragula } from 'ng2-dragula/ng2-dragula';
import { FileDropDirective }       from './components/images-uploader/directives/file-drop.directive';
import { FileSelectDirective }     from './components/images-uploader/directives/file-select.directive';
import { TextEditorComponent }     from './components/text-editor/text-editor.component';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        BackofficeComponent,

        // TODO: refactor into child feature modules
        // helpers?
        SidebarComponent,
        BreadcrumbComponent,
        DashboardComponent,
        ModalComponent,
        TextEditorComponent,

        // collection
        AddCollectionComponent,
        CollectionsComponent,

        // product
        AddProductComponent,
        ProductsComponent,

        // customer
        CustomersComponent,

        // orders
        OrdersComponent,

        // images uploader
        ImagesUploaderComponent,
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
        IdGeneratorService,
        DragulaService
    ]
})
export class BackofficeModule
{
}

