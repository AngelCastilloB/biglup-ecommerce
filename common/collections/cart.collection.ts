/**
 * @file cart.collection.ts
 *
 * @summary The shopping carts collection.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 17 2016
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

import { Mongo } from 'meteor/mongo';
import { CartSchema } from '../schemas/cart.schema';

// EXPORTS ************************************************************************************************************/

export let Carts:any = new Mongo.Collection<Cart>('carts');

// IMPLEMENTATION *****************************************************************************************************/

Carts.attachSchema(CartSchema);