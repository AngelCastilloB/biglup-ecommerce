/**
 * @file collections.component.ts
 *
 * @summary The collections component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 09 2016
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

import { Component }         from '@angular/core';
import { MeteorComponent }   from 'angular2-meteor';
import { CategoriesService } from '../../../services/categories.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './collections.component.html';


// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the collections of the site.
 */
@Component({
    selector: 'categories',
    template,
    providers: [CategoriesService]
})
export class CollectionsComponent extends MeteorComponent
{
    /**
     * @summary Initializes a new instance of the CollectionsComponent class.
     *
     * @param _categoriesService The category service.
     */
    constructor(private _categoriesService: CategoriesService)
    {
        super();
    }
}
