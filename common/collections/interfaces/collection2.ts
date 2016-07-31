/**
 * @file Collection2.ts.
 *
 * @summary Interface used by all meteor collections, extended when SimpleSchema was added to the project.
 * @link https://github.com/aldeed/meteor-collection2
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 31 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

import { Mongo } from 'meteor/mongo';

export interface Collection2<T> extends Mongo.Collection<T> {
    attachSchema?(schema: SimpleSchemaModule.SimpleSchemaDefinition): void;
}
