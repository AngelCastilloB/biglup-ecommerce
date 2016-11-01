/**
 * @file biglup-toast.service.ts
 *
 * @summary Service that display toast messages.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 01 2016
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

import { Injectable } from '@angular/core';
import { _T }         from 'meteor/biglup:i18n';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This services creates toast notifications.
 */
@Injectable()
export class BiglupToastService
{
    private _previous: any = null;

    /**
     * @summary Initializes a new instance of the BiglupToastService class.
     */
    constructor()
    {
    }

    /**
     * @summary Displays a toast with a given message.
     *
     * @param message     The message to be displayed in the toast.
     * @param dismissable True if the toast can be dismissed, otherwise, false.
     * @param number      The amount of milliseconds to display the toast for. (default 5000).
     */
    public displayToast(
        message: string,
        dismissable: boolean = true,
        timer: number = 5000)
    {
        if (this._previous)
            this._previous.dismiss();

        let toast: any = document.createElement('div');

        toast.className = 'biglup-toast';
        toast.dismiss   = () => toast.style.opacity = 0;

        let text = document.createTextNode(message);

        toast.appendChild(text);

        if (dismissable) {
            let actionButton = document.createElement('button');
            actionButton.className = 'action';
            actionButton.innerHTML = _T('Dismiss');
            actionButton.addEventListener('click', () => toast.dismiss());
            toast.appendChild(actionButton);
        }

        Observable.timer(timer)
            .take(1)
            .map(() => toast)
            .subscribe(
            (el) =>
            {
                if (this._previous === el)
                    this._previous.dismiss();
            });

        Observable.fromEvent(toast, 'transitionend').subscribe(
            (event) =>
            {
                if (event.propertyName === 'opacity' && toast.style.opacity == 0)
                {
                    toast.parentElement.removeChild(toast);

                    if (this._previous === this)
                        this._previous = null;
                }
            });

        this._previous = toast;
        document.body.appendChild(toast);

        // In order for the animations to trigger, We have to force the original style to be
        // computed, and then change it.
        getComputedStyle(toast).bottom;
        toast.style.bottom = '0px';
        toast.style.opacity = 1;
    }
}
