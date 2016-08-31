/**
 * @file modal.component.ts
 *
 * @summary This is a modal component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 08 2016
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
         ViewChild,
         ElementRef,
         Output,
         EventEmitter,
         ChangeDetectorRef }  from '@angular/core';
import { IdGeneratorService } from '../../../services/id-generator.service.ts';
import { MeteorComponent }    from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './modal.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that displays a modal windows.
 */
@Component({
    selector: 'modal-message',
    template,
    providers: [IdGeneratorService]
})
export class ModalComponent extends MeteorComponent {
    @Output('onClose')
    private _onClose:  EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('toggleButton')
    private _toggle:   ElementRef;
    private _uniqueId: string = '';
    private _title:    string = '';
    private _message:  string = '';

    /**
     * @summary Initializes a new instance of the ImageDisplayComponent class.
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, private _idGenerator: IdGeneratorService) {
        super();

        this._uniqueId = _idGenerator.generate();
    }

    /**
     * @summary Shows the modal window with the given message and title.
     *
     * @param {string} message The message to be shown.
     * @param {string} title   The title to be shown.
     */
    public show(message: string, title: string) {
        this._title   = title;
        this._message = message;

        this._changeDetectorRef.detectChanges();

        this._toggle.nativeElement.click();
    }

    /**
     * @summary Event handler for the pn click event.
     *
     * @param event The event information
     */
    private _onClick(event: any) { // HACK: This is a hack to detect when the modal window is closed. Needs to be improved.
        if (event.srcElement.className === 'closing-x' ||
            event.srcElement.className === 'btn btn-primary' ||
            event.srcElement.className === 'modal fade in') {
            this._onClose.emit({});

            this._message = '';
            this._title   = '';
        }
    }
}
