/**
 * @file crypto.ts.
 *
 * @summary Basic cryptography implementation.
 *
 * @see https://nodejs.org/api/crypto.html
 * @see https://github.com/chris-rock/node-crypto-examples
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

import {
    createCipher,
    createDecipher,
    Cipher, Decipher
}                  from 'crypto';
import { ICrypto } from './i-crypto';
import { Meteor }  from 'meteor/meteor';

/* EXPORTS ************************************************************************************************************/

export class NodeCrypto implements ICrypto
{

    /**
     * @summary The instance of the Crypto class.
     */
    private static _instance: NodeCrypto;

    /**
     * @summary The default locale the class uses on texts.
     * @remark Set to any to prevent Argument of type 'string' is not assignable to '"utf8" | "ascii" | "binary"'
     *
     * @type {string}
     * @private
     */
    private _defaultLocale: any = 'utf8';

    /**
     * @summary The default target type the decipher will make.
     * @remark Set to any to prevent Argument of type 'string' is not assignable to '"binary" | "base64" | "hex"'
     *
     * @type {string}
     * @private
     */
    private _defaultTransformation: any = 'hex';

    /**
     * @summary Gets the singleton instance of the Crypto class.
     *
     * @returns {NodeCrypto}
     */
    public static getInstance(): NodeCrypto
    {
        if (!NodeCrypto._instance)
        {
            const {algorithm, password} = NodeCrypto._getOptions();
            const cipher                = createCipher(algorithm, password);
            const decipher              = createDecipher(algorithm, password);

            NodeCrypto._instance = new NodeCrypto(cipher, decipher);
        }

        return NodeCrypto._instance;
    }

    /**
     * @summary Gives the options needed for NodeCrypto to work.
     *
     * @returns {{algorithm: string, password: string}}
     * @private
     */
    private static _getOptions(): {algorithm: string, password: string}
    {
        if (Meteor.settings['crypto'])
        {
            return Meteor.settings['crypto'];
        }

        return {algorithm: 'aes-256-ctr', password: Math.random().toString(30)};
    }

    /**
     * @summary Lazy initialise a new instance of the Crypto singleton class.
     *
     * @param {Cipher} _cipher The cipher library used to encrypt data.
     * @param {Decipher} _decipher The decipher library used to decrypt data.
     */
    constructor(private _cipher: Cipher, private _decipher: Decipher)
    {
        if (NodeCrypto._instance)
        {
            throw new Error('Use Crypto.getInstance() instead of \'new\' keyword');
        }
    }

    /**
     * @summary Attempts to encrypt a given text.
     *
     * @param {string} text The text to encrypt.
     * @param {Object} options The optional options needed to transform the text.
     * @param {string} options.from The text's locale.
     * @param {string} options.to The resulting encrypted text type.
     */
    public encryptText(text: string, options = {from: this._defaultLocale, to: this._defaultTransformation})
    {
        let newText = this._cipher.update(text, options.from, options.to);

        newText += this._cipher.final(options.to);

        return newText;
    }

    /**
     * @summary Attempts to decrypt a given text.
     *
     * @param {string} text The text to decrypt.
     * @param {Object} options The optional options needed to transform the text.
     * @param {string} options.from The current encrypted text type.
     * @param {string} options.to The resulting decrypted text locale.
     */
    public decryptText(text: string, options = {from: this._defaultTransformation, to: this._defaultLocale})
    {
        let newText = this._decipher.update(text, options.from, options.to);

        newText += this._decipher.final(options.to);

        return newText;
    }

    /**
     * @summary Attempts to encrypt a given buffer.
     *
     * @param {Buffer} buffer The buffer to be encrypted.
     */
    public encryptBuffer(buffer: Buffer)
    {
        return Buffer.concat([this._cipher.update(buffer), this._cipher.final()]);
    }

    /**
     * @summary Attempts to decrypt a given buffer.
     *
     * @param {Buffer} buffer The buffer to be decrypted.
     */
    public decryptBuffer(buffer: Buffer)
    {
        return Buffer.concat([this._decipher.update(buffer), this._decipher.final()]);
    }

    /**
     * @summary Returns the underlying cipher used by this class.
     *
     * @returns {Cipher}
     */
    public getCipher()
    {
        return this._cipher;
    }

    /**
     * @summary Returns the underlying decipher used by this class.
     *
     * @returns {Decipher}
     */
    public getDecipher()
    {
        return this._decipher;
    }
}
