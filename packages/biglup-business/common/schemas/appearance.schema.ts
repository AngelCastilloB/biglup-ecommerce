/**
 * @file appearance.schema.ts
 *
 * @summary Definition of the appearance schema.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 20 2017
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// CONSTANTS **********************************************************************************************************/

const APPEARANCE_STYLE_SCHEMA_NAME        = 'AppearanceStyleSchema';
const APPEARANCE_HEADER_STYLE_SCHEMA_NAME = 'AppearanceHeaderStyleSchema';
const APPEARANCE_FOOTER_STYLE_SCHEMA_NAME = 'AppearanceFooterStyleSchema';
const APPEARANCE_SCHEMA_NAME              = 'AppearanceSchema';
const APPEARANCE_LAYOUT_SCHEMA_NAME       = 'AppearanceLayoutSchema';
const APPEARANCE_LOGO_SCHEMA_NAME         = 'LogoImageSchema';

// IMPORTS ************************************************************************************************************/

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// EXPORTS ************************************************************************************************************/

/**
 * @brief product image schema.
 */
export let LogoImageSchema: any = new SimpleSchema({
    id: {
        label: `${APPEARANCE_LOGO_SCHEMA_NAME} id`,
        type: String
    },
    // Denormalized field: This will avoid the need to query the image collection.
    url: {
        label: `${APPEARANCE_LOGO_SCHEMA_NAME} url`,
        type: String
    },
    isUploaded: {
        label: `${APPEARANCE_LOGO_SCHEMA_NAME} isUploaded`,
        type: Boolean
    },
    file:
    {
        label: 'The image file object.',
        type: Object,
        autoValue()
        {
            if (this.isInsert || this.isSet)
                this.unset();
        },
        optional: true
    }
});


/**
 * @brief Appearance layout schema.
 */
export let AppearanceLayoutSchema: any = new SimpleSchema({
    name: {
        label: `${APPEARANCE_LAYOUT_SCHEMA_NAME} name`,
        type: String
    },
    configuration: {
        label: `${APPEARANCE_LAYOUT_SCHEMA_NAME} configuration`,
        type: Object,
        blackbox: true
    }
});

/**
 * @brief Appearance header style schema.
 */
export let AppearanceHeaderStyleSchema: any = new SimpleSchema({
    topBarBackgroundColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} top bar background color`,
        type: String
    },
    topBarFontColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} top bar font color`,
        type: String
    },
    logoBackgroundColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} logo background color`,
        type: String
    },
    logo: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} logo`,
        type: LogoImageSchema
    },
    logoAlignment: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} logo alignment`,
        type: String
    },
    menuBackgroundColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} menu background color`,
        type: String
    },
    menuFontColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} menu font color`,
        type: String
    },
    menuHighlight: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} menu highlight color`,
        type: String
    },
    submenuBackgroundColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} submenu background color`,
        type: String
    },
    submenuFontColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} submenu font color color`,
        type: String
    },
    submenuBorderColor: {
        label: `${APPEARANCE_HEADER_STYLE_SCHEMA_NAME} submenu font color`,
        type: String
    }
});

/**
 * @brief Appearance footer style schema.
 */
export let AppearanceFooterStyleSchema: any = new SimpleSchema({
    backgroundColor: {
        label: `${APPEARANCE_FOOTER_STYLE_SCHEMA_NAME} background color`,
        type: String
    },
    fontColor: {
        label: `${APPEARANCE_FOOTER_STYLE_SCHEMA_NAME} font color`,
        type: String
    }
});

/**
 * @brief Appearance style schema.
 */
export let AppearanceStyleSchema: any = new SimpleSchema({
    header: {
        label: `${APPEARANCE_STYLE_SCHEMA_NAME} header`,
        type: AppearanceHeaderStyleSchema
    },
    footer: {
        label: `${APPEARANCE_STYLE_SCHEMA_NAME} footer`,
        type: AppearanceFooterStyleSchema
    }
});

/**
 * @summary The appearance schema.
 */
export const AppearanceSchema: any = new SimpleSchema({
    _id: {
        type: String,
        label: `${APPEARANCE_SCHEMA_NAME} _id`,
        optional: true
    },
    name: {
        label: `${APPEARANCE_SCHEMA_NAME} name`,
        type: String
    },
    isEditable: {
        label: `${APPEARANCE_SCHEMA_NAME} isEditable`,
        type: Boolean
    },
    isActive: {
        label: `${APPEARANCE_SCHEMA_NAME} isActive`,
        type: Boolean
    },
    style: {
        label: `${APPEARANCE_SCHEMA_NAME} style`,
        type: AppearanceStyleSchema
    },
    layout: {
        label: `${APPEARANCE_SCHEMA_NAME} layout`,
        type: [AppearanceLayoutSchema]
    },
    createdAt: {
        label: `${APPEARANCE_SCHEMA_NAME} createdAt`,
        type: Date,
        autoValue()
        {
            if (this.isInsert)
            {
                return new Date();
            }
            else if (this.isSet)
            {
                this.unset();
            }
        },
        optional: true
    },
    updatedAt: {
        type: Date,
        label: `${APPEARANCE_SCHEMA_NAME} updatedAt`,
        autoValue()
        {
            return new Date();
        },
        optional: true
    }
});
