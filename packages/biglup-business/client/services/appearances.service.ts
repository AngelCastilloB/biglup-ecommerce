/**
 * @file appearance.service.ts.
 *
 * @summary Implementation of the appearance service.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 20, 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Injectable }            from '@angular/core';
import { Appearances }           from '../../common/collections/appearance.collections';
import { BehaviorSubject }       from 'rxjs/BehaviorSubject';
import { Observable }            from 'rxjs/Observable';
import { Appearance, LogoImage } from '../../common/models';
import { MeteorReactive }        from 'angular2-meteor';
import { ImagesService }         from './images.service';

// Reactive Extensions Imports
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/distinctUntilChanged';

// INTERNALS **********************************************************************************************************/

/**
 * @summary Performs a copy of the appearance model.
 *
 * @return The cloned instance.
 */
const copyAppearance = (appearance: Appearance) =>
{
    let clone: any = JSON.parse(JSON.stringify(appearance));

    // Fix the dates type safety.
    clone.createdAt   = new Date(clone.createdAt.toString());
    clone.updatedAt   = new Date(clone.updatedAt.toString());

    return <Appearance>clone;
};

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services retrieves all current appearance information.
 */
@Injectable()
export class AppearancesService extends MeteorReactive
{
    private _appearances:       Array<Appearance> = Array<Appearance>();
    private _appearancesStream: any               = new BehaviorSubject<Array<Appearance>>(Array<Appearance>());

    /**
     * @summary Initializes a new instance of the AppearancesService class.
     */
    constructor(private _imagesService: ImagesService)
    {
        super();

        this.subscribe('appearances', () =>
        {
            this.autorun(() =>
            {
                this._appearances = Appearances.find().fetch();

                if (!!this._appearances)
                    this._appearancesStream.next(this._appearances);

            }, true);
        });
    }

    /**
     * @summary Returns all the available appearances.
     *
     * @returns {Observable<Array<Appearance>>} The observable list of appearances.
     */
    public getAppearances(): Observable<Array<Appearance>>
    {
        return this._appearancesStream.distinctUntilChanged();
    }

    /**
     * @summary Gets one appearance given its id.
     *
     * @param appearanceId The id of the appearance to be found.
     *
     * @returns {Observable<Appearance>} The category observable.
     */
    public getAppearance(appearanceId: string): Observable<Appearance>
    {
        return this._appearancesStream
            .distinctUntilChanged()
            .mergeMap((array) =>
            {
                console.error(array);
                return new BehaviorSubject(array.find(appearance => appearance._id === appearanceId));
            });
    }

    /**
     * @summary Creates a new appearance.
     *
     * @param appearance The appearance to be created in the database.
     */
    public createAppearance(appearance: Appearance): Observable<string>
    {
        const copy = copyAppearance(appearance);

        copy.style.header.logo.isUploaded = true;
        return Observable.create(observer => {
            this.call('createAppearance', copy, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    /**
     * @summary Updates a appearance.
     *
     * @param appearance The category to be updated in the database.
     */
    public updateAppearance(appearance: Appearance): Observable<string>
    {
        const copy = copyAppearance(appearance);

        const totalProgress: number = 100;

        return Observable
            .of(appearance.style.header.logo)
            .mergeMap(image => this._imagesService.createLogoImage(image))
            .scan((accumulator, progress) => accumulator + ((progress / totalProgress)  * 100) , 0)
            .concat(Observable.create(observer =>
            {
                const preLoadedLogo = appearance.style.header.logo;
                copy.style.header.logo = new LogoImage(preLoadedLogo.id, preLoadedLogo.url, preLoadedLogo.isUploaded);

                Meteor.call('updateAppearance', copy, (error) =>
                {
                    if (error)
                    {
                        observer.error(error);
                    }
                    else
                    {
                        observer.next(100);
                        observer.complete();
                    }
                });
            }));
    }

    /**
     * @summary Deletes the given appearance from the database.
     *
     * @param appearanceId The appearance Id.
     *
     * @return {Observable} a new cold observable
     */
    public deleteAppearance(appearanceId: string): Observable<string>
    {
        return Observable.create(observer => {
            this.call('deleteAppearance', appearanceId, (error, result) =>
            {
                if (error)
                {
                    observer.error(error);
                }
                else
                {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }
}
