/**
 * @file add-collection.component.ts
 *
 * @summary The add collection admin panel functionality.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 09 2016
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

import 'reflect-metadata';

import { Component,
         OnInit,
         ViewChild }                from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { MeteorComponent }          from 'angular2-meteor';
import { I18nSingletonService, _T } from '../../../services/i18n/i18n-singleton.service';
import { ModalComponent }           from '../../components/modal/modal.component';
import { Category }                 from '../../../../common/models';
import { CategoriesService }        from '../../../services/categories.service.ts';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-collection.component.html';
import { I18nString } from '../../../../common/models/i18n-string';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add collections to the site.
 *
 */
@Component({
    selector: 'add-collection',
    template
})
export class AddCollectionComponent extends MeteorComponent implements OnInit
{
    @ViewChild(ModalComponent)
    private _modal:                 ModalComponent;
    private _category:              Category             = new Category();
    private _i18nService:           I18nSingletonService = I18nSingletonService.getInstance();
    private _waitModalResult:       boolean              = false;
    private _isEditMode:            boolean              = false;
    private _i18nNameReferenceMap: Object               = {};
    private _i18nInfoReferenceMap:  Object               = {};

    /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _categoriesService: CategoriesService)
    {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._route.params.subscribe((params) =>
        {
            this._category._id = params['id'];

            if (!this._category._id)
            {
                this._i18nService.getSupportedLanguages().forEach((lang) =>
                {
                    let info: I18nString = new I18nString(lang);
                    let name: I18nString = new I18nString(lang);

                    this._category.name.push(name);
                    this._i18nNameReferenceMap[lang] = name;

                    this._category.info.push(info);
                    this._i18nInfoReferenceMap[lang] = info;
                });

                return;
            }

            this._categoriesService.getCategory(this._category._id).subscribe(
                (category: Category) =>
                {
                    this._category   = category;
                    this._isEditMode = true;

                    this._i18nService.getSupportedLanguages().forEach((lang) =>
                    {
                        let name: I18nString = this._category.name.find((i18nString) => i18nString.language === lang);
                        let info: I18nString = this._category.info.find((i18nString) => i18nString.language === lang);

                        if (!name)
                        {
                            name = new I18nString(lang);
                            this._category.name.push(name);
                        }

                        if (!info)
                        {
                            info = new I18nString(lang);
                            this._category.info.push(info);
                        }

                        this._i18nNameReferenceMap[lang] = name;
                        this._i18nInfoReferenceMap[lang] = info;
                    });
                });
        });
    }

    /**
     * @summary Saves the category in the database.
     */
    private _saveCategory(): void
    {
        if (!this._category.name || !this._category.info)
        {
            this._modal.show(
                _T('Please fill all the required fields.'),
                _T('Information'));

            return;
        }

        this._categoriesService.createCategory(this._category).subscribe(
            (id) =>
            {
                this._category._id    = id;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Saved!'),
                    _T('Information'));
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the category'),
                    _T('Error'));

                console.error(error);
            }
        );
    }

    /**
     * @summary Deletes the category in the database.
     */
    private _deleteCategory(): void
    {
        this._categoriesService.deleteCategory(this._category._id).subscribe(
            (id) =>
            {
                this._category._id    = id;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Deleted!'),
                    _T('Information'));
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the category'),
                    _T('Error'));

                console.error(error);
            }
        );
    }

    /**
     * @summary Saves the category in the database.
     */
    private _updateCategory(): void
    {

        if (!this._category.name || !this._category.info)
        {
            this._modal.show(
                _T('Please fill all the required fields.'),
                _T('Information'));

            return;
        }

        this._categoriesService.updateCategory(this._category).subscribe(
            () =>
            {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Updated!'),
                    _T('Information'));
            },
            (error) =>
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error updating the category'),
                    _T('Error'));

                console.error(error);
            }
        );
    }

    /**
     * @summary Cancels the operation
     */
    private _onCancel(): void
    {
        this._router.navigate(['/admin/collections']);
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

            this._router.navigate(['/admin/collections']);
        }
    }

    /**
     * @summary Gets the translation for 'Title' for the given language.
     *
     * @returns {string} The translation.
     * @private
     */
    private _getTitleTranslation(): string
    {
        return _T('Title');
    }
}
