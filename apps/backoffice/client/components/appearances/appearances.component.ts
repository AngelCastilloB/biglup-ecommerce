/**
 * @file dashboard.component.ts
 *
 * @summary The appearances admin panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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

import { AfterViewInit }  from '@angular/core';
import { Component }      from '@angular/core';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './appearances.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the available appearances.
 */
@Component({
    selector: 'appearances',
    template
})
export class AppearancesComponent implements AfterViewInit
{
    private _content: string = 'sssss';

    /**
     * @summary Initializes a new instance of the AppearancesComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary This function is called when your component's view has been fully initialized.
     */
    public ngAfterViewInit()
    {
    }
}
