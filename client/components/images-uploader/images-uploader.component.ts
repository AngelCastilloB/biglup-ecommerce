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

import { Component } from '@angular/core';
import { FileDropDirective } from 'angular2-file-drop';
import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore, Images } from '../../../common/collections/image.collection';

import template from './images-uploader.component.html';

@Component({
    selector: 'images-uploader',
    template,
    directives: [ FileDropDirective ]
})
export class ImagesUploader {
    public fileIsOver: boolean = false;
    public uploading: boolean = false;
    public images: Mongo.Cursor<Image>;

    constructor() {
        this.images = Images.find();
        console.debug(ImagesStore);
        console.debug(ImagesStore.getFilePath("8GJfz7bZ3MdR5ou2z"));
    }

    public fileOver(fileIsOver: boolean): void {
        this.fileIsOver = fileIsOver;
    }

    public onFileDrop(file: File): void {
        this.uploading = true;

        this.upload(file, (result) => {
            this.uploading = false;
            console.debug("File uploaded");
        }, (error) => {
            this.uploading = false;
            console.log(`Something went wrong!`, error);
        });
    }

    public upload(sourceFile: File, resolve?: Function, reject?: Function) {
    // pick from an object only: name, type and size
    const file = {
        name: sourceFile.name,
        type: sourceFile.type,
        size: sourceFile.size,
    }
    const reader = new FileReader();

    // handle progress
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
    // as ArrayBuffer
    reader.readAsArrayBuffer(sourceFile);
  }
}