/**
 * @file products.service.ts.
 *
 * @summary Implementation of the product service.
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

import { Injectable }       from '@angular/core';
import { Products }         from '../../common/collections/product.collection';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable }       from 'rxjs/Observable';
import { MeteorComponent }  from 'angular2-meteor';
import { Product }          from '../../common/models';
import { ImagesService }    from './images.service';
import { ProductSchema }    from '../../common/schemas/product.schema';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';

// INTERNALS **********************************************************************************************************/

/**
 * @summary Performs a deep clone of the product model.
 *
 * @return The cloned instance.
 */
const cloneProduct = (product: Product) =>
{
    let clone: any = JSON.parse(JSON.stringify(product));

    // Fix the dates.
    clone.createdAt   = new Date(clone.createdAt.toString());
    clone.updatedAt   = new Date(clone.updatedAt.toString());
    clone.publishedAt = new Date(clone.publishedAt.toString());

    return <Product>clone;
};

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services retrieves all the products along with its relational information from other collections.
 */
@Injectable()
export class ProductsService extends MeteorComponent
{
    private _products:       Array<Product>                  = Array<Product>();
    private _productsStream: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(Array<Product>());

    /**
     * @summary Initializes a new instance of the ProductsService class.
     */
    constructor(private _imagesService: ImagesService)
    {
        super();

        this.subscribe('products', () =>
        {
            this.autorun(() =>
            {
                this._products = Products.find().fetch();
                this._productsStream.next(this._products);
            });
        });
    }

    /**
     * @summary Returns all the available products.
     *
     * @returns {Observable<Array<Product>>} The observable list of products.
     */
    public getProducts(): Observable<Array<Product>>
    {
        return this._productsStream.distinctUntilChanged();
    }

    /**
     * @summary Returns all the available products in the given category.
     *
     * @param categoryId The id of the category.
     *
     * @returns {Observable<Array<Product>>} The observable list of products.
     */
    public getCategoryProducts(categoryId: string): Observable<Array<Product>>
    {
        return this._productsStream
            .distinctUntilChanged()
            .flatMap(array => new BehaviorSubject(array.filter(product => product.categories.indexOf(categoryId) > -1)));
    }

    /**
     * @summary Gets one product given its id.
     *
     * @param productId The id of the product to be found.
     *
     * @returns {Observable<Product>} The product observable.
     */
    public getProduct(productId: string): Observable<Product>
    {
        return Observable.create(observer => {
            this.subscribe('products', productId , () =>
            {
                let product: Product = Products.findOne({_id: productId});

                if (!product)
                {
                    observer.error('Product not found');
                    return;
                }

                observer.next(product);
                observer.complete();
            });
        });
    }

    /**
     * @summary Creates a new product.
     *
     * @param product The product to be created in the database.
     *
     * @return This returns an observable that tracks the progress of the product upload.
     */
    public createProduct(product: Product): Observable<number>
    {
        check(product, ProductSchema);

        const totalProgress:   number = product.images.length * 100;
        let   currentProgress: number = 0;

        return Observable
            .from(product.images)
            .flatMap(image => this._imagesService.createProductImage(image))
            .map(progress =>
            {
                currentProgress += (progress / totalProgress) * 100;

                return currentProgress;
            })
            .concat(Observable.create(observer => {

                let clone: Product = cloneProduct(product);

                clone.images.forEach(image => delete image['file'], this);

                this.call('products.createProduct', clone, (error, result) =>
                {
                    if (error)
                    {
                        observer.error(error);
                    }
                    else
                    {
                        observer.next(100);
                        observer.complete();
                    }
                });
            }));
    }

    /**
     * @summary Updates a product.
     *
     * @param product The product to be updated in the database.
     */
    public updateProduct(product: Product): Observable<number>
    {
        check(product, ProductSchema);

        const totalProgress:   number = product.images.length * 100;
        let   currentProgress: number = 0;

        return Observable
            .from(product.images)
            .flatMap(image => this._imagesService.createProductImage(image))
            .map(progress =>
            {
                currentProgress += (progress / totalProgress) * 100;

                return currentProgress;
            })
            .concat(Observable.create(observer => {

                let clone: Product = cloneProduct(product);

                clone.images.forEach(image => delete image['file'], this);

                this.call('products.updateProduct', clone, (error, result) =>
                {
                    if (error)
                    {
                        observer.error(error);
                    }
                    else
                    {
                        observer.next(100);
                        observer.complete();
                    }
                });
            }));
    }

    /**
     * @summary Deletes the given product from the database.
     *
     * @param productId The product Id.
     *
     * @return {Observable} a new cold observable
     */
    public deteleProduct(productId: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('products.deleteProduct', productId, (error, result) =>
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
