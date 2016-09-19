/**
 * @file user.ts.
 *
 * @summary The user model.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 14 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORT ************************************************************************************************************/

import { Cart } from './';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The user model.
 */
export class User implements Meteor.User
{

    /**
     * @summary Initializes a new instance of the User class.
     *
     * @param {string} _id The User id.
     * @param {Object} emails The Emails object.
     * @param {string} emails.address The email address.
     * @param {boolean} emails.verified Verified email flag.
     * @param {Object} services External OAuth services.
     * @param {boolean} isAdmin Admin role flag.
     * @param {Cart} cart Admin role flag.
     */
    constructor(public _id: string = null,
                public emails: EmailObject[] = Array<EmailObject>(),
                public services: Object = {},
                public isAdmin = false,
                public cart: Cart = <Cart>{})
    {
    }
}

interface EmailObject
{
    address: string;
    verified: boolean;
}
