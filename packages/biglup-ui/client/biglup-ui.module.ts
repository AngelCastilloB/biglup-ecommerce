/**
 * @file biglup-ui.module.ts
 *
 * @summary This module export all the components on this package.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 25 2016
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

import { NgModule }                               from '@angular/core';
import { BrowserModule }                          from '@angular/platform-browser';
import { FormsModule }                            from '@angular/forms';
import { RouterModule }                           from '@angular/router';
import { BiglupButtonComponent }                  from './components/button/biglup-button.component';
import { BiglupInputComponent }                   from './components/input/biglup-input.component';
import { BiglupCheckboxComponent}                 from './components/checkbox/biglup-checkbox.component';
import { BiglupRadioButtonComponent}              from './components/radio-group/radio-button/biglup-radio-button.component';
import { BiglupRadioGroupComponent}               from './components/radio-group/biglup-radio-group.component';
import { RippleDirective }                        from './directives/ripple/ripple.directive';
import { BiglupDataTableComponent }               from './components/data-table/biglup-data-table.component';
import { BiglupIconButtonComponent }              from './components/icon-button/biglup-icon-button.component';
import { BiglupDropdownMenuComponent }            from './components/dropdown-menu/biglup-dropdown-menu.component';
import { BiglupDropdownOptionComponent }          from './components/dropdown-menu/dropdown-option/biglup-dropdown-option.component';
import { BiglupBadgeComponent }                   from './components/badge/biglup-badge.component';
import { BiglupPaperComponent }                   from './components/paper/biglup-paper.component';
import { BiglupI18nModule }                       from 'meteor/biglup:i18n';
import { BiglupChartDirective }                   from './directives/charts/biglup-chart.directive';
import { BiglupToolbarComponent }                 from './components/toolbar/biglup-toolbar.component';
import { BiglupLeftNavbarLayoutComponent }        from './components/layout/left-navbar/biglup-left-navbar-layout.component';
import { BiglupLeftNavbarLayoutMenuComponent }    from './components/layout/left-navbar/menu/biglup-left-navbar-layout-menu.component';
import { BiglupLeftNavbarLayoutContentComponent } from './components/layout/left-navbar/content/biglup-left-navbar-layout-content.component';
import { BiglupVerticalMenuComponent }            from './components/vertical-menu/biglup-vertical-menu.component';
import { BiglupVerticalMenuOptionComponent }      from './components/vertical-menu/menu-option/biglup-vertical-menu-option.component';
import { BiglupVerticalSubmenuComponent }         from './components/vertical-menu/sub-menu/biglup-vertical-submenu.component';
import { BiglupMediaService }                     from './services/media/biglup-media.service';
import { BiglupModalComponent }                   from './components/modal/biglup-modal.component';
import { ErrorAnimationComponent }                from './components/modal/components/error-animation/error-animation.component';
import { SuccessAnimationComponent }              from './components/modal/components/success-animation/success-animation.component';
import { InformationAnimationComponent }          from './components/modal/components/information-animation/information-animation.component';
import { WaitingAnimationComponent }              from './components/modal/components/waiting-animation/waiting-animation.component';
import { WarningAnimationComponent }              from './components/modal/components/warning-animation/warning-animation.component';
import { BiglupTabComponent }                     from './components/tab/tab/biglup-tab.component';
import { BiglupTabsComponent }                    from './components/tab/biglup-tabs.component';
import { BiglupBreadcrumbComponent }              from './components/breadcrumb/biglup-breadcrumb.component';
import { BiglupTextEditorComponent }              from './components/text-editor/biglup-text-editor.component';
import { DomHandlerService }                      from './services/dom/dom-handler.service';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This module export all the biglup user interface components.
 */
@NgModule({
    providers: [
        BiglupMediaService,
        DomHandlerService
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BiglupI18nModule,
        RouterModule],
    declarations: [
        BiglupButtonComponent,
        BiglupInputComponent,
        BiglupCheckboxComponent,
        BiglupRadioButtonComponent,
        BiglupRadioGroupComponent,
        BiglupDataTableComponent,
        BiglupIconButtonComponent,
        BiglupDropdownMenuComponent,
        RippleDirective,
        BiglupDropdownOptionComponent,
        BiglupBadgeComponent,
        BiglupPaperComponent,
        BiglupChartDirective,
        BiglupToolbarComponent,
        BiglupLeftNavbarLayoutComponent,
        BiglupLeftNavbarLayoutMenuComponent,
        BiglupLeftNavbarLayoutContentComponent,
        BiglupVerticalMenuComponent,
        BiglupVerticalMenuOptionComponent,
        BiglupVerticalSubmenuComponent,
        BiglupModalComponent,
        ErrorAnimationComponent,
        SuccessAnimationComponent,
        InformationAnimationComponent,
        WarningAnimationComponent,
        WaitingAnimationComponent,
        BiglupTabComponent,
        BiglupTabsComponent,
        BiglupBreadcrumbComponent,
        BiglupTextEditorComponent
    ],
    exports: [
        BiglupButtonComponent,
        BiglupInputComponent,
        BiglupCheckboxComponent,
        BiglupRadioButtonComponent,
        BiglupRadioGroupComponent,
        BiglupDataTableComponent,
        BiglupIconButtonComponent,
        BiglupDropdownMenuComponent,
        RippleDirective,
        BiglupDropdownOptionComponent,
        BiglupBadgeComponent,
        BiglupPaperComponent,
        BiglupChartDirective,
        BiglupToolbarComponent,
        BiglupLeftNavbarLayoutComponent,
        BiglupLeftNavbarLayoutMenuComponent,
        BiglupLeftNavbarLayoutContentComponent,
        BiglupVerticalMenuComponent,
        BiglupVerticalMenuOptionComponent,
        BiglupVerticalSubmenuComponent,
        BiglupModalComponent,
        ErrorAnimationComponent,
        SuccessAnimationComponent,
        InformationAnimationComponent,
        WarningAnimationComponent,
        WaitingAnimationComponent,
        BiglupTabComponent,
        BiglupTabsComponent,
        BiglupBreadcrumbComponent,
        BiglupTextEditorComponent
    ]
})
export class BiglupUiModule
{
}
