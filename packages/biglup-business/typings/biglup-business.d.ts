/**
 * @file biglup-business.d.ts
 *
 * @summary The servies typings.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 28 2016
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

import { Observable }                           from 'rxjs';
import { Cart, Category, Image, Product, User } from '../common/models';

// MODULES ************************************************************************************************************/

declare module Services
{
    class BiglupBusinessModule {};
    class CartsService
    {
        public getCartsStream(): Observable<Cart[]>;
        public getUserCartStream(file: any, id: string, callback?: Function): string;
        public addProduct(productId: string, quantity: number, set = false): Observable<boolean>;
        public removeItem(userId: string, productId: string): Observable<boolean>;
        public removeAllItems(userId: string): Observable<boolean>;
    };

    class CategoriesService
    {
        public getCategories(): Observable<Array<Category>>;
        public getCategory(categoryId: string): Observable<Category>;
        public createCategory(category: Category): Observable<string>;
        public updateCategory(category: Category): Observable<string>;
        public deleteCategory(categoryId: string): Observable<string>;
    };
    class ImagesService
    {
        public getImages(): Observable<Array<Image>>;
        public getImage(imageId: string): Observable<Image>;
    };
    class ProductsService
    {
        public getProducts(): Observable<Array<Product>>;
        public getCategoryProducts(categoryId: string): Observable<Array<Product>>;
        public getProduct(productId: string): Observable<Product>;
        public createProduct(product: Product): Observable<number>;
        public updateProduct(product: Product): Observable<number>;
        public deteleProduct(productId: string): Observable<string>;
    }
    class UserAuthService
    {
        public isLogged(): boolean;
        public getId(): string;
        public isLoggedStream(): Observable<boolean>;
        public getUserStream(): Observable<User>;
        public  login(email: string, password: string, callback: (error?) => void);
        public logout();
        public createUser(options: {email: string, password: string}, callback?: (error) => void);
        public loginWithFacebook(options: Object, callback?: (error) => void);
        public loginWithGoogle(options: Object, callback?: (error) => void);
        public loginWithTwitter(options: Object, callback?: (error) => void);
        public forgotPassword(options: {email: string}, callback?: (err?) => void);
        public resetPassword(token: string, newPassword: string, callback?: (error) => void);
    }

    class UsersService
    {
        public getUserCollectionStream(): Observable<Array<Meteor.User>>;
    };
}

declare module 'meteor/biglup:biglup-business'
{
    export = Services;
}
