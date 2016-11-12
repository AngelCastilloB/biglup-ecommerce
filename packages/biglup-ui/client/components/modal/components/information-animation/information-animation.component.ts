/**
 * @file information-animation.component.ts
 *
 * @summary CSS only information icon animation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 18 2016
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

import { Component } from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './information-animation.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Component that displays a information icon animation.
 */
@Component({
    selector: 'information-animation',
    template
})
export class InformationAnimationComponent extends Component
{
}
