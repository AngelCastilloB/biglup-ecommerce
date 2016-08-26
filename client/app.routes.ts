/**
 * @file app.routes.ts.
 *
 * @summary The sugar for the application's routes.
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

import { Routes }           from '@angular/router';
import { backofficeRoutes } from './backoffice/backoffice.routes';
import { frontendRoutes }   from './frontend/frontend.routes';

// EXPORTS ************************************************************************************************************/

/**
 * @summary The routes configurations.
 */
export const APP_ROUTES: Routes = [
    ...backofficeRoutes,
    ...frontendRoutes
];
