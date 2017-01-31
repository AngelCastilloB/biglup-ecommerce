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
export * from './client/services/guards/is-user-logged-guard.service';
export * from './client/services/guards/is-user-logged-out-guard.service';
export * from './client/services/guards/new-password-guard.service';
export * from './client/services/id-generator.service';
export * from './client/services/validation.service';

// Pipes
export * from './client/pipes/array-random.pipe';
export * from './client/pipes/truncate-string.pipe';

// Others
export * from './client/format/string.format';
