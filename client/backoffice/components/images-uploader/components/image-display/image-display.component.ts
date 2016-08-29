/**
 * @file image-display.component.ts
 *
 * @summary The Image display component implementation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 05 2016
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
         Input,
         Renderer,
         ViewChild,
         AfterViewInit}       from '@angular/core';
import { MeteorComponent }    from 'angular2-meteor';
import { IdGeneratorService } from '../../../../../services/id-generator.service.ts';
import { UploaderImage }      from '../../internals/product-image';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './image-display.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This components shows a full display of a given image file.
 */
@Component({
    selector: 'image-display',
    template,
    styleUrls: ['./images-display.component.css'],
    providers: [IdGeneratorService]
})
export class ImageDisplayComponent extends MeteorComponent implements AfterViewInit {
    @Input('model')
    private _model:    UploaderImage;
    private _uniqueId: string;
    @ViewChild('display')
    private _display:  ElementRef;

    /**
     * @summary Initializes a new instance of the ImageDisplayComponent class.
     */
    constructor(private _renderer: Renderer, private _idGenerator: IdGeneratorService, private element: ElementRef) {
        super();

        this._uniqueId = _idGenerator.generate();
    }

    /**
     * #brief Runs after the view _has been completely initialized.
     */
    public ngAfterViewInit() {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '0%');
        this._renderer.setElementStyle(this._display.nativeElement, 'width', '100%');
    }

    /**
     * @summary Closes the display.
     */
    public hide() {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '0%');
    }

    /**
     * @summary Shows the display.
     */
    public show() {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '100%');
    }

    /**
     * @summary Sets the image to be displayed
     */
    public setImage(imageFile: UploaderImage) {
        this._model = imageFile;

        let image  = this.element.nativeElement.querySelector('.image-display');
        let reader = new FileReader();

        if (this._model.isUploaded) {
            image.src = this._model.remoteUrl;

            return;
        }

        reader.onload = (event: ProgressEvent) => {
            if (event.type === 'load') {

                let src = event.target.result;

                image.src = src;

            } else if (event.type === 'error') {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(this._model.file);
    }
}
