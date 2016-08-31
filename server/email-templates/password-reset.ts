/**
 * @file password-reset.ts.
 *
 * @summary Alters the password reset email sent to user according to our needs.
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

/* IMPORTS ************************************************************************************************************/

import { Meteor } from 'meteor/meteor';

/* IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary replaces the original generated url with a matrix notation compatible url query.
 * angular 2 requires the urls as url;param=val;param2=val
 * instead of the traditional url?param=val&param2=val
 *
 * @param {Meteor.User} user
 * @param {string} url
 * @returns {string}
 */
Accounts.emailTemplates.resetPassword.text = (user: Meteor.User, url: string) =>
{
    let newUrl = url.replace('#/', '');
    newUrl     = newUrl.replace(/\/(?=\w)([\w\-]+)$/, ';token=$1');

    // TODO check if 3D'TOKEN' exist in real email generation.
    // REMARK: so far the email mock generates extra characters at the beginning of the token,
    // which makes the password reset flow to fail when we click the generated link,
    // however i am not able to determine the reason, that'statement why im logging the statement out
    // while we implement the rest of the email system, this statement is perfectly fine, could be a bug though.
    const statement = `Click this link to reset your password: ${newUrl}`;
    console.warn('Original URL:', url);
    console.warn('New URL:', newUrl);
    console.warn('statement:', statement);
    // KNOWN ISSUE: url;token=[3D]value instead of url;token=value
    return statement;
};

