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

export class ImageMigration extends AbstractMigration {

    /**
     * @summary Each collection will have at least 4 images.
     *
     * @type {number}
     * @private
     */
    protected _amount = 4;

    private _productsIds: Array<Distinguishable>   = [];
    private _categoriesIds: Array<Distinguishable> = [];

    private _path = 'storage/files/placeholder.png';
    private _type = 'image/png';

    /**
     * @param collection the related image collection
     * @param generators
     * @param _collections The collections that want images to be associated
     */
    constructor(collection: Mongo.Collection<Object>,
        generators,
        private _collections: {
            products: Mongo.Collection<Product>,
            categories: Mongo.Collection<Category>
        }) {
        super(collection, generators);
    }

    /**
     * @summary Adds the images to the database.
     *
     * @see parent AbstractMigration.
     */
    public up(): void {
        console.log('Adding Images.');
        this._getIds();

        this._productsIds.forEach((obj: Distinguishable) => {
            this._addImage('productId', obj._id);
        });

        this._categoriesIds.forEach((obj: Distinguishable) => {
            this._addImage('categoryId', obj._id);
        });
    }

    /**
     * @summary adds an image related to the document given.
     *
     * @param {string} field the database field, IE: productId
     * @param {Distinguishable} id
     * @private
     */
    private _addImage(field: string, id: Distinguishable) {
        for (let i = 1; i <= this._amount; i++) {
            const fileId = ImagesStore.create({
                name: `${id}-${i}`,
                [field]: id,
                type: this._type
            });

            ImagesStore.write(this._getImageStream(), fileId, err => {
                if (err) console.log(err);
            });
        }
    }

    /**
     * @summary Gets the models ids that need images from the database.
     * @private
     */
    private _getIds(): void {
        this._productsIds   = this._collections.products.find({}, {fields: {_id: 1}}).fetch();
        this._categoriesIds = this._collections.categories.find({}, {fields: {_id: 1}}).fetch();
    }

    /**
     * @summary Creates a stream from the placeholder image file.
     *
     * @private
     */
    private _getImageStream(): ReadStream {
        let path;
        try {
            path = Assets.absoluteFilePath(this._path);
        } catch (err: Error) {
            if (err.message.match(/Unknown asset/)) {
                throw new Error('Image migration requires a placeholder set in ' +
                    'PROJECT_ROOT/private/storage/files/placeholder.png, ' +
                    'please read the README for more info.');
            }

            throw err;
        }

        return createReadStream(path);
    }
}
