/**
 * @file authentication.module.ts.
 *
 * @summary The frontend landing page module.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 28 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { FormsModule,
         ReactiveFormsModule }   from '@angular/forms';
import { CommonModule }          from '@angular/common';
import { NgModule }              from '@angular/core';
import { RouterModule }          from '@angular/router';
import { IdGeneratorService }    from 'meteor/biglup:core';
import { BiglupI18nModule }      from 'meteor/biglup:i18n';
import { CategoriesService }     from 'meteor/biglup:business';
import { ProductsService }       from 'meteor/biglup:business';
import { CartsService }          from 'meteor/biglup:business';
import { CategoryComponent }     from './components/category/category.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { TruncateStringPipe }    from 'meteor/biglup:core';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        CategoryComponent,
        CategoryItemComponent,
        TruncateStringPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BiglupI18nModule,
        RouterModule
    ],
    exports: [
        CategoryComponent,
        CategoryItemComponent
    ],
    providers: [
        IdGeneratorService,
        CategoriesService,
        ProductsService,
        CartsService
    ]
})
export class CategoryModule
{
}
