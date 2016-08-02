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
         EventEmitter}                      from '@angular/core';
import { MeteorComponent }                  from 'angular2-meteor';
import { TruncateStringPipe}                from '../../../../../pipes/truncate-string.pipe';
import { UniqueComponentIdentifierService } from '../../../../../services/unique-component-identifier.service';

// EXPORTS ************************************************************************************************************/

/**
 * @brief This components shows a thumbnail preview of a given image file.
 */
@Component({
    selector: 'image-preview',
    pipes: [TruncateStringPipe],
    providers: [UniqueComponentIdentifierService],
    // TODO: Move all this to a separate .css file.
    styles: [`
              .hovereffect {
                  width:200px;
                  height:auto;
                  float:left;
                  overflow:hidden;
                  position:relative;
                  text-align:center;
                  cursor:default;
                }
                
                .hovereffect .overlay {
                  width:100%;
                  height:100%;
                  position:absolute;
                  overflow:hidden;
                  top:0;
                  left:0;
                  opacity:0;
                  background-color:rgba(0,0,0,0.5);
                  -webkit-transition:all .4s ease-in-out;
                  transition:all .4s ease-in-out
                }
                
                .hovereffect img {
                  width:200px;
                  height:auto;
                  display:block;
                  position:relative;
                  -webkit-transition:all .4s linear;
                  transition:all .4s linear;
                }
                
                .hovereffect h2 {
                    text-transform:uppercase;
                    color:#fff;
                    text-align:center;
                    position:relative;
                    font-size:17px;
                    background:rgba(0,0,0,0.6);
                    -webkit-transform:translatey(-100px);
                    -ms-transform:translatey(-100px);
                    transform:translatey(-100px);
                    -webkit-transition:all .2s ease-in-out;
                    transition:all .2s ease-in-out;
                    padding:10px;
                }
                
                .hovereffect a.info {
                    text-decoration:none;
                    text-transform:uppercase;
                    color:#bbb;
                    background-color:transparent;
                    opacity:0;
                    filter:alpha(opacity=0.5);
                    -webkit-transition:all .2s ease-in-out;
                    transition:all .2s ease-in-out;
                    padding:20px;
                    vertical-align: middle;
                    margin-top: 50px;
                }
                
                .hovereffect a.info:hover {
                    color:#fff;
                }
                
                .hovereffect:hover img {
                    -ms-transform:scale(1.2);
                    -webkit-transform:scale(1.2);
                    transform:scale(1.2);
                }
                
                    .hovereffect:hover .overlay {
                    opacity:1;
                    filter:alpha(opacity=100);
                }
                
                .hovereffect:hover h2,.hovereffect:hover a.info {
                    opacity:1;
                    filter:alpha(opacity=100);
                    -ms-transform:translatey(0);
                    -webkit-transform:translatey(0);
                    transform:translatey(0);
                }
                
                .hovereffect:hover a.info {
                    -webkit-transition-delay:.2s;
                    transition-delay:.2s;
                }`],
    // TODO: Move all this to a separete .html file.
    template: `
                <div class="hovereffect">
                    <img class="image-responsive"/>
                    <div class="overlay">
                       <h2>{{ 'Move' }}</h2>
                       <a class="fa fa-eye fa-2x info" aria-hidden="true" data-toggle="modal" [attr.data-target]="'#' + _uniqueId"></a>
                       <a class="fa fa-trash fa-2x info" aria-hidden="true" (click)="emitDeleted()"></a>
                    </div>
                </div>
                <div [attr.id]="_uniqueId" class="modal fade">
                  <div class="modal-dialog">
                    <div class="modal-content">
                       <img class="image-display"/>
                    </div>
                  </div>
                </div>
`,
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
    constructor(private _idGenerator: UniqueComponentIdentifierService, private element: ElementRef) {
        super();

        this._uniqueId = _idGenerator.getId();
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
