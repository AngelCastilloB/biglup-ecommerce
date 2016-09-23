/**
 * @file local-meteor.d.ts.
 *
 * @summary Updates local meteor to include absoluteFilePath method.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 08 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/**
 * @summary updates the meteor module according to our needs.
 */
declare module 'meteor/meteor' {
    module Meteor {
        /** Global props **/
        // hack: We set the settings as any because Typescript complaints
        // about unknown types (coming from the meteor.json settings file).
        let settings: any;

        // updates the user schema according to our custom model
        interface User {
            _id?: string;
            username?: string;
            emails?: Meteor.UserEmail[];
            createdAt?: number;
            profile?: any;
            services?: any;
            isAdmin?: boolean;
            // if we try to import the cart model, the typings fail completely
            // and complains randomly about unrelated issues
            cart?: any;
        }
    }
}

declare module Assets {
    function getBinary(assetPath: string, asyncCallback ?: Function): EJSON;

    function getText(assetPath: string, asyncCallback ?: Function): string;

    function absoluteFilePath(assetPath: string): string;
}

/**
 * @summary removes the Cannot find module './x.component.html'.
 * hack until https://github.com/Urigo/meteor-static-templates/issues/9 is resolved (if ever)
 */
declare module '*.html' {
    const template: string;
    export default template;
}
