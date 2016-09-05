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
         Renderer,
         EventEmitter,
         Output }         from '@angular/core';
import { UploadFS }       from 'meteor/jalik:ufs';
import { ImagesStore }    from '../../../../common/collections/image.collection.ts';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { UploaderImage }  from './internals/product-image';
import { Product }        from '../../../../common/models/models';

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
    styleUrls: ['./images-uploader.component.css']
})
export class ImagesUploaderComponent
{
    @Output('onSuccess')
    private  _onSuccess:   EventEmitter<any>    = new EventEmitter<any>();
    @Output('onError')
    private _onError:      EventEmitter<any>    = new EventEmitter<any>();
    @ViewChild('drop')
    private _dropzone:     ElementRef;
    private _fileIsOver:   boolean              = false;
    private _uploading:    boolean              = false;
    private _previewFiles: Array<UploaderImage> = [];
    private _rows:         number               = 0;

    /**
     * @summary Initializes a new instance of the ImagesUploaderComponent class.
     */
    constructor(private _renderer: Renderer, private _dragulaService: DragulaService)
    {
        this._dragulaService.drop.subscribe((value) =>
        {
            if (this._uploading)
                return;

            let [bag, e, target, source, sibling] = value;

            if (this._previewFiles.length < 2)
                return;

            if (!sibling)
            {
                let sourceIndex: number = parseInt(e.id, 10);

                this._moveFile(sourceIndex, this._previewFiles.length - 1);
            }
            else
            {
                let sourceIndex:      number = parseInt(e.id, 10);
                let destinationIndex: number = parseInt(sibling.id, 10);

                this._moveFile(sourceIndex, sourceIndex > destinationIndex ? destinationIndex : destinationIndex - 1);
            }
        });
    }

    /**
     * @summary Sets a lis of images to this component.
     *
     * @param images The images to be set.
     */
    public setImages(images: Array<UploaderImage>) {

        this._previewFiles = images;
    }

    /**
     * @summary Sets the file is over property.
     *
     * @param fileIsOver True if the upload is over, otherwise, false.
     */
    public fileOver(fileIsOver: boolean): void
    {
        this._fileIsOver = fileIsOver;
    }

    /**
     * @summary Uploads all the current images to the server.
     *
     * @param {string} product The product to be uploaded.
     */
    // TODO: Refactor this method/Move to a service.
    public upload(product: Product)
    {
        this._uploading = true;

        product.images.length = 0;

        let toBeUploaded: number = this._previewFiles.filter(function (uploaderImage: UploaderImage)
        {
            return !uploaderImage.isUploaded;
        }).length;

        let onlyRearrenge: boolean = toBeUploaded === 0;

        let imagesId: Array<string> =  product.images.map((image) => image.id);

        for (let i = 0; i < this._previewFiles.length && this._uploading; ++i)
        {
            if (this._previewFiles[i].isUploaded)
            {
                product.images.push(
                    { position: i, id: this._previewFiles[i].databaseId, url: this._previewFiles[i].remoteUrl });

                continue;
            }

            let sourceFile: File = this._previewFiles[i].file;

            const picture =
            {
                name: sourceFile.name,
                type: sourceFile.type,
                size: sourceFile.size,
            };

            let worker = new UploadFS.Uploader({
                store: ImagesStore,
                data: sourceFile,
                file: picture,
                onError: (error) =>
                {
                    if (!this._uploading) // HACK: remove this
                        return;

                    this._uploading = false;
                    this._onError.emit(error);
                },
                onComplete: (result) =>
                {
                    product.images.push({ position: i, id: result._id, url: result.url.toString() });

                    --toBeUploaded;

                    if (toBeUploaded === 0) // HACK: remove this
                    {
                        this._onSuccess.emit({});
                        this._uploading = false;
                    }
                }
            });

            worker.start();
        }

        if (onlyRearrenge)
            this._onSuccess.emit({});
    }

    /**
     * @summary Event handler for the drop activity starts.
     *
     * @param event The drop event.
     */
    private _onDropStart(event: any): void
    {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-active', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-inactive', false);
    }

    /**
     * @summary Event handler for the drop activity ends.
     *
     * @param event The drop event.
     */
    private _onDropEnds(event: any): void
    {
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-inactive', true);
        this._renderer.setElementClass(this._dropzone.nativeElement, 'dropzone-active', false);
    }

    /**
     * @summary Event handler for the on file drop event.
     *
     * @param file The file to be uploaded.
     */
    private _onFileDrop(files: FileList): void
    {
        if (this._uploading)
            return;

        if (!files.length)
            return;

        let newFiles: Array<UploaderImage> = Array.prototype.slice.call(files).map(function (file) {
            return new UploaderImage(file, false, '');
        });

        if (this._previewFiles.length === 0)
        {
            this._previewFiles = newFiles;
        }
        else
        {
            this._previewFiles = this._previewFiles.concat(newFiles);
        }

        this._rows = Math.ceil(this._previewFiles.length / NUMBER_OF_COLUMNS);
    }

    /**
     * @summary Event handler for the image deleted event.
     *
     * @param {File} file The file to be deleted.
     */
    private _onImageDeleted(file: UploaderImage)
    {
        if (this._uploading)
            return;

        let index = this._previewFiles.indexOf(file);

        if (index !== -1)
            this._previewFiles.splice(index, 1);
    }

        /**
         * @brief Move one file from the source index to the destination index.
         *
         * @param {number} source The source index.
         * @param { number} destination The destination index.
         */
    private _moveFile(source: number, destination: number): void
    {
        if (this._uploading)
            return;

        while (source < 0)
            source += this._previewFiles.length;

        while (destination < 0)
            destination += this._previewFiles.length;

        if (destination >= this._previewFiles.length)
        {
            let k: number = destination - this._previewFiles.length;

            while ((k--) + 1)
                this._previewFiles.push(undefined);
        }

        this._previewFiles.splice(destination, 0, this._previewFiles.splice(source, 1)[0]);
    }
}
