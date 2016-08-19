/**
 * @file user-auth.service.ts.
 *
 * @summary This service handles the users authentication business.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 18 2016
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

import { Subject, Observable, Observer } from 'rxjs';
import { Meteor }                        from 'meteor/meteor';
// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the users login and logout cases with related observables.
 */
export class UserAuthService {

    /**
     * @summary creates a subject related to the users login status.
     * @see https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
     */
    private _isLoggedSubject    = new Subject<boolean>();
    private _isLoggedObservable = this._isLoggedSubject.asObservable();

    /**
     * @summary creates a subject of the Meteors user object.
     * @see this._isLoggedSubject
     */
    private _userSubject    = new Subject<Meteor.User>();
    private _userObservable = this._userSubject.asObservable();

    /**
     * @summary Users related login flag as an observable.
     *
     * @returns {Observable<boolean>}
     */
    public isLogged(): Observable<boolean> {
        return this._isLoggedObservable;
    }

    /**
     * @summary Observable stream of the Meteor user object.
     *
     * @returns {Observable<Meteor.User>}
     */
    public user(): Observable<Meteor.User> {
        return this._userObservable;
    }

    /**
     * @summary handles the users login into the application.
     *
     * @param {string} email the users email
     * @param {string} password the users password, no need to bcrypt it prior.
     * @returns {Observable<boolean>} true if login success
     */
    public login(email: string, password: string): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            Meteor.loginWithPassword(email, password, (err) => {
                if (err) {
                    observer.next(false);
                    observer.error(err);
                }

                this._isLoggedSubject.next(true);
                this._userSubject.next(Meteor.user());
                observer.next(true);
                observer.complete();
            });
        });
    }

    /**
     * @summary handles the users logging out from the application.
     */
    public logout() {
        Meteor.logout(() => {
            this._isLoggedSubject.next(false);
            this._userSubject.next(null);
        });
    }
}
