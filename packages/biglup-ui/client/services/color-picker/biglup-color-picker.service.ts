/**
 * @file biglup-color-picker.service.ts
 *
 * @summary Simple color picker service.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 20 2016
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

import { Injectable } from '@angular/core';
import { Rgba }       from './internals/Rgba';
import { Hsla }       from './internals/Hsla';
import { Hsva }       from './internals/Hsva';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary The color picker service.
 */
@Injectable()
export class BiglupColorPickerService
{
    /**
     * @summary Initializes a new instance of the BiglupColorPickerService class.
     */
    constructor()
    {
    }

    /**
     * @summary Converts an HSLA value to HSVA.
     *
     * @param hsla The HSLA value to be converted.
     *
     * @return {Hsva} The HSVA resulting value.
     */
    public hsla2hsva(hsla: Hsla): Hsva
    {
        let h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);

        if (l === 0)
            return new Hsva(h, 0, 0, a);

        let v = l + s * (1 - Math.abs(2 * l - 1)) / 2;

        return new Hsva(h, 2 * (v - l) / v, v, a);
    }

    /**
     * @summary Converts a value from HSVA to HSLA.
     *
     * @param hsva The HSVA value to be converted.
     *
     * @return {Hsla} The resulting HSLA value.
     */
    public hsva2hsla(hsva: Hsva): Hsla
    {
        let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;

        if (v === 0)
            return new Hsla(h, 0, 0, a);

        if (s === 0 && v === 1)
            return new Hsla(h, 1, 1, a);

        let l = v * (2 - s) / 2;

        return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
    }

    /**
     * @summary Converts a value from RGBA to HSVA.
     *
     * @param rgba The RGBA value to be converted.
     *
     * @return {Hsva} The resulting HSVA value.
     */
    public rgbaToHsva(rgba: Rgba): Hsva
    {
        let r:   number  = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
        let max: number = Math.max(r, g, b), min = Math.min(r, g, b);
        let h:   number = max;
        let s:   number = max;
        let v:   number = max;
        let d:   number = max - min;

        s = max === 0 ? 0 : d / max;

        if (max === min)
        {
            h = 0;
        }
        else
        {
            switch (max)
            {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    break;
            }

            h /= 6;
        }

        return new Hsva(h, s, v, a);
    }

    /**
     * @summary Converts a value from HSVA to RGBA.
     *
     * @param hsva The HSVA value to be converted.
     *
     * @return {Rgba} The resulting RGBA value.
     */
    public hsvaToRgba(hsva: Hsva): Rgba
    {
        let h = hsva.h;
        let s = hsva.s;
        let v = hsva.v;
        let a = hsva.a;

        let r: number = 0;
        let g: number = 0;
        let b: number = 0;

        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i % 6)
        {
            case 0:
                r = v;
                g = t;
                b = p;

                break;
            case 1:
                r = q;
                g = v;
                b = p;

                break;
            case 2:
                r = p;
                g = v;
                b = t;

                break;
            case 3:
                r = p;
                g = q;
                b = v;

                break;
            case 4:
                r = t;
                g = p;
                b = v;

                break;
            case 5:
                r = v;
                g = p;
                b = q;

                break;
            default:
                break;
        }

        return new Rgba(r, g, b, a);
    }

    /**
     * @summary Converts a value from string to HSVA.
     *
     * @param colorString The color string value to be converted.
     * @param hex8        The 8bit hex value.
     *
     * @return {Hsva} The resulting HSVA value.
     */
    public stringToHsva(colorString: string = '', hex8: boolean = false): Hsva
    {
        let stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: (execResult: any) =>
                {
                    return new Rgba(parseInt(execResult[2], 10) / 255,
                        parseInt(execResult[3], 10) / 255,
                        parseInt(execResult[4], 10) / 255,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: (execResult: any) =>
                {
                    return new Hsla(parseInt(execResult[2], 10) / 360,
                        parseInt(execResult[3], 10) / 100,
                        parseInt(execResult[4], 10) / 100,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            }
        ];

        if (hex8)
        {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: (execResult: any) => {
                    return new Rgba(parseInt(execResult[1], 16) / 255,
                        parseInt(execResult[2], 16) / 255,
                        parseInt(execResult[3], 16) / 255,
                        parseInt(execResult[4], 16) / 255);
                }
            });
        } else {
            stringParsers.push({
                    re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                    parse: (execResult: any) => {
                        return new Rgba(parseInt(execResult[1], 16) / 255,
                            parseInt(execResult[2], 16) / 255,
                            parseInt(execResult[3], 16) / 255,
                            1);
                    }
                },
                {
                    re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                    parse: (execResult: any) => {
                        return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
                            parseInt(execResult[2] + execResult[2], 16) / 255,
                            parseInt(execResult[3] + execResult[3], 16) / 255,
                            1);
                    }
                });
        }

        colorString = colorString.toLowerCase();

        let hsva: Hsva = null;

        for (let key in stringParsers)
        {
            if (stringParsers.hasOwnProperty(key))
            {
                let parser = stringParsers[key];
                let match  = parser.re.exec(colorString), color: any = match && parser.parse(match);

                if (color)
                {
                    if (color instanceof Rgba)
                    {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla)
                    {
                        hsva = this.hsla2hsva(color);
                    }

                    return hsva;
                }
            }
        }

        return hsva;
    }

    /**
     * @summary Formats the collor value to with the given string format.
     *
     * @param hsva         The HSVA value.
     * @param outputFormat The output format.
     * @param allowHex8    True if 8-bit hex values are allowed, otherwise, false.
     *
     * @return {string} The resulting string representation of the color.
     */
    public outputFormat(hsva: Hsva, outputFormat: string, allowHex8: boolean): string
    {
        if (hsva.a < 1)
        {
            switch (outputFormat)
            {
                case 'hsla':
                    let hsla     = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(
                        Math.round((hsla.h) * 360),
                        Math.round(hsla.s * 100),
                        Math.round(hsla.l * 100),
                        Math.round(hsla.a * 100) / 100);

                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                default:
                    if (allowHex8 && outputFormat === 'hex')
                        return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)), allowHex8);

                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));

                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else
        {
            switch (outputFormat)
            {
                case 'hsla':
                    let hsla     = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(
                        Math.round((hsla.h) * 360),
                        Math.round(hsla.s * 100),
                        Math.round(hsla.l * 100),
                        Math.round(hsla.a * 100) / 100);

                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));

                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)), allowHex8);
            }
        }
    }

    /**
     * @summary Converts a given RGBA value to an string.
     *
     * @param rgba         The RGBA value.
     * @param allowHex8    True if 8-bit hex values are allowed, otherwise, false.
     *
     * @return {string} The resulting string representation of the color.
     */
    public hexText(rgba: Rgba, allowHex8: boolean): string
    {
        let hexText = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);

        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6] && rgba.a === 1 && !allowHex8)
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];

        if (allowHex8)
            hexText += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substr(1);

        return hexText;
    }

    /**
     * @summary Denormalize the given RGBA value.
     *
     * @param rgba The RGBA value to be denormalized.
     *
     * @return {Rgba} The denormalized RGBA value.
     */
    public denormalizeRGBA(rgba: Rgba): Rgba
    {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
}