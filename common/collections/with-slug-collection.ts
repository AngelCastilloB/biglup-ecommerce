/**
 * @file with-slug-collection.ts.
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

// TODO: Add documentation.
export class WithSlugCollection extends Mongo.Collection<any> {

    // TODO: Improve documentation.
    /**
     * @summary Makes a new collection.
     *
     * @param {string} name The collection name
     * @param {string} _slugFieldTarget The field that needs to be a slug.
     * @param {Slugger} _slugService Creates slug strings.
     * @param {Object=} options
     * @param {Object=} options.connection
     * @param {string=} options.idGeneration
     * @param {Function=} options.transform
     */
    public static create<T>(name: string,
        _slugFieldTarget: string,
        _slugService: Slugger,
        options?: {connection?: Object; idGeneration?: string; transform?: Function}): Mongo.Collection<T> {
        return new WithSlugCollection(name, _slugFieldTarget, _slugService, options);
    }

    // TODO: Improve documentation.
    /**
     * @summary This constructor adds the slug service to the mix.
     *
     * @param {string} name The collection name
     * @param {string} _slugFieldTarget The field that needs to be a slug.
     * @param {Slugger} _slugService Creates slug strings.
     * @param {Object=} options
     * @param {Object=} options.connection
     * @param {string=} options.idGeneration
     * @param {Function=} options.transform
     */
    constructor(name: string,
        private _slugFieldTarget: string,
        private _slugService: Slugger,
        options?: {connection?: Object; idGeneration?: string; transform?: Function}) {
        super(name, options);
    }

    // TODO: Improve documentation.
    /**
     * @summary Changes the insert to add the slugsArray.
     *
     * @param {DocumentWithSlug} document
     * @param {Function} callback
     * @returns {string}
     */
    public insert(document: DocumentWithSlug, callback: Function) {
        // TODO: Validate preconditions on public interface input parameters. What happens if document is undefined or doesnt have the
        // key this._slugFieldTarget?
        if (document[this._slugFieldTarget].length > 0) {
            document.slug = this._createSlugs(document[this._slugFieldTarget]);
        }

        return super.insert(document, callback);
    }

    // TODO: Improve documentation.
    /**
     * @summary Changes the update to allow new slugs if title changes.
     *
     * @param {Object} selector
     * @param {Object} modifier
     * @param {Object=} options
     * @param {Object=} options.multi
     * @param {Object=} options.upsert
     * @param {Function=} callback
     * @returns {number}
     */
    public update(selector: Mongo.Selector,
        modifier: Mongo.Modifier,
        options?: {multi?: boolean; upsert?: boolean},
        callback?: Function): number {

        // TODO: Validate preconditions on public interface input parameters. (selector, modifier)
        if (this._hasTitle(modifier, this._slugFieldTarget)) {
            const slugs    = this._createSlugs(modifier['$set'][this._slugFieldTarget]);
            const document = this.findOne(selector);
            //this._updateSlugs(slugs, document._id); // TODO: <- This will be undefined if findOne fails (no document match the selector).
            // This is not working properly. find and findOne always returns undefined. Even if this was working
            // there is the chance that multiple documents match the selector, but the correct one wont be updated necessarily,
            // because this always picks the first one and update the slugs on that one. Since the update could target multiple documents
            // this change would have to be applied to all of them.

            // I think even tho the idea is good, this is too complex an error prone, we must find a simpler solution.
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
            // TODO: I think this can be simplified with $addToSet, I even think that $push will do the work by
            // itself without the need for the outer update.
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

    // TODO: Improve documentation. (Mongo.Modifier and return)
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

    // TODO: Improve documentation.
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

// TODO: Add documentation.
interface DocumentWithSlug extends Distinguishable, Sluggable {
}
