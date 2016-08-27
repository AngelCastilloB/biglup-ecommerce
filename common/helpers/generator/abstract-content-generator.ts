/**
 * @file abstract-content-generator.ts.
 *
 * @summary Produces pseudo-random words / sentences / paragraphs.
 *
 * This is born due to the fact that the Faker library doesn't provide enough flexibility on different languages,
 * but we still need to get random words or other elements on different languages, this is made with the
 * database migrations in mind, however it can be used on different modules.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 03 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// EXPORTS ************************************************************************************************************/

/**
 * @summary This class generates different kind of random product content.
 */
export abstract class AbstractContentGenerator {
    protected _words:     string[];
    protected _sentences: string[];
    protected _paragraph: string;

    /**
     * @summary Returns an array of words in a given language.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string[]} The collection of requested words.
     */
    public getWords(amount: number): string[] {
        if (amount > this._words.length) {
            throw new Error(`Incorrect amount ${amount}, max permitted is ${this._words.length}.`);
        }

        return this._getRandomArrayIndexes(this._words, amount);
    }

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string} The requested random sentence.
     */
    public getSentence(): string {
        return this._getRandomElement(this._sentences);
    }

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string} The requested random paragraph.
     */
    public getParagraph(): string {
        return this._paragraph;
    }

    /**
     * @summary returns a random element from an array.
     *
     * @param {string[]} elements The element collection
     *
     * @returns {string} The selected element.
     *
     * @protected
     */
    protected _getRandomElement(elements: string[]): string{
        return elements[Math.floor(Math.random() * elements.length)];
    }

    /**
     * @summary Gives back a random set from an array.
     *
     * @param {*[]} array The array to get the set from.
     * @param {number} amount The amount of elements to select from the array.
     *
     * @returns {Array} The subset of elements.
     * @private
     */
    private _getRandomArrayIndexes(array: any[], amount: number): any[] {
        const data  = array.slice(0);
        let results = [];

        for (let i = 0; i < (Math.ceil(Math.random() * amount) || 1); i++) {
            results.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
        }

        return results;
    }
}
