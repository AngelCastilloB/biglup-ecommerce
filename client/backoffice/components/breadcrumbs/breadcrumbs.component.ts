/**
 * @file breadcrumbs.ts
 *
 * @summary Breadcrumbs component definition.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 27 2016
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

import { ROUTER_DIRECTIVES,
         Router,
         NavigationEnd }    from '@angular/router';
import { Component }        from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component shows a breadcrumb trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
 */
@Component({
    selector: 'breadcrumb',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <nav class="navbar navbar-dark stylish-color">
            <ol class="breadcrumb">
                    <li *ngFor="let url of _urls; let last = last">
                        <a (click)="navigateTo(url)" *ngIf="!last">{{ getCurrentPosition(url) }}</a>
                        <a *ngIf="last" class="active">{{ getCurrentPosition(url) }}</a>  
                    </li>
                    
                    <li *ngIf="_isBase">
                        <a class="active">Dashboard</a>  
                    </li>
            </ol>
        </nav>
    `
})
export class BreadcrumbComponent {

    private _urls:   string[];
    private _isBase: boolean = true;

    /**
     * @brief Initializes a new instance of the BreadcrumbComponent class.
     *
     * @param {Router} router The router dependency injection.
     */
    constructor(private router: Router) {
        this._urls = [];
        this.router.events.subscribe((navigationEnd: NavigationEnd) => {
            this._urls.length = 0;
            this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);

            this._isBase = this._urls.length <= 0;
        });
    }

    /**
     * @summary  This methods generates the breadcrumbs for the given URL.
     *
     * @param {string} url The Url to generate the breadcrumbs from.
     */
    public generateBreadcrumbTrail(url: string): void {
        // HACK: Remove base url. This is a temporary hack.
        if (url === '/admin' || url === '/admin/dashboard') {
            return;
        }

        this._urls.unshift(url);

        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
        }
    }

    /**
     * @summary  Gets the current position in the given url.
     *
     * @param {string} url The Url to get the current position from.
     */
    public getCurrentPosition(url: string): string {
        let positions = url.split('/').filter(function (n) {
            return n !== '';
        });

        // HACK: remove the base route for the admin panel.
        if (positions[0] === 'admin') {
            positions.splice(0, 1);
        }

        if (positions.length < 1) {
            return '';
        }

        return this.fixCase(positions[positions.length - 1]);
    }

    /**
     * @summary  Fixes the case of the current message. (Pascal Case).
     *
     * @param {string} message The message to be fixed.
     */
    public fixCase(message: string) {
        return message.charAt(0).toUpperCase() + message.slice(1);
    };

    public navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    }
}
