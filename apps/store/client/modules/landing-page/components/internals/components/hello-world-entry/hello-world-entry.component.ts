/**
 * @file hello-world-entry.component.ts
 *
 * @summary Tha hello world entry.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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
import template from './hello-world-entry.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays hello world in the landing page
 */
@Component({
    selector: 'hello-world-entry',
    template
})
export class HelloWorldEntryComponent
{
    private _params: any;

    /**
     * @summary Initializes a new instance of the HelloWorldEntryComponent class.
     */
    constructor()
    {
    }
}
