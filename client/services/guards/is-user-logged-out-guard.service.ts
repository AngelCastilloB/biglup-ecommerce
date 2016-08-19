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

/**
 * @summary This guard is responsible of users access according to the login status.
 * @internal This seems duplicate of IsUserLoggedGuardService, however this seems
 * necessary to allow router navigation, ¿check if better way exist?
 */
@Injectable()
export class IsUserLoggedOutGuardService implements CanActivate {

    /**
     * @summary the user's login status.
     */
    private _status: boolean;

    /**
     * @summary constructs this with the route needed to redirect and auth service.
     * @param {Router} router
     * @param {UserAuthService} _userAuthService
     */
    constructor(private router: Router, private _userAuthService: UserAuthService) {
        this._userAuthService.isLogged().subscribe(status => this._status = status);
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
