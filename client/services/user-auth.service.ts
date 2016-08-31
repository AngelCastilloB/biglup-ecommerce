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

import { Subject, Observable } from 'rxjs';
import { Meteor }              from 'meteor/meteor';
import { Accounts }            from 'meteor/accounts-base';
import { Injectable }          from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the users login and logout cases with related observables.
 */
@Injectable()
export class UserAuthService
{
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
     * @summary Wrapper around meteor user id, as an boolean.
     * @returns {boolean}
     */
    public isLogged(): boolean
    {
        return !!Meteor.userId();
    }

    /**
     * @summary Users related login flag as an observable.
     *
     * @returns {Observable<boolean>}
     */
    public isLoggedStream(): Observable<boolean>
    {
        return this._isLoggedObservable;
    }

    /**
     * @summary Returns the current user object.
     *
     * @returns {Meteor.User}
     */
    public getUser()
    {
        return Meteor.user();
    }

    /**
     * @summary Observable stream of the Meteor user object.
     *
     * @returns {Observable<Meteor.User>}
     */
    public getUserStream(): Observable<Meteor.User>
    {
        return this._userObservable;
    }

    /**
     * @summary handles the users login into the application.
     *
     * @param {string} email the users email
     * @param {string} password the users password, no need to bcrypt it prior.
     * @param {Function} callback expects an error as parameter.
     *
     * @returns {Observable<boolean>} true if login success
     */
    public login(email: string, password: string, callback: (error?) => void)
    {
        Meteor.loginWithPassword(email, password, err => this._updateUserLoginStreams(err, callback));
    }

    /**
     * @summary handles the users logging out from the application.
     */
    public logout()
    {
        Meteor.logout(() =>
        {
            this._isLoggedSubject.next(false);
            this._userSubject.next(null);
        });
    }

    /**
     * @summary creates a new user from the Account system.
     *
     * @param {object} options
     * @param {string} options.email
     * @param {string} options.password
     * @param {Function=} callback this callback expects an error object as an argument
     */
    public createUser(options: {email: string, password: string}, callback?: (error) => void)
    {
        Accounts.createUser(options, err => callback(err));
    }

    /**
     * @summary attempts to login with facebook.
     *
     * @param {Object} options
     * @param {Function=} callback this callback expects an error object as an argument
     */
    public loginWithFacebook(options: Object, callback?: (error) => void)
    {
        Meteor.loginWithFacebook(options, err => this._updateUserLoginStreams(err, callback));
    }

    /**
     * @summary attempts to login with google.
     *
     * @param {Object} options
     * @param {Function=} callback this callback expects an error object as an argument
     */
    public loginWithGoogle(options: Object, callback?: (error) => void)
    {
        Meteor.loginWithGoogle(options, err => this._updateUserLoginStreams(err, callback));
    }

    /**
     * @summary attempts to login with twitter.
     *
     * @param {Object} options
     * @param {Function=} callback this callback expects an error object as an argument
     */
    public loginWithTwitter(options: Object, callback?: (error) => void)
    {
        Meteor.loginWithTwitter(options, err => this._updateUserLoginStreams(err, callback));
    }

    /**
     * @summary Triggers the forgot password functionality.
     *
     * @param options  The email of the user.
     * @param callback The callback function.
     */
    public forgotPassword(options: {email: string}, callback?: (err?) => void)
    {
        Accounts.forgotPassword(options, callback);
    }

    /**
     * @summary Triggers the reset password functionality.
     *
     * @param token        //TODO: Document
     * @param newPassword The new password.
     * @param callback    The callback function.
     */
    public resetPassword(token: string, newPassword: string, callback?: (error) => void)
    {
        Accounts.resetPassword(token, newPassword, callback);
    }

    /**
     * @summary update the various observer streams with the login/logout events.
     *
     * @param err any external errors.
     * @param callback the callers callback
     *
     * @returns {*} whatever the callback returns
     * @private
     */
    private _updateUserLoginStreams(error?: any, callback?: Function)
    {
        if (!error)
        {
            this._isLoggedSubject.next(true);
            this._userSubject.next(this.getUser());
        }

        if (callback)
            return callback(error);
    }
}
