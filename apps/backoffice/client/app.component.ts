/**
 * @file app.component.ts
 *
 * @summary The application's root component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 16 2016
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

import { Component }           from '@angular/core';
import { I18nSingletonService} from 'meteor/biglup:i18n';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './app.component.html';

// EXPORTS *****************************************************************************************************/

/**
 * @summary This the application root component.
 */
@Component({
    selector: 'app',
    template
})
export class AppComponent
{
    /**
     * @summary Initializes a new instance of the AppComponent class.
     */
    constructor()
    {
        // Bootstrap translations.
        I18nSingletonService.getInstance().addTranslation(require('./translations/en_US.json'), 'en_US');
        I18nSingletonService.getInstance().addTranslation(require('./translations/zh_TW.json'), 'zh_TW');
    }
}
