/**
 * @file header.component.ts
 *
 * @summary The header of the application.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

import 'reflect-metadata';
import { Component } from '@angular/core';
import { Categories } from '../../../common/collections/category.collection.ts';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo } from 'meteor/mongo';

import template from './header.component.html';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary This the application header.
 */
@Component({
    selector: 'header',
    template
})
export class HeaderComponent extends MeteorComponent{

    private categories: Mongo.Cursor<Category>;

    /**
     * @summary Initializes a new instance of the Header class.
     */
    constructor() {
        super();
        this.categories = Categories.find();
    }
}