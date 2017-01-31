/**
 * @file variant-attributes.migration.ts.
 *
 * @summary Creates new variant attributes documents to insert to the database.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 22 2016
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

import { ColorVariantAttribute,
         SizeVariantAttribute,
         MaterialVariantAttribute,
         VariantMaterials,
         VariantColors,
         VariantSizes }             from 'meteor/biglup:business';
import { IMigratable }              from './interfaces/i-migratable';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Handles all the variant attribute migrations.
 */
export class VariantAttributeMigration implements IMigratable
{
    /**
     * @summary Initializes a new instance of the class VariantAttributeMigration.
     */
    constructor()
    {
    }

    /**
     * @summary Adds the default product variant attributes to the database.
     */
    public up(): void
    {
        console.log('Starting Default Variant Attributes.');

        this._createColors().forEach((color) => VariantColors.insert(color));
        this._createSizes().forEach((size) => VariantSizes.insert(size));
        this._createMaterials().forEach((material) => VariantMaterials.insert(material));
    }

    /**
     * @summary Undoes the migration.
     */
    public down(): void
    {
        // TODO: See docs to implement properly.
    }

    /**
     * @summary Creates a list of nine basic color variant attributes in two languages (english & traditional chinese).
     *
     * @return a list of default color variant attributes.
     */
    private _createColors(): Array<ColorVariantAttribute>
    {
        let colors: Array<ColorVariantAttribute> = new Array<ColorVariantAttribute>();

        colors.push(
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Red' },
                { language: 'zh_TW', value: '紅色' }
            ], '#FF0000'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Orange' },
                { language: 'zh_TW', value: '橙色' }
            ], '#FF8000'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Yellow' },
                { language: 'zh_TW', value: '黃色' }
            ], '#FFFF00'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Green' },
                { language: 'zh_TW', value: '綠色' }
            ], '#008000'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Blue' },
                { language: 'zh_TW', value: '藍色' }
            ], '#0066FF'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Violet' },
                { language: 'zh_TW', value: '紫色' }
            ], '#800000'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Brown' },
                { language: 'zh_TW', value: '棕色' }
            ], '#803300'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'Black' },
                { language: 'zh_TW', value: '黑色' }
            ], '#000000'),
            new ColorVariantAttribute(null, [
                { language: 'en_US', value: 'White' },
                { language: 'zh_TW', value: '白色' }
            ], '#FFFFFF')
        );

        return colors;
    }

    /**
     * @summary Creates a list of basic size variant attributes in two languages (english & traditional chinese).
     *
     * @return a list of default size variant attributes.
     */
    private _createSizes(): Array<SizeVariantAttribute>
    {
        let sizes: Array<SizeVariantAttribute> = new Array<SizeVariantAttribute>();

        sizes.push(
            new SizeVariantAttribute(null, [
                { language: 'en_US', value: 'Small' },
                { language: 'zh_TW', value: '小' }
            ]),
            new SizeVariantAttribute(null, [
                { language: 'en_US', value: 'Medium' },
                { language: 'zh_TW', value: '中' }
            ]),
            new SizeVariantAttribute(null, [
                { language: 'en_US', value: 'Large' },
                { language: 'zh_TW', value: '大' }
            ])
        );

        return sizes;
    }

    /**
     * @summary Creates a list of basic material variant attributes in two languages (english & traditional chinese).
     *
     * @return a list of default materials variant attributes.
     */
    private _createMaterials(): Array<MaterialVariantAttribute>
    {
        let materials: Array<MaterialVariantAttribute> = new Array<MaterialVariantAttribute>();

        materials.push(
            new MaterialVariantAttribute(null, [
                { language: 'en_US', value: 'Cotton' },
                { language: 'zh_TW', value: '棉' }
            ]),
            new MaterialVariantAttribute(null, [
                { language: 'en_US', value: 'Leather' },
                { language: 'zh_TW', value: '皮革' }
            ]),
            new MaterialVariantAttribute(null, [
                { language: 'en_US', value: 'Silk' },
                { language: 'zh_TW', value: '絲' }
            ]),
            new MaterialVariantAttribute(null, [
                { language: 'en_US', value: 'Synthetic' },
                { language: 'zh_TW', value: '合成' }
            ]),
            new MaterialVariantAttribute(null, [
                { language: 'en_US', value: 'Wool' },
                { language: 'zh_TW', value: '羊毛' }
            ])
        );

        return materials;
    }
}
