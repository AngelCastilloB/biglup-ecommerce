/**
 * @file is-user-logged-guard.service.ts.
 *
 * @summary Allows a route to activate only if a user is logged in.
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

import {
    CanActivate,
    Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { Injectable }       from '@angular/core';
import { UserAuthService }  from '../user-auth.service';

// EXPORTS ************************************************************************************************************/

@Injectable()
export class IsUserLoggedGuardService implements CanActivate {

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
        this._userAuthService.isLogged().subscribe(status => this._status = status);
    }

    /**
     * @summary Allows route activation only if the user is logged in.
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._status) return true;

        if (state.url !== '/login') this.router.navigate(['/login']);

        return false;
    }
}
