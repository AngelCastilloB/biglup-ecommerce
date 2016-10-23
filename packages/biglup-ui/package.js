Package.describe({
    name: 'biglup:ui',
    version: '0.0.1',
    summary: 'Angular 2 Components for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');

    api.addFiles([
        'typings/biglup-ui.d.ts'
    ], 'client');

    api.addFiles([
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
        'client/biglup-ui.module.ts'
    ], 'client');

    api.mainModule ('index.ts', "client");
});
