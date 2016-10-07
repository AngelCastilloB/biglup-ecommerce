Package.describe({
    name: 'biglup:configuration',
    version: '0.0.1',
    summary: 'Configuration package for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');

    api.use('angular2-compilers');
    api.use('accounts-password');
    api.use('accounts-facebook');
    api.use('accounts-google');
    api.use('accounts-twitter');

    api.addFiles([
        'server/configuration/accounts-configuration.ts',
        'server/configuration/check-meteor-settings.ts',
        'server/configuration/index.ts',
        'server/configuration/services-configuration.ts',
        'server/email-templates/password-reset.ts'
    ], 'server');


    api.mainModule ('main.ts', "server");
});
