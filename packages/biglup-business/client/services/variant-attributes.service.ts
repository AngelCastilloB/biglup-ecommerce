/**
 * @file variant-attributes.service.ts.
 *
 * @summary Implementation of the categories service.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 22, 2016
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

import { VariantColors,
         VariantMaterials,
         VariantSizes }             from '../../common/collections/variant-attributes.collections';
import { Injectable }               from '@angular/core';
import { BehaviorSubject }          from 'rxjs/BehaviorSubject';
import { Observable }               from 'rxjs/Observable';
import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute } from '../../common/models';
import { I18nString }               from 'meteor/biglup:i18n';
import { MeteorReactive }           from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services retrieves all the variant attributes along with its relational information from other collections.
 */
@Injectable()
export class VariantAttributesService extends MeteorReactive
{
    private _colors:    Array<ColorVariantAttribute>    = Array<ColorVariantAttribute>();
    private _sizes:     Array<SizeVariantAttribute>     = Array<I18nString>();
    private _materials: Array<MaterialVariantAttribute> = Array<I18nString>();

    private _colorsStream:   any = new BehaviorSubject<Array<ColorVariantAttribute>>(Array<ColorVariantAttribute>());
    private _sizesStream:    any = new BehaviorSubject<Array<SizeVariantAttribute>>(Array<SizeVariantAttribute>());
    private _materialStream: any = new BehaviorSubject<Array<MaterialVariantAttribute>>(Array<MaterialVariantAttribute>());

    /**
     * @summary Initializes a new instance of the CategoriesService class.
     */
    constructor()
    {
        super();

        this.subscribe('variant-colors', () =>
        {
            this.autorun(() =>
            {
                this._colors = VariantColors.find().fetch();
                this._colorsStream.next(this._colors);
            }, true);
        });

        this.subscribe('variant-sizes', () =>
        {
            this.autorun(() =>
            {
                this._sizes = VariantSizes.find().fetch();
                this._sizesStream.next(this._sizes);
            }, true);
        });

        this.subscribe('variant-materials', () =>
        {
            this.autorun(() =>
            {
                this._materials = VariantMaterials.find().fetch();
                this._materialStream.next(this._materials);
            }, true);
        });
    }

    /**
     * @summary Returns all the available product variant colors.
     *
     * @returns {Observable<Array<ColorVariantAttribute>>} The observable list of product variant colors.
     */
    public getColors(): Observable<Array<ColorVariantAttribute>>
    {
        return this._colorsStream.distinctUntilChanged();
    }

    /**
     * @summary Gets one color given its id.
     *
     * @param id The id of the color to be found.
     *
     * @returns {Observable<ColorVariantAttribute>} The ColorVariantAttribute observable.
     */
    public getColor(id: string): Observable<ColorVariantAttribute>
    {
        return Observable.create(observer => {
            this.subscribe('variant-colors', id, () =>
            {
                let variantColor: ColorVariantAttribute = VariantColors.findOne({_id: id});

                if (!variantColor)
                {
                    observer.error('Color not found');
                    return;
                }

                observer.next(variantColor);
                observer.complete();
            });
        });
    }

    /**
     * @summary Returns all the available product variant sizes.
     *
     * @returns {Observable<Array<SizeVariantAttribute>>} The observable list of product variant sizes.
     */
    public getSizes(): Observable<Array<SizeVariantAttribute>>
    {
        return this._sizesStream.distinctUntilChanged();
    }

    /**
     * @summary Gets one size given its id.
     *
     * @param id The id of the size to be found.
     *
     * @returns {Observable<SizeVariantAttribute>} The SizeVariantAttribute observable.
     */
    public getSize(id: string): Observable<SizeVariantAttribute>
    {
        return Observable.create(observer => {
            this.subscribe('variant-sizes', id , () =>
            {
                let variantSize: SizeVariantAttribute = VariantSizes.findOne({_id: id});

                if (!variantSize)
                {
                    observer.error('Size not found');
                    return;
                }

                observer.next(variantSize);
                observer.complete();
            });
        });
    }

    /**
     * @summary Returns all the available product variant materials.
     *
     * @returns {Observable<Array<MaterialVariantAttribute>>} The observable list of product variant materials.
     */
    public getMaterials(): Observable<Array<MaterialVariantAttribute>>
    {
        return this._materialStream.distinctUntilChanged();
    }

    /**
     * @summary Gets one material given its id.
     *
     * @param id The id of the material to be found.
     *
     * @returns {Observable<MaterialVariantAttribute>} The MaterialVariantAttribute observable.
     */
    public getMaterial(id: string): Observable<MaterialVariantAttribute>
    {
        return Observable.create(observer => {
            this.subscribe('variant-materials', id , () =>
            {
                let variantMaterial: MaterialVariantAttribute = VariantMaterials.findOne({_id: id});

                if (!variantMaterial)
                {
                    observer.error('Material not found');
                    return;
                }

                observer.next(variantMaterial);
                observer.complete();
            });
        });
    }

    /**
     * @summary Creates a new color attribute.
     *
     * @param colorAttribute The product color variant to be created in the database.
     */
    public createColors(colorAttribute: ColorVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('createColorAttribute', colorAttribute, (error, result) =>
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
     * @summary Creates a new size attribute.
     *
     * @param sizeAttribute The product size variant to be created in the database.
     */
    public createSizes(sizeAttribute: SizeVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('createSizeAttribute', sizeAttribute, (error, result) =>
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
     * @summary Creates a new material attribute.
     *
     * @param materialAttribute The product material variant to be created in the database.
     */
    public createMaterials(materialAttribute: MaterialVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('createMaterialAttribute', materialAttribute, (error, result) =>
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
     * @summary Updates a color attribute.
     *
     * @param colorAttribute The color attribute to be updated in the database.
     */
    public updateColor(colorAttribute: ColorVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('updateColorAttribute', colorAttribute, (error, result) =>
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
     * @summary Updates a size attribute.
     *
     * @param sizeAttribute The size attribute to be updated in the database.
     */
    public updateSizes(sizeAttribute: SizeVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('updateSizeAttribute', sizeAttribute, (error, result) =>
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
     * @summary Updates a material attribute.
     *
     * @param materialAttribute The material attribute to be updated in the database.
     */
    public updateMaterial(materialAttribute: MaterialVariantAttribute): Observable<string>
    {
        return Observable.create(observer => {
            this.call('updateMaterialAttribute', materialAttribute, (error, result) =>
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
     * @summary Deletes the given color attribute from the database.
     *
     * @param id The color Id.
     *
     * @return {Observable} a new cold observable
     */
    public deleteColor(id: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteColorAttribute', id, (error, result) =>
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
     * @summary Deletes the given size attribute from the database.
     *
     * @param id The size Id.
     *
     * @return {Observable} a new cold observable
     */
    public deleteSize(id: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteSizeAttribute', id, (error, result) =>
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
     * @summary Deletes the given material attribute from the database.
     *
     * @param id The material Id.
     *
     * @return {Observable} a new cold observable
     */
    public deleteMaterial(id: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteMaterialAttribute', id, (error, result) =>
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
