/**
 * @file i-crypto.ts.
 *
 * @summary TODO add summary on i-crypto.ts.
 *
 * @author Alejandro Granadillo <slayerfat@gmail.com>
 * @date   September 22 2016
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

import { ICrypto } from './i-crypto';
import { Cipher, Decipher } from 'crypto';

export interface ICrypto
{

    /**
     * @summary Attempts to encrypt a given text.
     *
     * @param {string} text The text to encrypt.
     * @param {Object} options The optional options needed to transform the text.
     * @param {string} options.from The text's locale.
     * @param {string} options.to The resulting encrypted text type.
     */
    encryptText(text: string, options: {from: string, to: string});

    /**
     * @summary Attempts to decrypt a given text.
     *
     * @param {string} text The text to decrypt.
     * @param {Object} options The optional options needed to transform the text.
     * @param {string} options.from The current encrypted text type.
     * @param {string} options.to The resulting decrypted text locale.
     */
    decryptText(text: string, options: {from: string, to: string});

    /**
     * @summary Attempts to encrypt a given buffer.
     *
     * @param {Buffer} buffer The buffer to be encrypted.
     */
    encryptBuffer(buffer: Buffer);

    /**
     * @summary Attempts to decrypt a given buffer.
     *
     * @param {Buffer} buffer The buffer to be decrypted.
     */
    decryptBuffer(buffer: Buffer);

    /**
     * @summary Returns the underlying cipher used by this interface.
     *
     * @returns {Cipher}
     */
    getCipher(): Cipher;

    /**
     * @summary Returns the underlying decipher used by this interface.
     *
     * @returns {Decipher}
     */
    getDecipher(): Decipher;
}
