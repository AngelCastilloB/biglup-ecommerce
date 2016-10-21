/**
 * @file biglup-input.component.ts
 *
 * @summary Polymer like input component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 21 2016
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
         Input,
         ElementRef,
         Renderer,
         ViewChild,
         ChangeDetectorRef,
         OnInit,
         AfterViewInit }    from '@angular/core';
import { Observable }       from 'rxjs/Observable';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-input.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated button.
 */
@Component({
    selector: 'biglup-input',
    template
})
export class BiglupInputComponent implements OnInit, AfterViewInit
{
    @ViewChild('input')
    private _input: ElementRef;
    @ViewChild('hint')
    private _hintElement: ElementRef;
    @Input('name')
    private _name: string = '';
    @Input('hint')
    private _hint: string = '';
    @Input('errorMessage')
    private _errorMessage: string = '';
    @Input('invalid')
    private _invalid: boolean = false;
    @Input('floatingHint')
    private _floatingHint: boolean = false;
    @Input('value')
    private _value: string = '';
    @Input('isPassword')
    private _isPassword: boolean = false;
    @Input('disabled')
    private _isDisabled: boolean = false;

    /**
     * @summary Initializes a new instance of the BiglupInputComponent class.
     * @param _el              The element this attribute will enhance.
     * @param _changeDetector  A reference to the angular change detector engine.
     * @param _renderer        The renderer.
     */
    constructor(private _el: ElementRef, private _renderer: Renderer, private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._updateStateFromDom();
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        // HACK: Chrome wont feed the autofilled value if the input element is of type password for security reasons.
        // This breaks out input element style when the password is autofilled since we cant mark our element dirty,
        // This hack allow us to identify if chrome has autofilled a password input element and style it correctly
        // even tho we still havent receive the value.
        Observable.of(null).delay(1000).subscribe(() =>
        {
            let autofilled: boolean = false;
            try
            {
                autofilled = !!this._input.nativeElement
                    .parentElement.querySelector('input[type=password]:-webkit-autofill');
            }
            catch (error)
            {
                try
                {
                    autofilled = !!this._input.nativeElement
                        .parentElement.querySelector('input[type=password]:autofill');
                }
                catch (error)
                {
                }
            }

            if (autofilled)
            {
                this._renderer.setElementClass(this._input.nativeElement, 'dirty', true);

                this._renderer.setElementStyle(
                    this._hintElement.nativeElement, 'visibility', !this._floatingHint ? 'hidden' : 'visible');
            }
        });
    }

    /**
     * @summary Key down event handler for the input field.
     * @param event The key down event
     */
    private _onKeyDown(event: any)
    {
        if (event.keyCode === 8 || event.keyCode === 46 && this._value === '')
            return;

        this._renderer.setElementStyle(
            this._hintElement.nativeElement, 'visibility', !this._floatingHint ? 'hidden' : 'visible');
    }

    /**
     * @summary Change event handler for the input field.
     * @param event The key up event
     */
    private _onChange(event: any)
    {
        this._updateStateFromDom();
    }

    /**
     * @summary Updates the state from the input DOM.
     */
    private _updateStateFromDom()
    {
        if (this._value !== '')
        {
            this._renderer.setElementClass(this._input.nativeElement, 'dirty', true);

            this._renderer.setElementStyle(
                this._hintElement.nativeElement, 'visibility', !this._floatingHint ? 'hidden' : 'visible');
        }
        else
        {
            this._renderer.setElementClass(this._input.nativeElement, 'dirty', false);
            this._renderer.setElementStyle(this._hintElement.nativeElement, 'visibility', 'visible');
        }

        this._changeDetector.detectChanges();
    }
}
