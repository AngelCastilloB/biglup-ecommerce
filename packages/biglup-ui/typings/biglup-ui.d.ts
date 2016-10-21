/**
 * @file biglup-ui.d.ts
 *
 * @summary Typings file for the biglup-ui meteor package.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 26 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

declare module BiglupUi
{
    class BiglupButtonComponent {}
    class BiglupInputComponent {}
    class RippleDirective {}
    class BiglupUiModule {}
}

declare module 'meteor/biglup:ui' {
    export = BiglupUi;
}
