/**
 * @file designer.component.ts
 *
 * @summary The designer component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 21 2017
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
         Input,
         Output,
         EventEmitter }                              from '@angular/core';
import { Appearance, LogoImage, AppearancesService } from 'meteor/biglup:business';
import { ImageMimeTypeHelper }                       from 'meteor/biglup:images';
import { BiglupModalType,
         BiglupModalButtons }                        from '../internals/components/modal/biglup-modal.component';
import { I18nSingletonService, _T }                  from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './designer.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows yo to modify.
 */
@Component({
    selector: 'designer',
    template
})
export class DesignerComponent implements OnInit, OnDestroy
{
    @Input('appearance')
    private _appearance: Appearance;
    @Output('showMessage')
    private _showMessage: EventEmitter<any> = new EventEmitter<any>();

    /**
     * @summary Initializes a new instance of the DesignerComponent class.
     */
    constructor(private _appearancesService: AppearancesService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
    }

    /**
     * @summary Event handler for when a new logo is selected.
     *
     * @param file  The new selected logo.
     * @param input The input element.
     */
    private _onFileSelected(file, input: HTMLInputElement)
    {
        if (input.value == null)
            return false;

        if (file.length < 1)
            return false;

        let copy = file[0];

        input.value = null;

        if (!ImageMimeTypeHelper.isMimeTypeValid(copy.type))
        {
            this._showMessage.emit({
                title: _T('Invalid Format'),
                message: _T('The format of the selected image is not supported.'),
                type: BiglupModalType.Warning,
                buttons: BiglupModalButtons.Ok
            });

            return false;
        }

        let image = new LogoImage('', '', false, copy);

        this._appearancesService.updateLogo(image);

        return false;
    }
}
