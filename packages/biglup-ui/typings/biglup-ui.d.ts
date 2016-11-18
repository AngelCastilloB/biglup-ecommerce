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
    export class DomHandlerService
    {
        public static zindex: number;
        public addClass(element: any, className: string): void;
        public addMultipleClasses(element: any, className: string): void;
        public removeClass(element: any, className: string): void;
        public hasClass(element: any, className: string): boolean;
        public siblings(element: any): any;
        public find(element: any, selector: string): any[];
        public findSingle(element: any, selector: string): any;
        public index(element: any): number;
        public relativePosition(element: any, target: any): void;
        public absolutePosition(element: any, target: any): void;
        public getHiddenElementOuterHeight(element: any): number;
        public getHiddenElementOuterWidth(element: any): number;
        public getHiddenElementDimensions(element: any): any;
        public scrollInView(container, item);
        public fadeIn(element, duration: number): void;
        public fadeOut(element, ms);
        public getWindowScrollTop(): number;
        public getWindowScrollLeft(): number;
        public matches(element, selector: string): boolean;
        public getOuterWidth(el, margin?);
        public getHorizontalPadding(el);
        public getHorizontalMargin(el);
        public innerWidth(el);
        public width(el);
        public getOuterHeight(el, margin?);
        public getHeight(el): number;
        public getWidth(el): number;
        public getViewport(): any;
        public equals(obj1: any, obj2: any): boolean;
        public getUserAgent(): string;
        public isIE();
    }

    class BiglupTextEditorComponent {}
    class BiglupBreadcrumbComponent {}
    class BiglupTabsComponent {}
    class BiglupTabComponent {}
    enum BiglupModalType
    {
        Success     = 0,
        Error       = 1,
        Waiting     = 2,
        Warning     = 3,
        Information = 4
    }
    enum BiglupModalResult
    {
        None     = 0,
        Ok       = 1,
        Cancel   = 2,
        Yes      = 3,
        No       = 4,
        Continue = 5
    }
    enum BiglupModalButtons
    {
        None           = 0,
        Ok             = 1,
        Cancel         = 2,
        CancelOk       = 3,
        CancelContinue = 4,
        NoYes          = 5
    }
    class BiglupModalComponent {
        public show(
            title: string,
            message: string,
            type: BiglupModalType = BiglupModalType.Information,
            buttons: BiglupModalButtons = BiglupModalButtons.Ok);
        public showObservable(
            title: string,
            message: string,
            observable: any,
            successOptions: { title: string, message: string },
            errorOptions: { title: string, message: string });

    }
    class BiglupMediaService {}
    class BiglupVerticalMenuOptionComponent {}
    class BiglupVerticalSubmenuComponent {}
    class BiglupVerticalMenuComponent {}
    class BiglupLeftNavbarLayoutComponent {}
    class BiglupLeftNavbarLayoutMenuComponent {}
    class BiglupLeftNavbarLayoutContentComponent {}
    class BiglupToolbarComponent {}
    class BiglupChartDirective {}
    class BiglupToastService {
        public displayToast(message: string, dismissable: boolean = true);
    }
    class BiglupPaperComponent {}
    class BiglupBadgeComponent {}
    class BiglupDropdownOptionComponent {}
    class BiglupIconButtonComponent {}
    class BiglupButtonComponent {}
    class BiglupRadioGroupComponent {}
    class BiglupRadioButtonComponent {}
    class BiglupDataTableComponent {}
    class BiglupInputComponent {
        public observeValue(): any;
        public observeValueChanges(): any;
        public setInvalid(isInvalid: boolean);
        public getValue(): string;
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
