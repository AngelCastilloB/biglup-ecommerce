/**
 * @file color-picker.component.ts
 *
 * @summary
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 20 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* IMPORTS ************************************************************************************************************/

import { Component,
         ElementRef,
         ViewChild,
         OnInit }             from '@angular/core';
import { Rgba }               from '../../services/color-picker/internals/Rgba';
import { Hsla }               from '../../services/color-picker/internals/Hsla';
import { Hsva }               from '../../services/color-picker/internals/Hsva';
import { SliderPosition }     from '../../services/color-picker/internals/SliderPosition';
import { SliderDimension }    from '../../services/color-picker/internals/SliderDimension';
import { ColorPickerService } from '../../services/color-picker/color-picker.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './color-picker.component.html';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Color picker dialog.
 */
@Component({
    selector: 'color-picker',
    template
})
export class ColorPickerComponent implements OnInit
{
    private _hsva:                Hsva;
    private _rgbaText:            Rgba;
    private _hslaText:            Hsla;
    private _hexText:             string;
    private _outputColor:         string;
    private _selectedColor:       string;
    private _alphaSliderColor:    string;
    private _hueSliderColor:      string;
    private _slider:              SliderPosition;
    private _sliderDimMax:        SliderDimension;
    private _format:              number;
    private _show:                boolean;
    private _top:                 number;
    private _left:                number;
    private _position:            string;
    private _directiveInstance:   any;
    private _initialColor:        string;
    private _directiveElementRef: ElementRef;
    private _listenerMouseDown:   any;
    private _listenerResize:      any;
    private _cpPosition:          string;
    private _positionOffset:      number;
    private _putputFormat:        string;
    private _presetLabel:         string;
    private _presetColors:        Array<string>;
    private _cancelButton:        boolean;
    private _cancelButtonClass:   string;
    private _cancelButtonText:    string;
    private _oKButton:            boolean;
    private _oKButtonClass:       string;
    private _oKButtonText:        string;
    private _height:              number;
    private _width:               number;
    private _ignoredElements:     any;
    private _dialogDisplay:       string;
    private _saveClickOutside:    boolean;
    private _alphaChannel:        string = 'disabled';
    private _dialogArrowSize:     number = 10;
    private _dialogArrowOffset:   number = 15;
    private _arrowTop:            number;
    @ViewChild('hueSlider')
    private _hueSlider: any;
    @ViewChild('alphaSlider')
    private _alphaSlider: any;
    @ViewChild('dialogPopup')
    private _dialogElement: any;

    /**
     * @summary Initializes a new instance of the ColorPickerComponent class.
     *
     * @param el      The element reference.
     * @param service The color picker service.
     */
    constructor(private el: ElementRef, private service: ColorPickerService)
    {
    }

    /**
     * @summary Sets the dialog properties.
     *
     * @param instance                The instance.
     * @param elementRef              The element reference.
     * @param color                   The color.
     * @param position                The position.
     * @param positionOffset          The position offset.
     * @param positionRelativeToArrow The position relative to the arrow.
     * @param outputFormat            The output format.
     * @param presetLabel             The preset label.
     * @param presetColors            The preset colots.
     * @param cancelButton            The cancel button flag.
     * @param cancelButtonClass       The cancel button class.
     * @param cancelButtonText        The cancel button text.
     * @param oKButton                The ok button flag.
     * @param oKButtonClass           The ok button class.
     * @param oKButtonText            The ok button text.
     * @param height                  The height.
     * @param width                   The width.
     * @param ignoredElements         The elements to ignore.
     * @param dialogDisplay           The dialog display string.
     * @param saveClickOutside        The save on outside click flag.
     * @param alphaChannel            The alpha channel.
     */
    public setDialog(
        instance: any,
        elementRef: ElementRef,
        color: any,
        position: string,
        positionOffset: string,
        positionRelativeToArrow: boolean,
        outputFormat: string,
        presetLabel: string,
        presetColors: Array<string>,
        cancelButton: boolean,
        cancelButtonClass: string,
        cancelButtonText: string,
        oKButton: boolean,
        oKButtonClass: string,
        oKButtonText: string,
        height: string,
        width: string,
        ignoredElements: any,
        dialogDisplay: string,
        saveClickOutside: boolean,
        alphaChannel: string)
    {
        this._directiveInstance = instance;
        this._initialColor = color;
        this._directiveElementRef = elementRef;
        this._cpPosition = position;
        this._positionOffset = parseInt(positionOffset, 10);

        if (!positionRelativeToArrow)
            this._dialogArrowOffset = 0;

        this._putputFormat = outputFormat;
        this._presetLabel = presetLabel;
        this._presetColors = presetColors;
        this._cancelButton = cancelButton;
        this._cancelButtonClass = cancelButtonClass;
        this._cancelButtonText = cancelButtonText;
        this._oKButton = oKButton;
        this._oKButtonClass = oKButtonClass;
        this._oKButtonText = oKButtonText;
        this._height = parseInt(height, 10);
        this._width = parseInt(width, 10);
        this._ignoredElements = ignoredElements;
        this._dialogDisplay = dialogDisplay;

        if (this._dialogDisplay === 'inline')
        {
            this._dialogArrowOffset = 0;
            this._dialogArrowSize = 0;
        }

        this._saveClickOutside = saveClickOutside;
        this._alphaChannel = alphaChannel;
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        let alphaWidth = this._alphaSlider.nativeElement.offsetWidth;
        let hueWidth   = this._hueSlider.nativeElement.offsetWidth;

        this._sliderDimMax = new SliderDimension(hueWidth, this._width, 130, alphaWidth);
        this._slider       = new SliderPosition(0, 0, 0, 0);

        if (this._putputFormat === 'rgba')
        {
            this._format = 1;
        }
        else if (this._putputFormat === 'hsla')
        {
            this._format = 2;
        }
        else
        {
            this._format = 0;
        }

        this._listenerMouseDown = (event: any) => { this.onMouseDown(event); };
        this._listenerResize    = () => { this.onResize(); };

        this.openDialog(this._initialColor, false);
    }

    /**
     * @summary Sets the initial color.
     *
     * @param color The initial color.
     */
    public setInitialColor(color: any)
    {
        this._initialColor = color;
    }

    /**
     * @summary opens the dialog.
     *
     * @param color The initial color.
     * @param emit True if the dialog msut emmit on color change, otherwise, false.
     */
    public openDialog(color: any, emit: boolean = true)
    {
        this.setInitialColor(color);
        this.setColorFromString(color, emit);
        this.openColorPicker();
    }

    /**
     * @summary Cancels the color picking.
     */
    public cancelColor()
    {
        this.setColorFromString(this._initialColor, true);

        if (this._dialogDisplay === 'popup')
        {
            this._directiveInstance.colorChanged(this._initialColor, true);
            this.closeColorPicker();
        }
    }

    /**
     * @summary Color picking finish ok.
     */
    public oKColor()
    {
        if (this._dialogDisplay === 'popup')
        {
            this.closeColorPicker();
        }
    }

    /**
     * @summary Selects color from string.
     *
     * @param value The color string representation.
     * @param emit True if the dialog msut emmit on color change, otherwise, false.
     */
    public setColorFromString(value: string, emit: boolean = true)
    {
        let hsva: Hsva;

        if (this._alphaChannel === 'hex8')
        {
            hsva = this.service.stringToHsva(value, true);

            if (!hsva && !this._hsva)
            {
                hsva = this.service.stringToHsva(value, false);
            }
        }
        else
        {
            hsva = this.service.stringToHsva(value, false);
        }
        if (hsva)
        {
            this._hsva = hsva;
            this.update(emit);
        }
    }

    /**
     * @summary On mouse down event handler.
     *
     * @param event The on mouse down event.
     */
    public onMouseDown(event: any)
    {
        if ((!this.isDescendant(this.el.nativeElement, event.target) &&
            event.target !== this._directiveElementRef.nativeElement &&
            this._ignoredElements.filter((item: any) => item === event.target).length === 0) &&
            this._dialogDisplay === 'popup')
        {
            if (!this._saveClickOutside)
            {
                this.setColorFromString(this._initialColor, false);
                this._directiveInstance.colorChanged(this._initialColor);
            }

            this.closeColorPicker();
        }
    }

    /**
     * @summary Opens the color picker.
     */
    public openColorPicker()
    {
        if (!this._show)
        {
            this.setDialogPosition();
            this._show = true;
            this._directiveInstance.toggle(true);

            document.addEventListener('mousedown', this._listenerMouseDown);
            window.addEventListener('resize', this._listenerResize);
        }
    }

    /**
     * @summary Closes the color picker.
     */
    public closeColorPicker()
    {
        if (this._show)
        {
            this._show = false;
            this._directiveInstance.toggle(false);
            document.removeEventListener('mousedown', this._listenerMouseDown);
            window.removeEventListener('resize', this._listenerResize);
        }
    }

    /**
     * @summary On resize event handler.
     */
    public onResize()
    {
        if (this._position === 'fixed')
            this.setDialogPosition();
    }

    /**
     * @summary SEts the dialog position.
     */
    public setDialogPosition()
    {
        let dialogHeight      = this._dialogElement.nativeElement.offsetHeight;
        let node              = this._directiveElementRef.nativeElement, position = 'static';
        let parentNode:   any = null;
        let boxDirective: any;

        while (node !== null && node.tagName !== 'HTML')
        {
            position = window.getComputedStyle(node).getPropertyValue('position');

            if (position !== 'static' && parentNode === null)
                parentNode = node;

            if (position === 'fixed')
                break;

            node = node.parentNode;
        }

        if (position !== 'fixed')
        {
            boxDirective = this.createBox(this._directiveElementRef.nativeElement, true);

            if (parentNode === null)
                parentNode = node;

            let boxParent = this.createBox(parentNode, true);

            this._top = boxDirective.top - boxParent.top;
            this._left = boxDirective.left - boxParent.left;
        }
        else
        {
            boxDirective = this.createBox(this._directiveElementRef.nativeElement, false);

            this._top = boxDirective.top;
            this._left = boxDirective.left;
            this._position = 'fixed';
        }
        if (this._cpPosition === 'left')
        {
            this._top += boxDirective.height * this._positionOffset / 100 - this._dialogArrowOffset;
            this._left -= this._width + this._dialogArrowSize - 2;
        }
        if (this._cpPosition === 'top')
        {
            this._top -= dialogHeight + this._dialogArrowSize;
            this._left += this._positionOffset / 100 * boxDirective.width - this._dialogArrowOffset;
            this._arrowTop = dialogHeight - 1;
        }
        else if (this._cpPosition === 'bottom')
        {
            this._top += boxDirective.height + this._dialogArrowSize;
            this._left += this._positionOffset / 100 * boxDirective.width - this._dialogArrowOffset;
        }
        else
        {
            this._top += boxDirective.height * this._positionOffset / 100 - this._dialogArrowOffset;
            this._left += boxDirective.width + this._dialogArrowSize;
        }
    }

    /**
     * @summary Sets the saturation.
     *
     * @param val The saturation value structure.
     */
    public setSaturation(val: { v: number, rg: number })
    {
        let hsla = this.service.hsva2hsla(this._hsva);
        hsla.s = val.v / val.rg;

        this._hsva = this.service.hsla2hsva(hsla);
        this.update();
    }

    /**
     * @summary Sets the lightness.
     *
     * @param val The lightness structure.
     */
    public setLightness(val: { v: number, rg: number })
    {
        let hsla = this.service.hsva2hsla(this._hsva);
        hsla.l = val.v / val.rg;

        this._hsva = this.service.hsla2hsva(hsla);
        this.update();
    }

    /**
     * @summary Sets the hue.
     *
     * @param val Sets the hue structure.
     */
    public setHue(val: { v: number, rg: number })
    {
        this._hsva.h = val.v / val.rg;
        this.update();
    }

    /**
     * @summary Sets the alpha.
     *
     * @param val Sets the alpha.
     */
    public setAlpha(val: { v: number, rg: number })
    {
        this._hsva.a = val.v / val.rg;
        this.update();
    }

    /**
     * @summary Sets the red channel value.
     *
     * @param val The red channel vaue.
     */
    public setR(val: { v: number, rg: number })
    {
        let rgba = this.service.hsvaToRgba(this._hsva);
        rgba.r = val.v / val.rg;

        this._hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }

    /**
     * @summary Sets the green channel value.
     *
     * @param val The green channel structure.
     */
    public setG(val: { v: number, rg: number })
    {
        let rgba = this.service.hsvaToRgba(this._hsva);
        rgba.g = val.v / val.rg;

        this._hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }

    /**
     * @summary Sets the blue chanlle value.
     *
     * @param val The blue channle structure.
     */
    public setB(val: { v: number, rg: number })
    {
        let rgba = this.service.hsvaToRgba(this._hsva);
        rgba.b = val.v / val.rg;

        this._hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }

    /**
     * @summary Sets saturation and brightness.
     *
     * @param val The saturation and brightness structure.
     */
    public setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number })
    {
        this._hsva.s = val.s / val.rgX;
        this._hsva.v = val.v / val.rgY;
        this.update();
    }

    /**
     * @summary Format poolicy.
     *
     * @return {number} The format policy.
     */
    public formatPolicy(): number
    {
        this._format = (this._format + 1) % 3;

        if (this._format === 0 && this._hsva.a < 1 && this._alphaChannel === 'hex6')
            this._format++;

        return this._format;
    }

    /**
     * @summary Updates the color picker dialog.
     *
     * @param emit True if the dialog msut emmit on color change, otherwise, false.
     */
    public update(emit: boolean = true)
    {
        let hsla    = this.service.hsva2hsla(this._hsva);
        let rgba    = this.service.denormalizeRGBA(this.service.hsvaToRgba(this._hsva));
        let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this._hsva.h, 1, 1, 1)));

        this._hslaText = new Hsla(
            Math.round((hsla.h) * 360),
            Math.round(hsla.s * 100),
            Math.round(hsla.l * 100),
            Math.round(hsla.a * 100) / 100);

        this._rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this._hexText  = this.service.hexText(rgba, this._alphaChannel === 'hex8');

        this._alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

        if (this._format === 0 && this._hsva.a < 1 && this._alphaChannel === 'hex6')
            this._format++;

        let lastOutput = this._outputColor;

        this._outputColor   = this.service.outputFormat(this._hsva, this._putputFormat, this._alphaChannel === 'hex8');
        this._selectedColor = this.service.outputFormat(this._hsva, 'rgba', false);

        this._slider = new SliderPosition((this._hsva.h) * this._sliderDimMax.h - 8, this._hsva.s * this._sliderDimMax.s - 8,
            (1 - this._hsva.v) * this._sliderDimMax.v - 8, this._hsva.a * this._sliderDimMax.a - 8);

        if (emit && lastOutput !== this._outputColor)
            this._directiveInstance.colorChanged(this._outputColor);
    }

    /**
     * @summary Gets wether the given child is decendant of the given parent.
     *
     * @param parent The parent element.
     * @param child The  child element.
     *
     * @return {boolean} True if the child is adecendant from the parent.
     */
    public isDescendant(parent: any, child: any): boolean
    {
        let node: any = child.parentNode;

        while (node !== null)
        {
            if (node === parent)
                return true;

            node = node.parentNode;
        }

        return false;
    }

    /**
     * @summary Creates a box.
     *
     * @param element The element.
     * @param offset The offposet.
     *
     * @return {{top: number, left: number, width: number, height: number}} The box dimensions and position.
     */
    public createBox(element: any, offset: boolean): any
    {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }

    /**
     * Gets the style of this color picker window.
     *
     * @return {{height: string, width: string, top: string, left: string, position: string}}
     * @private
     */
    private _getStyles()
    {
        let styles = {
            'height.px': this._height,
            'width.px': this._width,
            'top.px': this._top,
            'left.px': this._left,
            'position': this._position,
        };
        return styles;
    }
}