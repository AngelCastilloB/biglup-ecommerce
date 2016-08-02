/**
 * @file images-uploader.cmponent.ts
 *
 * @summary Test component for the image uploading.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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
         ViewChild,
         ElementRef,
         Renderer }                from '@angular/core';
import { FileDropDirective }       from './directives/file-drop.directive';
import { UploadFS }                from 'meteor/jalik:ufs';
import { ImagesStore }             from '../../../../common/collections/image.collection.ts';
import { ImagePreviewComponent }   from './components/image-preview/image-preview.component';
import { DragulaService, Dragula } from 'ng2-dragula/ng2-dragula';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './images-uploader.component.html';

// CONSTANTS **********************************************************************************************************/

const NUMBER_OF_COLUMNS = 5;

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows to drag and drop images to be uploaded to the server.
 */
@Component({
    selector: 'images-uploader',
    viewProviders: [DragulaService],
    template,
    // TODO: Move all this to a separete .css file.
    styles: [`
            div.drop {
              min-height: 200px;
              height: auto;
              align-items: center;
              justify-content: center;
              overflow: auto;
              text-align: center;
            }
            
            .drop-activity {
              border: 3px dashed #33adff;
              color: #33adff;
            }

            .inactive {
              border: 3px dashed #ccc;
              color: #ccc;
            }
            
            .image-container {
              margin: 60px;
              padding: 30px;
              text-align: center;
            }
            .image-container {
            }
            .instructions {
              display: block;
            }
            .image-list {
              margin: 60px;
            }
            div.img {
                margin: 20px;
                display:inline-block;
                width: 180px;
            }
            div.img img {
                width: 100%;
                height: auto;
            }
            
    `],
    directives: [FileDropDirective, ImagePreviewComponent, Dragula]
})
export class ImagesUploader  {

    @ViewChild('drop') private _dropzone: ElementRef;
    private                    _fileIsOver: boolean = false;
    // private _uploading: boolean = false;
    private _previewFiles: Array<File> = [];
    private _rows: number = 0;

    /**
     * @summary Initializes a new instance of the ImagesUploader class.
     */
    constructor(private _renderer: Renderer, private _dragulaService: DragulaService) {

        _dragulaService.drop.subscribe((value) => {

            let [bag, e, target, source, sibling] = value;
            console.error(e);
            console.error(sibling);
        });
    }

    /**
     * @summary Sets the file is over property.
     *
     * @param fileIsOver True if the upload is over, otherwise, false.
     */
    public fileOver(fileIsOver: boolean): void {
        this._fileIsOver = fileIsOver;
    }

    /**
     * @summary Event handler for the drop activity starts.
     *
     * @param event The drop event.
     */
    private onDropStart(event: any): void {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'drop-activity', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'inactive', false);
    }

    /**
     * @summary Event handler for the drop activity ends.
     *
     * @param event The drop event.
     */
    private onDropEnds(event: any): void {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'inactive', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'drop-activity', false);
    }

    /**
     * @summary Event handler for the on file drop event.
     *
     * @param file The file to be uploaded.
     */
    private onFileDrop(files: FileList): void {

        if (!files.length) {
            return;
        }

        let newFiles: Array<File> = Array.prototype.slice.call(files);

        if (!this._previewFiles.length > 0) {
            this._previewFiles = newFiles;
        } else {
            this._previewFiles = this._previewFiles.concat(newFiles);
        }

        this._rows = Math.ceil(this._previewFiles.length / NUMBER_OF_COLUMNS);
        // this._uploading = true;

       // this.upload(file, (result) => {
       //     this._uploading = false;
       //     console.log('File uploaded'); // TODO: Remove this and handle the case properly.
       // }, (error) => {
       //     this._uploading = false;
       //     console.log(`Something went wrong!`, error); // TODO: Remove this and handle the case properly.
       // });
    }

    /**
     * @summary Event handler for the image deleted event.
     *
     * @param {File} file The file to be deleted.
     */
    private onImageDeleted(file: File) {

        let index = this._previewFiles.indexOf(file);

        if(index !== -1) {
            this._previewFiles.splice(index, 1);
        }
    }

    /**
     * @summary Uploads the given file to the server.
     *
     * @param sourceFile The file to be uploaded.
     * @param resolve    The function callback for the resolve event.
     * @param reject     The function callback for the reject event.
     */
    public upload(sourceFile: File, resolve?: Function, reject?: Function) {
        const file = {
            name: sourceFile.name,
            type: sourceFile.type,
            size: sourceFile.size,
            productId: "P0000000003",
        }

        const reader = new FileReader();

        reader.onload = (ev: ProgressEvent) => {
            if (ev.type === 'load') {
                const upload = new UploadFS.Uploader({
                    data: ev.target.result,
                    file,
                    store: ImagesStore,
                    onError: reject,
                    onComplete: resolve
                });

                upload.start();
            } else if (ev.type === 'error') {
                throw new Error(`Couldn't load file`);
            }
        };

        reader.readAsArrayBuffer(sourceFile);
    }
}
