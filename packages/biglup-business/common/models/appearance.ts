/**
 * @file Appearance.ts
 *
 * @summary The appearance model.
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

// IMPORTS ************************************************************************************************************/

import { AppearanceStyle }  from './appearance-style';
import { AppearanceLayout } from './appearance-layout';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The appearance model.
 */
export class Appearance
{
    /**
     * @summary Initializes a new instance of the Appearance class.
     *
     * @param _id        The id of the appearance.
     * @param name       The given name.
     * @param style      The style.
     * @param layout     The layout.
     * @param isEditable Whether this appearance is editable.
     * @param isActive   Whether this appearance is the active appearance.
     * @param createdAt  The Appearance date of creation.
     * @param updatedAt  The last time this Appearance was updated.
     */
    constructor(
        public _id: String = null,
        public name: String = '',
        public style: AppearanceStyle = new AppearanceStyle(),
        public layout: Array<AppearanceLayout> = [],
        public isEditable: boolean             = true,
        public isActive: boolean               = false,
        public createdAt:      Date            = new Date(),
        public updatedAt:      Date            = new Date())
    {
    }
}