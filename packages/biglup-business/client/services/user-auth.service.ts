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

import { Observable, BehaviorSubject } from 'rxjs';
import { Meteor }                      from 'meteor/meteor';
import { Accounts }                    from 'meteor/accounts-base';
import { Injectable }                  from '@angular/core';
import { MeteorComponent }             from 'angular2-meteor';
import { User }                        from '../../common/models';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles the users login and logout cases with related observables.
 */
@Injectable()
export class UserAuthService extends MeteorComponent
{

    /**
     * @summary creates a subject related to the users login status.
     * @see https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
     */
    private _isLoggedStream = new BehaviorSubject<boolean>(this.isLogged());

    /**
     * @summary creates a subject of the Meteors user object.
     * @see this._isLoggedStream
     */
    private _userStream = new BehaviorSubject<User>(null);

    /**
     * @summary Initializes a new instance of the UserAuthService class.
     */
    constructor()
    {
        super();

        this.subscribe('user', this.getId(), () =>
        {
            this.autorun(() => {
                const user = <User>Meteor.users.findOne({_id: this.getId()});

                if (user)
                    this._updateUserStream(user);
            }, true);
        });
    }

    /**
     * @summary Wrapper around meteor user id, as an boolean.
     *
     * @returns {boolean}
     */
    public isLogged(): boolean
    {
        return !!Meteor.userId();
    }

    /**
     * @summary Returns the current user's id.
     *
     * @returns {string}
     */
    public getId(): string
    {
        return Meteor.userId();
    }

    /**
     * @summary Users related login flag as an observable.
     *
     * @returns {Observable<boolean>}
     */
    public isLoggedStream(): Observable<boolean>
    {
        return this._isLoggedStream;
    }

    /**
     * @summary Observable stream of the Meteor user object.
     *
     * @returns {Observable<User>}
     */
    public getUserStream(): Observable<User>
    {
        return this._userStream;
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
        Meteor.logout(() => this._updateUserStream());
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
     * @param {string}   token       The token generated by the app to check against.
     * @param {string}   newPassword The new password.
     * @param {Function} callback    The callback function.
     */
    public resetPassword(token: string, newPassword: string, callback?: (error) => void)
    {
        Accounts.resetPassword(token, newPassword, callback);
    }

    /**
     * @summary update the various observer streams with the login/logout events.
     *
     * @param error any external errors.
     * @param callback the callers callback
     *
     * @returns {*} whatever the callback returns
     * @private
     */
    private _updateUserLoginStreams(error?: any, callback?: Function)
    {
        if (!error)
        {
            this._updateUserStream(<User>Meteor.user());
        }

        if (callback)
        {
            return callback(error);
        }
    }

    /**
     * @summary Updates all streams related to user events.
     *
     * @param {User} user the user object
     * @private
     */
    private _updateUserStream(user?: User)
    {
        this._isLoggedStream.next(!!user);
        this._userStream.next(user);
    }
}
