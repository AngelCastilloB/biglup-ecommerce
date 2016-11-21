/**
 * @file backoffice.routes.ts
 *
 * @summary The routes definitions for the backoffice component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import { Routes, RouterModule }   from '@angular/router';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { OrdersComponent }        from './components/orders/orders.component';
import { CustomersComponent }     from './components/customers/customers.component';
import { ProductsComponent }      from './components/products/products.component';
import { AddProductComponent }    from './components/add-product/add-product.component';
import { ReportsComponent }       from './components/reports/reports.component';
import { BackofficeComponent }    from './backoffice.component';
import { CollectionsComponent }   from './components/collections/collections.component';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { VariantsComponent }      from './components/variants/variants.component';

/* EXPORTS ************************************************************************************************************/

/**
 * @brief This are the back office routes.
 */
const ROUTES: Routes = [
    {
        path: 'admin',
        component: BackofficeComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'customers', component: CustomersComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'products/add-product', component: AddProductComponent},
            {path: 'products/edit-product/:id', component: AddProductComponent},
            {path: 'reports', component: ReportsComponent},
            {path: 'products/variants', component: VariantsComponent},
            {path: 'collections', component: CollectionsComponent},
            {path: 'collections/add-collection', component: AddCollectionComponent},
            {path: 'collections/edit-collection/:id', component: AddCollectionComponent},
        ]
    },
];

/**
 * @summary generates a module object with the app backoffice routes.
 *
 * @type {ModuleWithProviders}
 */
export const BackofficeRoutesModule = RouterModule.forChild(ROUTES);
