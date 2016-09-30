Package.describe({
    name: 'biglup:i18n',
    version: '0.0.1',
    summary: 'Internationalization entities for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');

    api.use('angular2-compilers');

    api.addFiles([
        'typings/biglup-i18n.d.ts'
    ], 'client');

    // Services
    api.addFiles([
        'client/services/i18n-singleton.service.ts',
    ], 'client');

    // Models
    api.addFiles([
        'common/models/i18n-string.ts',
    ], ['client', 'server']);

    // Pipes
    api.addFiles([
        'client/pipes/mongo-translate.pipe.ts',
        'client/pipes/translate.pipe.ts'
    ], 'client');

    api.mainModule ('client.ts', "client");
    api.mainModule ('server.ts', "server");
});
