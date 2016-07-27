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

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, NavigationEnd} from '@angular/router';

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

    private _urls: string[];
    private _isBase: boolean = true;

    constructor(private router: Router) {
        this._urls = new Array();
        this.router.events.subscribe((navigationEnd:NavigationEnd) => {
            this._urls.length = 0; //Fastest way to clear out array
            this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);

            this._isBase = this._urls.length <= 0;
        });
    }

    generateBreadcrumbTrail(url: string): void {
        if (url === "/admin" || url === "/admin/dashboard") // HACK: Remove base url. This is a temporary hack.
            return;

        this._urls.unshift(url);

        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
        }
    }

    getCurrentPosition(url:string):string
    {
        var positions = url.split("/").filter(function(n){ return n != "" });

        // remove the base route for the admin panel.
        if (positions[0] == "admin")
            positions.splice(0, 1);

        if (positions.length < 1)
            return "";

        return this.fixCase(positions[positions.length - 1]);
    }

    fixCase(message:string){
        return message.charAt(0).toUpperCase() + message.slice(1);
    };

    navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    }
}