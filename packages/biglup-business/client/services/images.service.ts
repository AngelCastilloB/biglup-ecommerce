/**
 * @file images.service.ts.
 *
 * @summary The images service definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 06, 2016
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

import { Injectable }          from '@angular/core';
import { Images }              from '../../common/collections/image.collection';
import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { Observable }          from 'rxjs/Observable';
import { Image, ProductImage } from '../../common/models';
import { ImagesStore }         from '../../common/collections/image.collection.ts';
import { UploadFS }            from 'meteor/jalik:ufs';
import { MeteorReactive }      from 'angular2-meteor';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services allows to upload, retrieve and delete all the images on the server..
 */
@Injectable()
export class ImagesService extends MeteorReactive
{
    private _images:       Array<Image>                  = Array<Image>();
    private _imagesStream: BehaviorSubject<Array<Image>> = new BehaviorSubject<Array<Image>>(Array<Image>());

    /**
     * @summary Initializes a new instance of the ImagesService class.
     */
    constructor()
    {
        super();

        this.subscribe('images', () =>
        {
            this.autorun(() =>
            {
                this._images = Images.find().fetch();
                this._imagesStream.next(this._images);
            }, true);
        });
    }

    /**
     * @summary Returns all the available images.
     *
     * @returns {Observable<Array<Image>>} The observable list of images.
     */
    public getImages(): Observable<Array<Image>>
    {
        return this._imagesStream.distinctUntilChanged();
    }

    /**
     * @summary Gets one image given its id.
     *
     * @param imageId The id of the image to be found.
     *
     * @returns {Observable<Image>} The product observable.
     */
    public getImage(imageId: string): Observable<Image>
    {
        return Observable.create(observer => {
            this.subscribe('images', imageId , () =>
            {
                let image: Image = Images.findOne({_id: imageId});

                if (!Image)
                {
                    observer.error('Image not found');
                    return;
                }

                observer.next(image);
                observer.complete();
            });
        });
    }

    /**
     * @summary Creates a new image.
     *
     * @param image The new product image to be created in the database.
     *
     * @remark Product images flagged as uploaded wont be uploaded.
     */
    public createProductImage(image: ProductImage): Observable<number>
    {
        if (image.isUploaded)
            return Observable.of(100);

        if (!image.file)
        {
            throw new Meteor.Error(
                'ImagesService.createProductImage',
                'You need to provide an image file to upload.');
        }

        let addedWork: number = 0;
        return Observable.create(observer =>
        {
                let sourceFile: File = image.file;

                const picture = {
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
                        observer.error(error);
                    },
                    onComplete: (result) =>
                    {
                        image.isUploaded = true;
                        image.id         = result._id;
                        image.url        = result.url.toString();

                        observer.complete();
                    },
                    onProgress: (file, progress) =>
                    {
                        addedWork = (progress * 100) - addedWork;
                        observer.next(addedWork);
                    }
                });

                worker.start();
        });
    }
}
