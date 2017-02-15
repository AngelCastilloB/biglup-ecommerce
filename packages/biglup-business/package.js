Package.describe({
    name: 'biglup:business',
    version: '0.0.1',
    summary: 'Business rules entities for the Biglup E-Commerce project',
    documentation: 'README.md'
});

Npm.depends({
    "angular2-meteor": "0.7.0-beta.3"
});

Package.onUse(function(api)
{
    api.versionsFrom('1.4.1.1');

    api.use('barbatus:angular2-polyfills');
    api.use('angular2-compilers');
    api.use('aldeed:simple-schema');
    api.use('aldeed:collection2');
    api.use('check');
    api.use('mongo');
    api.use('biglup:i18n');

    api.addFiles([
        'typings/biglup-business.d.ts'
    ], 'client');

    // Services
    api.addFiles([
        'client/services/carts.service.ts',
        'client/services/categories.service.ts',
        'client/services/images.service.ts',
        'client/services/products.service.ts',
        'client/services/user-auth.service.ts',
        'client/services/users.service.ts',
        'client/services/variant-attributes.service.ts',
        'client/services/inventory.service.ts'
    ], 'client');

    // Collections
    api.addFiles([
        'common/collections/category.collection.ts',
        'common/collections/image.collection.ts',
        'common/collections/product.collection.ts',
        'common/collections/variant-attributes.collections.ts'
    ], ['client', 'server']);

    // Methods
    api.addFiles([
        'common/methods/cart.methods.ts',
        'common/methods/category.methods.ts',
        'common/methods/product.methods.ts',
        'common/methods/variant-attributes.methods.ts',
        'common/methods/inventory.methods.ts'
    ], ['client', 'server']);

    // Models
    api.addFiles([
        'common/models/cart.ts',
        'common/models/cart-item.ts',
        'common/models/category.ts',
        'common/models/image.ts',
        'common/models/index.ts',
        'common/models/product.ts',
        'common/models/product-image.ts',
        'common/models/product-variant.ts',
        'common/models/user.ts'
    ], ['client', 'server']);

    // Schemas
    api.addFiles([
        'common/schemas/cart.schema.ts',
        'common/schemas/category.schema.ts',
        'common/schemas/i18n-string.schema.ts',
        'common/schemas/product.schema.ts',
        'common/schemas/user.schema.ts',
        'common/schemas/variant-attributes.schema.ts'
    ], ['client', 'server']);

    // Publications
    api.addFiles([
        'server/publications/category.publication.ts',
        'server/publications/images.publication.ts',
        'server/publications/product.publication.ts',
        'server/publications/user.publication.ts',
        'server/publications/variant-attributes.publication.ts'
    ], 'server');

    api.mainModule ('client.ts', "client");
    api.mainModule ('server.ts', "server");
});
