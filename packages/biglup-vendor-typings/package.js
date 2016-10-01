Package.describe({
    name: 'biglup:vendor-typings',
    version: '0.0.1',
    summary: 'Collection of custom typings for the third party vendor libraries',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');

    api.addFiles([
        'typings/collection2.d.ts',
        'typings/fake.d.ts',
        'typings/local-meteor.d.ts',
        'typings/migrations.d.ts',
        'typings/service-configuration.d.ts',
        'typings/simple-schema.d.ts',
        'typings/transliteration.d.ts',
        'typings/ufs.d.ts'
    ], ['server', 'client']);
});
