/**
 * @file color-picker.directive.ts
 *
 * @summary Color picker directive.
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

import { OnChanges,
         Directive,
         Input,
         Output,
         ViewContainerRef,
         ChangeDetectorRef,
         ElementRef,
         EventEmitter,
         OnInit,
         NgModule,
         Compiler,
         ReflectiveInjector }   from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { ColorPickerService }   from '../../services/color-picker/color-picker.service';
import { TextDirective }        from './internals/color-picker-text.directive';
import { SliderDirective }      from './internals/color-picker-slider-directive';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Biglup color picker directive.
 */
@Directive({
    selector: '[ColorPicker]',
    host: {
        '(input)': 'changeInput($event.target.value)',
        '(click)': 'onClick()'
    }
})
export class ColorPickerDirective implements OnInit, OnChanges
{
    @Input('ColorPicker')
    private _colorPicker: string;
    @Output('colorPickerChange')
    private _colorPickerChange = new EventEmitter<string>(true);
    @Input('toggle')
    private _cpToggle: boolean;
    @Output('toggleChange')
    private _cpToggleChange = new EventEmitter<boolean>(true);
    @Input('position')
    private _cpPosition: string = 'right';
    @Input('positionOffset')
    private _cpPositionOffset: string = '0%';
    @Input('positionRelativeToArrow')
    private _cpPositionRelativeToArrow: boolean = false;
    @Input('outputFormat')
    private _cpOutputFormat: string = 'hex';
    @Input('presetLabel')
    private _cpPresetLabel: string = 'Preset colors';
    @Input('presetColors')
    private _cpPresetColors: Array<string>;
    @Input('cancelButton')
    private _cpCancelButton: boolean = false;
    @Input('cancelButtonClass')
    private _cpCancelButtonClass: string = 'cp-cancel-button-class';
    @Input('cancelButtonText')
    private _cpCancelButtonText: string = 'Cancel';
    @Input('oKButton')
    private _cpOKButton: boolean = false;
    @Input('oKButtonClass')
    private _cpOKButtonClass: string = 'cp-ok-button-class';
    @Input('oKButtonText')
    private _cpOKButtonText: string = 'OK';
    @Input('fallbackColor')
    private _cpFallbackColor: string = '#fff';
    @Input('height')
    private _cpHeight: string = 'auto';
    @Input('width')
    private _cpWidth: string = '230px';
    @Input('ignoredElements')
    private _cpIgnoredElements: any = [];
    @Input('dialogDisplay')
    private _cpDialogDisplay: string = 'popup';
    @Input('saveClickOutside')
    private _cpSaveClickOutside: boolean = true;
    @Input('alphaChannel')
    private _cpAlphaChannel: string = 'disabled';
    private _dialog: any;
    private _created: boolean;
    private _ignoreChanges: boolean = false;

    /**
     * @summary Initializes a new instnace of the BiglupColorPickerDirective class.
     *
     * @param compiler        The angular 2 compiler.
     * @param vcRef           The reference to the container view.
     * @param el              The element reference.
     * @param service         The biglup color picker service.
     * @param _changeDetector The change detector service.
     */
    constructor(
        private compiler: Compiler,
        private vcRef: ViewContainerRef,
        private el: ElementRef,
        private service: ColorPickerService,
        private _changeDetector: ChangeDetectorRef)
    {
        this._created = false;
    }

    /**
     * @summary Called when any data-bound property of a directive changes.
     *
     * @param changes The directive changes.
     */
    public ngOnChanges(changes: any): void
    {
        if (changes._cpToggle)
        {
            if (changes._cpToggle.currentValue) this.openDialog();
            if (!changes._cpToggle.currentValue && this._dialog) this._dialog.closeColorPicker();
        }

        if (changes._colorPicker)
        {
            if (this._dialog && !this._ignoreChanges)
            {
                if (this._cpDialogDisplay === 'inline')
                    this._dialog.setInitialColor(changes._colorPicker.currentValue);

                this._dialog.setColorFromString(changes._colorPicker.currentValue, false);

            }

            this._ignoreChanges = false;
        }
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit()
    {
        let hsva = this.service.stringToHsva(this._colorPicker);

        if (hsva === null)
            hsva = this.service.stringToHsva(this._colorPicker, true);

        if (hsva == null)
            hsva = this.service.stringToHsva(this._cpFallbackColor);

        this._colorPickerChange.emit(this.service.outputFormat(hsva, this._cpOutputFormat, this._cpAlphaChannel === 'hex8'));
    }

    /**
     * @summary Event handler for when the click event is fired.
     */
    public onClick()
    {
        if (this._cpIgnoredElements.filter((item: any) => item === this.el.nativeElement).length === 0)
            this.openDialog();
    }

    /**
     * @summary Opens the dialog.
     */
    public openDialog()
    {
        if (!this._created)
        {
            this._created = true;
            this.compiler
                .compileModuleAndAllComponentsAsync(DynamicColorPickerModule)
                .then(factory =>
                {
                    const compFactory = factory.componentFactories.find(x => x.componentType === ColorPickerComponent);
                    const injector    = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                    const cmpRef      = this.vcRef.createComponent(compFactory, 0, injector, []);

                    cmpRef.instance.setDialog(this, this.el, this._colorPicker, this._cpPosition, this._cpPositionOffset,
                        this._cpPositionRelativeToArrow, this._cpOutputFormat, this._cpPresetLabel, this._cpPresetColors,
                        this._cpCancelButton, this._cpCancelButtonClass, this._cpCancelButtonText,
                        this._cpOKButton, this._cpOKButtonClass, this._cpOKButtonText, this._cpHeight, this._cpWidth,
                        this._cpIgnoredElements, this._cpDialogDisplay, this._cpSaveClickOutside, this._cpAlphaChannel);

                    this._dialog = cmpRef.instance;
                    this._changeDetector.detectChanges();
                });
        }
        else if (this._dialog)
        {
            this._dialog.openDialog(this._colorPicker);
            this._changeDetector.detectChanges();
        }
    }

    /**
     * @summary Event handler for when the color changes.
     *
     * @param value  The new color value.
     * @param ignore True if the changes must be ignored, otherwise, false.
     */
    public colorChanged(value: string, ignore: boolean = true)
    {
        this._ignoreChanges = ignore;
        this._colorPickerChange.emit(value);
        this._changeDetector.detectChanges();
    }

    /**
     * @summary Event handler for when the input changes.
     *
     * @param value The new input value.
     */
    public changeInput(value: string)
    {
        this._dialog.setColorFromString(value, true);
        this._changeDetector.detectChanges();
    }

    /**
     * @summary Toggles the color picker.
     *
     * @param value True/false to toggle on/off.
     */
    public toggle(value: boolean)
    {
        this._cpToggleChange.emit(value);
        this._changeDetector.detectChanges();
    }
}

/* DYNAMIC MODULES ****************************************************************************************************/

@NgModule({
    imports: [BrowserModule],
    declarations: [ColorPickerComponent, TextDirective, SliderDirective]
})
export class DynamicColorPickerModule {};