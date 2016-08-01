/**
 * @file migration.ts.
 *
 * @summary Abstract Migration sets the base for all migration implementations.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   July 31 2016
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

import { Mongo }      from 'meteor/mongo';
import { Migratable } from './interfaces/Migratable';

// EXPORTS ************************************************************************************************************/

/**
 * @summary sets the structure needed to add a new document to the mongo database.
 */
export abstract class Migration implements Migratable {

    /**
     * @summary Controls the version of the current migration, the collection can have multiple migrations.
     *
     * @type {number}
     * @protected
     */
    protected _version = 1;

    /**
     * @summary The Mongo collection to be manipulated.
     * @protected
     */
    protected _collection: Mongo.Collection<Object>;

    /**
     * @summary The amount to be added by default.
     *
     * @type {number}
     * @protected
     */
    protected _amount = 10;

    /**
     * @summary Words used to fake models in chinese.
     *
     * @type {string[]}
     * @protected
     */
    protected _chineseWords = [
        '垥娀庣',
        '瘑睯碫',
        '姌弣抶',
        '鈖嗋',
        '誙',
        '骱',
        '騩鰒鰔',
        '斪昮朐',
        '鋱鋟鋈窞綆腤',
        '橍殧澞鮂鮐嚃',
        '鮥鴮',
        '墐墆墏蒎',
        '驨訑椸楢楩',
        '粉色襯衫'
    ];

    /**
     * @summary Sentences used to fake models in chinese.
     *
     * @type {string[]}
     * @protected
     */
    protected _chineseSentences = [
        '垥娀庣 瘑睯碫 姌弣抶 鈖嗋 誙, 骱 騩鰒 灡蠵讔 俶倗 墐墆墏 斪昮朐 騔鯬鶄 潣 顃餭.',
        '鮂鮐嚃 巘斖蘱 憃撊 嘽 鮥鴮 驨訑紱楩, 箷箯 鸃鼞欘翬膞 檌檒濦 煃, 禖穊稯 騔鯬鶄 鸙讟钃 壿 磑禠 鋱鋟鋈.',
        '窞綆腤 蓪 踄鄜, 鋑鋡髬 珋疧眅儮嬼懫 蓪 詏貁 謕豲 燲獯璯 氃濈瀄 邆錉霋 觢 餖駜 惝掭掝 揯揳揓 蒏.',
        '溮煡煟 犕瘑 蝺 瑐瑍 鋱鋟鋈 廦廥彋, 抏旲 銇 碢禗禈頧 虰豖阹 熿熼燛 忕汌卣 觢 笢笣, 蚔趵郚 藽轚酁 蒰裧頖.',
        '襛襡襙撌斳暩 熿熼 滈 箄縴儳 毊灚襳 岯岪弨 摿 隒雸, 皵碡碙 觶譈譀 輣鋄銶 趍 榾毄 葮 縢羱 萆覕貹.',
    ];

    /**
     * @summary Paragraph used to fake models in chinese.
     *
     * @type {string}
     * @protected
     */
    protected _chineseParagraph = '垥娀庣 瘑睯碫 姌弣抶 鈖嗋 誙, 骱 騩鰒鰔 萷葋蒎 灡蠵讔 俶倗 墐墆墏 斪昮朐 騔鯬鶄 潣 顃餭, ' +
        '諙 橍殧澞鮂鮐嚃 巘斖蘱 憃撊 嘽 鮥鴮 驨訑紱 椸楢楩, 箷箯 鸃鼞欘 緱翬膞 檌檒濦 煃, 禖穊稯 騔鯬鶄 鸙讟钃 壿 磑禠 ' +
        '鋱鋟鋈窞綆腤  蓪 踄鄜, 鋑鋡髬 珋疧眅 儮嬼懫 蓪 詏貁 謕豲 燲獯璯 氃濈瀄 邆錉霋 觢 餖駜 惝掭掝 揯揳揓 蒏, 壾 鳼鳹鴅溮煡煟 ' +
        '犕瘑 蝺 瑐瑍 鋱鋟鋈 廦廥彋, 抏旲 銇 碢禗禈 鞈頨頧 虰豖阹 熿熼燛 忕汌卣 觢 笢笣, 蚔趵郚 藽轚酁 蒰裧頖 澉 坽姎, 襛襡襙 ' +
        '撌斳暩 熿熼 滈 箄縴儳 毊灚襳 岯岪弨 摿 隒雸, 皵碡碙 觶譈譀 輣鋄銶 趍 榾毄 葮 縢羱 萆覕貹棷棫椓 紏蚙迻';

    constructor(collection: Mongo.Collection<Object>) {
        this._collection = collection;
    }

    /**
     * @summary Needs to have the logic required to add a new document.
     *
     * @param {number=} amount The amount of documents to add.
     */
    public abstract up(): void;

    /**
     * @summary Must have the logic to undo the 'up' method without disrupting the database.
     */
    public down(): void {
        console.log('removing collection!');
        this._collection.remove({});
    }
}
