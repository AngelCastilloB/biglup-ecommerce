/**
 * @file category.methods.ts
 *
 * @summary This is the cart public API (Methods).
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 20 2016
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

import { Categories }     from '../collections/category.collection';
import { CategorySchema } from '../schemas/category.schema';
import { Category }       from '../models';
import { Meteor }         from 'meteor/meteor';

// ADMINISTRATOR ONLY METHODS *****************************************************************************************/

/**
 * @summary Registers the create category method to Meteor's DDP system. This methods creates a new category.
 *
 * @param category The category to be added to the database.
 *
 * @return The ID if the newly inserted category.
 */
Meteor.methods({
    createCategory(category: Category)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'createCategory.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        // Remove empty entries in the translations.
        category.name = category.name.filter((element) => element.value && element.value !== '');
        category.info = category.info.filter((element) => element.value && element.value !== '');

        if (category.parentCategory !== null && category.parentCategory !== '')
        {
            category.isRootCategory = false;

            let parent: Category = Categories.findOne({_id: category.parentCategory});

            if (!parent)
            {
                throw new Meteor.Error(
                    'createCategory.categoryDoesNotExist',
                    'The parent category does not exist (' + category.parentCategory + ').');
            }

            if (!parent.isRootCategory)
            {
                throw new Meteor.Error(
                    'createCategory.parentCategoryIsNotRoot',
                    'The parent category is not a root category (' + category.parentCategory + ').');
            }

            if (parent._id === category._id)
            {
                throw new Meteor.Error(
                    'createCategory.parentCategoryIsItself',
                    'The category can not have itself as a parent category (' + category.parentCategory + ').');
            }
        }
        else
        {
            category.isRootCategory = true;
        }

        delete category['denormalizedParent'];
        delete category['denormalizedSubcategories'];
        check(category, CategorySchema);

        return Categories.insert(category);
    }
});

/**
 * @summary Registers the delete category method to Meteor's DDP system. This method deletes the given category
 * (and all its subcategories) from the system.
 *
 * @param categoryId The category id of the categoryId to be deleted.
 */
Meteor.methods({
    deleteCategory(categoryId: string)
    {
        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'deleteCategory.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        check(categoryId, String);

        if (Categories.find({_id: categoryId}).count() === 0)
        {
            throw new Meteor.Error(
                'deleteCategory.categoryDoesNotExist',
                'This category does not exists in the database.');
        }

        // Removes all subcategories from products.
        let subcategories = Categories.find({parentCategory: categoryId}).fetch();

        subcategories.forEach((sub: Category) =>
        {
            Categories.remove({_id: sub._id});

            Meteor.call('removeCategory', sub._id, (error) =>
            {
                if (error)
                    console.error(error);
            });
        });

        Categories.remove({_id: categoryId});

        Meteor.call('removeCategory', categoryId, (error) =>
        {
            if (error)
                console.error(error);
        });
    }
});

/**
 * @summary Registers the delete categories method to Meteor's DDP system. This method deletes the given categories
 * from the system.
 *
 * @param products The collection of categories id of the categories to be deleted.
 */
Meteor.methods({
    deleteCategories(categoriesId: Array<string>)
    {
        /*
         if (!Meteor.users.findOne(this.userId).isAdmin)
         {
             throw new Meteor.Error(
                 'deleteCategories.unauthorized',
                 'You are not authorized to perform this action.');
         }
         */

        categoriesId.forEach(
            (id) =>
            {
                Meteor.call('deleteCategory', id, (error) =>
                {
                    if (error)
                        console.error(error);
                });
            });
    }
});

/**
 * @summary Registers the update category method to Meteor's DDP system. This method modifies the given category
 * with all the changes.
 *
 * @param category The category to be updated.
 */
Meteor.methods({
    updateCategory(category: Category)
    {
        // Remove empty entries in the translations.
        category.name = category.name.filter((element) => element.value && element.value !== '');
        category.info = category.info.filter((element) => element.value && element.value !== '');

        delete category['denormalizedParent'];
        delete category['denormalizedSubcategories'];
        check(category, CategorySchema);

        /*
        if (!Meteor.users.findOne(this.userId).isAdmin)
        {
            throw new Meteor.Error(
                'updateCategory.unauthorized',
                'You are not authorized to perform this action.');
        }*/

        if (!category._id || category._id === '')
        {
            throw new Meteor.Error(
                'updateCategory.idIsEmpty',
                'The id of this category is empty. You need to provide the id of an existing category in the database.');
        }

        if (Categories.find({_id: category._id}).count() === 0)
        {
            throw new Meteor.Error(
                'updateCategory.categoryDoesNotExist',
                'This category does not exists in the database.');
        }

        if (category.parentCategory !== null && category.parentCategory !== '')
        {
            category.isRootCategory = false;

            let parent: Category = Categories.findOne({_id: category.parentCategory});

            if (!parent)
            {
                throw new Meteor.Error(
                    'updateCategory.categoryDoesNotExist',
                    'The parent category does not exist (' + category.parentCategory + ').');
            }

            if (!parent.isRootCategory)
            {
                throw new Meteor.Error(
                    'updateCategory.parentCategoryIsNotRoot',
                    'The parent category is not a root category (' + category.parentCategory + ').');
            }

            if (parent._id === category._id)
            {
                throw new Meteor.Error(
                    'updateCategory.parentCategoryIsItself',
                    'The category can not have itself as a parent category (' + category.parentCategory + ').');
            }
        }
        else
        {
            category.isRootCategory = true;
        }

        let id = category._id;

        delete category['_id'];

        Categories.update({_id: id}, {$set: category});
    }
});
