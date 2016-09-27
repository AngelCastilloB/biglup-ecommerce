Package.describe({
    name: 'biglup:biglup-ui',
    version: '0.0.1',
    summary: 'Biglup UI',
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
        'client/components/button/biglup-button.component.ts',
        'client/directives/ripple/ripple.directive.ts',
        'client/biglup-ui.module.ts'
    ], 'client');

    api.mainModule ('index.ts', "client");
});
