/**
 * @file dom-handler.service.ts
 *
 * @summary Dom utility functions.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 17 2016
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

/* EXPORTS ************************************************************************************************************/

/**
 * @summary Service with utility functions to manipulate the DOM.
 */
@Injectable()
export class DomHandlerService
{
    public static zindex: number = 1000;

    /**
     * @summary Adds a class to an element.
     *
     * @param element The element to add the class to.
     * @param className The class to be added.
     */
    public addClass(element: any, className: string): void
    {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    /**
     * @summary Add multiple classes to an element.
     *
     * @param element The element to add the classes to.
     * @param className The class to be added.
     */
    public addMultipleClasses(element: any, className: string): void
    {
        if (element.classList)
        {
            let styles: string[] = className.split(' ');

            for (let i = 0; i < styles.length; i++)
            {
                element.classList.add(styles[i]);
            }

        }
        else
        {
            let styles: string[] = className.split(' ');

            for (let i = 0; i < styles.length; i++)
            {
                element.className += ' ' + styles[i];
            }
        }
    }

    /**
     * @summary Removes a class from an element,
     *
     * @param element The element to remove the class from.
     * @param className The class to be removed.
     */
    public removeClass(element: any, className: string): void
    {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    /**
     * @summary Gets whether an element has a class or not.
     *
     * @param element The element to be inspected.
     * @param className The class to be looked for.
     *
     * @return {boolean} true if the element has the class, otherwise, false.
     */
    public hasClass(element: any, className: string): boolean
    {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }

    /**
     * @summary Gets the sibilings of the element.
     *
     * @param element The element to get the sibilings from.
     *
     * @return {any} The sibilings.
     */
    public siblings(element: any): any
    {
        return Array.prototype.filter.call(element.parentNode.children, (child) =>
        {
            return child !== element;
        });
    }

    /**
     * @summary Finds an element with the given selector.
     *
     * @param element The element where to look for.
     * @param selector The selector.
     *
     * @return {any[]|NodeListOf<Element>} The elements that match the selector.
     */
    public find(element: any, selector: string): any[]
    {
        return element.querySelectorAll(selector);
    }

    /**
     * @summary Finds a singel element that match the selector.
     *
     * @param element The element where to look.
     * @param selector The selector.
     *
     * @return {HTMLElement|Element} The element that matches the selector.
     */
    public findSingle(element: any, selector: string): any
    {
        return element.querySelector(selector);
    }

    /**
     * @summary Gets the index of the given element in the parent node.
     *
     * @param element The element to get the index for.
     *
     * @return {number} The index.
     */
    public index(element: any): number
    {
        let children = element.parentNode.childNodes;
        let num      = 0;

        for (let i = 0; i < children.length; i++)
        {
            if (children[i] === element)
                return num;

            if (children[i].nodeType === 1)
                num++;
        }

        return -1;
    }

    /**
     * @summary Set relative position of an element in the parent.
     *
     * @param element The element to set the relative position for.
     * @param target The target element.
     */
    public relativePosition(element: any, target: any): void
    {
        let elementDimensions = element.offsetParent ?
        {
            width: element.outerWidth,
            height: element.outerHeight
        } : this.getHiddenElementDimensions(element);

        let targetHeight      = target.offsetHeight;
        let targetWidth       = target.offsetWidth;
        let targetOffset      = target.getBoundingClientRect();
        let viewport          = this.getViewport();
        let top, left;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height)
            top = -1 * (elementDimensions.height);
        else
            top = targetHeight;

        if ((targetOffset.left + elementDimensions.width) > viewport.width)
            left = targetWidth - elementDimensions.width;
        else
            left = 0;

        element.style.top  = top + 'px';
        element.style.left = left + 'px';
    }

    /**
     * @summary Set absolute position for an element.
     *
     * @param element The element to set the absolute position for.
     * @param target The target element.
     */
    public absolutePosition(element: any, target: any): void
    {
        let elementDimensions  = element.offsetParent ?
        {
            width: element.offsetWidth,
            height: element.offsetHeight
        } : this.getHiddenElementDimensions(element);
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth  = elementDimensions.width;
        let targetOuterHeight  = target.offsetHeight;
        let targetOuterWidth   = target.offsetWidth;
        let targetOffset       = target.getBoundingClientRect();
        let windowScrollTop    = this.getWindowScrollTop();
        let windowScrollLeft   = this.getWindowScrollLeft();
        let viewport           = this.getViewport();
        let top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height)
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
        else
            top = targetOuterHeight + targetOffset.top + windowScrollTop;

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width)
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
        else
            left = targetOffset.left + windowScrollLeft;

        element.style.top  = top + 'px';
        element.style.left = left + 'px';
    }

    /**
     * @summary Gets the outter height from a hidden element.
     *
     * @param element The element to get the outter height from.
     *
     * @return {number} The element outter height.
     */
    public getHiddenElementOuterHeight(element: any): number
    {
        element.style.visibility = 'hidden';
        element.style.display    = 'block';
        let elementHeight        = element.offsetHeight;
        element.style.display    = 'none';
        element.style.visibility = 'visible';

        return elementHeight;
    }

    /**
     * @summary Gets the outter width of an element.
     *
     * @param element The element to get the ouuter width from.
     *
     * @return {number} The element outter width.
     */
    public getHiddenElementOuterWidth(element: any): number
    {
        element.style.visibility = 'hidden';
        element.style.display    = 'block';
        let elementWidth         = element.offsetWidth;
        element.style.display    = 'none';
        element.style.visibility = 'visible';

        return elementWidth;
    }

    /**
     * @summary Gets the hidden element dimensions.
     *
     * @param element The element to get the dimmensions from.
     *
     * @return {any} The dimensions.
     */
    public getHiddenElementDimensions(element: any): any
    {
        let dimensions: any      = {};
        element.style.visibility = 'hidden';
        element.style.display    = 'block';
        dimensions.width         = element.offsetWidth;
        dimensions.height        = element.offsetHeight;
        element.style.display    = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    /**
     * @summary Sets an scroll view to a container.
     *
     * @param container The contaienr to set the scroll view to.
     * @param item The given item.
     */
    public scrollInView(container, item)
    {
        let borderTopValue: string  = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop: number       = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop: number      = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect           = container.getBoundingClientRect();
        let itemRect                = item.getBoundingClientRect();
        let offset                  = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll                  = container.scrollTop;
        let elementHeight           = container.clientHeight;
        let itemHeight              = this.getOuterHeight(item);

        if (offset < 0)
        {
            container.scrollTop = scroll + offset;
        }
        else if ((offset + itemHeight) > elementHeight)
        {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }

    /**
     * @summary Fade in effect.
     *
     * @param element The element to fade in.
     * @param duration The duration of the fade in animation.
     */
    public fadeIn(element, duration: number): void
    {
        element.style.opacity = 0;

        let last = +new Date();
        let tick = () =>
        {
            element.style.opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            last                  = +new Date();

            if (+element.style.opacity < 1)
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        };

        tick();
    }

    /**
     * @summary The fade out effect.
     *
     * @param element The element to fade out.
     * @param ms The duration of the animation.
     */
    public fadeOut(element, ms)
    {
        let opacity  = 1,
            interval = 50,
            duration = ms,
            gap      = interval / duration;

        let fading = setInterval(() => {
            opacity               = opacity - gap;
            element.style.opacity = opacity;

            if (opacity <= 0)
                clearInterval(fading);
        }, interval);
    }

    /**
     * @summary Get window scroll top.
     *
     * @return {number} The window scroll top.
     */
    public getWindowScrollTop(): number
    {
        let doc = document.documentElement;

        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    /**
     * @summary Get window scroll left.
     *
     * @return {number} The window scroll left.
     */
    public getWindowScrollLeft(): number
    {
        let doc = document.documentElement;

        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }

    /**
     * @summary Gets wether the given element match with a selector.
     *
     * @param element The element to query for.
     * @param selector The selector.
     *
     * @return {any} True if the element has the selector, otherwise, false.
     */
    public matches(element, selector: string): boolean
    {
        let prototype = Element.prototype;
        let func =
                prototype['matches'] ||
                prototype.webkitMatchesSelector ||
                prototype['mozMatchesSelector'] ||
                prototype.msMatchesSelector ||
                ((select) =>
                {
                    return [].indexOf.call(document.querySelectorAll(select), this) !== -1;
                });

        return func.call(element, selector);
    }

    /**
     * @summary Gets the outter width.
     *
     * @param el The element.
     * @param margin The margin.
     *
     * @return {number} The outter margin.
     */
    public getOuterWidth(el, margin?)
    {
        let width = el.offsetWidth;

        if (margin)
        {
            let style = getComputedStyle(el);
            width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        }

        return width;
    }

    /**
     * @summary Gets the horizontal padding.
     *
     * @param el The element.
     * @return {number} The horizontal padding.
     */
    public getHorizontalPadding(el)
    {
        let style = getComputedStyle(el);
        return parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
    }

    /**
     * @summary Gets horizontal amrgin.
     *
     * @param el The element.
     *
     * @return {number} The horizontal margin.
     */
    public getHorizontalMargin(el)
    {
        let style = getComputedStyle(el);
        return parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    }

    /**
     * @summary Gets inner width.
     *
     * @param el The element.
     *
     * @return {number} The inner widht.
     */
    public innerWidth(el)
    {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width += parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
        return width;
    }

    /**
     * @summary Gets the width of the given element.
     *
     * @param el The element.
     *
     * @return {number} The width of the element.
     */
    public width(el)
    {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width -= parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
        return width;
    }

    /**
     * @summary Gets the outter height.
     *
     * @param el The element.
     * @param margin The margin.
     *
     * @return {number} The outter height.
     */
    public getOuterHeight(el, margin?)
    {
        let height = el.offsetHeight;

        if (margin)
        {
            let style = getComputedStyle(el);
            height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        }

        return height;
    }

    /**
     * @summary Gets the height of the element.
     *
     * @param el The element.
     *
     * @return {number} The height of the element.
     */
    public getHeight(el): number
    {
        let height = el.offsetHeight;
        let style  = getComputedStyle(el);

        height -=
            parseInt(style.paddingTop, 10) +
            parseInt(style.paddingBottom, 10) +
            parseInt(style.borderTopWidth, 10) +
            parseInt(style.borderBottomWidth, 10);

        return height;
    }

    /**
     * @summary Gets the width of the element.
     *
     * @param el The element.
     *
     * @return {number} The width of the element.
     */
    public getWidth(el): number
    {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width -= parseInt(
            style.paddingLeft, 10) +
            parseInt(style.paddingRight, 10) +
            parseInt(style.borderLeftWidth, 10) +
            parseInt(style.borderRightWidth, 10);

        return width;
    }

    /**
     * @summary Gets the client viewport
     *
     * @return {{width: (number|any), height: (number|any)}} The element viewport.
     */
    public getViewport(): any
    {
        let win = window,
            d   = document,
            e   = d.documentElement,
            g   = d.getElementsByTagName('body')[0],
            w   = win.innerWidth || e.clientWidth || g.clientWidth,
            h   = win.innerHeight || e.clientHeight || g.clientHeight;

        return {width: w, height: h};
    }

    /**
     * @summary Gets wether two objects are equal.
     *
     * @param obj1 The first object to be compared.
     * @param obj2 The second obejct to be compared.
     *
     * @return {boolean} True if the objects are equal, otherwise, false.
     */
    public equals(obj1: any, obj2: any): boolean
    {
        if (obj1 === null && obj2 === null)
            return true;

        if (obj1 === null || obj2 === null)
            return false;

        if (obj1 === obj2)
        {
            delete obj1._$visited;
            return true;
        }

        if (typeof obj1 === 'object' && typeof obj2 === 'object')
        {
            obj1._$visited = true;
            for (let p in obj1)
            {
                if (p === '_$visited')
                    continue;

                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p))
                    return false;

                switch (typeof (obj1[p]))
                {
                    case 'object':
                        if (obj1[p] && obj1[p]._$visited || !this.equals(obj1[p], obj2[p]))
                            return false;
                        break;

                    case 'function':
                        if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString()))
                            return false;
                        break;

                    default:
                        if (obj1[p] !== obj2[p])
                            return false;
                        break;
                }
            }

            for (let p in obj2)
                if (typeof (obj1[p]) === 'undefined')
                    return false;

            delete obj1._$visited;

            return true;
        }

        return false;
    }

    /**
     * @summary Gets the user agent.
     *
     * @return {string} The user agent.
     */
    public getUserAgent(): string
    {
        return navigator.userAgent;
    }

    /**
     * @summary Gets whether the browser is internet explorer.
     *
     * @return {boolean} True if the browser is internet explorer, otherwise, false.
     */
    public isIE()
    {
        let ua = window.navigator.userAgent;

        let msie = ua.indexOf('MSIE ');
        if (msie > 0)
            return true;

        let trident = ua.indexOf('Trident/');
        if (trident > 0)
        {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return true;
        }

        let edge = ua.indexOf('Edge/');

        if (edge > 0)
        {
            // Edge (IE 12+) => return version number
            return true;
        }

        // other browser
        return false;
    }
}
