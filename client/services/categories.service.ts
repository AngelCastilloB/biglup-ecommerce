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
import { Category }        from '../../common/models';

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
        return Observable.create(observer => {
            this.subscribe('categories', categoryId , () =>
            {
                let category: Category = Categories.findOne({_id: categoryId});

                if (!category)
                {
                    observer.error('Category not found');
                    return;
                }

                observer.next(category);
                observer.complete();
            });
        });
    }

    /**
     * @summary Creates a new category.
     *
     * @param category The category to be created in the database.
     */
    public createCategory(category: Category): Observable<string>
    {
        return Observable.create(observer => {
            this.call('categories.createCategory', category, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Updates a category.
     *
     * @param category The category to be updated in the database.
     */
    public updateCategory(category: Category): Observable<string>
    {
        return Observable.create(observer => {
            this.call('categories.updateCategory', category, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Deletes the given category from the database.
     *
     * @param categoryId The category Id.
     *
     * @return {Observable} a new cold observable
     */
    public deleteCategory(categoryId: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('categories.deleteCategory', categoryId, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }
}
