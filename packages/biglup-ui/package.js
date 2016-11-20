Package.describe({
    name: 'biglup:ui',
    version: '0.0.1',
    summary: 'Angular 2 Components for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Npm.depends({
    "chart.js": "2.3.0",
    "quill": "1.1.5"
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');
    api.use('biglup:i18n');

    api.addFiles([
        'typings/biglup-ui.d.ts'
    ], 'client');

    api.addFiles([
        'client/stylesheets/partials/_base.scss',
        'client/stylesheets/_main.scss'
    ], 'client', {isImport: true});

    api.addFiles([
        'client/components/input/biglup-input.component.ts',
        'client/components/button/biglup-button.component.ts',
        'client/components/checkbox/biglup-checkbox.component.ts',
        'client/components/radio-group/biglup-radio-group.component.ts',
        'client/components/radio-group/radio-button/biglup-radio-button.component.ts',
        'client/directives/ripple/ripple.directive.ts',
        'client/components/input/filters/input-filters.ts',
        'client/components/data-table/biglup-data-table.component.ts',
        'client/components/icon-button/biglup-icon-button.component.ts',
        'client/components/dropdown-menu/biglup-dropdown-menu.component.ts',
        'client/components/dropdown-menu/dropdown-option/biglup-dropdown-option.component.ts',
        'client/components/badge/biglup-badge.component.ts',
        'client/components/paper/biglup-paper.component.ts',
        'client/services/toast/biglup-toast.service.ts',
        'client/services/media/biglup-media.service.ts',
        'client/biglup-ui.module.ts',
        'client/directives/charts/biglup-chart.directive.ts',
        'client/components/toolbar/biglup-toolbar.component.ts',
        'client/components/layout/left-navbar/biglup-left-navbar-layout.component.ts',
        'client/components/layout/left-navbar/menu/biglup-left-navbar-layout-menu.component.ts',
        'client/components/layout/left-navbar/content/biglup-left-navbar-layout-content.component.ts',
        'client/components/vertical-menu/biglup-vertical-menu.component.ts',
        'client/components/vertical-menu/sub-menu/biglup-vertical-submenu.component.ts',
        'client/components/vertical-menu/menu-option/biglup-vertical-menu-option.component.ts',
        'client/components/modal/biglup-modal.component.ts',
        'client/components/modal/components/error-animation/error-animation.component.ts',
        'client/components/modal/components/information-animation/information-animation.component.ts',
        'client/components/modal/components/success-animation/success-animation.component.ts',
        'client/components/modal/components/waiting-animation/waiting-animation.component.ts',
        'client/components/modal/components/warning-animation/warning-animation.component.ts',
        'client/components/tab/biglup-tabs.component.ts',
        'client/components/tab/tab/biglup-tab.component.ts',
        'client/components/breadcrumb/biglup-breadcrumb.component.ts',
        'client/components/text-editor/biglup-text-editor.component.ts',
        'client/services/dom/dom-handler.service.ts',
        'client/services/color-picker/biglup-color-picker.service.ts',
        'client/directives/color-picker/biglup-color-picker.directive.ts',
        'client/directives/color-picker/internals/biglup-color-picker-slider-directive.ts',
        'client/directives/color-picker/internals/biglup-color-picker-text.directive.ts',
        'client/components/color-picker/biglup-color-picker.component.ts',
        'client/services/color-picker/internals/Hsva.ts',
        'client/services/color-picker/internals/Hsla.ts',
        'client/services/color-picker/internals/Rgba.ts',
        'client/services/color-picker/internals/SliderDimension.ts',
        'client/services/color-picker/internals/SliderPosition.ts'
    ], 'client');

    api.addAssets(['assets/images/biglup-menu-header.png'], "client");
    api.addAssets(['assets/images/avatar.png'], "client");

    api.mainModule ('index.ts', "client");
});
