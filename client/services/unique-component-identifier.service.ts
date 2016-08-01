/**
 * @file unique-component-identifier.service.ts
 *
 * @summary This service returns unrepeated new identifiers.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 02 2016
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

const PREFIX = 'id_';

// IMPORTS ************************************************************************************************************/

import { Injectable } from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Service that returns unrepeated new identifiers. 
 */
@Injectable()
export class UniqueComponentIdentifierService {
    private static s_count: number = 0;

      /**
       * @summary Returns a new id (unrepeated).
       *
       * @returns {string} The new unique id.
       */
      getId(): string {
        ++UniqueComponentIdentifierService.s_count;
        return PREFIX + UniqueComponentIdentifierService.s_count;
    }
}
