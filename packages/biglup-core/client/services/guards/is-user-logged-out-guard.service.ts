/**
 * @file is-user-logged-out-guard.service.ts.
 *
 * @summary Allows a route to activate only if an user is logged out.
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

import { CanActivate, Router } from '@angular/router';
import { Injectable }          from '@angular/core';
import { UserAuthService }     from 'meteor/biglup:business';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This guard is responsible of users access according to the login status.
 */
@Injectable()
export class IsUserLoggedOutGuardService implements CanActivate
{

    /**
     * @summary the user's login status.
     */
    private _status: boolean;

    /**
     * @summary Initializes a new instance of the IsUserLoggedOutGuardService class.
     *
     * @param {Router}          router           The router service.
     * @param {UserAuthService} _userAuthService The authentication service.
     */
    constructor(private router: Router, private _userAuthService: UserAuthService)
    {
        this._status = this._userAuthService.isLogged();

        this._userAuthService.isLoggedStream().subscribe(status => this._status = status);
    }

    /**
     * @summary Allows route activation only if the user is not logged in.
     *
     * @returns {boolean} True if the user can activate the route, otherwise, false.
     */
    public canActivate(): boolean
    {
        if (this._status)
        {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}
