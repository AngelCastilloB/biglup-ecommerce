/**
 * @file text-editor.component.ts
 *
 * @summary This is a simple WYSIWYG editor component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 03 2016
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

import { Component, ViewChild } from '@angular/core';
import { MeteorComponent }      from 'angular2-meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template    from './text-editor.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is a simple WYSIWYG text editor.
 */
@Component({
    selector: 'text-editor',
    template,
    styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent extends MeteorComponent
{
    @ViewChild('editable')
    private _editableArea;
    private _boldToggle:          boolean       = false;
    private _italicToggle:        boolean       = false;
    private _underlineToggle:     boolean       = false;
    private _strikethroughToggle: boolean       = false;
    private _justifyLeftToggle:   boolean       = false;
    private _justifyCenterToggle: boolean       = false;
    private _justifyRightToggle:  boolean       = false;
    private _justifyFullToggle:   boolean       = false;

    private _sizes:               Array<number> = Array<number>();

    /**
     * @summary Initializes a new instance of the TextEditorComponent class.
     */
    constructor() {
        super();

        for (let i: number = 8; i < 97; ++i)
            this._sizes.push(i);
    }

    /**
     * @summary Event handler for the bold toggle.
     *
     * @private
     */
    private _onBold()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('bold');
        this._boldToggle = document.queryCommandState('bold');
    }

    /**
     * @summary Event handler for the italic toggle.
     *
     * @private
     */
    private _onItalic()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('italic');
        this._italicToggle = document.queryCommandState('italic');
    }

    /**
     * @summary Event handler for the underline toggle.
     *
     * @private
     */
    private _onUnderline()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('underline');
        this._underlineToggle = document.queryCommandState('underline');
    }

    /**
     * @summary Event handler for the strike through toggle.
     *
     * @private
     */
    private _onStrikethrough()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('strikethrough');
        this._strikethroughToggle = document.queryCommandState('strikethrough');
    }

    /**
     * @summary Event handler for the strike through toggle.
     *
     * @private
     */
    private _onJustifyLeft()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('justifyleft');
        this._updateJustficationFlags();
    }

    /**
     * @summary Event handler for the strike through toggle.
     *
     * @private
     */
    private _onJustifyCenter()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('justifycenter');
        this._updateJustficationFlags();
    }

    /**
     * @summary Event handler for the strike through toggle.
     *
     * @private
     */
    private _onJustifyRight()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('justifyright');
        this._updateJustficationFlags();
    }


    /**
     * @summary Event handler for the strike through toggle.
     *
     * @private
     */
    private _onJustifyFull()
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('justifyFull');
        this._updateJustficationFlags();
    }

    /**
     * @summary Chages the selected text font size.
     *
     * Since the fontSize only allows values between and including 1 to 7, we need to replace the produced output
     * to increase to an arbitrary font size.
     *
     * @param size The ew font size for the selected text (in pixels).
     *
     * @private
     */
    private _changeFontSize (size: number)
    {
        this._editableArea.nativeElement.focus();
        document.execCommand('fontSize', false, '2');

        let fontElements: any = document.getElementsByTagName('font');

        for (let i = 0, len = fontElements.length; i < len; ++i)
        {
            if (fontElements[i].size === '2')
            {
                fontElements[i].removeAttribute('size');
                fontElements[i].style.fontSize = size + 'px';
            }
        }
    }

    /**
     * @summary Event handler for the editable are clicks.
     *
     * We need make sure we update the flags of the different commands when the cursor is moved to a different part
     * of the document using the mouse. This is because different parts of the documents can have different sets
     * of styles at any given time.
     *
     * @private
     */
    private _onEditableClick()
    {
        this._italicToggle        = document.queryCommandState('italic');
        this._underlineToggle     = document.queryCommandState('underline');
        this._boldToggle          = document.queryCommandState('bold');
        this._strikethroughToggle = document.queryCommandState('strikethrough');
        this._updateJustficationFlags();
    }

    /**
     * @brief Since Justification flags are exclusive, we need to query them all everytime we change to one.
     *
     * @private
     */
    private _updateJustficationFlags()
    {
        this._justifyRightToggle  = document.queryCommandState('justifyright');
        this._justifyLeftToggle   = document.queryCommandState('justifyleft');
        this._justifyCenterToggle = document.queryCommandState('justifycenter');
        this._justifyFullToggle   = document.queryCommandState('justifyFull');
    }
}
