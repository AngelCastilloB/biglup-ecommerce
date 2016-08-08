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

export abstract class AbstractContentGenerator {

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
     * @summary Gives a random word in a given language.
     *
     * @returns {string}
     */
    public word() {
        return this._getRandomElement(this._words);
    }

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string}
     */
    public sentence(): string {
        return this._getRandomElement(this._sentences);
    }

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string}
     */
    public paragraph(): string {
        return this._paragraph;
    }

    /**
     * @summary returns a random element from an array.
     *
     * @param {string[]} element
     * @returns {string}
     * @protected
     */
    protected _getRandomElement(element: string[]): string {
        return element[Math.floor(Math.random() * element.length)];
    }
}
