/**
 * @file abstract-with-slug-collection.ts.
 *
 * @summary Has functionality used by collections that have slugs in them.
 * @todo check if post-hooks are doable.
 * @todo slug to slugs
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 04 2016
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

import { Slugger } from '../helpers/slugifier';
import { Mongo }   from 'meteor/mongo';

// EXPORTS ************************************************************************************************************/

export abstract class AbstractWithSlugCollection extends Mongo.Collection<IDistinguishable> {

    /**
     * @summary This constructor adds the slug service to the mix.
     *
     * @param {string} name
     * @param {Slugger} _slugService Creates slug strings.
     * @param {Object=} options
     * @param {Object=} options.connection
     * @param {string=} options.idGeneration
     * @param {Function=} options.transform
     */
    constructor(name: string,
        protected _slugService: Slugger,
        options?: {connection?: Object; idGeneration?: string; transform?: Function}) {
        super(name, options);
    }

    /**
     * @summary Changes the insert to add the slugsArray.
     *
     * @param {DocumentWithSlug} document
     * @param {string} fieldName
     * @param {Function} callback
     * @returns {string}
     */
    protected _insert(document: DocumentWithSlug, fieldName: string, callback: Function) {
        if (document[fieldName].length > 0) {
            document.slug = this._createSlugs(document[fieldName]);
        }

        return super.insert(document, callback);
    }

    /**
     * @summary Changes the update to allow new slugs if title changes.
     *
     * @param {Object} selector
     * @param {Object} modifier
     * @param {string} fieldName
     * @param {Object=} options
     * @param {Object=} options.multi
     * @param {Object=} options.upsert
     * @param {Function=} callback
     * @returns {number}
     */
    protected _update(selector: Mongo.Selector,
        modifier: Mongo.Modifier,
        fieldName: string,
        options?: {multi?: boolean; upsert?: boolean},
        callback?: Function): number {
        if (this._hasTitle(modifier, fieldName)) {
            const slugs    = this._createSlugs(modifier['$set'][fieldName]);
            const document = this.findOne(selector);
            this._updateSlugs(slugs, document._id);
        }

        return super.update(selector, modifier, options, callback);
    }

    /**
     * @summary Updates a collection's slugs.
     *
     * @param {I18nString[]} slugs
     * @param {string} _id related document id.
     * @private
     */
    private _updateSlugs(slugs: I18nString[], _id: string): void {
        // we need to update the selector to include the updated languages
        slugs.forEach((slug: I18nString) => {
            const selector = {_id, 'slug.language': slug.language};
            const modifier = {$set: {'slug.$.value': slug.value}};

            // tries to update array slug, if no updates, just inserts a new array item.
            this.update(selector, modifier, {}, (err, updatedRows) => {
                if (err) throw err;

                if (updatedRows === 0) {
                    this.update({_id}, {
                        $push: {
                            slug: {language: slug.language, value: slug.value}
                        }
                    });
                }
            });
        });
    }

    /**
     * @summary checks the modifier (mongo modifier) and determines if a new slug is needed.
     *
     * @param {Mongo.Modifier} modifier
     * @param {string} fieldName The database collection field, IE: title, name, etc.
     * @returns {boolean}
     * @private
     */
    private _hasTitle(modifier: Mongo.Modifier, fieldName: string): boolean {
        for (let key in modifier) {
            // check if the modifier has a 'name', if so creates new slug(s)
            if (modifier.hasOwnProperty(key) && key === '$set' && modifier[key][fieldName]) {
                return true;
            }
        }

        return false;
    }

    /**
     * @summary Ask slugs from the service and check if those slugs already exist.
     *
     * @param {I18nString[]} field
     * @returns {I18nString[]}
     * @private
     */
    private _createSlugs(field: I18nString[]): I18nString[] {
        let slugsArray = this._slugService.slugifyI18nString(field);

        // We need to transform the array if the slug of any language exist in the database.
        slugsArray.map((obj: I18nString) => {
            const regExp  = new RegExp(`^(${obj.value})(\-\d)?$`);
            const results = this.find({'slug.value': regExp}, {fields: {slug: 1}}).fetch();

            if (results.length > 1) {
                return obj.value.concat(`-${results.length++}`);
            }

            return obj.value;
        });

        return slugsArray;
    }
}

interface DocumentWithSlug extends IDistinguishable, ISluggable {
}
