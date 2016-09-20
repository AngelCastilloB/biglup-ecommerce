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
import { MeteorComponent }    from 'angular2-meteor';
import {_T }                  from '../../../services/i18n/i18n-singleton.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './modal.component.html';
import { Observable } from 'rxjs';

// CONSTANTS **********************************************************************************************************/

const MODAL_STATE_HIDDEN  = 'hidden';
const MODAL_STATE_SHOWING = 'showing';

// ENUMS **************************************************************************************************************/

/**
 * @summary The modal window type.
 */
export enum ModalType
{
    Success     = 0,
    Error       = 1,
    Waiting     = 2,
    Warning     = 3,
    Information = 4
}

/**
 * @summary The modal result.
 */
export enum ModalResult
{
    Ok       = 0,
    Cancel   = 1,
    Yes      = 2,
    No       = 3,
    Continue = 4,
    None     = 5
}

/**
 * @summary The modal buttons.
 */
export enum ModalButtons
{
    None           = 0,
    Ok             = 1,
    Cancel         = 2,
    CancelOk       = 3,
    CancelContinue = 4,
    NoYes          = 5
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that displays a modal windows. The modal will remain open until the user inputs a response.
 */
@Component({
    selector: 'modal-message',
    template,
    styleUrls: ['./modal.component.css'],
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
    private _onClose:      EventEmitter<ModalResult> = new EventEmitter<ModalResult>();
    private _title:        string                    = '';
    private _message:      string                    = '';
    private _state:        string                    = MODAL_STATE_HIDDEN;
    private _type:         ModalType                 = ModalType.Information;
    private _buttons:      ModalButtons              = ModalButtons.Ok;
    private _busy:         Boolean                   = false;
    private _subscription: any;

    // HACK: Allows to use ModalType, ModalResult & ModalButtons in template
    private ModalType    = ModalType;
    private ModalResult  = ModalResult;
    private ModalButtons = ModalButtons;

    /**
     * @summary Initializes a new instance of the ModalComponent class.
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef)
    {
        super();
    }

    /**
     * @summary Shows the modal window with the given message and title.
     *
     * @param {string}       title   The title to be shown.
     * @param {string}       message The message to be shown.
     * @param {ModalType}    type    The type of modal windows to be displayed.
     * @param {ModalButtons} buttons The buttons to be displayed on the modal.
     */
    public show(
        title: string,
        message: string,
        type: ModalType = ModalType.Information,
        buttons: ModalButtons = ModalButtons.Ok)
    {
        if (this._busy)
            return;

        this._title   = title;
        this._message = message;
        this._type    = type;
        this._buttons = buttons;

        this._changeDetectorRef.detectChanges();

        this._state = MODAL_STATE_SHOWING;
    }

    /**
     * @summary Executes a given observable and shows a successful message if the observable completes, otherwise,
     * shows an error message.
     *
     * @param title          The title of the modal to be shown.
     * @param message        The message on the modal.
     * @param observable     The observable to be executed.
     * @param successOptions The modal options to be used when the observable completes.
     * @param errorOptions   The modal options to be used if the observable fails.
     */
    public showObservable(
        title: string,
        message: string,
        observable: Observable<any>,
        successOptions: { title: string, message: string },
        errorOptions: { title: string, message: string })
    {
        if (this._busy)
            return;

        this._busy    = true;
        this._title   = title;
        this._message = message;
        this._type    = ModalType.Waiting;
        this._buttons = ModalButtons.Cancel;

        this._subscription = observable.subscribe(
            () => {},
            (error) =>
            {
                console.error(error);

                this._title        = errorOptions.title;
                this._message      = errorOptions.message;
                this._type         = ModalType.Error;
                this._buttons      = ModalButtons.Ok;
                this._busy         = false;
                this._subscription = null;

                this._changeDetectorRef.detectChanges();
            },
            () =>
            {
                this._title        = successOptions.title;
                this._message      = successOptions.message;
                this._type         = ModalType.Success;
                this._buttons      = ModalButtons.Ok;
                this._busy         = false;
                this._subscription = null;

                this._changeDetectorRef.detectChanges();
            }
        );

        this._changeDetectorRef.detectChanges();

        this._state = MODAL_STATE_SHOWING;
    }

    /**
     * @summary Event handler for the button click event.
     *
     * @param result The user input result on the modal.
     */
    private _onButtonClick(result: ModalResult)
    {
        if (this._busy && result === ModalResult.Cancel && this._subscription)
        {
            this._subscription.unsubscribe();

            this._busy    = false;
            this._message = _T('The operation was canceled!');
            this._type    = ModalType.Warning;
            this._buttons = ModalButtons.Ok;

            this._changeDetectorRef.detectChanges();

            return;
        }

        this._subscription = null;
        this._message      = '';
        this._title        = '';
        this._state        = MODAL_STATE_HIDDEN;
        this._type         = ModalType.Information;
        this._buttons      = ModalButtons.Ok;

        this._onClose.emit(result);
    }
}
