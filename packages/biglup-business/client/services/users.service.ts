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

// IMPORTS ************************************************************************************************************/

import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeteorReactive }              from 'angular2-meteor';

// RxJS imports
import 'rxjs/add/operator/distinctUntilChanged';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The UserService provides information about the users on the system.
 */
@Injectable()
export class UsersService extends MeteorReactive
{
    /**
     * @summary creates a subject all the users in the system.
     */
    private _userCollectionStream = new BehaviorSubject<Array<Meteor.User>>(Array<Meteor.User>());

    /**
     * @summary Initializes a new instnace of the UsersService class.
     */
    constructor()
    {
        super();

        this.subscribe('users', () =>
        {
            this.autorun(() =>
            {
                this._userCollectionStream.next(Meteor.users.find({}).fetch());
            }, true);
        });
    }

    /**
     * @summary Observable stream of the Meteor user object.
     *
     * @returns {Observable<Meteor.User>}
     */
    public getUserCollectionStream(): Observable<Array<Meteor.User>>
    {
        return this._userCollectionStream.distinctUntilChanged();
    }
}
