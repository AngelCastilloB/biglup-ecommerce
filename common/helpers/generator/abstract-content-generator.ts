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

export abstract class AbstractContentGenerator
{
    /**
     * @summary Words used to fake models in korean.
     *
     * @type {string[]}
     * @protected
     */
    protected _words: string[];

    /**
     * @summary Sentences used to fake models in korean.
     *
     * @type {string[]}
     * @protected
     */
    protected _sentences: string[];

    /**
     *
     * @type {string}
     * @protected
     */
    protected _paragraph: string;

    /**
     * @summary Returns an array of words in a given language.
     *
     * @param {number} amount  the amount to return.
     * @returns {string[]}
     */
    public words(amount: number): string[]
    {
        if (amount > this._words.length)
            throw new Error(`Incorrect amount ${amount}, max permitted is ${this._words.length}.`);

        return this._getRandomArrayIndexes(this._words, amount);
    }

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string}
     */
    public sentence(): string
    {
        return this._getRandomElement(this._sentences);
    }

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string}
     */
    public paragraph(): string
    {
        return this._paragraph;
    }

    /**
     * @summary returns a random element from an array.
     *
     * @param {string[]} element
     * @returns {string}
     * @protected
     */
    protected _getRandomElement(element: string[]): string
    {
        return element[Math.floor(Math.random() * element.length)];
    }

    /**
     * @summary Gives back a random set from an array.
     *
     * @param {*[]} array
     * @param {number} amount
     * @returns {Array}
     * @private
     */
    private _getRandomArrayIndexes(array: any[], amount: number): any[]
    {
        const data  = array.slice(0);
        let results = [];

        for (let i = 0; i < (Math.ceil(Math.random() * amount) || 1); ++i)
        {
            results.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
        }

        return results;
    }
}
