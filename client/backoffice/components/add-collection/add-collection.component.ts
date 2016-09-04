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
import { Categories }               from '../../../../common/collections/category.collection';
import { ModalComponent }           from '../../components/modal/modal.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './add-collection.component.html';

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
    private _modal:               ModalComponent;
    private _category:            Category             = <Category>{};
    private _categoryName:        string               = '';
    private _categoryDescription: string               = '';
    private _i18nService:         I18nSingletonService = I18nSingletonService.getInstance();
    private _waitModalResult:     boolean              = false;
    private _isEditMode:          boolean              = false;

     /**
     * @summary Initializes a new instance of the AddProductComponent class.
     */
    constructor(private _router: Router, private _route: ActivatedRoute)
    {
        super();

        this._categoryName        = this._i18nService.getMongoText(this._category.name);
        this._categoryDescription = this._i18nService.getMongoText(this._category.info);
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
                return;

            this.subscribe('category', this._category._id , () =>
            {
                this._category = Categories.findOne({_id: this._category._id});

                this._categoryName        = this._i18nService.getMongoText(this._category.name);
                this._categoryDescription = this._i18nService.getMongoText(this._category.info);
                this._isEditMode          = true;
            }, true);
        });
    }

    /**
     * @summary Event triggered when the title has changed.
     *
     * @param newName The new name to be set.
     */
    private _onNameChange(newName: string): void
    {
        this._categoryName = newName;
        this._category.name = [{'language': this._i18nService.getLocale(), 'value' : this._categoryName}];
    }

    /**
     * @summary Event triggered when the description has changed.
     *
     * @param newDescription The new description to be set.
     */
    private _onDescriptionChange(newDescription: string): void
    {
        this._categoryDescription = newDescription;
        this._category.info = [{'language': this._i18nService.getLocale(), 'value' : newDescription}];
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

        this.call('categories.createCategory', this._category, (error, result) =>
        {
            if (error)
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the category'),
                    _T('Error'));

                console.error(error);
            }
            else
            {
                this._category._id    = result;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Saved!'),
                    _T('Information'));
            }
        });
    }

    /**
     * @summary Deletes the category in the database.
     */
    private _deleteCategory(): void
    {

        this.call('categories.deleteCategory', this._category._id, (error, result) =>
        {
            if (error)
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error saving the category'),
                    _T('Error'));

                console.error(error);
            }
            else
            {
                this._category._id    = result;
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Deleted!'),
                    _T('Information'));
            }
        });
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

        this.call('categories.updateCategory', this._category, (error, result) =>
        {
            if (error)
            {
                this._waitModalResult = false;

                this._modal.show(
                    _T('There was an error updating the category'),
                    _T('Error'));

                console.error(error);
            }
            else
            {
                this._waitModalResult = true;

                this._modal.show(
                    _T('Category Updated!'),
                    _T('Information'));
            }
        });
    }

    /**
     * @summary Cancels the operation
     *
     * @param event The modal closed event
     */
    private _onCancel(): void
    {
        this._router.navigate(['/admin/collections']);
    }

    /**
     * @summary Handles the modal closed event.
     *
     * @param {any} Event The modal event.
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
}
