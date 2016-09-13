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
         Output,
         EventEmitter,
         ChangeDetectorRef,
         trigger,
         state,
         style,
         transition,
         animate,
         keyframes }          from '@angular/core';
import { IdGeneratorService } from '../../../services/id-generator.service.ts';
import { MeteorComponent }    from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './modal.component.html';

// CONSTANTS **********************************************************************************************************/

const MODAL_STATE_HIDDEN  = 'hidden';
const MODAL_STATE_SHOWING = 'showing';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that displays a modal windows.
 */
@Component({
    selector: 'modal-message',
    template,
    styleUrls:['./modal.component.css'],
    animations: [
        trigger('modalBackground', [
            state(MODAL_STATE_HIDDEN, style({
                display: 'none',
            })),
            state(MODAL_STATE_SHOWING, style({
                display: 'block',
            })),
            transition('hidden => showing', [
                animate(50)
            ]),
            transition('showing => hidden', [
                animate(50)
            ])
        ]),
        trigger('modal', [
            state(MODAL_STATE_HIDDEN, style({
                display: 'none',
                transform: 'scale(0)',
            })),
            state(MODAL_STATE_SHOWING, style({
                display: 'block',
                transform: 'scale(1)',
            })),
            transition('hidden => showing', [
                style({
                    transform: 'translateY(-100%)'
                }),
                animate(400, keyframes([
                    style({transform: 'scale(0.7)', offset: 0}),
                    style({transform: 'scale(1.05)', offset: 0.45}),
                    style({transform: 'scale(0.95)', offset: 0.8}),
                    style({transform: 'scale(1)', offset: 1.0})
                ]))
            ]),
            transition('showing => hidden', [
                style({transform: 'translateY(100%)'}),
                animate(100)
            ])
        ])
    ]
})
export class ModalComponent extends MeteorComponent
{
    @Output('onClose')
    private _onClose:  EventEmitter<any> = new EventEmitter<any>();
    private _uniqueId: string = '';
    private _title:    string = '';
    private _message:  string = '';
    private _state:    string = MODAL_STATE_HIDDEN;

    /**
     * @summary Initializes a new instance of the ImageDisplayComponent class.
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, private _idGenerator: IdGeneratorService)
    {
        super();

        this._uniqueId = _idGenerator.generate();
    }

    /**
     * @summary Shows the modal window with the given message and title.
     *
     * @param {string} message The message to be shown.
     * @param {string} title   The title to be shown.
     */
    public show(message: string, title: string)
    {
        this._title   = title;
        this._message = message;

        this._changeDetectorRef.detectChanges();

        this._state = MODAL_STATE_SHOWING;
    }

    /**
     * @summary Event handler for the pn click event.
     *
     * @param event The event information
     */
    private _onClick(event: any)
    {
        this._onClose.emit({});

        this._message = '';
        this._title   = '';
        this._state   = MODAL_STATE_HIDDEN;
    }
}
