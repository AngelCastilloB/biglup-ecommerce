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

import { Component, ElementRef, Input } from '@angular/core';
import { MeteorComponent }              from 'angular2-meteor';

@Component({
    selector: 'image-preview',
    template: '<img class="image"/>',
})
export class ImagePreviewComponent extends MeteorComponent {
    @Input('model') private _model: File;

    /**
     * @summary Initializes a new instance of the ImagePreviewComponent class.
     */
    constructor(private element: ElementRef) {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        let image  = this.element.nativeElement.querySelector('.image');
        let reader = new FileReader();

        reader.onload = (ev: ProgressEvent) => {
            if (ev.type === 'load') {

                let src = ev.target.result;

                image.src = src;

            } else if (ev.type === 'error') {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(this._model);
    }
}
