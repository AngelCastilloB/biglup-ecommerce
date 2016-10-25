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

import 'reflect-metadata';

import { Directive,
         OnDestroy,
         Input,
         OnInit,
         ElementRef,
         Renderer }   from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

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
    @Input('rippleDisabled')
    private _rippledDisabled: boolean = false;
    @Input('fixedRipple')
    private _fixedRipple: boolean = false;
    @Input('iconRipple')
    private _iconRipple: boolean = false;
    @Input('rippleColor')
    private _rippleColor:           string = '#FFFFFF';
    private _mouseDownObservable:   any    = Observable.fromEvent(this._el.nativeElement, 'mousedown');
    private _mouseUpObservable:     any    = Observable.fromEvent(document.body, 'mouseup');
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
        if (this._rippledDisabled)
            return;

        if (this._fixedRipple)
            this._startFixedRipple();
        else
            this._startVariableRipple();
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
     * @summary Starts a ripple on the parent container. This ripple will always gro to the same size, sont be contained
     * on the parent and will be centered.
     *
     * @private
     */
    private _startFixedRipple()
    {
        this._mouseDownSubscription = this._mouseDownObservable
            .map((event: any) =>
            {
                const container: any    = event.currentTarget;
                let   ripple:    any    = document.createElement('div');
                // TODO: Figure out why this random adjustment values are needed.
                const xPos:      number = Math.floor(this._el.nativeElement.getBoundingClientRect().width / 2) - 2;
                const yPos:      number = Math.floor(this._el.nativeElement.getBoundingClientRect().height / 2) - 2;

                ripple.classList.add('fixed-ripple-effect');
                ripple.classList.add('ripple-fixed');

                let size: number = 10;

                let backgroundColor = getComputedStyle(this._el.nativeElement).getPropertyValue('color');

                ripple.style.top        = yPos + 'px';
                ripple.style.left       = xPos + 'px';
                ripple.style.background = backgroundColor;
                ripple.style.width      = size + 'px';
                ripple.style.height     = size + 'px';

                if (this._iconRipple)
                {
                  // TODO: Figure out why this random adjustment values are needed.
                  ripple.style.marginTop  = '-3px';
                  ripple.style.marginLeft = '-3px';
                }
                else
                {
                  ripple.style.marginTop  = -(size / 2) + 'px';
                  ripple.style.marginLeft = -(size / 2) + 'px';
                }

                container.appendChild(ripple);
                return { ripple, container, event };
            })
            .delay(10)
            .do((elements: any)       =>
            {
              if (this._iconRipple)
              {
                elements.ripple.classList.add('icon-ripple-effect-on');
              }
              else
              {
                elements.ripple.classList.add('fixed-ripple-effect-on');
              }
            })
            .mergeMap((elements: any) => this._mouseUpObservable.take(1).map((event: any) => elements))
            .delay(100)
            .do((elements: any) =>
            {
                const style:  any     = elements.ripple.style;
                const size:   number  = elements.ripple.getBoundingClientRect().width;
                const backgroundColor = getComputedStyle(this._el.nativeElement).getPropertyValue('color');

                style.height = size + 'px';
                style.width  = size + 'px';

                if (this._iconRipple)
                {
                  // TODO: Figure out why this random adjustment values are needed.
                  style.marginTop  = -(size / 2) + 2 + 'px';
                  style.marginLeft = -(size / 2) + 2 + 'px';

                  style.background = backgroundColor;
                  elements.ripple.classList.add('icon-ripple-effect-off');
                }
                else
                {
                  style.marginTop  = -(size / 2) + 'px';
                  style.marginLeft = -(size / 2) + 'px';

                  style.background = backgroundColor;
                  elements.ripple.classList.add('fixed-ripple-effect-off');
                }
            })
            .delay(300)
            .do((elements: any)       =>
            {
              elements.container.removeChild(elements.ripple);
            })
            .subscribe();
    }

    /**
     * @summary Starts a ripple on the parent container that changes it size depending on how long the user
     * keep the mouse pressed.
     *
     * @private
     */
    private _startVariableRipple()
    {
        this._mouseDownSubscription = this._mouseDownObservable
            .map((event: any) =>
            {
                const container: any    = event.currentTarget;
                let   ripple:    any    = document.createElement('div');
                const xPos:      number = event.pageX - container.offsetLeft;
                const yPos:      number = event.pageY - container.offsetTop;

                ripple.classList.add('ripple-effect');
                ripple.classList.add('ripple-variable');

                let size: number = this._el.nativeElement.getBoundingClientRect().width * 0.6;

                ripple.style.top        = yPos + 'px';
                ripple.style.left       = xPos + 'px';
                ripple.style.background = getComputedStyle(this._el.nativeElement).getPropertyValue('color');
                ripple.style.width      = size + 'px';
                ripple.style.height     = size + 'px';
                ripple.style.marginTop  = -(size / 2) + 'px';
                ripple.style.marginLeft = -(size / 2) + 'px';

                container.appendChild(ripple);

                return { ripple, container, event };
            })
            .delay(10)
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
            .delay(1500)
            .do((elements: any)       => elements.container.removeChild(elements.ripple))
            .subscribe();
    }
}
