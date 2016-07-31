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
         OnInit }          from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This components shows a thumbnail preview of a given image file.
 */
@Component({
    selector: 'image-preview',
    styles: [`
            img {
              filter: gray; /* IE6-9 */
              -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
                -webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
                box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.75);
                margin-bottom:20px;
                width: 200px;
                height: auto;
            }

            img:hover {
              filter: none; /* IE6-9 */
              -webkit-filter: grayscale(0); /* Google Chrome, Safari 6+ & Opera 15+ */
            }`],
    template: '<img class="image-responsive"/>',
})
export class ImagePreviewComponent extends MeteorComponent implements OnInit {
    @Input('model') private _model: File;

    /**
     * @summary Initializes a new instance of the ImagePreviewComponent class.
     */
    constructor(private element: ElementRef) {
        super();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any {
        let image  = this.element.nativeElement.querySelector('.image-responsive');
        let reader = new FileReader();

        reader.onload = (event: ProgressEvent) => {
            if (event.type === 'load') {

                let src = event.target.result;

                image.src = src;

            } else if (event.type === 'error') {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(this._model);
    }
}
