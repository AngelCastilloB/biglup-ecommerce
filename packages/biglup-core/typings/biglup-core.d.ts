/**
 * @file biglup-core.d.ts
 *
 * @summary The internazionalization project typings.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

/* MODULES ************************************************************************************************************/

declare module Core
{
// SERVICES ***********************************************************************************************************/

    export class IsUserLoggedGuardService
    {
        constructor(private router: any, private _userAuthService: any);

        public canActivate(route: any, state: any): boolean;
    }

    export class IsUserLoggedOutGuardService
    {
        constructor(private router: any, private _userAuthService: any);

        public canActivate(route: any, state: any): boolean;
    }

    export class NewPasswordGuardService
    {
        constructor(private router: any, private _userAuthService: any);

        public canActivate(route: any, state: any): boolean;
    }

    export class IdGeneratorService
    {
        public generate(): string;
    }

    export class ValidationService
    {
        public static email(control: any): {[key: string]: boolean};

        public static matchControlGroupsValues(firstControlKey: string, secondControlKey: string);
    }

// PIPES **************************************************************************************************************/

    export class TruncateStringPipe
    {
        public transform(value: String, limit = 100, end = '...'): any;
    }

    export class ArrayRandomPipe
    {
        public transform(value: Array<any>): any;
    }

    export class SanitizeHtmlPipe
    {
        transform(html:string):any;
    }

    export function StringFormat(format, arguments): string;
}
// MODULE EXPORT ******************************************************************************************************/

declare module 'meteor/biglup:core'
{
    export = Core;
}
