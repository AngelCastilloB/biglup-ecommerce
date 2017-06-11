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

import { Routes, RouterModule }        from '@angular/router';
import { DashboardComponent }          from './modules/dashboard';
import { ProductsComponent,
         AddProductComponent }         from './modules/products';
import { CollectionsComponent,
         AddCollectionComponent }      from './modules/collections';
import { VariantsComponent,
         AddColorVariantComponent,
         AddSizeVariantComponent,
         AddMaterialVariantComponent}  from './modules/variants';
import { InventoryComponent }          from './modules/inventory';
import { AppearancesComponent,
         SlidersComponent,
         FeaturedComponent,
         CollagesComponent }           from './modules/appearance';
import { AddAppearanceComponent }      from './modules/appearance/components/add-appearance/add-appearance.component';
import { OrdersComponent }             from './modules/orders';
import { CustomersComponent }          from './modules/customers';
import { ReportsComponent }            from './modules/reports';
import { BackofficeComponent }         from './backoffice.component';

/* EXPORTS ************************************************************************************************************/

/**
 * @brief This are the back office routes.
 */
const ROUTES: Routes = [
    {
        path: '',
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
            {path: 'products/add-color-variant', component: AddColorVariantComponent},
            {path: 'products/edit-color-variant/:id', component: AddColorVariantComponent},
            {path: 'products/add-size-variant', component: AddSizeVariantComponent},
            {path: 'products/edit-size-variant/:id', component: AddSizeVariantComponent},
            {path: 'products/add-material-variant', component: AddMaterialVariantComponent},
            {path: 'products/edit-material-variant/:id', component: AddMaterialVariantComponent},
            {path: 'collections', component: CollectionsComponent},
            {path: 'collections/add-collection', component: AddCollectionComponent},
            {path: 'collections/edit-collection/:id', component: AddCollectionComponent},
            {path: 'products/inventory', component: InventoryComponent},
            {path: 'appearances', component: AppearancesComponent},
            {path: 'appearances/add-appearance', component: AddAppearanceComponent},
            {path: 'appearances/sliders', component: SlidersComponent},
            {path: 'appearances/featured', component: FeaturedComponent},
            {path: 'appearances/collages', component: CollagesComponent}
        ]
    },
];

/**
 * @summary generates a module object with the app backoffice routes.
 *
 * @type {ModuleWithProviders}
 */
export const BackofficeRoutesModule = RouterModule.forChild(ROUTES);
