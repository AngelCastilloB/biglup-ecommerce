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
import { Category }        from '../../common/models';
import { MeteorReactive }  from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/distinctUntilChanged';

// INTERNALS **********************************************************************************************************/

/**
 * @summary Performs a copy of the category model.
 *
 * @return The cloned instance.
 */
const copyCategory = (category: Category) =>
{
    let clone: any = JSON.parse(JSON.stringify(category));

    // Fix the dates type safety.
    clone.createdAt   = new Date(clone.createdAt.toString());
    clone.updatedAt   = new Date(clone.updatedAt.toString());

    return <Category>clone;
};

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services retrieves all the categories along with its relational information from other collections.
 */
@Injectable()
export class CategoriesService extends MeteorReactive
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

                // Denormalize parent category and subcategories relationships.
                this._categories.forEach((category: Category) =>
                {
                    if (category.isRootCategory)
                    {
                        let subcategories: Array<Category> = this._categories.filter(cat => cat.parentCategory === category._id);

                        if (subcategories.length > 0)
                            category.denormalizedSubcategories = subcategories;
                    }
                    else
                    {
                        if (category.parentCategory !== null && category.parentCategory !== "")
                        {
                            let parent: Category = this._categories.find((cat) => cat._id === category.parentCategory);

                            if (parent)
                            {
                                category.denormalizedParent = parent;
                            }
                        }
                    }
                });

                this._categoriesStream.next(this._categories);
            }, true);
        });
    }

    /**
     * @summary Returns all the available categories.
     *
     * @returns {Observable<Array<Category>>} The observable list of categories.
     */
    public getCategories(): Observable<Array<Category>>
    {
        return this._categoriesStream.distinctUntilChanged();
    }

    /**
     * @summary Returns all the available root categories.
     *
     * @returns {Observable<Array<Product>>} The observable list of products.
     */
    public getRootCategories(): Observable<Array<Category>>
    {
        return this._categoriesStream
            .distinctUntilChanged()
            .mergeMap(array => new BehaviorSubject(array.filter(category => category.isRootCategory)));
    }

    /**
     * @summary Observable that returns whether the given category has subcategories.
     *
     * @param rootCategory The category to query.
     *
     * @return {Observable<boolean>} A cold observable with the result.
     */
    public hasSubcategories(rootCategory: string): Observable<boolean>
    {
        return Observable.create(observer =>
        {
            observer.next(this._categories.filter(category => category.parentCategory === rootCategory).length > 0);
            observer.complete();
        });
    }

    /**
     * @summary Returns all the available subcategories for the given root category.
     *
     * @returns {Observable<Array<Product>>} The observable list of products.
     */
    public getSubCategories(rootCategory: string): Observable<Array<Category>>
    {
        return this._categoriesStream
            .distinctUntilChanged()
            .mergeMap(array => new BehaviorSubject(array.filter(category => category.parentCategory === rootCategory)));
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
        return this._categoriesStream
            .distinctUntilChanged()
            .mergeMap(array => new BehaviorSubject(array.find(category => category._id === categoryId)))
            .filter((x) => !!x)
            .take(1);
    }

    /**
     * @summary Creates a new category.
     *
     * @param category The category to be created in the database.
     */
    public createCategory(category: Category): Observable<string>
    {
        let clone: Category = copyCategory(category);
        // Remove denormalization fields since the are not part of the schema.
        delete clone['denormalizedParent'];
        delete clone['denormalizedSubcategories'];

        return Observable.create(observer => {
            this.call('createCategory', category, (error, result) =>
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
        let clone: Category = copyCategory(category);
        // Remove denormalization fields since the are not part of the schema.
        delete clone['denormalizedParent'];
        delete clone['denormalizedSubcategories'];

        return Observable.create(observer => {
            this.call('updateCategory', clone, (error, result) =>
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
            this.call('deleteCategory', categoryId, (error, result) =>
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
     * @summary Deletes the given categories from the database.
     *
     * @param categoriesId The category Id collection.
     *
     * @return {Observable} a new cold observable
     */
    public deleteCategories(categoriesId: Array<string>): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteCategories', categoriesId, (error, result) =>
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
