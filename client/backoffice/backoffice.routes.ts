/**
 * @file backoffice.routes.ts
 *
 * @summary The routes definitions for the backoffice component.
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

/* IMPORTS ************************************************************************************************************/

import { RouterConfig }        from '@angular/router';
import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';

/* EXPORTS ************************************************************************************************************/

/**
 * @brief This are the backoffice routes.
 */
export const backofficeRoutes: RouterConfig = [
    {
        path: 'admin',
        component: BackofficeComponent,
        children: [
            { path: '',  component: DashboardComponent }
        ]
    }
];
