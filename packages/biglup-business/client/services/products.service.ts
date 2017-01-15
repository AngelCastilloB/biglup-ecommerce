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

import { Product,
         ProductImage,
         I18nString }      from '../../common/models';
import { Injectable }      from '@angular/core';
import { Products }        from '../../common/collections/product.collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable }      from 'rxjs/Observable';
import { ImagesService }   from './images.service';
import { ProductSchema }   from '../../common/schemas/product.schema';
import { MeteorReactive }  from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';

// INTERNALS **********************************************************************************************************/

/**
 * @summary Performs a copy of the product model.
 *
 * The image blobs are removed in the process to avoid sending then to the server.
 *
 * @return The cloned instance.
 */
const copyProduct = (product: Product) =>
{
    let clone: any = JSON.parse(JSON.stringify(product));

    // Fix the dates type safety.
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
export class ProductsService extends MeteorReactive
{
    private _products:       Array<Product>                  = Array<Product>();
    private _productsStream: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(Array<Product>());

    /**
     * @summary Initializes a new instance of the ProductsService class.
     *
     * @param {ImagesService} _imagesService The images service.
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
            }, true);
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
            .mergeMap(array => new BehaviorSubject(array.filter(
                product => product.categories.indexOf(categoryId) > -1)));
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
        product.title       = product.title.filter((translation: I18nString) => !!translation.value);
        product.description = product.description.filter((translation: I18nString) => !!translation.value);

        // HACK: This allows the simple schema to work properly by removing the type safety on all complex types.
        let copy: Product = copyProduct(product);

        check(copy, ProductSchema);

        const totalProgress: number = product.images.length * 100;

        return Observable
            .from(product.images)
            .mergeMap(image => this._imagesService.createProductImage(image))
            .scan((accumulator, progress) => accumulator + ((progress / totalProgress)  * 100) , 0)
            .concat(Observable.create(observer =>
            {
                // Gets all the images with the new document id (Ignore file field to avoid sending data over the wire).
                copy.images = product.images.map((image) => new ProductImage(image.id, image.url, image.isUploaded));

                Meteor.call('createProduct', copy, (error) =>
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
        product.title       = product.title.filter((translation: I18nString) => !!translation.value);
        product.description = product.description.filter((translation: I18nString) => !!translation.value);

        // HACK: This allows the simple schema to work properly by removing the type safety on all complex types.
        let copy: Product = copyProduct(product);

        check(copy, ProductSchema);

        const totalProgress: number = product.images.length * 100;

        return Observable
            .from(product.images)
            .mergeMap(image => this._imagesService.createProductImage(image))
            .scan((accumulator, progress) => accumulator + ((progress / totalProgress)  * 100), 0)
            .concat(Observable.create(observer =>
            {
                // Gets all the images with the new document id (Ignore file field to avoid sending data over the wire).
                copy.images = product.images.map((image) => new ProductImage(image.id, image.url, image.isUploaded));

                Meteor.call('updateProduct', copy, (error) =>
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
            this.call('deleteProduct', productId, (error, result) =>
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
     * @summary Deletes the given products from the database.
     *
     * @param productsId The product Id collection.
     *
     * @return {Observable} a new cold observable
     */
    public deteleProducts(productsId: Array<string>): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteProducts', productsId, (error, result) =>
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
