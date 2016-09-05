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

import { AbstractMigration }               from './abstract-migration';
import { Mongo }                           from 'meteor/mongo';
import { ImagesStore }                     from '../../common/collections/image.collection';
import { ReadStream, createReadStream }    from 'fs';
import { Category, Product, OrderedImage } from '../../common/models/models';
import { Images }                          from '../../common/collections/image.collection';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the image migrations. Each collection will have at least 4 images.
 */
export class ImageMigration extends AbstractMigration
{
    protected _amount                      = 1;
    private   _products:   Array<Product>  = [];
    private   _categories: Array<Category> = [];
    private   _path                        = 'storage/files/placeholder.png';
    private   _type                        = 'image/png';

    /**
     * @summary Initializes a new instance of the class ImageMigration.
     *
     * @param _collection  The related image collection
     * @param _generators  The content generators.
     * @param _collections The collections that want images to be associated
     */
    constructor(
        protected _collection: Mongo.Collection<Object>,
        protected _generators,
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

        console.error(this._products.length);
        //this._products.forEach((product: Product) => this._addProductImage(product));
    }

    /**
     * @summary adds an image related to the document given.
     *
     * @param {string} product The product to add the image to.
     * @private
     */
    private _addProductImage(product: Product)
    {
        console.error(this._amount);
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
