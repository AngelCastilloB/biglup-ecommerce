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

import { AbstractMigration }            from './abstract-migration';
import { Mongo }                        from 'meteor/mongo';
import { ImagesStore }                  from '../../common/collections/image.collection';
import { ReadStream, createReadStream } from 'fs';
import { Category, Product }            from '../../common/models';

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
     * @summary Initializes a new instance of the class ImageMigration.
     *
     * @param _collection  The related image collection
     * @param _generators  The content generators.
     * @param _collections The collections that want images to be associated
     */
    constructor(
        _collection: Mongo.Collection<Object>,
        _generators,
        private   _collections: { products: Mongo.Collection<Product>, categories: Mongo.Collection<Category>})
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

        this._products.forEach((product: Product) => this._addProductImages(product));
        this._categories.forEach((category: Category) => this._addCategoryImage(category));
    }

    /**
     * @summary adds a group of images to the given product.
     *
     * @param {Product} product The product to add the images into.
     * @private
     */
    private _addProductImages(product: Product): void
    {
        for (let i = 1; i <= this._amount; ++i)
        {
            this._createImage(i.toString(), (error, image) =>
            {
                if (error)
                    throw error;

                this._collections.products.update({_id: product._id}, {
                    $push: { images: {id: image._id, url: image.url, isUploaded: true}
                    }
                });
            });
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

        ImagesStore.write(this._getImageStream(), imageId, callback);
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
            {
                throw error;
            }

            this._collections.categories.update({_id: category._id}, {$set: {image: image.url}});
        });
    }

    /**
     * @summary Creates a stream from the placeholder image file.
     *
     * @private
     */
    private _getImageStream(): ReadStream
    {
        let path;

        try
        {
            path = Assets.absoluteFilePath(this._path);
        }
        catch (error)
        {
            if (error.message.match(/Unknown asset/))
            {
                throw new Error('Image migration requires a placeholder set in ' +
                    'PROJECT_ROOT/private/storage/files/placeholder.png, ' +
                    'please read the README for more info.');
            }

            throw error;
        }

        return createReadStream(path);
    }
}
