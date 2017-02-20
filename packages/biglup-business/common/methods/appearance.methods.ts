/**
 * @file appearance.methods.ts
 *
 * @summary This is the appearance public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 20 2017
 *
 * @copyright Copyright 2017 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Appearances }      from '../collections/appearance.collections';
import { AppearanceSchema } from '../schemas/appearance.schema';
import { Appearance }       from '../models';
import { Meteor }           from 'meteor/meteor';

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Registers the create Appearance method to Meteor's DDP system. This methods creates a new Appearance.
 *
 * @param Appearance The Appearance to be added to the database.
 *
 * @return The ID if the newly inserted Appearance.
 */
Meteor.methods({
    createAppearance(appearance: Appearance)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'createAppearance.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        check(appearance, AppearanceSchema);

        return Appearances.insert(appearance);
    }
});

/**
 * @summary Registers the delete appearance method to Meteor's DDP system. This method deletes the given appearance
 * from the system.
 *
 * @param appearanceId The appearanceId id of the appearance to be deleted.
 */
Meteor.methods({
    deleteAppearance(appearanceId: String)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'deleteCategory.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        check(appearanceId, String);

        let appearance: Appearance = Appearances.findOne({_id: appearanceId});
        if (!appearance)
        {
            throw new Meteor.Error(
                'deleteAppearance.appearanceDoesNotExist',
                'This appearance does not exists in the database.');
        }

        if (!appearance.isEditable)
        {
            throw new Meteor.Error(
                'updateAppearance.isNotEditable',
                'The appearance you are trying to delete, is not deletable.');
        }

        Appearances.remove({_id: appearanceId});
    }
});

/**
 * @summary Registers the update appearance method to Meteor's DDP system. This method modifies the given appearance
 * with all the changes.
 *
 * @param appearance The appearance to be updated.
 */
Meteor.methods({
    updateAppearance(appearance: Appearance)
    {
        check(appearance, AppearanceSchema);

        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'updateCategory.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        if (!appearance._id || appearance._id === '')
        {
            throw new Meteor.Error(
                'updateAppearance.idIsEmpty',
                'The id of this appearance is empty. You need to provide the id of an existing appearance in the database.');
        }

        if (Appearances.find({_id: appearance._id}).count() === 0)
        {
            throw new Meteor.Error(
                'updateAppearance.appearanceDoesNotExist',
                'This appearance does not exists in the database.');
        }

        if (!appearance.isEditable)
        {
            throw new Meteor.Error(
                'updateAppearance.isNotEditable',
                'The appearance you are trying to edit, is not editable.');
        }

        let id = appearance._id;

        delete appearance['_id'];

        Appearances.update({_id: id}, {$set: appearance});
    }
});
