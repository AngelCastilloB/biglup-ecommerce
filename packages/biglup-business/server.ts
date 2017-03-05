/**
 * @file server.ts
 *
 * @summary Module server entry point.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 28 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// Schemas
export * from './common/schemas/user.schema';

// Collections
export * from './common/collections/category.collection';
export * from './server/collections/image.collection';
export * from './common/collections/product.collection';
export * from './common/collections/variant-attributes.collections';
export * from './common/collections/appearance.collections';

// Models
export * from './common/models/index';

// Publications
import './server/publications/category.publication';
import './server/publications/images.publication';
import './server/publications/product.publication';
import './server/publications/user.publication';
import './server/publications/variant-attributes.publication';
import './server/publications/appearance.publication';