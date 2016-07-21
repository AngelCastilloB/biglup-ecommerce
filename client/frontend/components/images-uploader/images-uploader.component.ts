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

import { Component }           from '@angular/core';
import { FileDropDirective }   from 'angular2-file-drop';
import { UploadFS }            from 'meteor/jalik:ufs';
import { ImagesStore, Images } from '../../../../common/collections/image.collection';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
//noinspection TypeScriptCheckImport
import template from './images-uploader.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows to drag and drop images to be uploaded to the server.
 */
@Component({
    selector: 'images-uploader',
    template,
    directives: [ FileDropDirective ]
})
export class ImagesUploader {

    private _fileIsOver: boolean = false;
    private _uploading:  boolean = false;
    private _images:     Mongo.Cursor<Image>;

    /**
     * @summary Initializes a new istance of the ImagesUploader class.
     */
    constructor() {
        this._images = Images.find();
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
     * @summary Event handler for the on file drop event.
     *
     * @param file The file to be uploaded.
     */
    public onFileDrop(file: File): void {
        this._uploading = true;

        this.upload(file, (result) => {
            this._uploading = false;
            console.debug("File uploaded"); // TODO: Remove this and handle the case properly.
        }, (error) => {
            this._uploading = false;
            console.log(`Something went wrong!`, error);  // TODO: Remove this and handle the case properly.
        });
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