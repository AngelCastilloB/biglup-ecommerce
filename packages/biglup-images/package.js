Package.describe({
    name: 'biglup:images',
    version: '0.0.1',
    summary: 'Biglup image handling and storage classes.',
    documentation: 'README.md'
});

Npm.depends({
    "google-cloud": "0.41.2",
    "fibers": "1.0.15"
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');
    api.use('ecmascript');
    api.use('angular2-compilers');
    api.use('check');
    api.use('underscore');
    api.use('mongo');
    api.use('jalik:ufs');
    api.use('jalik:ufs-local');

    api.addFiles([
        'common/collections/image.collection.ts'
    ], ['client', 'server']);

    // Methods
    api.addFiles([
        'server/methods/google-cloud-storage.methods.ts'
    ], ['server']);

    // Models
    api.addFiles([
        'common/models/image.ts'
    ], ['client', 'server']);

    // Publications
    api.addFiles([
        'server/publications/images.publication.ts'
    ], 'server');

    api.mainModule ('client.ts', "client");
    api.mainModule ('server.ts', "server");
});


