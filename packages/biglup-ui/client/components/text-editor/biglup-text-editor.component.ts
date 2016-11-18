/**
 * @file biglup-text-editor.component.ts
 *
 * @summary A simple color picker component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 17 2016
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
         ElementRef,
         AfterViewInit,
         Input,
         Output,
         EventEmitter,
         forwardRef }           from '@angular/core';
import { DomHandlerService}     from '../../services/dom/dom-handler.service';
import { NG_VALUE_ACCESSOR,
         ControlValueAccessor } from '@angular/forms';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-text-editor.component.html';

let Quill: any = require('quill');

/* EXPORTS ************************************************************************************************************/

export const EDITOR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BiglupTextEditorComponent),
    multi: true
};

/**
 * @summary A rich text editor based oin qiall.
 */
@Component({
    selector: 'biglup-text-editor',
    template,
    providers: [EDITOR_VALUE_ACCESSOR]
})
export class BiglupTextEditorComponent implements AfterViewInit, ControlValueAccessor
{
    public onModelChange: Function = () => {};
    public onModelTouched: Function = () => {};
    @Output('onTextChange')
    private _onTextChange: EventEmitter<any> = new EventEmitter();
    @Output('onSelectionChange')
    private _onSelectionChange: EventEmitter<any> = new EventEmitter();
    @Input('style')
    private _style: any;
    @Input('styleClass')
    private _styleClass: string;
    @Input('placeholder')
    private _placeholder: string;
    @Input('readOnly')
    private _readOnly: boolean;
    @Input('formats')
    private _formats: string[];
    private _value: string;
    private _quill: any;

    /**
     * @summary Initializes a new instance of BiglupTextEditorComponent.
     *
     * @param el The element reference.
     * @param domHandler The dom handler service.
     */
    constructor(public el: ElementRef, public domHandler: DomHandlerService)
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit()
    {
        let editorElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        let toolbarElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');

        this._quill = new Quill(editorElement,
            {
            modules:
            {
                toolbar: '#toolbar'
            },
            placeholder: this._placeholder,
            readOnly: this._readOnly,
            theme: 'snow',
            formats: this._formats
        });

        if (this._value)
        {
            this._quill.pasteHTML(this._value);
        }

        this._quill.on('text-change', (delta, source) =>
        {
            let html = editorElement.children[0].innerHTML;
            let text = this._quill.getText();

            if (html === '<p><br></p>')
            {
                html = null;
            }

            this._onTextChange.emit({
                htmlValue: html,
                textValue: text,
                 delta,
                 source
            });

            this.onModelChange(html);
        });

        this._quill.on('selection-change', (range, oldRange, source) =>
        {
            this._onSelectionChange.emit({
                range,
                oldRange,
                source
            });
        });
    }

    /**
     * @summary Write a value to the text editor.
     *
     * @param value The value to be written.
     */
    public writeValue(value: any): void
    {
        this._value = value;

        if (this._quill)
        {
            if (value)
                this._quill.pasteHTML(value);
            else
                this._quill.setText('');
        }
    }

    /**
     * @summary Set the function to be called when the control receives a change event.
     * @param callback The register on change callback.
     */
    public registerOnChange(callback: Function): void
    {
        this.onModelChange = callback;
    }

    /**
     * @summary Set the function to be called when the control receives a touch event.
     * @param callback The register on touch callback.
     */
    public registerOnTouched(callback: Function): void
    {
        this.onModelTouched = callback;
    }
}
