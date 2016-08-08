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

declare module Mongo {
    interface Collection<T> extends Mongo.Collection<T> {
        /**
         * Attaches a SimpleSchema to the collection.
         */
        attachSchema(schema: MeteorSimpleSchema.Definition, options?: Collection2.SchemaAttachOptions): void;

        /**
         * Retrieves the attached SimpleSchema from the collection.
         */
        simpleSchema(): SimpleSchemaStatic;

        upsert(selector: Mongo.Selector, modifier: Mongo.Modifier, options?: Collection2.UpsertOptions, callback?: Function): {numberAffected?: number; insertedId?: string;};
    }
}

declare module Collection2 {
    interface SchemaAttachOptions {
        /**
         * If your validation requires that your doc be transformed using the collection's transform function prior to being validated,
         * then you must pass the transform: true option to attachSchema when you attach the schema:
         */
        transform?: boolean;

        /**
         * By default, if a collection already has a schema attached, attachSchema will combine the new schema with the existing.
         * Pass the replace: true option to attachSchema to discard any existing schema.
         */
        replace?: boolean;
    }

    interface InsertOptions extends MeteorSimpleSchema.BaseCleaningOptions {
        /**
         * To use a specific named validation context.
         */
        validationContext?: string;

        /**
         * To skip validation, use the validate: false option when calling insert or update. On the client (untrusted code),
         * this will skip only client-side validation. On the server (trusted code),
         * it will skip all validation. The object is still cleaned and autoValues are still generated.
         */
        validate?: boolean;
    }

    interface UpsertOptions extends InsertOptions {
        multi?: boolean;
    }

    interface UpdateOptions extends UpsertOptions {
        upsert?: boolean;
    }
}
