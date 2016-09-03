/**
 * @file content-generator-factory.ts.
 *
 * @summary The factory of the content generators.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 02 2016
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

import { Meteor }                            from 'meteor/meteor';
import { KoreanContentGenerator }            from './korean-content-generator';
import { EnglishContentGenerator }           from './english-content-generator';
import { SpanishContentGenerator }           from './spanish-content-generator';
import { AbstractContentGenerator }          from './abstract-content-generator';
import { SimplifiedChineseContentGenerator } from './simplified-chinese-content-generator';

// EXPORTS ************************************************************************************************************/

export class ContentGeneratorFactory
{

    private static _generators: {[key: string]: () => AbstractContentGenerator} = {};

    /**
     * @summary Creates a new Content generator object.
     *
     * @param {string} type The name of the translator object.
     *
     * @returns {AbstractContentGenerator} The ContentGenerator instance.
     */
    public static create(type: string): AbstractContentGenerator
    {
        try
        {
            return this._generators[type]();
        }
        catch (error)
        {
            if (error instanceof TypeError)
            {
                throw new Meteor.Error(`Generator '${type}' not found.`,
                    `The Content Generator '${type}' is not registered in the ContentGeneratorFactory. ` +
                    `Please check your meteor.json file.`
                );
            }

            throw error;
        }
    }

    /**
     * @summary Register the content generator to the factory.
     *
     * @param {string} name The name of the generator.
     * @param factoryMethod The factory method.
     */
    public static register(name: string, factoryMethod: () => AbstractContentGenerator)
    {
        ContentGeneratorFactory._generators[name] = factoryMethod;
    }

    /**
     * @summary Registers all the know strategies to the factory.
     */
    public static init()
    {
        ContentGeneratorFactory.register('en', EnglishContentGenerator.getFactoryMethod());
        ContentGeneratorFactory.register('zh', SimplifiedChineseContentGenerator.getFactoryMethod());
        ContentGeneratorFactory.register('kr', KoreanContentGenerator.getFactoryMethod());
        ContentGeneratorFactory.register('es', SpanishContentGenerator.getFactoryMethod());
    }
}
