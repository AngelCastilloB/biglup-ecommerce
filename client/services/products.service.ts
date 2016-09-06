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

import { Injectable }      from '@angular/core';
import { Products }        from '../../common/collections/product.collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';
import { MeteorComponent } from 'angular2-meteor';
import { Product }         from '../../common/models';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';

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
    constructor()
    {
        super();

        this.subscribe('products', () =>
        {
            this.autorun(() =>
            {
                this._products = Products.find().fetch();

                this._products.forEach((product: Product) =>
                    product.images.sort((lhs, rhs) => lhs.position - rhs.position), this);

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
        return new Observable<Array<Product>>(func => this._productsStream.subscribe(func));
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
        return new Observable<Array<Product>>(func => this._productsStream
            .flatMap(array => new BehaviorSubject(array.filter(product => product.categories.indexOf(categoryId) > -1)))
            .subscribe(func));
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
     */
    public createProduct(product: Product): Observable<string>
    {
        return Observable.create(observer => {
            this.call('products.createProduct', product, (error, result) =>
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
     * @summary Updates a product.
     *
     * @param product The product to be updated in the database.
     */
    public updateProduct(product: Product): Observable<string>
    {
        return Observable.create(observer => {
            this.call('products.updateProduct', product, (error, result) =>
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
