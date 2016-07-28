/**
 * @file load-mock-data.ts
 *
 * @summary Loads mock data for testing purposes.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
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

import { Categories } from '../common/collections/category.collection.ts';
import { Products }   from '../common/collections/product.collection.ts';
import { Images } from '../common/collections/image.collection';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Inserts the fake categories.
 */
export function loadCategories() {
    if (Categories.find().count() === 0) {

        let categories = [
            {
                '_id': 'C0000000001',
                'name': [
                    {
                        'language': 'en',
                        'value': 'Shirts'
                    },
                    {
                        'language': 'zh',
                        'value': '襯衫'
                    },
                ],
                'slug': 'shirts',
                'info': [
                    {
                        'language': 'en',
                        'value': 'All the Shirts'
                    },
                    {
                        'language': 'zh',
                        'value': '所有的襯衫'
                    },
                ],
                'image': 'shirts.png'
            },
            {
                '_id': 'C0000000002',
                'name': [
                    {
                        'language': 'en',
                        'value': 'Dresses'
                    },
                    {
                        'language': 'zh',
                        'value': '連衣裙'
                    },
                ],
                'slug': 'dresses',
                'info': [
                    {
                        'language': 'en',
                        'value': 'All the dresses'
                    },
                    {
                        'language': 'zh',
                        'value': '所有裙子'
                    },
                ],
                'image': 'dresses.png'
            },
            {
                '_id': 'C0000000003',
                'name': [
                    {
                        'language': 'en',
                        'value': 'Shoes'
                    },
                    {
                        'language': 'zh',
                        'value': '鞋'
                    },
                ],
                'slug': 'shoes',
                'info': [
                    {
                        'language': 'en',
                        'value': 'All the shoes',
                    },
                    {
                        'language': 'zh',
                        'value': '所有的鞋子'
                    },
                ],
                'image': 'shoes.png'
            }
        ];

        for (let i = 0; i < categories.length; i++) {
            Categories.insert(categories[i]);
        }

        loadProducts();
        loadImages();
    }
}

/**
 * @summary Inserts the fake products.
 */
export function loadProducts() {
    if (Products.find().count() === 0) {

        let products = [
            {
                '_id': 'P0000000001',
                'title': [
                    {
                        'language': 'en',
                        'value': 'Black Shoe'
                    },
                    {
                        'language': 'zh',
                        'value': '黑鞋'
                    },
                ],
                'sku': 'blacks086',
                'categoryId': ['C0000000003'],
                'description': [
                    {
                        'language': 'en',
                        'value': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
                        ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud' +
                        ' dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis' +
                        ' aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
                        ' pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' +
                        ' deserunt mollit anim id est laborum.'
                    },
                    {
                        'language': 'zh',
                        'value': '垥娀庣 瘑睯碫 姌弣抶 鈖嗋 誙, 骱 騩鰒鰔 萷葋蒎 灡蠵讔 俶倗 墐墆墏 斪昮朐 騔鯬鶄 潣 顃餭, 諙 橍殧澞' +
                        '鮂鮐嚃 巘斖蘱 憃撊 嘽 鮥鴮 驨訑紱 椸楢楩, 箷箯 鸃鼞欘 緱翬膞 檌檒濦 煃, 禖穊稯 騔鯬鶄 鸙讟钃 壿 磑禠 鋱鋟鋈' +
                        '窞綆腤 蓪 踄鄜, 鋑鋡髬 珋疧眅 儮嬼懫 蓪 詏貁 謕豲 燲獯璯 氃濈瀄 邆錉霋 觢 餖駜 惝掭掝 揯揳揓 蒏, 壾 鳼鳹鴅' +
                        '溮煡煟 犕瘑 蝺 瑐瑍 鋱鋟鋈 廦廥彋, 抏旲 銇 碢禗禈 鞈頨頧 虰豖阹 熿熼燛 忕汌卣 觢 笢笣, 蚔趵郚 藽轚酁 蒰裧頖' +
                        ' 澉 坽姎, 襛襡襙 撌斳暩 熿熼 滈 箄縴儳 毊灚襳 岯岪弨 摿 隒雸, 皵碡碙 觶譈譀 輣鋄銶 趍 榾毄 葮 縢羱 萆覕貹' +
                        '棷棫椓 紏蚙迻'
                    },
                ],
                'color': 'black',
                'size': 'small',
                'price': 1200,
                'discount': 10,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shoes', 'black', 'sport'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            },
            {
                '_id': 'P0000000002',
                'title': [
                    {
                        'language': 'en',
                        'value': 'Red Dress'
                    },
                    {
                        'language': 'zh',
                        'value': '紅色禮服'
                    },
                ],
                'sku': 'red0019s',
                'categoryId': ['C0000000002'],
                'description': [
                    {
                        'language': 'en',
                        'value': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
                        ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud' +
                        ' dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis' +
                        ' aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
                        ' pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' +
                        ' deserunt mollit anim id est laborum.'
                    },
                    {
                        'language': 'zh',
                        'value': '垥娀庣 瘑睯碫 姌弣抶 鈖嗋 誙, 骱 騩鰒鰔 萷葋蒎 灡蠵讔 俶倗 墐墆墏 斪昮朐 騔鯬鶄 潣 顃餭, 諙 橍殧澞' +
                        '鮂鮐嚃 巘斖蘱 憃撊 嘽 鮥鴮 驨訑紱 椸楢楩, 箷箯 鸃鼞欘 緱翬膞 檌檒濦 煃, 禖穊稯 騔鯬鶄 鸙讟钃 壿 磑禠 鋱鋟鋈' +
                        '窞綆腤 蓪 踄鄜, 鋑鋡髬 珋疧眅 儮嬼懫 蓪 詏貁 謕豲 燲獯璯 氃濈瀄 邆錉霋 觢 餖駜 惝掭掝 揯揳揓 蒏, 壾 鳼鳹鴅' +
                        '溮煡煟 犕瘑 蝺 瑐瑍 鋱鋟鋈 廦廥彋, 抏旲 銇 碢禗禈 鞈頨頧 虰豖阹 熿熼燛 忕汌卣 觢 笢笣, 蚔趵郚 藽轚酁 蒰裧頖' +
                        ' 澉 坽姎, 襛襡襙 撌斳暩 熿熼 滈 箄縴儳 毊灚襳 岯岪弨 摿 隒雸, 皵碡碙 觶譈譀 輣鋄銶 趍 榾毄 葮 縢羱 萆覕貹' +
                        '棷棫椓 紏蚙迻'
                    },
                ],
                'color': 'red',
                'size': 'medium',
                'price': 2000,
                'discount': 5,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shoes', 'black', 'sport'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            },
            {
                '_id': 'P0000000003',
                'title': [
                    {
                        'language': 'en',
                        'value': 'Pink Shirt'
                    },
                    {
                        'language': 'zh',
                        'value': '粉色襯衫'
                    },
                ],
                'sku': 'ps9sahk',
                'categoryId': ['C0000000001'],
                'description': [
                    {
                        'language': 'en',
                        'value': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' +
                        ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud' +
                        ' dolor in exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis' +
                        ' aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla' +
                        ' pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia' +
                        ' deserunt mollit anim id est laborum.'
                    },
                    {
                        'language': 'zh',
                        'value': '垥娀庣 瘑睯碫 姌弣抶 鈖嗋 誙, 骱 騩鰒鰔 萷葋蒎 灡蠵讔 俶倗 墐墆墏 斪昮朐 騔鯬鶄 潣 顃餭, 諙 橍殧澞' +
                        '鮂鮐嚃 巘斖蘱 憃撊 嘽 鮥鴮 驨訑紱 椸楢楩, 箷箯 鸃鼞欘 緱翬膞 檌檒濦 煃, 禖穊稯 騔鯬鶄 鸙讟钃 壿 磑禠 鋱鋟鋈' +
                        '窞綆腤 蓪 踄鄜, 鋑鋡髬 珋疧眅 儮嬼懫 蓪 詏貁 謕豲 燲獯璯 氃濈瀄 邆錉霋 觢 餖駜 惝掭掝 揯揳揓 蒏, 壾 鳼鳹鴅' +
                        '溮煡煟 犕瘑 蝺 瑐瑍 鋱鋟鋈 廦廥彋, 抏旲 銇 碢禗禈 鞈頨頧 虰豖阹 熿熼燛 忕汌卣 觢 笢笣, 蚔趵郚 藽轚酁 蒰裧頖' +
                        ' 澉 坽姎, 襛襡襙 撌斳暩 熿熼 滈 箄縴儳 毊灚襳 岯岪弨 摿 隒雸, 皵碡碙 觶譈譀 輣鋄銶 趍 榾毄 葮 縢羱 萆覕貹' +
                        '棷棫椓 紏蚙迻'
                    },
                ],
                'color': 'pink',
                'size': 'shirt',
                'price': 800,
                'discount': 15,
                'isLowQuantity': false,
                'isSoldOut': false,
                'isBackorder': false,
                'requiresShipping': true,
                'hashtags': ['shirt', 'pink'],
                'isVisible': true,
                'createdAt': new Date(),
                'updatedAt': new Date(),
                'publishedAt': new Date()
            }
        ];

        for (let i = 0; i < products.length; i++) {
            Products.insert(products[i]);
        }
    }
}

/**
 * @summary Loads the images.
 */
export function loadImages() {
    if (Images.find().count() === 0) {

        let images = [
            {
                '_id': 'tjgNiQYYEhZPNdFPQ',
                'name': '11204203_xxl.jpg',
                'type': 'image/jpeg',
                'size': 74466,
                'productId': 'P0000000001',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '48f9B86B4b',
                'uploadedAt': new Date('2016-07-18T13:03:36.151Z'),
                'url': 'http://localhost:3000/ufs/images/tjgNiQYYEhZPNdFPQ/11204203_xxl.jpg'
            },
            {
                '_id': 'AMJkp5pD3Sh6GunNj',
                'name': 'images.jpg',
                'type': 'image/jpeg',
                'size': 3517,
                'productId': 'P0000000001',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '3B8A58A86A',
                'uploadedAt': new Date('2016-07-18T13:03:43.496Z'),
                'url': 'http://localhost:3000/ufs/images/AMJkp5pD3Sh6GunNj/images.jpg'
            },
            {
                '_id': 'k74MPTu9quqa6g2fk',
                'name': '11204203_xxl.jpg',
                'type': 'image/jpeg',
                'size': 74466,
                'productId': 'P0000000001',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '7a88c97A4A',
                'uploadedAt': new Date('2016-07-18T13:04:02.701Z'),
                'url': 'http://localhost:3000/ufs/images/k74MPTu9quqa6g2fk/11204203_xxl.jpg'
            },
            {
                '_id': 'w7nqxmY2Aonqv8iax',
                'name': 'mens-black-smart-pu-shoes-p18767-10216_zoom.jpg',
                'type': 'image/jpeg',
                'size': 60857,
                'productId': 'P0000000001',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': 'fA49289809',
                'uploadedAt': new Date('2016-07-18T13:04:09.240Z'),
                'url': 'http://localhost:3000/ufs/images/w7nqxmY2Aonqv8iax/mens-black-smart-pu-shoes-p18767-10216_zoom.jpg'
            },
            {
                '_id': 'a6dxfZrT3YcoooSas',
                'name': 'images (1).jpg',
                'type': 'image/jpeg', 'size': 3420,
                'productId': 'P0000000001',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '297948F94B',
                'uploadedAt': new Date('2016-07-18T13:04:15.095Z'),
                'url': 'http://localhost:3000/ufs/images/a6dxfZrT3YcoooSas/images%20(1).jpg'
            },
            {
                '_id': '484nJydmMeMJ7TgyL',
                'name': 'a4e5vh-l.jpg',
                'type': 'image/jpeg',
                'size': 74198,
                'productId': 'P0000000002',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '4979695b29',
                'uploadedAt': new Date('2016-07-18T13:05:24.999Z'),
                'url': 'http://localhost:3000/ufs/images/484nJydmMeMJ7TgyL/a4e5vh-l.jpg'
            },
            {
                '_id': 'ururMtSHZ7HvaN2Nr',
                'name': 'D4584WhiteStones-2.jpg',
                'type': 'image/jpeg',
                'size': 107423,
                'productId': 'P0000000002',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '5Ab9aBE8e9',
                'uploadedAt': new Date('2016-07-18T13:05:28.904Z'),
                'url': 'http://localhost:3000/ufs/images/ururMtSHZ7HvaN2Nr/D4584WhiteStones-2.jpg'
            },
            {
                '_id': 'NAJSNXF4kyNe6tXKo',
                'name': 'white-dress-LUX-LD1403-a.jpg',
                'type': 'image/jpeg',
                'size': 220903,
                'productId': 'P0000000002',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '2b28691b4a',
                'uploadedAt': new Date('2016-07-18T13:05:32.891Z'),
                'url': 'http://localhost:3000/ufs/images/NAJSNXF4kyNe6tXKo/white-dress-LUX-LD1403-a.jpg'
            },
            {
                '_id': 'ukBm7aGPJw2WqHLAZ',
                'name': '12094849_10153269135670838_8991426395593595276_o.jpg',
                'type': 'image/jpeg',
                'size': 40557,
                'productId': 'P0000000003',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': 'CBB9495b4a',
                'uploadedAt': new Date('2016-07-18T13:05:55.481Z'),
                'url': 'http://localhost:3000/ufs/images/ukBm7aGPJw2WqHLAZ/12094849_10153269135670838_8991426395593595276_o.jpg'
            },
            {
                '_id': 'FGLNwvqaJQskwEv6P',
                'name': 'images (2).jpg',
                'type': 'image/jpeg',
                'size': 7504,
                'productId': 'P0000000003',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '1B5aD8680a',
                'uploadedAt': new Date('2016-07-18T13:06:00.033Z'),
                'url': 'http://localhost:3000/ufs/images/FGLNwvqaJQskwEv6P/images%20(2).jpg'
            },
            {
                '_id': 'qZx3HnszAzxmgLQtH',
                'name': 'images (3).jpg',
                'type': 'image/jpeg',
                'size': 7829,
                'productId': 'P0000000003',
                'store': 'images',
                'complete': true,
                'uploading': false,
                'extension': 'jpg',
                'progress': 1,
                'userId': null,
                'token': '49CaC9085b',
                'uploadedAt': new Date('2016-07-18T13:06:04.036Z'),
                'url': 'http://localhost:3000/ufs/images/qZx3HnszAzxmgLQtH/images%20(3).jpg'
            }
        ];
        for (let i = 0; i < images.length; i++) {
            Images.insert(images[i]);
        }
    }
}
