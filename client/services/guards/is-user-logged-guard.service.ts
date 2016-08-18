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

import { CanActivate, Router } from '@angular/router';
import { Meteor }              from 'meteor/meteor';
import { Injectable }          from '@angular/core';

// EXPORTS ************************************************************************************************************/

@Injectable()
export class IsUserLoggedGuardService implements CanActivate {

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
     * @summary Allows route activation only if the user is logged in.
     * @returns {boolean}
     */
    public canActivate(): boolean {
        if (this._userId) return true;

        this.router.navigate(['/login']);
        return false;
    }
}
