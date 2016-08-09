/**
 * @file fake.d.ts.
 *
 * @summary Fake library type definition.
 * @link https://atmospherejs.com/anti/fake
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 31 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

declare var Fake: {
    sentence(words: number): string;
    paragraph(words: number): string;
    word(): string;
    color(): string;
    /**
     * the fields to be included in the user object result:
     * name, surname, fullname, username, email, emails.address, profile.name
     *
     * @param {array} fields
     */
    user(fields: []): UserObjectResult;
    fromArray(array: []): {};
};

interface UserObjectResult {
    name?: string;
    surname?: string;
    fullname?: string;
    username?: string;
    email?: {
        address: string;
    };
    profile?: {name: string};
}
