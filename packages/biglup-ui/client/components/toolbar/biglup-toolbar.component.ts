/**
 * @file biglup-toolbar.component.ts
 *
 * @summary Polymer like toolbar component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 02 2016
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

import { Component,
         Input,
         Output,
         EventEmitter,
         OnInit,
         OnDestroy,
         NgZone }             from '@angular/core';
import { BiglupMediaService } from '../../services/media/biglup-media.service';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-toolbar.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays a simple toolbar.
 */
@Component({
    selector: 'biglup-toolbar',
    template
})
export class BiglupToolbarComponent implements OnInit, OnDestroy
{
    @Input('title')
    private _title:             string  = '';
    private _showleftNavbar:    boolean = false;
    @Output('toggleNavbar')
    private _toggleNavbar:      any = new EventEmitter();
    private _querySubscription: any;

    /**
     * @summary Initializes a new instance of the BiglupToolbarComponent class.
     *
     * @param {BiglupMediaService} _mediaService Service that reports changes on the view port.
     * @param {NgZone} _ngZone The angular 2 zone service..
     */
    constructor(private _mediaService: BiglupMediaService, private _ngZone: NgZone)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): void
    {
        this._watchScreen();
    }

    /**
     * @summary Perform any custom cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy(): void
    {
        this._querySubscription.unsubscribe();
    }

    /**
     * @summary Event handler for when the menu button is clicked.
     */
    private _onMenuButtonClick()
    {
        this._showleftNavbar = !this._showleftNavbar;

        if (this._toggleNavbar)
            this._toggleNavbar.emit(this._showleftNavbar);
    }

    /**
     * @summary Watchs the screen resize events.
     */
    private _watchScreen(): void
    {
        this._querySubscription = this._mediaService.registerQuery('gt-sm').subscribe((matches: boolean) =>
        {
            this._ngZone.run(() =>
            {
                if (this._showleftNavbar !== matches)
                {
                    this._showleftNavbar = matches;

                    if (this._toggleNavbar)
                        this._toggleNavbar.emit(this._showleftNavbar);
                }
            });
        });
    }
}
