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

// EXPORTS ************************************************************************************************************/

@Injectable()
export class IsUserLoggedOutGuardService implements CanActivate {

    /**
     * @summary the user's id is needed to check if is logged in by meteor.
     */
    private _userId: string;

    /**
     * @summary constructs this with the route needed to redirect and the userId.
     * @param {Router} router
     */
    constructor(private router: Router) {
        this._userId = Meteor.userId();
    }

    /**
     * @summary Allows route activation only if the user is not logged in.
     * @returns {boolean}
     */
    public canActivate(): boolean {
        if (this._userId) {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}
