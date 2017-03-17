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

import { Appearances }           from '../collections/appearance.collections';
import { Images }                from 'meteor/biglup:images';
import { AppearanceSchema }      from '../schemas/appearance.schema';
import { Appearance, LogoImage } from '../models';
import { Meteor }                from 'meteor/meteor';

// INNER FUNCTIONS ****************************************************************************************************/

/**
 * @summary Removes the logo image related to the appearance.
 *
 * @param image The image to be removed.
 */
const removeLogoImage = (image: LogoImage) =>
{
    if (Meteor.settings.public['google-cloud-storage'])
    {
        Meteor.call('deleteGoogleCloudStorageFile', image.id);
    }
    else
    {
        Images.remove({_id: image.id});
    }
};

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
                'deleteAppearance.isNotEditable',
                'The appearance you are trying to delete, is not deletable.');
        }

        if (appearance.isActive)
        {
            throw new Meteor.Error(
                'deleteAppearance.isActive',
                'The appearance you are trying to delete, is still active.');
        }

        Appearances.remove({_id: appearanceId});
        removeLogoImage(appearance.style.header.logo);
    }
});

/**
 * @summary Registers the delete appearances method to Meteor's DDP system. This method deletes the given appearances
 * (and all its variants) from the system.
 *
 * @param products The collection of appearances id of the appearances to be deleted.
 */
Meteor.methods({
    deleteAppearances(appearancesId: Array<string>)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'deleteAppearances.unauthorized',
                 'You are not authorized to perform this action.');
         }
         */

        appearancesId.forEach(
            (id) =>
            {
                Meteor.call('deleteAppearance', id, (error) =>
                {
                    if (error)
                        console.error(error);
                });
            });
    }
});

/**
 * @summary Registers the set active appearance method to Meteor's DDP system. This method sets the given appearance
 * as the active appearance on the system.
 *
 * @param appearanceId The appearanceId id of the appearance to be activated.
 */
Meteor.methods({
    setActiveAppearance(appearanceId: String)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'setActiveAppearance.unauthorized',
                 'You are not authorized to perform this action.');
         }*/

        check(appearanceId, String);

        let appearance: Appearance = Appearances.findOne({_id: appearanceId});
        if (!appearance)
        {
            throw new Meteor.Error(
                'setActiveAppearance.appearanceDoesNotExist',
                'This appearance does not exists in the database.');
        }

        let activeAppearance: Appearance = Appearances.findOne({isActive: true});

        // Set active appearance to inactive.
        Appearances.update({_id: activeAppearance._id}, { $set: { isActive: false } });

        // Set new appearance to active.
        Appearances.update({_id: appearanceId}, { $set: { isActive: true } });
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

        let storedAppearance: Appearance = Appearances.findOne({_id: appearance._id});
        if (!storedAppearance)
        {
            throw new Meteor.Error(
                'updateAppearance.appearanceDoesNotExist',
                'This appearance does not exists in the database.');
        }

        /*
        if (!storedAppearance.isEditable)
        {
            throw new Meteor.Error(
                'updateAppearance.isNotEditable',
                'The appearance you are trying to edit, is not editable.');
        }*/

        let id = appearance._id;

        delete appearance['_id'];

        Appearances.update({_id: id}, {$set: appearance});
    }
});
