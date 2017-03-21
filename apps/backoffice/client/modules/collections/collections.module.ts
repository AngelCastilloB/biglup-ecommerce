/**
 * @file collections.module.ts.
 *
 * @summary The collections module.
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

import { FormsModule }            from '@angular/forms';
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { AddCollectionComponent } from './components/add-collection/add-collection.component'
import { CollectionsComponent }   from './components/collections/collections.component'
import { I18nModule }             from '../../modules/i18n'
import { BiglupI18nModule }       from 'meteor/biglup:i18n';
import { BiglupUiModule }         from 'meteor/biglup:ui';
import { CategoriesService }      from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

@NgModule({
    declarations: [
        AddCollectionComponent,
        CollectionsComponent
    ],
    exports: [
        AddCollectionComponent,
        CollectionsComponent
    ],
    providers: [
        CategoriesService
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        I18nModule,
        BiglupI18nModule,
        BiglupUiModule
    ]
})
export class CollectionsModule
{
}
