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
         OnDestroy,
         ViewChild }                from '@angular/core';
import { Router }                   from '@angular/router';
import { ProductsService, Product } from 'meteor/biglup:business';
import { _T, I18nSingletonService } from 'meteor/biglup:i18n';
import { StringFormat }             from 'meteor/biglup:core';
import { BiglupModalComponent,
         BiglupModalType,
         BiglupModalButtons,
         BiglupModalResult }        from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './inventory.component.html';

// INTERFACES *********************************************************************************************************/

/**
 * @summary The product item structure.
 */
export interface ProductItem
{
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
export class InventoryComponent implements OnDestroy
{
    @ViewChild(BiglupModalComponent)
    private _modal:            BiglupModalComponent;
    private _dataTableColums:  any = {};
    private _i18nSubscription: any;
    private _productItems:     Array<ProductItem> = [];
    private _subscription:     any;

    /**
     * @summary Initializes a new instance of the InventoryComponent class.
     */
    constructor(private _router: Router, private _productsService: ProductsService)
    {
        this._buildTableFormat();
        this._i18nSubscription = I18nSingletonService.getInstance().getLocaleChangeEmitter().subscribe(() => this._buildTableFormat());

        this._subscription = this._productsService.getProducts().subscribe((products)=>
        {
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
                            this._productItems.push(
                            {
                                product: { id: product._id, title: product.title, variant: variant },
                                sku: product.sku,
                                isBackorder: product.isBackorder,
                                quantity: variant.stock
                            })
                        }
                    });
                }
                else
                {
                    this._productItems.push(
                        {
                            product: { id: product._id, title: product.title, variant: null },
                            sku: product.sku,
                            isBackorder: product.isBackorder,
                            quantity: product.stock
                        })
                }
            });
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
                name: ['product'], label: _T('Product Variant'), format: (value) =>
                {
                    if (value.variant === null)
                    {
                        return StringFormat(_T('<a href="%s">%s</a>'), [value.id, I18nSingletonService.getInstance().getMongoText(value.title)]);
                    }
                    else
                    {
                        let variants: string = StringFormat('%s%s%s', [
                            value.variant.color !== null ? I18nSingletonService.getInstance().getMongoText(value.variant.color.name) : '',
                            value.variant.size !== null ? '/' + I18nSingletonService.getInstance().getMongoText(value.variant.size.size) : '',
                            value.variant.material !== null ? '/' + I18nSingletonService.getInstance().getMongoText(value.variant.material.material) : '']);

                        return StringFormat(_T('<a href="/admin/products/edit-product/%s">%s<br>%s</a>'), [value.id, I18nSingletonService.getInstance().getMongoText(value.title), variants]);
                    }
                }
            },
            { name: 'sku', label: _T('SKU')},
            { name: 'isBackorder', label: _T('When sold out'), format:(value)=> value ? _T('Continue selling') : _T('Stop selling')},
            { name: 'quantity', label: _T('Quantity'), numeric: true}
        ];
    }
}
