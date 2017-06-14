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

import { Component,
         ElementRef,
         Input,
         Output,
         OnInit,
         EventEmitter,
         ApplicationRef,
         ViewChild,
         AfterViewInit}   from '@angular/core';
import { LogoImage }      from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './image-preview.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This components shows a thumbnail preview of a given image file.
 */
@Component({
    selector: 'logo-image-preview',
    template,
    styleUrls: ['./images-preview.component.css']
})
export class ImagePreviewComponent implements OnInit, AfterViewInit
{
    @Input('model')
    private _model:     LogoImage;
    @Output('onDeleted')
    private _onDeleted: EventEmitter<LogoImage> = new EventEmitter<LogoImage>();

    /**
     * @summary Initializes a new instance of the ImagePreviewComponent class.
     */
    constructor(private element: ElementRef, private _applicationRef: ApplicationRef)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        let thumbnail = this.element.nativeElement.querySelector('.image-responsive');
        let reader    = new FileReader();

        const { url, file, isUploaded } = this._model;

        if (isUploaded)
        {
            thumbnail.src = url;

            return;
        }

        if (!file)
        {
            throw new Meteor.Error(
                'image-display.component.setImage',
                'The image is marked as *not* uploaded, but the field file is empty.');
        }

        reader.onload = (event: any) =>
        {
            if (event.type === 'load')
            {
                thumbnail.src = event.target.result;
            }
            else if (event.type === 'error')
            {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(file);
    }

    /**
     * #brief Runs after the view _has been completely initialized.
     */
    public ngAfterViewInit()
    {
    }

    /**
     * @summary Gets the on deleted event emitter.
     *
     * @returns {EventEmitter<LogoImage>} The on deleted event emitter.
     */
    public getOnDeleteEmitter(): EventEmitter<LogoImage>
    {
        return this._onDeleted;
    }

    /**
     * @summary Emits the the on deleted event.
     */
    private _emitDeleted()
    {
        this._onDeleted.emit(this._model);
        this._applicationRef.tick();
    }

    /**
     * @summary Shows the fill size display.
     */
    private _showImageDisplay()
    {
    }
}
