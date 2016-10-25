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
    class BiglupIconButtonComponent {}
    class BiglupButtonComponent {}
    class BiglupRadioGroupComponent {}
    class BiglupRadioButtonComponent {}
    class BiglupDataTableComponent {}
    class BiglupInputComponent {
        public observeValue(): any;
        public observeValueChanges(): any;
        public setInvalid(isInvalid: boolean);
    }
    class BiglupCheckboxComponent {}
    class RippleDirective {}
    class BiglupUiModule {}
    class InputFilters {
        public static numerical(keyCode: number): boolean;
    }

    interface DataTableColumn
    {
        name: string;
        label: string;
        numeric?: boolean;
        format?: { (value: any): any };
    }
}

declare module 'meteor/biglup:ui' {
    export = BiglupUi;
}
