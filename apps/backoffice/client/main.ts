/**
 * @file main.ts.
 *
 * @summary Client application entry point.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   August 26 2016
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

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

// BOOTSTRAP COMPONENT ************************************************************************************************/

platformBrowserDynamic().bootstrapModule(AppModule);
