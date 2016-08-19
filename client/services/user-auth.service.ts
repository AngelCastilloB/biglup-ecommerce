/**
 * @file user-auth.service.
 *
 * @summary TODO add summary on user-auth.service.
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
import { Subject, Observable } from 'rxjs';
import { Meteor } from 'meteor/meteor';

export class UserAuthService {

    /**
     * https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
     *
     * @type {Subject<boolean>}
     */
    private _isLoggedSubject    = new Subject<boolean>();
    private _isLoggedObservable = this._isLoggedSubject.asObservable();

    private _userSubject    = new Subject<Meteor.User>();
    private _userObservable = this._userSubject.asObservable();

    public isLogged(): Observable<boolean> {
        return this._isLoggedObservable;
    }

    public user(): Observable<Meteor.User> {
        return this._userObservable;
    }

    public login(email: string, password: string): Observable<boolean> {
        console.log('trying to login!');
        return Observable.create(observer => {
            Meteor.loginWithPassword(email, password, (err) => {
                console.log('inside loginWithPassword callback');
                if (err) throw err;

                this._isLoggedSubject.next(true);
                this._userSubject.next(Meteor.user());
                observer.onNext(true);
            });
        });
    }

    public logout() {
        Meteor.logout(() => {
            this._isLoggedSubject.next(false);
            this._userSubject.next(null);
        });
    }
}
