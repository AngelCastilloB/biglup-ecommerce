/**
 * @file add-product.component.ts
 *
 * @summary The add product admin panel functionality.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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

import { Component,
         OnInit,
         AfterViewInit,
         ViewChild,
         ViewChildren,
         QueryList,
         ChangeDetectorRef }                  from '@angular/core';
import { Router, ActivatedRoute }             from '@angular/router';
import { I18nSingletonService, _T }           from 'meteor/biglup:i18n';
import { BiglupModalComponent }               from 'meteor/biglup:ui';
import { ProductsService }                    from 'meteor/biglup:business';
import { CategoriesService }                  from 'meteor/biglup:business';
import { VariantAttributesService,
         ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute }           from 'meteor/biglup:business';
import { Product, ProductVariant }            from 'meteor/biglup:business';
import { I18nString }                         from 'meteor/biglup:i18n';
import { InputFilters, BiglupInputComponent } from 'meteor/biglup:ui';
import { I18nInputComponent }                 from '../i18n-input/i18n-input.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-product.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add products to the site.
 */
@Component({
    selector: 'add-products',
    template
})
export class AddProductComponent implements OnInit, AfterViewInit
{
    @ViewChildren(I18nInputComponent)
    private _titles: QueryList<I18nInputComponent>;
    @ViewChild('skuInput')
    private _skuInput: BiglupInputComponent;
    @ViewChild('barcodeInput')
    private _barcodeInput: BiglupInputComponent;
    private _i18nService:           I18nSingletonService = I18nSingletonService.getInstance();
    private _product:               Product              = new Product();
    @ViewChild(BiglupModalComponent)
    private _modal:                 BiglupModalComponent;
    private _waitModalResult:       boolean                                      = false;
    private _isEditMode:            boolean                                      = false;
    private _isVariantsEanbled:     boolean                                      = false;
    private _i18nTitleReferenceMap: Object                                       = {};
    private _i18nDescReferenceMap:  Object                                       = {};
    private InputFilters:           InputFilters                                 = InputFilters;
    private _colorToggle:           { [key: string]: boolean; }                  = {};
    private _sizeToggle:            { [key: string]: boolean; }                  = {};
    private _materialToggle:        { [key: string]: boolean; }                  = {};
    private _colorMap:              { [key: string]: ColorVariantAttribute; }    = {};
    private _sizeMap:               { [key: string]: SizeVariantAttribute; }     = {};
    private _materialMap:           { [key: string]: MaterialVariantAttribute; } = {};

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService,
        private _changeDetector: ChangeDetectorRef,
        private _variantsService: VariantAttributesService)
    {
        this._variantsService.getColors().subscribe(
            (colors) =>
            {
                colors.forEach(
                    (colorVariantAttribute) =>
                    {
                        this._colorToggle[colorVariantAttribute._id] = false;
                        this._colorMap[colorVariantAttribute._id] = colorVariantAttribute;
                    }
                );
            });

        this._variantsService.getMaterials().subscribe(
            (materials) =>
            {
                materials.forEach(
                    (materialVariantAttribute) =>
                    {
                        this._materialToggle[materialVariantAttribute._id] = false;
                        this._materialMap[materialVariantAttribute._id] = materialVariantAttribute;
                    }
                );
            });

        this._variantsService.getSizes().subscribe(
            (sizes) =>
            {
                sizes.forEach(
                    (sizeVariantAttribute) =>
                    {
                        this._sizeToggle[sizeVariantAttribute._id] = false;
                        this._sizeMap[sizeVariantAttribute._id] = sizeVariantAttribute;
                    }
                );
            });
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._route.params.subscribe((params) =>
        {
            this._product._id = params['id'];

            if (!this._product._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let title:       I18nString = new I18nString(lang);
                    let description: I18nString = new I18nString(lang);

                    this._product.title.push(title);
                    this._i18nTitleReferenceMap[lang] = title;

                    this._product.description.push(description);
                    this._i18nDescReferenceMap[lang] = description;
                });

                this._changeDetector.detectChanges();
                return;
            }

            this._productsService.getProduct(this._product._id).subscribe(
                (product: Product) =>
                {
                    this._product    = product;
                    this._isEditMode = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let title: I18nString = this._product.title.find(
                            (i18nString) => i18nString.language === lang);

                        let description: I18nString = this._product.description.find(
                            (i18nString) => i18nString.language === lang);

                        if (!title)
                        {
                            title = new I18nString(lang);
                            this._product.title.push(<I18nString>title);
                        }

                        if (!description)
                        {
                            description = new I18nString(lang);
                            this._product.description.push(<I18nString>description);
                        }

                        this._i18nTitleReferenceMap[lang] = title;
                        this._i18nDescReferenceMap[lang]  = description;
                    });


                    if (this._product.variantProducts.length > 0)
                    {
                        this._isVariantsEanbled = true;

                        this._product.variantProducts.forEach(
                            (variant) =>
                            {
                                if (variant.color !== null)
                                    this._colorToggle[variant.color._id] = true;

                                if (variant.size !== null)
                                    this._sizeToggle[variant.size._id] = true;

                                if (variant.material !== null)
                                    this._materialToggle[variant.material._id] = true;
                            });
                    }

                    this._changeDetector.detectChanges();
                });
        });
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }

    /**
     * @summary Event triggered when a category is toggled.
     *
     * @param {string}  id        The id of the category that was toggled.
     * @param {boolean} isChecked True if the toggle was enabled, otherwise, false.
     */
    private _onCategoryToggle(id: string, isChecked: boolean): void
    {
        let index: number = this._product.categories.indexOf(id);

        if (isChecked)
        {
            if (index === -1)
                this._product.categories.push(id);
        }
        else
        {
            if (index > -1)
                this._product.categories.splice(index, 1);
        }
    }

    /**
     * @summary Gets whether the product currently belongs to the given category.
     *
     * @param {string} id The id of the category.
     * @returns {boolean} True if the product belongs to the current category, otherwise, false.
     */
    private _productHasCategory(id: string)
    {
        return this._product.categories.indexOf(id) > -1;
    }

    /**
     * @summary Saves the product in the database.
     */
    private _saveProduct(): void
    {
        let isRequieredMissing: any = this._titles.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                this._modal.show(
                    _T('Requiered Field Missing'),
                    _T('Product Title is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        if (isRequieredMissing)
            return;

        if (!this._skuInput.getValue())
        {
            this._modal.show(
                _T('Requiered Field Missing'),
                _T('Product SKU (Stock Keeping Unit) is required'));

            return;
        }

        if (!this._barcodeInput.getValue())
        {
            this._modal.show(
                _T('Requiered Field Missing'),
                _T('Product barcode is required'));

            return;
        }

        // Fixes number types.
        this._product.price = Number.parseFloat(this._product.price.toString());
        this._product.discount = Number.parseFloat(this._product.discount.toString());
        this._product.stock = Number.parseFloat(this._product.stock.toString());

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Create Product'),
            _T('Creating...'),
            this._productsService.createProduct(this._product),
            {
                title:   _T('Create Product'),
                message: _T('Product Created.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error creating the product.')
            },
        );
    }

    /**
     * @summary Deletes the product in the database.
     */
    private _deleteProduct(): void
    {
        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Delete Product'),
            _T('Deleting...'),
            this._productsService.deteleProduct(this._product._id),
            {
                title:   _T('Delete Product'),
                message: _T('Product Deleted.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error deleting the product.')
            },
        );
    }

    /**
     * @summary Updates the product in the database.
     */
    private _updateProduct(): void
    {
        let isRequieredMissing: any = this._titles.toArray().find((i18nInput: I18nInputComponent) =>
        {
            if (!i18nInput.getIsValid())
            {
                console.error('Show Title message');
                this._modal.show(
                    _T('Required Field Missing'),
                    _T('The Product Title is required ') + '(' + i18nInput.getLanguage() + ')');
            }

            return !i18nInput.getIsValid();
        });

        if (isRequieredMissing)
            return;

        if (!this._skuInput.getValue())
        {
            this._modal.show(
                _T('Required Field Missing'),
                _T('Product SKU (Stock Keeping Unit) is required'));

            return;
        }

        if (!this._barcodeInput.getValue())
        {
            this._modal.show(
                _T('Required Field Missing'),
                _T('Product barcode is required'));

            return;
        }

        // Fix number types.
        this._product.price = Number.parseFloat(this._product.price.toString());
        this._product.discount = Number.parseFloat(this._product.discount.toString());
        this._product.stock = Number.parseFloat(this._product.stock.toString());

        this._waitModalResult = true;

        this._modal.showObservable(
            _T('Update Product'),
            _T('Updating...'),
            this._productsService.updateProduct(this._product),
            {
                title:   _T('Update Product'),
                message: _T('Product Updated.')
            },
            {
                title:   _T('Error'),
                message: _T('There was an error updating the product.')
            },
        );
    }

    /**
     * @summary Cancels the operation
     */
    private _onCancel(): void
    {
        this._router.navigate(['/admin/products']);
    }

    /**
     * @summary Handles the modal closed event.
     *
     * @param event The modal closed event
     */
    private _onModalClosed(event: any): void
    {
        if (this._waitModalResult)
        {
            this._waitModalResult = false;

            this._router.navigate(['/admin/products']);
        }
    }

    /**
     * @summary enables the variants.
     * @private
     */
    private _setEnableVariants(enable: boolean)
    {
        this._isVariantsEanbled = enable;

        if (!this._isVariantsEanbled)
        {
            this._product.variantProducts = [];

            for (var key in this._colorToggle)
                this._colorToggle[key] = false;

            for (var key in this._sizeToggle)
                this._sizeToggle[key] = false;

            for (var key in this._materialToggle)
                this._materialToggle[key] = false;
        }

        this._changeDetector.detectChanges();
    }

    /**
     * @summary Event handler for when a variant attribute changes.
     * @private
     */
    private _onVariantAttributeChanged()
    {
        const toggledColors: [ColorVariantAttribute] = this._filterColorMap(this._colorToggle);
        const toggledSizes: [SizeVariantAttribute] = this._filterSizeMap(this._sizeToggle);
        const toggledMaterials: [MaterialVariantAttribute] = this._filterMaterialMap(this._materialToggle);

        let tempVariants: Array<ProductVariant> = this._product.variantProducts;

        this._product.variantProducts = [];

        if (toggledColors.length === 0 && toggledSizes.length > 0 && toggledMaterials.length > 0)
        {
            toggledSizes.forEach(
                (sizeVariantAttribute) =>
                {
                    toggledMaterials.forEach(
                        (materialVariantAttribute) =>
                        {
                            let variant = tempVariants.find(
                                (variant) =>
                                    variant.color === null &&
                                    variant.size !== null && variant.size._id === sizeVariantAttribute._id &&
                                    variant.material !== null && variant.material._id === materialVariantAttribute._id);

                            if (variant)
                            {
                                this._product.variantProducts.push(variant);
                            }
                            else
                            {
                                this._product.variantProducts.push(
                                    new ProductVariant('', '', null, sizeVariantAttribute, materialVariantAttribute));
                            }
                        });
                });
        }
        else if (toggledColors.length > 0 && toggledSizes.length === 0 && toggledMaterials.length > 0)
        {
            toggledColors.forEach(
                (colorVariantAttribute) =>
                {
                    toggledMaterials.forEach(
                        (materialVariantAttribute) =>
                        {
                            let variant = tempVariants.find(
                                (variant) =>
                                variant.color !== null && variant.color._id === colorVariantAttribute._id &&
                                variant.size === null &&
                                variant.material !== null && variant.material._id === materialVariantAttribute._id);

                            if (variant)
                            {
                                this._product.variantProducts.push(variant);
                            }
                            else
                            {
                                this._product.variantProducts.push(
                                    new ProductVariant('', '', colorVariantAttribute, null, materialVariantAttribute));
                            }
                        });
                });
        }
        else if (toggledColors.length > 0 && toggledSizes.length > 0 && toggledMaterials.length === 0)
        {
            toggledColors.forEach(
                (colorVariantAttribute) =>
                {
                    toggledSizes.forEach(
                        (sizeVariantAttribute) =>
                        {
                            let variant = tempVariants.find(
                                (variant) =>
                                variant.color !== null && variant.color._id === colorVariantAttribute._id &&
                                variant.size !== null && variant.size._id === sizeVariantAttribute._id &&
                                variant.material === null);

                            if (variant)
                            {
                                this._product.variantProducts.push(variant);
                            }
                            else
                            {
                                this._product.variantProducts.push(
                                    new ProductVariant('', '', colorVariantAttribute, sizeVariantAttribute, null));
                            }
                        });
                });
        }
        else if (toggledColors.length === 0 && toggledSizes.length === 0 && toggledMaterials.length > 0)
        {
            toggledMaterials.forEach(
                (materialVariantAttribute) =>
                {
                    let variant = tempVariants.find(
                        (variant) =>
                        variant.color === null &&
                        variant.size === null &&
                        variant.material !== null && variant.material._id === materialVariantAttribute._id);

                    if (variant)
                    {
                        this._product.variantProducts.push(variant);
                    }
                    else
                    {
                        this._product.variantProducts.push(
                            new ProductVariant('', '', null, null, materialVariantAttribute));
                    }
                });
        }
        else if (toggledColors.length === 0 && toggledSizes.length > 0 && toggledMaterials.length === 0)
        {
            toggledSizes.forEach(
                (sizeVariantAttribute) =>
                {
                    let variant = tempVariants.find(
                        (variant) =>
                        variant.color === null &&
                        variant.size !== null && variant.size._id === sizeVariantAttribute._id &&
                        variant.material === null);

                    if (variant)
                    {
                        this._product.variantProducts.push(variant);
                    }
                    else
                    {
                        this._product.variantProducts.push(
                            new ProductVariant('', '', null, sizeVariantAttribute, null));
                    }
                });
        }
        else if (toggledColors.length > 0 && toggledSizes.length === 0 && toggledMaterials.length === 0)
        {
            toggledColors.forEach(
                (colorVariantAttribute) =>
                {
                    let variant = tempVariants.find(
                        (variant) =>
                        variant.color !== null && variant.color._id === colorVariantAttribute._id &&
                        variant.size === null &&
                        variant.material === null);

                    if (variant)
                    {
                        this._product.variantProducts.push(variant);
                    }
                    else
                    {
                        this._product.variantProducts.push(
                            new ProductVariant('', '', colorVariantAttribute, null, null));
                    }
                });
        }
        else
        {
            toggledColors.forEach(
                (colorVariantAttribute) =>
                {
                    toggledSizes.forEach(
                        (sizeVariantAttribute) =>
                        {
                            toggledMaterials.forEach(
                                (materialVariantAttribute) =>
                                {
                                    let variant = tempVariants.find(
                                        (variant) =>
                                        variant.color !== null && variant.color._id === colorVariantAttribute._id &&
                                        variant.size !== null && variant.size._id === sizeVariantAttribute._id &&
                                        variant.material !== null && variant.material._id === materialVariantAttribute._id);

                                    if (variant)
                                    {
                                        this._product.variantProducts.push(variant);
                                    }
                                    else
                                    {
                                        this._product.variantProducts.push(
                                            new ProductVariant(
                                                '',
                                                '',
                                                colorVariantAttribute,
                                                sizeVariantAttribute,
                                                materialVariantAttribute));
                                    }
                                });
                        });
                });
        }

        this._changeDetector.detectChanges();
    }

    /**
     * @summary Gets the color variant attributes that are toggled..
     *
     * @param map The toggle map
     *
     * @return [ColorVariantAttribute] The array of color variant attributes.
     * @private
     */
    private _filterColorMap(map: any): [ColorVariantAttribute]
    {
        let array: [ColorVariantAttribute] = <[ColorVariantAttribute]>[];

        for (let key in map)
        {
            if (map.hasOwnProperty(key))
            {
                if (map[key])
                    array.push(this._colorMap[key]);
            }
        }

        return array;
    }

    /**
     * @summary Gets the size variant attributes that are toggled..
     *
     * @param map The toggle map
     *
     * @return [SizeVariantAttribute] The array of size variant attributes.
     * @private
     */
    private _filterSizeMap(map: any): [SizeVariantAttribute]
    {
        let array: [SizeVariantAttribute] = <[SizeVariantAttribute]>[];

        for (let key in map)
        {
            if (map.hasOwnProperty(key))
            {
                if (map[key])
                    array.push(this._sizeMap[key]);
            }
        }

        return array;
    }

    /**
     * @summary Gets the material variant attributes that are toggled..
     *
     * @param map The toggle map
     *
     * @return [MaterialVariantAttribute] The array of material variant attributes.
     * @private
     */
    private _filterMaterialMap(map: any): [MaterialVariantAttribute]
    {
        let array: [MaterialVariantAttribute] = <[MaterialVariantAttribute]>[];

        for (let key in map)
        {
            if (map.hasOwnProperty(key))
            {
                if (map[key])
                    array.push(this._materialMap[key]);
            }
        }

        return array;
    }
}
