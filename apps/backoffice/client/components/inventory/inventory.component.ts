/**
 * @file inventory.component.ts
 *
 * @summary The inventory admin panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   Jan 31 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component,
         OnInit,
         OnDestroy,
         ViewChild,
         ChangeDetectorRef }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ProductsService, Product } from 'meteor/biglup:business';
import { _T, I18nSingletonService } from 'meteor/biglup:i18n';
import { StringFormat }             from 'meteor/biglup:core';
import { BiglupModalComponent,
         BiglupModalType,
         BiglupModalButtons,
         BiglupModalResult }        from 'meteor/biglup:ui';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './inventory.component.html';

var dateFormat = require('dateformat');

// INTERFACES *********************************************************************************************************/

/**
 * @summary The product item structure.
 */
export interface ProductItem
{
    id: string;
    product: any;
    sku: string;
    isBackorder: boolean;
    quantity: number;
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays all the product inventory of the site.
 */
@Component({
    selector: 'inventory',
    template,
})
export class InventoryComponent implements OnDestroy, OnInit
{
    @ViewChild(BiglupModalComponent)
    private _modal:              BiglupModalComponent;
    private _dataTableColums:    any = {};
    private _i18nSubscription:   any;
    private _productItems:       Array<ProductItem> = [];
    private _productItemsStream: BehaviorSubject<Array<ProductItem>> = new BehaviorSubject<Array<ProductItem>>(Array<ProductItem>());
    private _subscription:       any;

    /**
     * @summary Initializes a new instance of the InventoryComponent class.
     */
    constructor(private _router: Router, private _productsService: ProductsService, private _changeDetector: ChangeDetectorRef)
    {
        this._buildTableFormat();
        this._i18nSubscription = I18nSingletonService.getInstance().getLocaleChangeEmitter().subscribe(() => this._buildTableFormat());
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._subscription = this._productsService.getProducts().subscribe((products)=>
        {
            let productItems = [];
            products.forEach((product: Product)=>
            {
                let hasActiveVariants: boolean = false;

                product.variantProducts.forEach((variant)=> hasActiveVariants = hasActiveVariants || variant.isEnabled);

                if (hasActiveVariants)
                {
                    product.variantProducts.forEach((variant)=>
                    {
                        if (variant.isEnabled)
                        {
                            productItems.push(
                            {
                                id: product._id,
                                product: { title: product.title, variant: variant },
                                sku: variant.sku,
                                isBackorder: product.isBackorder,
                                quantity: variant.stock
                            })
                        }
                    });
                }
                else
                {
                    productItems.push(
                    {
                        id: product._id,
                        product: { title: product.title, variant: null },
                        sku: product.sku,
                        isBackorder: product.isBackorder,
                        quantity: product.stock
                    })
                }
            });

            this._productItemsStream.next(productItems);
            this._changeDetector.detectChanges();
        });
    }

    /**
     * @summary Perform any custom cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy()
    {
        if (this._i18nSubscription)
            this._i18nSubscription.unsubscribe();

        if (this._subscription)
            this._subscription.unsubscribe();
    }

    /**
     * @summary Builds the data table format.
     */
    private _buildTableFormat()
    {
        this._dataTableColums = [
            {
                name: ['product'],
                label: _T('Product Variant'),
                hasLink: true,
                getLink: (value) =>
                {
                    return StringFormat('/products/edit-product/%s', [value.id]);
                },
                format: (value) =>
                {
                    if (value.variant === null)
                    {
                        return StringFormat(_T('<font size="3px">%s</font>'), [I18nSingletonService.getInstance().getMongoText(value.title)]);
                    }
                    else
                    {
                        let variants: string = StringFormat('<font size="2px">%s%s%s<font>', [
                            value.variant.color !== null ? '<font class="color-variant-label">' + I18nSingletonService.getInstance().getMongoText(value.variant.color.name) + '</font>': '',
                            value.variant.size !== null ? '/' + '<font class="size-variant-label">' + I18nSingletonService.getInstance().getMongoText(value.variant.size.size) + '</font>' : '',
                            value.variant.material !== null ? '/' + '<font class="material-variant-label">' + I18nSingletonService.getInstance().getMongoText(value.variant.material.material) + '</font>' : '']);

                        return StringFormat('<font size="3px">%s</font><br>%s', [I18nSingletonService.getInstance().getMongoText(value.title), variants]);
                    }
                }
            },
            { name: 'sku', label: _T('SKU')},
            { name: 'isBackorder', label: _T('When sold out'), format:(value)=> value ? _T('Continue selling') : _T('Stop selling')},
            { name: 'quantity', label: _T('Quantity'), numeric: true },
            { name: 'updatedAt', label: _T('Last Update'), format: (date) => dateFormat(date, "mmmm dS, yyyy, HH:MM:ss")}
        ];
    }
}
