/**
 * @file kr.generator.ts.
 *
 * @summary Produces pseudo-random words / sentences / paragraphs in korean.
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

// IMPORTS ************************************************************************************************************/

import { AbstractContentGenerator } from './abstract-content-generator';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This content generators creates korean content.
 */
export class KoreanContentGenerator extends AbstractContentGenerator
{

    /**
     * @summary Words used to fake models in korean.
     *
     * @type {string[]}
     * @private
     */
    private _words = [
        '텍스트',
        '뿐만',
        '아니라',
        '동영상까지',
        '스타일을',
        '소개하고',
        '모습이',
        '만큼',
        '합니다',
        '컨셉이',
        '오늘은',
        '툴을',
        '필요했습니다'
    ];

    /**
     * @summary Sentences used to fake models in korean.
     *
     * @type {string[]}
     * @private
     */
    private _sentences = [
        '텍스트 뿐만 아니라, 이미지, 동영상까지. 온라인에선 다양한 컨셉이 존재하는 만큼.',
        '로렌임숨도 다양한 모습이 필요했습니다.',
        '오늘은 이러한 로렌임숨의 여러 스타일을 소개하고.',
        '디자이너들의 시간을 절약해주는 다양한 툴을 소개해보고자 합니다.',
        '온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한 모습이 필요했습니다.'
    ];

    /**
     * @summary Paragraph used to fake models in korean.
     *
     * @type {string}
     * @private
     */
    private _paragraph = '텍스트 뿐만 아니라, 이미지, 동영상까지. 온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한' +
        ' 모습이 필요했습니다. 오늘은 이러한 로렌임숨의 여러 스타일을 소개하고, 디자이너들의 시간을 절약해주는 다양한 툴을 소개해보고자 ' +
        '합니다, 온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한 모습이 필요했습니다.';

    /**
     * @summary Colors used to fake models in korean.
     *
     * @type {string[]}
     * @private
     */
    private _colors = [
        '검정색',
        '하얀색',
        '빨간색',
        '노란색',
        '초록색',
        '주황색',
        '보라색'
    ];

    /**
     * @summary non-numeric numbers used to fake models in korean.
     *
     * @type {string[]}
     * @private
     */
    private _numbers = [
        '하나',
        '둘',
        '셋',
        '넷',
        '다섯',
        '여섯',
        '일곱',
        '여덟',
        '아홉',
        '열'
    ];

    /**
     * @summary Clothes sizes used to fake models in korean.
     *
     * @type {string[]}
     * @private
     */
    private _sizes = [
        'xs: 추가 작은',
        's: 작은',
        'ms: 중소',
        'm: 매질',
        'ml: 대 중',
        'l: 큰',
        'xl: 특대',
    ];

    /**
     * @summary Gets the factory method for the korean content generator.
     *
     * @returns {() => AbstractContentGenerator} The translator factory method.
     */
    public static getFactoryMethod(): () => AbstractContentGenerator
    {
        return (() => new KoreanContentGenerator());
    }

    /**
     * @summary Returns the locale of the instance.
     *
     * @returns {string} The locale.
     */
    public getLocale()
    {
        return 'kr';
    }

    /**
     * @summary Returns an string of words in korean.
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
     * @summary Returns an array of words in a korean.
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
     * @summary Gives a random color in korean language.
     *
     * @returns {string} The requested random color in korean.
     */
    public getColor(): string
    {
        return this._getRandomArrayIndexes(this._colors, 1).toString();
    }

    /**
     * @summary Gives a random number in korean language.
     *
     * @returns {string} The requested random number in korean.
     */
    public getNumber(): string
    {
        return this._getRandomArrayIndexes(this._numbers, 1).toString();
    }

    /**
     * @summary Gives a random size in korean language.
     *
     * @returns {string} The requested random size.
     */
    public getSize(): string
    {
        return this._getRandomArrayIndexes(this._sizes, 1).toString();
    }

    /**
     * @summary Returns an string resembling a title in a korean.
     *
     * @returns {string} The requested title.
     */
    public getProductTitle(): string
    {
        return this.getWords(3);
    }
}
