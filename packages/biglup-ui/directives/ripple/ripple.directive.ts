/**
 * @file ripple.directive.ts
 *
 * @summary Perform a ripple effect on the host element on click.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   September 25 2016
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

import { Directive, OnDestroy, Input, OnInit, ElementRef, Renderer } from '@angular/core';
import { Observable }                     from 'rxjs/Observable';

import 'rxjs/add/operator/mergeMap';

/* EXPORTS ************************************************************************************************************/

/**
 * Ripple directive that can be applied to any kind of element.
 */
@Directive({
    selector: '[ripple]',
    host: {
        '[class.ripple]':   'true',
        '[style.position]': '"relative"',
        '[style.outline]':  '"none"',
    }
})
export class RippleDirective implements OnInit, OnDestroy {
    @Input('ripple')
    private color:                  string  = '#FF0000';
    private _mouseDownObservable:   any     = Observable.fromEvent(this._el.nativeElement, 'mousedown');
    private _mouseUpObservable:     any     = Observable.fromEvent(this._el.nativeElement, 'mouseup');
    private _mouseDownSubscription: any;

    /**
     * @summary Initializes a new instance of the RippleDirective class.
     * @param _el       The element this attribute will enhance.
     * @param _renderer The renderer.
     */
    constructor(private _el: ElementRef, private _renderer: Renderer)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this._mouseDownSubscription = this._mouseDownObservable
            .do((event: any)  => event.preventDefault())
            .map((event: any) =>
            {
                const container: any    = event.currentTarget;
                let   ripple:    any    = document.createElement('div');
                const xPos:      number = event.pageX - container.offsetLeft;
                const yPos:      number = event.pageY - container.offsetTop;

                ripple.classList.add('ripple-effect');

                let size: number = this._el.nativeElement.getBoundingClientRect().width * 0.6;

                console.error(size);
                ripple.style.top        = yPos + 'px';
                ripple.style.left       = xPos + 'px';
                ripple.style.background = this.color;
                ripple.style.width      = size + 'px';
                ripple.style.height     = size + 'px';
                ripple.style.marginTop  = -(size / 2) + 'px';
                ripple.style.marginLeft = -(size / 2) + 'px';

                container.appendChild(ripple);

                return { ripple, container, event };
            })
            .mergeMap((elements: any) => Observable.interval(10).take(1).map((index: any) => elements))
            .do((elements: any)       => elements.ripple.classList.add('ripple-effect-on'))
            .mergeMap((elements: any) => this._mouseUpObservable.take(1).map((event: any) => elements))
            .do((elements: any)       =>
            {
                const style:  any    = elements.ripple.style;
                let   size:   number = elements.ripple.getBoundingClientRect().width;
                let   offset: number = -(size / 2);

                style.height     = size + 'px';
                style.width      = size + 'px';
                style.marginTop  = offset + 'px';
                style.marginLeft = offset + 'px';

                elements.ripple.classList.remove('ripple-effect-on');
                elements.ripple.classList.add('ripple-effect-off');
            })
            .mergeMap((elements: any) => Observable.interval(500).take(1).map((index: any) => elements))
            .do((elements: any)       => elements.container.removeChild(elements.ripple))
            .subscribe();
    }

    /**
     * @summary Cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy(): void
    {
        if (this._mouseDownSubscription)
            this._mouseDownSubscription.unsubscribe();
    }
}
