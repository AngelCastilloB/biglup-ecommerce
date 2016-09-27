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

import { Component,
         ViewChild,
         Input,
         Output,
         OnChanges,
         SimpleChanges,
         EventEmitter }         from '@angular/core';
import { ColorPickerComponent } from './components/color-picker.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template    from './text-editor.component.html';

// CONSTANTS **********************************************************************************************************/

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 96;

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is a simple WYSIWYG text editor.
 */
@Component({
    selector: 'text-editor',
    template,
    styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnChanges
{
    @ViewChild('editable')
    private _editableArea;
    @ViewChild('fontColor')
    private _fontColorPicker: ColorPickerComponent;
    @ViewChild('backgroundColor')
    private _backgroundColorPicker: ColorPickerComponent;
    @Output('modelChange')
    private _update                             = new EventEmitter();
    @Input('model')
    private _model:               string        = '';
    private _boldToggle:          boolean       = false;
    private _italicToggle:        boolean       = false;
    private _underlineToggle:     boolean       = false;
    private _strikethroughToggle: boolean       = false;
    private _justifyLeftToggle:   boolean       = false;
    private _justifyCenterToggle: boolean       = false;
    private _justifyRightToggle:  boolean       = false;
    private _justifyFullToggle:   boolean       = false;
    private _orderedListToggle:   boolean       = false;
    private _unorderedListToggle: boolean       = false;
    private _sizes:               Array<number> = Array<number>();
    private _fonts:               Array<string> = Array<string>();

    /**
     * @summary Initializes a new instance of the TextEditorComponent class.
     */
    constructor()
    {
        for (let i: number = MIN_FONT_SIZE; i <= MAX_FONT_SIZE; ++i)
            this._sizes.push(i);

        this._fonts.push('Arial');
        this._fonts.push('Georgia');
        this._fonts.push('Impact');
        this._fonts.push('Thaoma');
        this._fonts.push('Times New Roman');
        this._fonts.push('Verdana');
    }

    /**
     * @summary This method is called right after the data-bound properties have been checked and before view and
     * content children are checked if at least one of them has changed.
     *
     * The changes parameter contains an entry for each of the changed data-bound property.
     * The key is the property name and the value is an instance of SimpleChange.
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges)
    {
        this._editableArea.nativeElement.innerHTML = this._model;
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
     * @summary Event handler for the justify left toggle.
     *
     * All selected text will be justified to the left.
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
     * @summary Event handler for the justify center toggle.
     *
     * All selected text will be justified to the center.
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
     * @summary Event handler for the justify right toggle.
     *
     * All selected text will be justified to the right.
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
     * @summary Event handler for the justify full toggle.
     *
     * All selected text will be justified Full.
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
     * @summary Changes the fonts size of the selected text.
     *
     * Since the fontSize only allows values between and including 1 to 7, we need to replace the produced output
     * to increase to an arbitrary font size.
     *
     * @param size The new font size for the selected text (in pixels).
     *
     * @private
     */
    private _changeFontSize(size: number)
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
     * @summary Changes the font type of the selected text.
     *
     * @param type The new font type.
     *
     * @private
     */
    private _changeFontType(type: string)
    {
        this._editableArea.nativeElement.focus();

        document.execCommand('FontName', false, type);
    }

    /**
     * @summary Event handler for the editable clicks.
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
        this._orderedListToggle   = document.queryCommandState('insertorderedlist');
        this._unorderedListToggle = document.queryCommandState('insertUnorderedList');
        this._updateJustficationFlags();
    }

    /**
     * @brief Since Justification flags are exclusive, we need to query them all every time we switch to one.
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

    /**
     * @summary Event handler for when the background color clear format button is clicked.
     * @private
     */
    private _onBackgroundColorClear()
    {
        document.execCommand('removeFormat', false, 'HiliteColor');
        document.execCommand('removeFormat', false, 'BackColor');
    }

    /**
     * @summary Event handler for when a new background color is picked.
     * @private
     */
    private _onBackgroundColorChanged(color: string)
    {
        // Try to use HiliteColor since some browsers apply BackColor to the whole block, if that fails, apply BackColor
        if (!document.execCommand('HiliteColor', false, color))
        {
            document.execCommand('BackColor', false, color);
        }
    }

    /**
     * @summary Event handler for when the font color clear format button is clicked.
     * @private
     */
    private _onTextColorClear()
    {
        document.execCommand('removeFormat', false, 'foreColor');
    }

    /**
     * @summary Event handler for when a new font color is picked.
     * @private
     */
    private _onTextColorChanged(color: string)
    {
        document.execCommand('foreColor', false, color);
    }

    /**
     * @summary Event handler for when the change text color button is clicked.
     *
     * @param $event The click event.
     * @private
     */
    private _onTextFontColor($event)
    {
        let rectangle: ClientRect = $event.srcElement.getBoundingClientRect();

        this._fontColorPicker.show({left: rectangle.left, top: rectangle.bottom});
    }

    /**
     * @summary Event handler for when the change background text color button is clicked.
     *
     * @param $event The click event.
     * @private
     */
    private _onTextBackgroundColor($event)
    {
        let rectangle: ClientRect = $event.srcElement.getBoundingClientRect();

        this._backgroundColorPicker.show({left: rectangle.left, top: rectangle.bottom});
    }

    /**
     * @summary Event handler for when the insert ordered list button is clicked.
     * @private
     */
    private _onOrderedList()
    {
        this._editableArea.nativeElement.focus();

        document.execCommand('insertorderedlist');

        this._unorderedListToggle = document.queryCommandState('insertUnorderedList');
        this._orderedListToggle   = document.queryCommandState('insertorderedlist');
    }

    /**
     * @summary Event handler for when the insert unordered list button is clicked.
     * @private
     */
    private _onUnorderedList()
    {
        this._editableArea.nativeElement.focus();

        document.execCommand('insertUnorderedList');

        this._unorderedListToggle = document.queryCommandState('insertUnorderedList');
        this._orderedListToggle   = document.queryCommandState('insertorderedlist');
    }

    /**
     * @summary Event handler for when the text editor content changes.
     * @private
     */
    private _onContentChange()
    {
        this._model = this._editableArea.nativeElement.innerHTML;
        this._update.emit(this._model);
    }

    /**
     * @summary Event handler for when the text editor is clicked.
     * @private
     */
    private _onTextEditorClick()
    {
        this._editableArea.nativeElement.focus();
    }
}
