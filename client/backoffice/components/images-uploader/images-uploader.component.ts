/**
 * @file images-uploader.component.ts
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
import { FileSelectDirective }     from './directives/file-select.directive';
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
    template,
    styleUrls: ['./images-uploader.component.css'],
    viewProviders: [DragulaService],
    directives: [FileDropDirective, FileSelectDirective, ImagePreviewComponent, Dragula]
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

            if (this._previewFiles.length < 2) {
                return;
            }

            if (!sibling) {
                let sourceIndex: number = parseInt(e.id);

                this._moveFile(sourceIndex, this._previewFiles.length - 1);
            } else {
                let sourceIndex:      number = parseInt(e.id, 10);
                let destinationIndex: number = parseInt(sibling.id, 10);

                this._moveFile(sourceIndex, sourceIndex > destinationIndex ? destinationIndex : destinationIndex - 1);
            }
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

    /**
     * @summary Event handler for the drop activity starts.
     *
     * @param event The drop event.
     */
    private _onDropStart(event: any): void {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-active', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-inactive', false);
    }

    /**
     * @summary Event handler for the drop activity ends.
     *
     * @param event The drop event.
     */
    private _onDropEnds(event: any): void {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-inactive', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-active', false);
    }

    /**
     * @summary Event handler for the on file drop event.
     *
     * @param file The file to be uploaded.
     */
    private _onFileDrop(files: FileList): void {

        if (!files.length) {
            return;
        }

        let newFiles: Array<File> = Array.prototype.slice.call(files);

        if (!(this._previewFiles.length > 0)) {
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
    private _onImageDeleted(file: File) {

        let index = this._previewFiles.indexOf(file);

        if(index !== -1) {
            this._previewFiles.splice(index, 1);
        }
    }

   /**
    * @brief Move one file from the source index to the destination index.
    *
    * @param {number} source The source index.
    * @param { number} destination The destination index.
    */
    private _moveFile(source: number, destination: number): void  {
        while (source < 0) {
            source += this._previewFiles.length;
        }

        while (destination < 0) {
            destination += this._previewFiles.length;
        }

        if (destination >= this._previewFiles.length) {
            let k: number = destination - this._previewFiles.length;

            while ((k--) + 1) {
                this._previewFiles.push(undefined);
            }
        }

        this._previewFiles.splice(destination, 0, this._previewFiles.splice(source, 1)[0]);
    }
}
