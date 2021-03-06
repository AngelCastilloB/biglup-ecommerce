/**
 * @file biglup-business.d.ts
 *
 * @summary The business project typings.
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

/* TYPING REFERENCES **************************************************************************************************/

/*/// <reference path="../node_modules/rxjs/Observable.d.ts" /> */

/* MODULES ************************************************************************************************************/

declare module Business
{
// SERVICES ***********************************************************************************************************/

    class CartsService
    {
        public getCartsStream(): any;
        public getUserCartStream(): any;
        public addProduct(productId: string, quantity: number, set = false): any;
        public removeItem(userId: string, productId: string): any;
        public removeAllItems(userId: string): any;
    }

    class CategoriesService
    {
        public getCategories(): any;
        public getRootCategories(): any;
        public hasSubcategories(): any;
        public getSubCategories(rootCategory: string): any;
        public getCategory(categoryId: string): any;
        public createCategory(category: Category): any;
        public updateCategory(category: Category): any;
        public deleteCategory(categoryId: string): any;
        public deleteCategories(categoriesId: Array<string>): any;
    }

    class ImagesService
    {
        public getImages(): any;
        public getImage(imageId: string): any;
    }

    class ProductsService
    {
        public getProducts(): any;
        public getCategoryProducts(categoryId: string): any;
        public getProduct(productId: string): any;
        public createProduct(product: Product): any;
        public updateProduct(product: Product): any;
        public deteleProduct(productId: string): any;
        public deteleProducts(productsId: Array<string>): any;
    }

    class UserAuthService
    {
        public isLogged(): boolean;
        public getId(): string;
        public isLoggedStream(): any;
        public getUserStream(): any;
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
        public getUserCollectionStream(): any;
    }

    class VariantAttributesService
    {
        public getColors(): any;
        public getColor(id: string): any;
        public getSizes(): any;
        public getSize(id: string): any;
        public getMaterials(): any;
        public getMaterial(id: string): any;
        public createColors(colorAttribute: ColorVariantAttribute): any;
        public createSizes(sizeAttribute: SizeVariantAttribute): any;
        public createMaterials(materialAttribute: MaterialVariantAttribute): any;
        public updateColor(colorAttribute: ColorVariantAttribute): any;
        public updateSize(sizeAttribute: SizeVariantAttribute): any;
        public updateMaterial(materialAttribute: MaterialVariantAttribute): any;
        public deleteColor(id: string): any;
        public deleteSize(id: string): any;
        public deleteMaterial(id: string): any;
    }

    class InventoryService
    {
        public increaseProductInventory(productId: string, amount: number): any;
        public increaseVariantInventory(productId: string, variantId: string, amount: number): any;
        public setProductInventory(productId: string, amount: number): any;
        public setVariantInventory(productId: string, variantId: string, amount: number): any;
    }

    class AppearancesService
    {
        public getAppearances(): any;
        public getActiveAppearance(): any;
        public getAppearance(appearanceId: string): any;
        public createAppearance(appearance: Appearance): String;
        public updateAppearance(appearance: Appearance): any;
        public deleteAppearance(appearanceId: string): any;
        public getLogoUpdate(): any;
        public updateLogo(logo: LogoImage);
    }

// COLLECTIONS ********************************************************************************************************/

    const Categories: any;
    const Images: any;
    const Products: any;
    const VariantColors: any;
    const VariantSizes: any;
    const VariantMaterials: any;
    const Appearances: any;

// MODELS *************************************************************************************************************/

    export class I18nString
    {
        constructor(
            public language: string = '',
            public value:    string = '')
    }

    class CartItem
    {
        constructor(
            public productId: string            = '',
            public quantity:  number            = 0,
            public title:     Array<I18nString> = Array<I18nString>(),
            public color:     Array<I18nString> = Array<I18nString>(),
            public size:      Array<I18nString> = Array<I18nString>(),
            public image:     string            = '',
            public updatedAt: Date              = new Date());
    }

    class Cart
    {
        constructor(public items: Array<CartItem> = Array<CartItem>());
    }

    export class Category
    {
        constructor(
            public _id:            string             = null,
            public slug:           string             = '',
            public name:           Array<I18nString>  = Array<I18nString>(),
            public info:           Array<I18nString>  = Array<I18nString>(),
            public image:          string             = '',
            public active:         boolean            = false,
            public createdAt:      Date               = new Date(),
            public updatedAt:      Date               = new Date(),
            public isRootCategory: boolean            = false,
            public parentCategory: string             = '',
            public denormalizedSubcategories: Array<Category> = Array<Category>(),
            public denormalizedParent : Category = null)
    }

    export class Image
    {
        constructor(
            public _id:        string  = null,
            public complete:   boolean = false,
            public extension:  string  = '',
            public name:       string  = '',
            public progress:   number  = 0,
            public size:       number  = 0,
            public token:      string  = '',
            public type:       string  = '',
            public uploadedAt: Date    = new Date(),
            public uploading:  boolean = false,
            public url:        string  = '')
    }

    export class ProductImage
    {
        constructor(
            public id:         string  = '',
            public url:        string  = '',
            public isUploaded: boolean = false,
            public file:       File    = null);
    }

    class ProductVariant
    {
        constructor(
            public _id:              string                   = '',
            public barcode:          string                   = '',
            public sku:              string                   = '',
            public color:            ColorVariantAttribute    = new ColorVariantAttribute(),
            public size:             SizeVariantAttribute     = new SizeVariantAttribute(),
            public material:         MaterialVariantAttribute = new MaterialVariantAttribute(),
            public price:            number                   = 0,
            public discount:         number                   = 0,
            public stock:            number                   = 0,
            public isLowQuantity:    boolean                  = false,
            public isSoldOut:        boolean                  = false,
            public isEnabled:        boolean                  = true)
    }

    class Product
    {
        constructor(
            public _id:              string                = null,
            public slug:             string                = '',
            public categories:       Array<string>         = Array<string>(),
            public title:            Array<I18nString>     = Array<I18nString>(),
            public images:           Array<ProductImage>   = Array<ProductImage>(),
            public description:      Array<I18nString>     = Array<I18nString>(),
            public barcode:          string                = '',
            public sku:              string                = '',
            public variantProducts:  Array<ProductVariant> = Array<ProductVariant>(),
            public price:            number                = 0,
            public discount:         number                = 0,
            public trackInventory:   boolean               = false,
            public stock:            number                = 0,
            public isLowQuantity:    boolean               = false,
            public isSoldOut:        boolean               = false,
            public isBackorder:      boolean               = false,
            public requiresShipping: boolean               = false,
            public hashtags:         Array<string>         = Array<string>(),
            public isVisible:        boolean               = false,
            public createdAt:        Date                  = new Date(),
            public updatedAt:        Date                  = new Date(),
            public publishedAt:      Date                  = new Date())
    }

    class ColorVariantAttribute
    {
        constructor(public _id: string = null, public name: Array<I18nString> = Array<I18nString>(), public value: string = '#FFFFFF');
    }

    class SizeVariantAttribute
    {
        constructor(public _id: string = null, public size: Array<I18nString> = Array<I18nString>());
    }

    class MaterialVariantAttribute
    {
        constructor(public _id: string = null, public material: Array<I18nString> = Array<I18nString>());
    }

    class User
    {
        constructor(
            public _id:      string        = null,
            public emails:   EmailObject[] = Array<EmailObject>(),
            public services: Object        = {},
            public isAdmin:  Boolean       = false,
            public cart:     Cart          = <Cart>{});
    }

    interface EmailObject
    {
        address: string;
        verified: boolean;
    }

    class AppearanceLayout
    {
        constructor(
            public name:           string = '',
            public configuration:  any    = null);
    }

    class AppearanceStyle
    {
        constructor(
            public header: AppearanceHeaderStyle = new AppearanceHeaderStyle(),
            public footer: AppearanceFooterStyle = new AppearanceFooterStyle());
    }

    class LogoImage
    {
        constructor(
            public id: string  = '',
            public url:        string  = '',
            public isUploaded: boolean = false,
            public file:       File    = null);
    }

    class AppearanceHeaderStyle
    {
        constructor(
            public topBarBackgroundColor:  string    = '#000000',
            public topBarFontColor:        string    = '#FFFFFF',
            public logoBackgroundColor:    string    = '#FFFFFF',
            public logo:                   LogoImage = new LogoImage('', '/images/logo_placeholder.png'),
            public logoAlignment:          string    = 'center',
            public menuBackgroundColor:    string    = '#000000',
            public menuFontColor:          string    = '#FFFFFF',
            public menuHighlight:          string    = '#5a595a',
            public submenuBackgroundColor: string    = '#FFFFFF',
            public submenuFontColor:       string    = '#000000',
            public submenuBorderColor:     string    = '#000000');
    }

    class Appearance
    {
        constructor(
            public _id: String = null,
            public name: String = '',
            public style: AppearanceStyle = new AppearanceStyle(),
            public layout: Array<AppearanceLayout> = [],
            public isEditable: boolean             = true,
            public isActive: boolean               = false,
            public createdAt:      Date            = new Date(),
            public updatedAt:      Date            = new Date());
    }

    class AppearanceFooterStyle
    {
        constructor(
            public backgroundColor: string = '#000000',
            public fontColor:       string = '#FFFFFF');
    }

// SCHEMAS ************************************************************************************************************/

    const CartSchema: any;
    const SubCategorySchema: any;
    const CategorySchema: any;
    const I18nStringSchema: any;
    const ProductImageSchema: any;
    const ProductVariantSchema: any;
    const ProductSchema: any;
    const UserSchema: any;
    const ColorVariantAttributeSchema: any;
    const SizeVariantAttributeSchema: any;
    const MaterialVariantAttributeSchema: any;
    const AppearanceSchema: any;
}

// MODULE EXPORT ******************************************************************************************************/

declare module 'meteor/biglup:business'
{
    export = Business;
}
