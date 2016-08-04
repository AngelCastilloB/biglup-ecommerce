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
         EventEmitter}        from '@angular/core';
import { MeteorComponent }    from 'angular2-meteor';
import { TruncateStringPipe}  from '../../../../../pipes/truncate-string.pipe';
import { IdGeneratorService } from '../../../../../services/id-generator.service.ts';

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
    styleUrls: ['./images-preview.component.css'],
    pipes: [TruncateStringPipe],
    providers: [IdGeneratorService],
})
export class ImagePreviewComponent extends MeteorComponent implements OnInit {
    @Input('model')
    private _model:     File;
    @Output('onDeleted')
    private _onDeleted: EventEmitter<File> = new EventEmitter<File>();
    private _uniqueId:  string;

    /**
     * @summary Initializes a new instance of the ImagePreviewComponent class.
     */
    constructor(private _idGenerator: IdGeneratorService, private element: ElementRef) {
        super();

        this._uniqueId = _idGenerator.generate();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        let thumbnail = this.element.nativeElement.querySelector('.image-responsive');
        let image     = this.element.nativeElement.querySelector('.image-display');
        let reader    = new FileReader();

        reader.onload = (event: ProgressEvent) => {
            if (event.type === 'load') {

                let src = event.target.result;

                thumbnail.src = src;
                image.src = src;

            } else if (event.type === 'error') {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(this._model);
    }

    /**
     * @summary Gets the on deleted event emitter.
     *
     * @returns {EventEmitter<File>} The on deleted event emitter.
     */
    public getOnDeleteEmitter() : EventEmitter<File> {
        return this._onDeleted;
    }

    /**
     * @summary Gets image file.
     *
     * @returns {File} The image file.
     */
    public getFile() : File {
        return this._model;
    }

    /**
     * @summary Emits the the on deleted event.
     */
    private emitDeleted() {
        this._onDeleted.emit(this._model);
    }
}
