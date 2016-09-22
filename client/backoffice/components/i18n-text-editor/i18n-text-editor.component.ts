/**
 * @file category-i18n.component.ts
 *
 * @summary This is the category internationalization component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 12 2016
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
         Input,
         EventEmitter,
         Output }          from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';
import { I18nString }      from '../../../../common/models';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows to display/edit the internationalization content of a i18n string in an text editor.
 */
@Component({
    selector: 'i18n-text-editor',
    template: `<text-editor [(model)]="_model.value"></text-editor>`
})
export class I18nTextEditorComponent extends MeteorComponent
{
    @Output('modelChange')
    private _modelUpdate = new EventEmitter();
    @Input('model')
    private _model: I18nString = new I18nString();

    /**
     * @summary Initializes a new instance of the CategoryI18nComponent class.
     */
    constructor()
    {
        super();
    }
}

