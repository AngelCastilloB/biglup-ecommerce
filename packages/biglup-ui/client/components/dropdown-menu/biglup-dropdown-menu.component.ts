/**
 * @file biglup-dropdown-menu.component.ts
 *
 * @summary Polymer like dropdown menu component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 27 2016
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
         AfterViewInit,
         ViewChild,
         ContentChildren,
         OnInit,
         OnDestroy,
         ElementRef,
         Renderer,
         Output,
         EventEmitter,
         QueryList,
         ChangeDetectorRef }             from '@angular/core';
import { Observable }                    from 'rxjs/Observable';
import { BiglupDropdownOptionComponent } from './dropdown-option/biglup-dropdown-option.component';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/race';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-dropdown-menu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated dropdown menu.
 */
@Component({
    selector: 'biglup-dropdown-menu',
    template
})
export class BiglupDropdownMenuComponent implements AfterViewInit, OnInit, OnDestroy
{
    @ViewChild('list')
    private _menuList;
    @ViewChild('input')
    private _input;
    @ViewChild('container')
    private _container;
    @Input('value')
    private _value: string = null;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('title')
    private _title: string = '';
    @Input('label')
    private _label: string = '';
    private _text: string = '';
    private _touchStartSubscription:  any;
    @ContentChildren(BiglupDropdownOptionComponent)
    private _options: QueryList<BiglupDropdownOptionComponent>;
    private _selectedOption: BiglupDropdownOptionComponent;
    @Output('valueChange')
    private _valueChange = new EventEmitter();

    /**
     * @summary Initializes a new instance of the BiglupDropdownMenuComponent class.
     */
    constructor(private _el: ElementRef, private _renderer: Renderer, private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * @summary Cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy(): void
    {
        if (this._touchStartSubscription)
            this._touchStartSubscription.unsubscribe();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        let defaultSelection: boolean = true;

        this._options.forEach((option) =>
        {
            if (option.getSelected())
            {
                this._value = option.getValue();
                this._text = option.getText();
                this._valueChange.emit(this._value);
                this._selectedOption = option;

                defaultSelection = false;
            }

            option.getSelectedEmitter().subscribe((selected) =>
            {
                if (this._selectedOption)
                    this._selectedOption.setSelected(false);

                this._selectedOption = selected;
                this._value = selected.getValue();
                this._text = option.getText();
                this._valueChange.emit(this._value);

                selected.setSelected(true);
            });
        });

        if (defaultSelection && this._options && this._options.length > 0)
        {
            this._options.first.setSelected(true);

            this._selectedOption = this._options.first;
            this._value = this._options.first.getValue();
            this._text = this._options.first.getText();
            this._valueChange.emit(this._value);
        }

        this._menuList.nativeElement.style.left = this._container.nativeElement.offsetLeft + 'px';

        this._touchStartSubscription = Observable.fromEvent(
            this._el.nativeElement, 'touchstart').subscribe(() => this._input.getInputNativeElement().focus());

        this._input.setDirty();
    }

    /**
     * @summary Event handler for when the focus changes.
     *
     * @param hasFocus True if the component now has focus, otherwise, false.
     * @private
     */
    private _onFocusChange(hasFocus: boolean)
    {
        if (this._isDisabled)
            return;

        const rect: ClientRect = this._container.nativeElement.getBoundingClientRect();

        if (hasFocus)
        {
            this._menuList.nativeElement.style.visibility = 'hidden';
            this._menuList.nativeElement.style.display = 'block';
            Observable.timer(300).take(1).subscribe(
            () =>
            {
                this._menuList.nativeElement.style.visibility = 'visible';
                this._menuList.nativeElement.style.width      = rect.width + 'px';
                this._menuList.nativeElement.style.maxHeight  = '300px';
            });
        }
        else
        {
            Observable.timer(100).take(1).subscribe(
            () =>
            {
                this._menuList.nativeElement.style.width     = rect.width / 3 + 'px';
                this._menuList.nativeElement.style.maxHeight = '100px';
                this._menuList.nativeElement.style.display   = 'none';
            });
        }
    }
}
