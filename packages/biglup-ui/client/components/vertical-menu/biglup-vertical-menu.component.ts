/**
 * @file biglup-vertical-menu.component.ts
 *
 * @summary Animated vertical menu.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 04 2016
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

import { Component, Input } from '@angular/core';
import { Meteor }           from 'meteor/meteor';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-vertical-menu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a animated vertical menu.
 */
@Component({
    selector: 'biglup-vertical-menu',
    template
})
export class BiglupVerticalMenuComponent
{
    /**
     * @summary Initializes a new instance of the BiglupVerticalMenuComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Gets the absolute path of the header image resource.
     *
     * @return {string} The absolute path of the header image resource.
     */
    private _getImageHeaderPath(): string
    {
        return Meteor.absoluteUrl('packages/biglup_ui/assets/images/biglup-menu-header.png');
    }
}
