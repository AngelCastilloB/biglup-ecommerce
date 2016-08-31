/**
 * @file new-password-guard.service.ts.
 *
 * @summary Allows access to a component if a password token is set in the url.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 21 2016
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

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable }                                               from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This guard is allows route activation only if the user provides a token (does not check if token is valid).
 */
@Injectable()
export class NewPasswordGuardService implements CanActivate
{
    /**
     * @summary Initializes a new instance of the NewPasswordGuardService class.
     *
     * @param {ActivatedRouteSnapshot} route The future route that will be activated.
     * @param {RouterStateSnapshot}    state The future RouterState of our application.
     *
     * @returns {boolean} True if the user provided a token, otherwise, false.
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        return route.params['token'] ? true : false;
    }
}

