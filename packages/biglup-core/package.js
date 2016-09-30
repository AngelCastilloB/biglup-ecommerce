Package.describe({
    name: 'biglup:core',
    version: '0.0.1',
    summary: 'Core package for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');

    api.use('angular2-compilers');

    api.addFiles([
        'typings/biglup-core.d.ts'
    ], 'client');

    // Services
    api.addFiles([
        'client/services/guards/is-user-logged-guard.service.ts',
        'client/services/guards/is-user-logged-out-guard.service.ts',
        'client/services/guards/new-password-guard.service.ts',
        'client/services/id-generator.service.ts',
        'client/services/validation.service.ts'
    ], 'client');

    // Pipes
    api.addFiles([
        'client/pipes/array-random.pipe.ts',
        'client/pipes/truncate-string.pipe.ts'
    ], 'client');

    api.mainModule ('client.ts', "client");
});
