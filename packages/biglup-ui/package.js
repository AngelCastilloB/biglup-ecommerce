Package.describe({
    name: 'biglup:biglup-ui',
    version: '0.0.1',
    summary: 'Biglup UI',
    documentation: 'README.md'
});
Npm.depends({
    "@angular/common": "2.0.0-rc.5",
    "@angular/compiler": "2.0.0-rc.5",
    "@angular/core": "2.0.0-rc.5",
    "@angular/forms": "0.3.0",
    "angular2-meteor": "0.7.0-beta.1",
    "angular2-meteor-polyfills": "0.1.1",
    "meteor-node-stubs": "0.2.3",
    "moment": "2.14.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.0-beta.6",
    "web-animations-js": "2.2.2",
    "zone.js": "0.6.6"
});
Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');
    api.use('barbatus:angular2-runtime');

    api.addFiles([
        'typings/biglup-ui.d.ts'
    ], 'server');

    api.addFiles([
        'client/components/button/biglup-button.component.ts',
        'client/directives/ripple/ripple.directive.ts',
        'client/biglup-ui.module.ts',
        'main.ts'
    ], 'client');
});
