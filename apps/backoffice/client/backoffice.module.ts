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

import { NgModule }                         from '@angular/core';
import { BackofficeRoutesModule }           from './backoffice.routes';
import { BackofficeComponent }              from './backoffice.component';
import { DashboardModule }                  from './modules/dashboard';
import { I18nModule }                       from './modules/i18n';
import { CollectionsModule }                from './modules/collections';
import { ProductsModule }                   from './modules/products';
import { VariantsModule }                   from './modules/variants/variants.module';
import { AppearancesModule }                from './modules/appearance';
import { CustomersModule }                  from './modules/customers';
import { OrdersModule }                     from './modules/orders';
import { InventoryModule }                  from './modules/inventory';
import { ReportsModule }                    from './modules/reports';
import { BiglupI18nModule }                 from 'meteor/biglup:i18n';
import { BiglupUiModule }                   from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        BackofficeComponent
    ],
    imports: [
        BackofficeRoutesModule,
        DashboardModule,
        I18nModule,
        CollectionsModule,
        ProductsModule,
        VariantsModule,
        AppearancesModule,
        CustomersModule,
        OrdersModule,
        InventoryModule,
        ReportsModule,
        BiglupI18nModule,
        BiglupUiModule
    ]
})
export class BackofficeModule
{
}
