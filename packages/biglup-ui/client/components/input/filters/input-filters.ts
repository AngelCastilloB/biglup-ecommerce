/**
 * @file input-filters
 *
 * @summary A collection of commonly use input filters.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 22 2016
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

import { KeyCode } from './key-code';

/* EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated button.
 */
export class InputFilters
{
    /**
     * @summary Allows home, end, period, numpad decimal backspace, tab, delete, enter, arrows, numbers and
     * keypad numbers only.
     *
     * @param code The keycode if the key that was just pressed.
     *
     * @returns {boolean} True if the key should be filter, otherwise, false.
     */
    public static numerical(code: number): boolean
    {
        return (
        code === KeyCode.BACKSPACE ||
        code === KeyCode.TAB ||
        code === KeyCode.ENTER ||
        code === KeyCode.DELETE ||
        code === KeyCode.DECIMAL ||
        code === KeyCode.PERIOD ||
        (code >= KeyCode.END && code <= KeyCode.DOWN_ARROW) ||
        (code >= KeyCode.KEY_0 && code <= KeyCode.KEY_9) ||
        (code >= KeyCode.NUMPAD_0 && code <= KeyCode.NUMPAD_9));
    }

    /**
     * Allows home, end, backspace, tab, delete, enter, arrows, numbers and
     * keypad numbers only.
     *
     * @param code The keycode if the key that was just pressed.
     *
     * @returns {boolean} True if the key should be filter, otherwise, false.
     */
    public static digits(code: number): boolean
    {
        return (
        code === KeyCode.BACKSPACE ||
        code === KeyCode.TAB ||
        code === KeyCode.ENTER ||
        code === KeyCode.DELETE ||
        (code >= KeyCode.END && code <= KeyCode.DOWN_ARROW) ||
        (code >= KeyCode.KEY_0 && code <= KeyCode.KEY_9) ||
        (code >= KeyCode.NUMPAD_0 && code <= KeyCode.NUMPAD_9));
    }

    /**
     * Allows home, end, backspace, tab, delete, enter, arrows and alphabetic characters [A-Z].
     *
     * @param code The keycode if the key that was just pressed.
     *
     * @returns {boolean} True if the key should be filter, otherwise, false.
     */
    public static alphabet(code: number): boolean
    {
        return (
        code === KeyCode.BACKSPACE ||
        code === KeyCode.TAB ||
        code === KeyCode.ENTER ||
        code === KeyCode.DELETE ||
        (code >= KeyCode.END && code <= KeyCode.DOWN_ARROW) ||
        (code >= KeyCode.KEY_A && code <= KeyCode.KEY_Z));
    }
}
