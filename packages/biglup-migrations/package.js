Package.describe({
    name: 'biglup:migrations',
    version: '0.0.1',
    summary: 'Database migrations package for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');

    api.use('angular2-compilers');
    api.use('aldeed:simple-schema');
    api.use('aldeed:collection2');
    api.use('biglup:images');
    api.use('biglup:business');
    api.use('mongo');

    // Generators
    api.addFiles([
        'server/generators/abstract-content-generator.ts',
        'server/generators/content-generator-factory.ts',
        'server/generators/english-content-generator.ts',
        'server/generators/korean-content-generator.ts',
        'server/generators/simplified-chinese-content-generator.ts',
        'server/generators/spanish-content-generator.ts'
    ], 'server');

    // Interfaces
    api.addFiles([
        'server/interfaces/i-migratable.ts'
    ], 'server');

    // Migrations
    api.addFiles([
        'server/abstract-migration.ts',
        'server/category.migration.ts',
        'server/create-migrations.ts',
        'server/image.migration.ts',
        'server/product.migration.ts'
    ], 'server');

    api.addFiles('private/images/logo_placeholder.png', 'server', {isAsset: true});

    api.mainModule ('main.ts', "server");
});
