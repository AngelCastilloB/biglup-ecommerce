/**
 * @file categories.service.ts.
 *
 * @summary Implementation of the categories service.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 30, 2016
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

import { Injectable }      from '@angular/core';
import { Categories }      from '../../common/collections/category.collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';
import { MeteorComponent } from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services retrieves all the categories along with its relational information from other collections.
 */
@Injectable()
export class CategoriesService extends MeteorComponent
{
    private _categories:       Array<Category> = Array<Category>();
    private _categoriesStream: any             = new BehaviorSubject<Array<Category>>(Array<Category>());

    /**
     * @summary Initializes a new instance of the CategoriesService class.
     */
    constructor()
    {
        super();

        this.subscribe('categories', () =>
        {
            this.autorun(() =>
            {
                this._categories = Categories.find().fetch();
                this._categoriesStream.next(this._categories);
            });
        });
    }

    /**
     * @summary Returns all the available categories.
     *
     * @returns {Observable<Array<Category>>} The observable list of categories.
     */
    public getCategories(): Observable<Array<Category>>
    {
        return new Observable<Array<Category>>(func => this._categoriesStream.subscribe(func));
    }

    /**
     * @summary Gets one category given its id.
     *
     * @param categoryId The id of the category to be found.
     *
     * @returns {Observable<Category>} The category observable.
     */
    public getCategory(categoryId: string): Observable<Category>
    {
        return new Observable<Category>(func => this._categoriesStream
            .flatMap(array => new BehaviorSubject(array.filter(product => product._id === categoryId)[0]))
            .filter(category => !!category)
            .subscribe(func));
    }
}
