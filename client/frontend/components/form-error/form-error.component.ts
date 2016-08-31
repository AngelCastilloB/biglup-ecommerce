/**
 * @file form-error.component.ts.
 *
 * @summary Generic error messages intended for general forms.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 20 2016
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

import { Component, Input, OnInit } from '@angular/core';
import { IdGeneratorService }       from '../../../services/id-generator.service';

// EXPORTS ************************************************************************************************************/

/**
 * @summary custom component intended as a simple error display message in forms.
 */
@Component({
    selector: 'form-error',
    providers: [IdGeneratorService],
    template: `<div [id]="_getId()" class="font-italic" [ngClass]="classes">
                  {{ message }}
               </div>`
})
export class FormErrorComponent implements OnInit
{
    /**
     * @summary custom id when provided, appended with -form-error.
     */
    @Input()
    public formId: string;

    /**
     * @summary custom classes from up the chain.
     */
    @Input()
    public classes: string;

    /**
     * @summary the error message in clear text.
     */
    @Input()
    public message: string;

    /**
     * @summary random id in case none is provided.
     */
    private _randomId: string;

    constructor(private _idGenerator: IdGeneratorService)
    {
    }

    public ngOnInit()
    {
        this._randomId = this._idGenerator.generate();
    }

    /**
     * @summary Appends -form-error to the current id.
     *
     * @returns {string}
     * @private
     */
    private _getId()
    {
        const id = this.formId || this._randomId;

        return `${id}-form-error`;
    }
}
