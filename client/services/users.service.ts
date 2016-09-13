/**
 * @file users.service.ts.
 *
 * @summary Users collections service implementation.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 13 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

import { Injectable }          from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UsersService {

    /**
     * @summary creates a subject all the users in the system.
     */
    private _userCollectionStream = new Subject<Meteor.User>();

    constructor()
    {
        Meteor.subscribe('users', () => this._userCollectionStream.next(Meteor.users.find({}).fetch()));
    }

    /**
     * @summary Observable stream of the Meteor user object.
     *
     * @returns {Observable<Meteor.User>}
     */
    public getUserCollectionStream(): Observable<Meteor.User>
    {
        return this._userCollectionStream;
    }
}
