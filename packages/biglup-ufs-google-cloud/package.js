Package.describe({
    name: 'biglup:ufs-google-cloud',
    version: '0.0.1',
    summary: 'Google Cloud storage store for UploadFS',
    documentation: 'README.md'
});

Npm.depends({
    "google-cloud": "0.41.2"
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');
    api.use('check');
    api.use('underscore');
    api.use('mongo');
    api.use('jalik:ufs@0.5.3');

    api.addFiles([
        'ufs-google-cloud.ts'
    ]);
});


