/**
 * @file english-content-generator.ts.
 *
 * @summary Produces pseudo-random words / sentences / paragraphs in english.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 03 2016
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

import { AbstractContentGenerator } from './abstract-content-generator';
import * as faker                   from 'faker/locale/en';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This content generators creates english content.
 */
export class EnglishContentGenerator extends AbstractContentGenerator
{

    /**
     * @summary non-numeric numbers used to fake models in english.
     *
     * @type {string[]}
     * @private
     */
    private _numbers = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten'
    ];

    /**
     * @summary Clothes sizes used to fake models in english.
     *
     * @type {string[]}
     * @private
     */
    private _sizes = [
        'xs: Extra Small',
        's: Small',
        'ms: Medium Small',
        'm: Medium',
        'ml: Medium Large',
        'l: Large',
        'xl: Extra Large'
    ];

    /**
     * @summary Gets the factory method for the english content generator.
     *
     * @returns {() => AbstractContentGenerator} The translator factory method.
     */
    public static getFactoryMethod(): () => AbstractContentGenerator
    {
        return (() => new EnglishContentGenerator());
    }

    /**
     * @summary Returns the locale of the instance.
     *
     * @returns {string} The locale.
     */
    public getLocale()
    {
        return 'en';
    }

    /**
     * @summary Returns an string of words in english.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string} The requested words.
     */
    public getWords(amount: number): string
    {
        return faker.lorem.words(amount);
    }

    /**
     * @summary Returns an array of words in a english.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string[]} The collection of requested words.
     */
    public getWordsArray(amount: number): string[]
    {
        return faker.lorem.words(amount).split(' ');
    }

    /**
     * @summary Returns an string resembling a title in a english.
     *
     * @returns {string} The requested title.
     */
    public getProductTitle(): string
    {
        return faker.commerce.productName();
    }

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string} The requested random sentence.
     */
    public getSentence(): string
    {
        return faker.lorem.sentence();
    }

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string} The requested random paragraph.
     */
    public getParagraph(): string
    {
        return faker.lorem.paragraph();
    }

    /**
     * @summary Gives a random color in english language.
     *
     * @returns {string} The requested random color in english.
     */
    public getColor(): string
    {
        return faker.commerce.color();
    }

    /**
     * @summary Gives a random number in english language.
     *
     * @returns {string} The requested random number in english.
     */
    public getNumber(): string
    {
        return this._getRandomArrayIndexes(this._numbers, 1).toString();
    }

    /**
     * @summary Gives a random size in english language.
     *
     * @returns {string} The requested random size.
     */
    public getSize(): string
    {
        return this._getRandomArrayIndexes(this._sizes, 1).toString();
    }
}

