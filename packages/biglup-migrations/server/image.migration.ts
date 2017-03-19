/**
 * @file image.migration.ts.
 *
 * @summary Creates related images of various collections.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 08 2016
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

import { AbstractMigration }                 from './abstract-migration';
import { Category, Product  }                from 'meteor/biglup:business';
import { Observable }                        from 'rxjs/Observable';
import * as Jimp                             from 'jimp';
import * as stream                           from 'stream';
import { ImagesStore, GoogleStorageService } from 'meteor/biglup:images'
import * as Future                           from 'fibers/future';

// Reactive Extensions Imports
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/scan';

// CONSTANTS **********************************************************************************************************/

const IMAGE_WIDTH    = 700;
const IMAGE_HEIGHT   = 950;
const MAX_32_BIT_INT = 2147483647;
const FONT_OFFSET    = 32;

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the image migrations. Each collection will have 4 images.
 */
export class ImageMigration extends AbstractMigration
{
    /**
     * @summary Each associated document will have at most 4 images.
     *
     * @type {number}
     * @private
     */
    private _amount = 4;

    /**
     * @summary The products that will be updated with new images.
     *
     * @type {Array}
     * @private
     */
    private _products: Array<Product> = [];

    /**
     * @summary The categories that will have one image.
     *
     * @type {Array}
     * @private
     */
    private _categories: Array<Category> = [];

    /**
     * @summary The path the default image has.
     *
     * @type {string}
     * @private
     */
    private _path = 'storage/files/placeholder.png';

    /**
     * @summary The mime type the default image has, UploadFS needs this info.
     *
     * @type {string}
     * @private
     */
    private _type = 'image/png';

    /**
     * Srummary The total number of images.
     */
    private _totalImages: number  = 0;

    /**
     * Srummary The total number of images.
     */
    private _totalProgress: number  = 0;

    /**
     * @summary Initializes a new instance of the class ImageMigration.
     *
     * @param _collection  The related image collection
     * @param _generators  The content generators.
     * @param _collections The collections that want images to be associated
     */
    constructor(
        _collection: Mongo.Collection<Object>,
        _generators,
        private _collections: { products: Mongo.Collection<Product>, categories: Mongo.Collection<Category>})
    {
        super(_collection, _generators);
    }

    /**
     * @summary Adds the images to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void
    {
        console.log('Adding Images.');

        this._products   = this._collections.products.find({}).fetch();
        this._categories = this._collections.categories.find({}).fetch();

        console.info(this._products.length + " products created in " + this._categories.length + " categories.");

        if (GoogleStorageService.getInstance().isActive())
            console.log('Google cloud service is active. The images will be uploaded to the cloud.');
        else
            console.log('The images will be hosted in the server');

        this._totalImages = this._amount * this._products.length;
        this._totalProgress = 0;
        console.info("Total images to be created: " + this._totalImages);
        this._products.forEach((product: Product) => this._addProductImages(product));
    }

    /**
     * @summary adds a group of images to the given product.
     *
     * @param {Product} product The product to add the images into.
     * @private
     */
    private _addProductImages(product: Product): void
    {
        let isGcsActive: boolean = GoogleStorageService.getInstance().isActive();

        if (isGcsActive)
        {
            let buffers: any[] = [];
            for (let i = 1; i <= this._amount; ++i)
                buffers.push(this._getImageStream(IMAGE_WIDTH, IMAGE_HEIGHT, this._generateRandomColor(), i.toString()));

            buffers.forEach((buffer) =>
            {
                let retryCount: number = 4;
                let imageUploaded: boolean = false;
                while (retryCount > 0 && !imageUploaded)
                {
                    try
                    {
                        console.info('Uploading image ' + this._totalProgress + '/' + this._totalImages + '(' + ((this._totalProgress / this._totalImages) * 100).toFixed(2) + '%)');
                        let image = GoogleStorageService.getInstance().uploadImage(buffer, this._totalProgress.toString(), this._type, 0);
                        image = GoogleStorageService.getInstance().confirmUpload(image._id, true);

                        this._collections.products.update(
                            {
                                _id: product._id
                            },
                            {
                                $push: {images: {id: image._id, url: image.url, isUploaded: true}}
                            });
                        ++this._totalProgress;

                        imageUploaded = true;
                    }
                    catch (error)
                    {
                        console.error(error);
                        console.info("Retrying");

                        --retryCount;
                    }
                }

                if (!imageUploaded)
                    console.error('There was an error uploading one of the images for this product');
            });
        }
        else
        {
            for (let i = 1; i <= this._amount; ++i)
            {
                this._createImage(i.toString(), (error, image) =>
                {
                    if (error)
                        throw error;

                    this._collections.products.update(
                        {_id: product._id},
                        {$push: { images: {id: image._id, url: image.url, isUploaded: true}}
                        });
                });
            }
        }
    }

    /**
     * @summary Writes a new image to the HD asynchronously.
     *
     * @param {string} name The name this image will have.
     * @param {Function} callback The function to run after the image is written.
     * @private
     */
    private _createImage(name: string, callback: (error, image) => void)
    {
        const imageId = ImagesStore.create({name, type: this._type});

        let buffer = this._getImageStream(IMAGE_WIDTH, IMAGE_HEIGHT, this._generateRandomColor(), name);
        ImagesStore.write(buffer, imageId, callback);
    }

    /**
     * @summary Creates a image for a given category.
     *
     * @param {Category} category The category to have the new image.
     * @private
     */
    private _addCategoryImage(category: Category)
    {
        this._createImage('0', (error, image) =>
        {
            if (error)
                throw error;

            this._collections.categories.update({_id: category._id}, {$set: {image: image.url}});
        });
    }

    /**
     * @brief Creates an image of the specified width, height and color.
     *
     * @param width  The width of the image.
     * @param height The height of the image.
     * @param color  The color of the image.
     * @param name   The name of the image.
     *
     * @returns {Observable<any>} An observable with that will return the newly created image as a readable buffer.
     */
    private _getImageStream(width: number, height: number, color: number, name: string): any
    {
        var future = new Future();
        let image = new Jimp(width, height, color, Meteor.bindEnvironment((error, result) =>
        {
            if (error)
            {
                future.throw(error);
                return;
            }

            let typography = Jimp.FONT_SANS_64_BLACK;

            if (color < MAX_32_BIT_INT / 2)
                typography = Jimp.FONT_SANS_64_WHITE;

            Jimp.loadFont(typography, Meteor.bindEnvironment((fontError, font) =>
            {
                if (fontError)
                {
                    future.throw(fontError);
                    return;
                }

                result.print(font, FONT_OFFSET, FONT_OFFSET, name);

                result.getBuffer(Jimp.MIME_PNG, Meteor.bindEnvironment((bufferError, buffer) =>
                {
                    if (bufferError)
                    {
                        future.throw(bufferError);
                        return;
                    }

                    let bufferStream = new stream.PassThrough();

                    bufferStream.end(buffer);

                    future.return(bufferStream);
                }));
            }));
        }));

        return future.wait();
    }

    /**
     * @summary Generates a color number representation of a color in 32 bits format.
     *
     * @returns {number} The color number representation in 32 bits.
     */
    private _generateRandomColor(): number
    {
        let r = Math.round(Math.random() * 0xFF) & 0xFF;
        let g = Math.round(Math.random() * 0xFF) & 0xFF;
        let b = Math.round(Math.random() * 0xFF) & 0xFF;
        let a = 0xFF;

        return (((r << 24) + (g << 16) + (b << 8)) + a) >>> 0;
    }
}
