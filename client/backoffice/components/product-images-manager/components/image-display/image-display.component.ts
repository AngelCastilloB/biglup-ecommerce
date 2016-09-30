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

import 'reflect-metadata';

import { Component,
         ElementRef,
         Input,
         Renderer,
         ViewChild,
         AfterViewInit}       from '@angular/core';
import { IdGeneratorService } from '../../../../../services/id-generator.service.ts';
import { ProductImage }       from 'meteor/biglup:business';

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
    styleUrls: ['./images-display.component.css']
})
export class ImageDisplayComponent implements AfterViewInit
{
    @Input('model')
    private _model:    ProductImage;
    private _uniqueId: string;
    @ViewChild('display')
    private _display:  ElementRef;

    /**
     * @summary Initializes a new instance of the ImageDisplayComponent class.
     */
    constructor(private _renderer: Renderer, private _idGenerator: IdGeneratorService, private element: ElementRef)
    {
        this._uniqueId = _idGenerator.generate();
    }

    /**
     * #brief Runs after the view _has been completely initialized.
     */
    public ngAfterViewInit()
    {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '0%');
        this._renderer.setElementStyle(this._display.nativeElement, 'width', '100%');
    }

    /**
     * @summary Closes the display.
     */
    public hide()
    {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '0%');
    }

    /**
     * @summary Shows the display.
     */
    public show()
    {
        this._renderer.setElementStyle(this._display.nativeElement, 'height', '100%');
    }

    /**
     * @summary Sets the image to be displayed
     */
    public setImage(imageFile: ProductImage)
    {
        this._model = imageFile;

        let image  = this.element.nativeElement.querySelector('.image-display');
        let reader = new FileReader();

        const { url, file, isUploaded } = this._model;

        if (isUploaded)
        {
            image.src = url;

            return;
        }

        if (!file)
        {
            throw new Meteor.Error(
                'image-display.component.setImage',
                'The image is marked is *not* uploaded, but the field file is empty.');
        }

        reader.onload = (event: ProgressEvent) =>
        {
            if (event.type === 'load')
            {
                image.src = event.target.result;
            }
            else if (event.type === 'error')
            {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(file);
    }
}
