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

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the image migrations. Each collection will have at least 4 images.
 */
export class ImageMigration extends AbstractMigration
{

    protected _amount                     = 4;
    private _productsIds: Array<string>   = [];
    private _categoriesIds: Array<string> = [];
    private _path                         = 'storage/files/placeholder.png';
    private _type                         = 'image/png';

    /**
     * @summary Initializes a new instance of the class ImageMigration.
     *
     * @param collection   The related image collection
     * @param generators   The content generators.
     * @param _collections The collections that want images to be associated
     */
    constructor(
        collection: Mongo.Collection<Object>, generators,
        private _collections: {
            products: Mongo.Collection<Product>,
            categories: Mongo.Collection<Category>
        })
    {
        super(collection, generators);
    }

    /**
     * @summary Adds the images to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void
    {
        console.log('Adding Images.');

        this._generateIds();

        this._productsIds.forEach((id: string) => this._addImage('productId', id));

        this._categoriesIds.forEach((id: string) => this._addImage('categoryId', id));
    }

    /**
     * @summary adds an image related to the document given.
     *
     * @param {string} field the database field, IE: productId
     * @param {string} id
     * @private
     */
    private _addImage(field: string, id: string)
    {
        for (let i = 1; i <= this._amount; ++i)
        {
            const fileId = ImagesStore.create({name: `${id}-${i}`, [field]: id, type: this._type});

            ImagesStore.write(this._getImageStream(), fileId, error =>
            {
                if (error)
                {
                    console.log(error);
                }
            });
        }
    }

    /**
     * @summary Gets the models ids that need images from the database.
     * @private
     */
    private _generateIds(): void
    {
        this._productsIds = <string[]>this._collections.products
            .find({}, {fields: {_id: 1}})
            .fetch()
            .map((obj: any) => obj._id);

        this._categoriesIds = <string[]>this._collections.categories
            .find({}, {fields: {_id: 1}})
            .fetch()
            .map((obj: any) => obj._id);
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
