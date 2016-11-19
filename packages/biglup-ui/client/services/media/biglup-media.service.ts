/**
 * @file biglup-media.service.ts
 *
 * @summary Service that display toast messages.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 08 2016
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

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This emits when there are changes on the view port.
 */
@Injectable()
export class BiglupMediaService
{
    private _queryMap:         Map<string, string>              = new Map<string, string>();
    private _querySources:     {[key: string]: Subject<any>}    = {};
    private _queryObservables: {[key: string]: Observable<any>} = {};

    /**
     * @summary Initializes a new instance of the BiglupMediaService class.
     */
    constructor()
    {
        this._queryMap.set('xs', '(max-width: 599px)');
        this._queryMap.set('gt-xs', '(min-width: 600px)');
        this._queryMap.set('sm', '(min-width: 600px) and (max-width: 959px)');
        this._queryMap.set('gt-sm', '(min-width: 960px)');
        this._queryMap.set('md', '(min-width: 960px) and (max-width: 1279px)');
        this._queryMap.set('gt-md', '(min-width: 1280px)');
        this._queryMap.set('lg', '(min-width: 1280px) and (max-width: 1919px)');
        this._queryMap.set('gt-lg', '(min-width: 1920px)');
        this._queryMap.set('xl', '(min-width: 1920px)');
        this._queryMap.set('landscape', 'landscape');
        this._queryMap.set('portrait', 'portrait');
        this._queryMap.set('print', 'print');

        window.onresize = () =>
        {
            this._onResize();
        };
    }

    /**
     * @summary Used to evaluate whether a given media query is true or false given the current device's
     * screen / window size.
     */
    public query(query: string): boolean
    {
        if (this._queryMap.get(query.toLowerCase()))
            query = this._queryMap.get(query.toLowerCase());

        return window.matchMedia(query).matches;
    }

    /**
     * @summary Registers a media query and returns an [Observable] that will re-evaluate and
     * return if the given media query matches on window resize.
     */
    public registerQuery(query: string): Observable<any>
    {
        if (this._queryMap.get(query.toLowerCase()))
            query = this._queryMap.get(query.toLowerCase());

        if (!this._querySources[query])
            this._querySources[query] = new Subject<any>();

        this._queryObservables[query] = this._querySources[query].asObservable();

        return this._queryObservables[query];
    }

    /**
     * @summary Event handler for the on resize event.
     */
    private _onResize(): void
    {
        for (let key in this._querySources)
            this._querySources[key].next(window.matchMedia(key).matches);
    }
}
