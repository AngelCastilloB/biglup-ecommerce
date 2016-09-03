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
 * @summary Base class for the content generators. A content generator can create words, sentences and paragraphs.
 */
export abstract class AbstractContentGenerator
{

    /**
     * @summary Returns the locale of the instance.
     *
     * @returns {string} The locale.
     */
    public abstract getLocale(): string;

    /**
     * @summary Returns an string of words in a given language.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string} The requested words.
     */
    public abstract getWords(amount: number): string;

    /**
     * @summary Returns an array of words in a given language.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string[]} The collection of requested words.
     */
    public abstract getWordsArray(amount: number): string[];

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string} The requested random sentence.
     */
    public abstract getSentence(): string;

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string} The requested random paragraph.
     */
    public abstract getParagraph(): string;

    /**
     * @summary Gives a random color in a given language.
     *
     * @returns {string} The requested random color.
     */
    public abstract getColor(): string;

    /**
     * @summary Gives a random number in a given language.
     *
     * @returns {string} The requested random number.
     */
    public abstract getNumber(): string;

    /**
     * @summary Gives a random size in a given language.
     *
     * @returns {string} The requested random size.
     */
    public abstract getSize(): string;

    /**
     * @summary Returns an string resembling a title in a given language.
     *
     * @returns {string} The requested title.
     */
    public abstract getProductTitle(): string;

    /**
     * @summary Returns a random true or false boolean
     *
     * @returns {boolean}
     */
    public getRandomBoolean(): boolean
    {
        return Math.random() < .5 ? true : false;
    }

    /**
     * @summary Returns a number between 0 and 100 or the max if provided.
     *
     * @param {number} max The maximum the number can be.
     *
     * @returns {number}
     */
    public getRandomNumber(max = 100): number
    {
        return Math.floor(Math.random() * max);
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
    protected _getRandomElement(elements: string[]): string
    {
        return elements[Math.floor(Math.random() * elements.length)];
    }

    /**
     * @summary Gives back a random set from an array.
     *
     * @param {*[]} array The array to get the set from.
     * @param {number} amount The amount of elements to select from the array.
     *
     * @returns {Array} The subset of elements.
     */
    protected _getRandomArrayIndexes(array: any[], amount: number): any[]
    {
        const data  = array.slice(0);
        let results = [];

        for (let i = 0; i < (Math.ceil(Math.random() * amount) || 1); ++i)
        {
            results.push(data.splice(Math.floor(Math.random() * data.length), 1)[0]);
        }

        return results;
    }

    /**
     * @summary Throws an error mentioning the amount requested is more than what exist.
     *
     * @param {number} amount the amount requested
     * @param {number} actual the actual amount
     */
    protected _throwGetLengthError(amount: number, actual: number)
    {
        throw new Error(`Incorrect amount ${amount}, max permitted is ${actual}.`);
    }
}
