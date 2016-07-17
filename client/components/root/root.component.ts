/**
 * @file application
 *
 * @summary Client application entry point.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 16 2016
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

import 'reflect-metadata';
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HeaderComponent } from '../header/header.component'
import { ImagesUploader } from '../images-uploader/images-uploader.component'

import template from './root.component.html';

// IMPLEMENTATION *****************************************************************************************************/

/**
 * @summary This the application root component.
 */
@Component({
    selector: 'root',
    template,
    directives: [HeaderComponent, ImagesUploader]
})
class Application {

    /**
     * @summary Initializes a new instance of the Application class.
     */
    constructor()
    {
    }
}

bootstrap(Application);