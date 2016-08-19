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
import { UserAuthService }     from '../user-auth.service';

// EXPORTS ************************************************************************************************************/

@Injectable()
export class IsUserLoggedOutGuardService implements CanActivate {

    /**
     * @summary the user's log status.
     */
    private _status: boolean;

    /**
     * @summary constructs this with the route needed to redirect and auth service.
     * @param {Router} router
     * @param {UserAuthService} _userAuthService
     */
    constructor(private router: Router, private _userAuthService: UserAuthService) {
        console.log('inside the isloggedoutguard constructor');
        // this._userAuthService.isLogged().subscribe(status => this._status = status);
        this._userAuthService.isLogged().subscribe(status => {
            console.log('inside the _userAuthService.isLogged callback');
            this._status = status;
        });
    }

    /**
     * @summary Allows route activation only if the user is not logged in.
     * @returns {boolean}
     */
    public canActivate(): boolean {
        if (this._status) {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}
