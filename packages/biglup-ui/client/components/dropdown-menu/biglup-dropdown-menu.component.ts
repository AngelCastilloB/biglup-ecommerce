/**
 * @file biglup-dropdown-menu.component.ts
 *
 * @summary Polymer like dropdown menu component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 27 2016
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
         AfterViewInit,
         ViewChild,
         OnInit,
         OnDestroy,
         ElementRef,
         Renderer }   from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/race';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-dropdown-menu.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays an animated dropdown menu.
 */
@Component({
    selector: 'biglup-dropdown-menu',
    template
})
export class BiglupDropdownMenuComponent implements AfterViewInit, OnInit, OnDestroy
{
    @ViewChild('list')
    private _menuList;
    @ViewChild('container')
    private _container;
    @Input('value')
    private _value: string = null;
    @Input('disabled')
    private _isDisabled: boolean = false;
    @Input('title')
    private _title: string = '';
    @Input('label')
    private _label: string = '';
    private _displayOptions: boolean = false;
    private _mouseDownObservable:    any    = Observable.fromEvent(this._el.nativeElement, 'mousedown');
    private _touchstartObservable:   any    = Observable.fromEvent(this._el.nativeElement, 'touchstart');
    private _mouseUpObservable:      any    = Observable.fromEvent(document.body, 'mouseup');
    private _touchendObservable:     any    = Observable.fromEvent(document.body, 'touchend');
    private _animationendObservable: any    = Observable.fromEvent(this._el.nativeElement, 'animationend');
    private _mouseDownSubscription:  any;

    /**
     * @summary Initializes a new instance of the BiglupDropdownMenuComponent class.
     */
    constructor(private _el: ElementRef, private _renderer: Renderer)
    {
    }

    /**
     * @summary Cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy(): void
    {
        if (this._mouseDownSubscription)
            this._mouseDownSubscription.unsubscribe();
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._menuList.nativeElement.style.left = this._container.nativeElement.offsetLeft + 'px';

        this._mouseDownSubscription = Observable.race(this._mouseDownObservable, this._touchstartObservable)
            .mergeMap((event) =>
            {
                this._menuList.nativeElement.style.visibility = 'hidden';

                return Observable.forkJoin(
                    Observable.race(this._mouseUpObservable.take(1), this._touchendObservable.take(1)),
                    Observable.timer(290));
            })
            .map((event) =>
            {
                this._displayOptions = !this._displayOptions;

                if (this._displayOptions)
                {
                    this._menuList.nativeElement.style.visibility = 'visible';
                }
                else
                {
                    this._menuList.nativeElement.style.width =
                        this._container.nativeElement.getBoundingClientRect().width / 3 + 'px';
                    this._menuList.nativeElement.style.maxHeight = '100px';
                }

                return event;
            })
            .map(() =>
            {
                if (this._displayOptions)
                {
                    this._menuList.nativeElement.style.width =
                        this._container.nativeElement.getBoundingClientRect().width + 'px';
                    this._menuList.nativeElement.style.maxHeight = '300px';
                }
            }).subscribe();
    }
}
