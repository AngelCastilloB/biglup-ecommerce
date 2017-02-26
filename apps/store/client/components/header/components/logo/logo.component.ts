/**
 * @file logo.component.ts
 *
 * @summary The logo section of the header.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   February 14 2017
 *
 * @copyright Copyright 2014 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// IMPORTS ************************************************************************************************************/

import { Component, OnInit, OnDestroy, Input, ElementRef }      from '@angular/core';
import { AppearancesService, AppearanceHeaderStyle, LogoImage } from 'meteor/biglup:business';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './logo.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This is the logo section of the header.
 */
@Component({
    selector: 'header-logo',
    template
})
export class HeaderLogoComponent implements OnInit, OnDestroy
{
    @Input('headerStyle')
    private _style:         AppearanceHeaderStyle;
    private _subscriptions: Array<any> = [];

    /**
     * @summary Initializes a new instance of the HeaderLogoComponent class.
     */
    constructor(private element: ElementRef, private _appearancesService: AppearancesService)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this.setImage(this._style.logo);

        this._subscriptions.push(this._appearancesService.getLogoUpdate().subscribe(
            (logo) =>
            {
                this._style.logo = logo;
                this.setImage(logo);
            }
        ));
    }

    /**
     * @summary destroys unneeded subscriptions and related resources.
     */
    public ngOnDestroy()
    {
        if (this._subscriptions)
            this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    /**
     * @summary Sets the logo image.
     *
     * @param image The logo image.
     */
    public setImage(image: LogoImage)
    {
        let logoImage = this.element.nativeElement.querySelector('.image-responsive');
        let reader    = new FileReader();

        const { url, file, isUploaded } = image;

        if (isUploaded)
        {
            logoImage.src = url;

            return;
        }

        if (!file)
        {
            throw new Meteor.Error(
                'image-display.component.setImage',
                'The image is marked as *not* uploaded, but the field file is empty.');
        }

        reader.onload = (event: any) =>
        {
            if (event.type === 'load')
            {
                logoImage.src = event.target.result;
            }
            else if (event.type === 'error')
            {
                console.error('Could not read file.');
            }
        };

        reader.readAsDataURL(file);
    }
}
