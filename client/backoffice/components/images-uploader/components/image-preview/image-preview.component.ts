/**
 * @file image-preview.component.ts
 *
 * @summary The Image preview component implementation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 30 2016
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
         Output,
         OnInit,
         EventEmitter,
         ViewChild,
         AfterViewInit}          from '@angular/core';
import { MeteorComponent }       from 'angular2-meteor';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { UploaderImage }         from '../../internals/product-image';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './image-preview.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This components shows a thumbnail preview of a given image file.
 */
@Component({
    selector: 'image-preview',
    template,
    styleUrls: ['./images-preview.component.css']
})
export class ImagePreviewComponent extends MeteorComponent implements OnInit, AfterViewInit
{
    @Input('model')
    private _model:        UploaderImage;
    @Output('onDeleted')
    private _onDeleted:    EventEmitter<UploaderImage> = new EventEmitter<UploaderImage>();
    @ViewChild(ImageDisplayComponent)
    private _imageDisplay: ImageDisplayComponent;

    /**
     * @summary Initializes a new instance of the ImagePreviewComponent class.
     */
    constructor(private element: ElementRef)
    {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        let thumbnail = this.element.nativeElement.querySelector('.image-responsive');
        let reader    = new FileReader();

        if (this._model.isUploaded)
        {
            thumbnail.src = this._model.remoteUrl;

            return;
        }

        reader.onload = (event: ProgressEvent) =>
        {
            if (event.type === 'load')
            {
                let src = event.target.result;

                thumbnail.src = src;
            }
            else if (event.type === 'error')
            {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(this._model.file);
    }

    /**
     * #brief Runs after the view _has been completely initialized.
     */
    public ngAfterViewInit()
    {
        this._imageDisplay.setImage(this._model);
    }

    /**
     * @summary Gets the on deleted event emitter.
     *
     * @returns {EventEmitter<UploaderImage>} The on deleted event emitter.
     */
    public getOnDeleteEmitter(): EventEmitter<UploaderImage>
    {
        return this._onDeleted;
    }

    /**
     * @summary Emits the the on deleted event.
     */
    private _emitDeleted()
    {
        this._onDeleted.emit(this._model);
    }

    /**
     * @summary Shows the fill size display.
     */
    private _showImageDisplay()
    {
        this._imageDisplay.show();
    }
}
