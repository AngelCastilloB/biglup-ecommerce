/**
 * @file client.ts
 *
 * @summary Module client entry point.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 25 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// Services
export * from './client/services/i18n-singleton.service';

// Pipes
export * from './client/pipes/mongo-translate.pipe';
export * from './client/pipes/translate.pipe';

// Models
export * from './common/models/i18n-string';

// Modules
export * from './client/biglup-i18n.module';

// Misc
export * from './client/services/language-region-names';
