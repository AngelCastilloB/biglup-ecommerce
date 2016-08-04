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

import { Generator } from './generator';

// EXPORTS ************************************************************************************************************/

export class KrGenerator extends Generator {

    /**
     * @summary Words used to fake models in korean.
     *
     * @type {string[]}
     * @protected
     */
    protected _words = [
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
     * @protected
     */
    protected _sentences = [
        '텍스트 뿐만 아니라, 이미지, 동영상까지. 온라인에선 다양한 컨셉이 존재하는 만큼',
        '로렌임숨도 다양한 모습이 필요했습니다.',
        '오늘은 이러한 로렌임숨의 여러 스타일을 소개하고',
        '디자이너들의 시간을 절약해주는 다양한 툴을 소개해보고자 합니다',
        '온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한 모습이 필요했습니다.'
    ];

    /**
     * @summary Paragraph used to fake models in korean.
     *
     * @type {string}
     * @protected
     */
    protected _paragraph = '텍스트 뿐만 아니라, 이미지, 동영상까지. 온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한' +
        ' 모습이 필요했습니다. 오늘은 이러한 로렌임숨의 여러 스타일을 소개하고, 디자이너들의 시간을 절약해주는 다양한 툴을 소개해보고자 ' +
        '합니다, 온라인에선 다양한 컨셉이 존재하는 만큼, 로렌임숨도 다양한 모습이 필요했습니다.';
}
