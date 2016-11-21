/**
 * @file variant-attribute.methods.ts
 *
 * @summary This is the product variant attributes public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 22 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute } from '../models';
import { Meteor }                   from 'meteor/meteor';
import { VariantColors,
         VariantSizes,
         VariantMaterials }         from '../collections/variant-attributes.collections';

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Registers the create color variant attribute method to Meteor's DDP system. This methods creates a color
 * variant attribute.
 *
 * @param colorVariant The color variant to be added to the database.
 *
 * @return The ID if the newly inserted color variant attribute.
 */
Meteor.methods({
    createColorAttribute(colorVariant: ColorVariantAttribute)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'createColorAttribute.unauthorized',
                'You are not authorized to perform this action.');
        }
        */
        check(colorVariant, ColorVariantAttribute);

        return VariantColors.insert(colorVariant);
    }
});

/**
 * @summary Registers the update color attribute variant method to Meteor's DDP system. This method modifies the given
 * colors with all the changes.
 *
 * @param colorVariant The color attribute variant to be updated.
 */
Meteor.methods({
    updateColorAttribute(colorVariant: ColorVariantAttribute)
    {
        check(colorVariant, ColorVariantAttribute);

        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'updateColorAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (!colorVariant._id || colorVariant._id === '')
        {
             throw new Meteor.Error(
             'updateColorAttribute.idIsEmpty',
             'The id of this color attribute variant is empty. You need to provide the id of an existing color ' +
             'attribute variant in the database.');
        }

        let currentColor: ColorVariantAttribute = VariantColors.findOne({_id: colorVariant._id});

        if (!currentColor)
        {
            throw new Meteor.Error(
                'updateColorAttribute.colorDoesNotExist',
                'This color attribute variant does not exists in the database.');
        }

        let id = colorVariant._id;

        delete colorVariant['_id'];

        VariantColors.update({_id: id}, {$set: colorVariant});
    }
});

/**
 * @summary Registers the delete color attribute variant method to Meteor's DDP system. This method deletes the given
 * color attribute variant from the system.
 *
 * @param id The color attribute variant id of the color to be deleted.
 */
Meteor.methods({
    deleteColorAttribute(id: string)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'deleteColorAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        check(id, String);

        let colorAttribute: ColorVariantAttribute = VariantColors.findOne({_id: id});

        if (!colorAttribute)
        {
            throw new Meteor.Error(
                'deleteColorAttribute.colorDoesNotExist',
                'This color attribute variant does not exists in the database.');
        }

        VariantColors.remove({_id: id});
    }
});

/**
 * @summary Registers the create size variant attribute method to Meteor's DDP system. This methods creates a size
 * variant attribute.
 *
 * @param sizeVariant The size variant to be added to the database.
 *
 * @return The ID if the newly inserted size variant attribute.
 */
Meteor.methods({
    createSizeAttribute(sizeVariant: SizeVariantAttribute)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createSizeAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(sizeVariant, SizeVariantAttribute);

        return VariantSizes.insert(sizeVariant);
    }
});

/**
 * @summary Registers the update size attribute variant method to Meteor's DDP system. This method modifies the given
 * sizes with all the changes.
 *
 * @param sizeVariant The size attribute variant to be updated.
 */
Meteor.methods({
    updateSizeAttribute(sizeVariant: SizeVariantAttribute)
    {
        check(sizeVariant, SizeVariantAttribute);

        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'updateSizeAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (!sizeVariant._id || sizeVariant._id === '')
        {
            throw new Meteor.Error(
                'updateSizeAttribute.idIsEmpty',
                'The id of this size attribute variant is empty. You need to provide the id of an existing size ' +
                'attribute variant in the database.');
        }

        let currentSize: SizeVariantAttribute = VariantSizes.findOne({_id: sizeVariant._id});

        if (!currentSize)
        {
            throw new Meteor.Error(
                'updateSizeAttribute.sizeDoesNotExist',
                'This size attribute variant does not exists in the database.');
        }

        let id = sizeVariant._id;

        delete sizeVariant['_id'];

        VariantSizes.update({_id: id}, {$set: sizeVariant});
    }
});

/**
 * @summary Registers the delete size attribute variant method to Meteor's DDP system. This method deletes the given
 * size attribute variant from the system.
 *
 * @param id The size attribute variant id of the size to be deleted.
 */
Meteor.methods({
    deleteSizeAttribute(id: string)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'deleteSizeAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        check(id, String);

        let sizeAttribute: SizeVariantAttribute = VariantSizes.findOne({_id: id});

        if (!sizeAttribute)
        {
            throw new Meteor.Error(
                'deleteSizeAttribute.sizeDoesNotExist',
                'This size attribute variant does not exists in the database.');
        }

        VariantSizes.remove({_id: id});
    }
});

/**
 * @summary Registers the create material variant attribute method to Meteor's DDP system. This methods creates a material
 * variant attribute.
 *
 * @param materialVariant The material variant to be added to the database.
 *
 * @return The ID if the newly inserted material variant attribute.
 */
Meteor.methods({
    createMaterialAttribute(materialVariant: MaterialVariantAttribute)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'createMaterialAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */
        check(materialVariant, MaterialVariantAttribute);

        return VariantMaterials.insert(materialVariant);
    }
});

/**
 * @summary Registers the update material attribute variant method to Meteor's DDP system. This method modifies the given
 * materials with all the changes.
 *
 * @param materialVariant The material attribute variant to be updated.
 */
Meteor.methods({
    updateMaterialAttribute(materialVariant: MaterialVariantAttribute)
    {
        check(materialVariant, MaterialVariantAttribute);

        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'updateMaterialAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        if (!materialVariant._id || materialVariant._id === '')
        {
            throw new Meteor.Error(
                'updateSizeAttribute.idIsEmpty',
                'The id of this material attribute variant is empty. You need to provide the id of an existing material ' +
                'attribute variant in the database.');
        }

        let currentMaterial: MaterialVariantAttribute = VariantMaterials.findOne({_id: materialVariant._id});

        if (!currentMaterial)
        {
            throw new Meteor.Error(
                'updateMaterialAttribute.materialDoesNotExist',
                'This material attribute variant does not exists in the database.');
        }

        let id = materialVariant._id;

        delete materialVariant['_id'];

        VariantMaterials.update({_id: id}, {$set: materialVariant});
    }
});

/**
 * @summary Registers the delete material attribute variant method to Meteor's DDP system. This method deletes the given
 * material attribute variant from the system.
 *
 * @param id The material attribute variant id of the size to be deleted.
 */
Meteor.methods({
    deleteMaterialAttribute(id: string)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
         throw new Meteor.Error(
         'deleteMaterialAttribute.unauthorized',
         'You are not authorized to perform this action.');
         }
         */

        check(id, String);

        let materialAttribute: MaterialVariantAttribute = VariantMaterials.findOne({_id: id});

        if (!materialAttribute)
        {
            throw new Meteor.Error(
                'deleteMaterialAttribute.materialDoesNotExist',
                'This material attribute variant does not exists in the database.');
        }

        VariantMaterials.remove({_id: id});
    }
});