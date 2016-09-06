/**
 * @file spanish-content-generator.ts.
 *
 * @summary Produces pseudo-random words / sentences / paragraphs in spanish.
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

// EXPORTS ************************************************************************************************************/

/**
 * @summary This content generators creates spanish content.
 *
 * @see https://www.youtube.com/watch?v=77Ms1oCiDH4
 */
export class SpanishContentGenerator extends AbstractContentGenerator
{

    /**
     * @summary Words used to fake models in spanish.
     *
     * @type {string[]}
     * @private
     */
    private _words = [
        'salsa',
        'tequila',
        'corazon',
        'te quiero',
        'muy bueno',
        'calamares',
        'costa',
        'chorizo',
        'sombrero',
        'gato',
        'negro',
        'gasolina',
        'desesperado'
    ];

    /**
     * @summary Sentences used to fake models in spanish.
     *
     * @type {string[]}
     * @private
     */
    private _sentences = [
        'Salsa, tequila, corazón cerveza, muy bueno.',
        'Las ketchup, desesperado, Mallorca, si cortado.',
        'Corazón, La Bamba, arriba, Carlos Santana.',
        'Selena Gomez, porque machete, enchilada, uno, dos, tres, cuatro.',
        'Guacamole, jalapeño Salma Hayek, Ricki Martin.'
    ];

    /**
     * @summary Paragraph used to fake models in spanish.
     *
     * @type {string}
     * @private
     */
    private _paragraph = 'Madrid, Chihuahua, Adelén, por favor bailando Guacamole, ' +
        'jalapeño Salma Hayek, Ricki Martin Balacao muy bueno Mariachi, ' +
        'gasolina, calamari, muchas gracias Macarena mi amigo Living la vida loca ' +
        'Antonio Banderas, dale.';

    /**
     * @summary Colors used to fake models in spanish.
     *
     * @type {string[]}
     * @private
     */
    private _colors = [
        'blanco',
        'negro',
        'gris',
        'azul',
        'amarillo',
        'naranja',
        'rojo'
    ];

    /**
     * @summary non-numeric numbers used to fake models in spanish.
     *
     * @type {string[]}
     * @private
     */
    private _numbers = [
        'uno',
        'dos',
        'tres',
        'cuatro',
        'cinco',
        'seis',
        'siete',
        'ocho',
        'nueve',
        'diez'
    ];

    /**
     * @summary Clothes sizes used to fake models in spanish.
     *
     * @type {string[]}
     * @private
     */
    private _sizes = [
        'xs: Extra pequeño',
        's: Pequeño',
        'ms: Pequeño Mediano',
        'm: Mediano',
        'ml: Mediano Grande',
        'l: Grande',
        'xl: Extra Grande'
    ];

    /**
     * @summary Gets the factory method for the spanish content generator.
     *
     * @returns {() => AbstractContentGenerator} The translator factory method.
     */
    public static getFactoryMethod(): () => AbstractContentGenerator
    {
        return (() => new SpanishContentGenerator());
    }

    /**
     * @summary Returns the locale of the instance.
     *
     * @returns {string} The locale.
     */
    public getLocale()
    {
        return 'es';
    }

    /**
     * @summary Returns an string of words in spanish.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string} The requested words.
     */
    public getWords(amount: number): string
    {
        return this.getWordsArray(amount).join(' ');
    }

    /**
     * @summary Returns an array of words in a spanish.
     *
     * @param {number} amount  the amount to return.
     *
     * @returns {string[]} The collection of requested words.
     */
    public getWordsArray(amount: number): string[]
    {
        if (amount > this._words.length)
        {
            this._throwGetLengthError(amount, this._words.length);
        }

        return this._getRandomArrayIndexes(this._words, amount);
    }

    /**
     * @summary Gives a random sentence in a given language.
     *
     * @returns {string} The requested random sentence.
     */
    public getSentence(): string
    {
        return this._getRandomElement(this._sentences);
    }

    /**
     * @summary Gives a random Paragraph in a given language.
     *
     * @returns {string} The requested random paragraph.
     */
    public getParagraph(): string
    {
        return this._paragraph;
    }

    /**
     * @summary Gives a random color in spanish language.
     *
     * @returns {string} The requested random color in spanish.
     */
    public getColor(): string
    {
        return this._getRandomArrayIndexes(this._colors, 1).toString();
    }

    /**
     * @summary Gives a random number in spanish language.
     *
     * @returns {string} The requested random number in spanish.
     */
    public getNumber(): string
    {
        return this._getRandomArrayIndexes(this._numbers, 1).toString();
    }

    /**
     * @summary Gives a random size in spanish language.
     *
     * @returns {string} The requested random size.
     */
    public getSize(): string
    {
        return this._getRandomArrayIndexes(this._sizes, 1).toString();
    }

    /**
     * @summary Returns an string resembling a title in a spanish.
     *
     * @returns {string} The requested title.
     */
    public getProductTitle(): string
    {
        return this.getWords(3);
    }
}
