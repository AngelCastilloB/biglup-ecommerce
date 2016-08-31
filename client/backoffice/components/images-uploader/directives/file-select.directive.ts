/**
 * @file file-select.directive.ts
 *
 * @summary File select directive implementation.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 30 2016
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

import {Directive, ElementRef, EventEmitter} from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Directive that prompt the user to select one or more files and then emmits an event
 * with all the selected files.
 */
@Directive({
    selector: '[file-select]',
    outputs: ['onSelected'],
    host: { '(change)': 'onFilesSelected()' }
})
export class FileSelectDirective
{
    public onSelected: EventEmitter<FileList> = new EventEmitter<FileList>();

    /**
     * @summary Initializes a new instance of the FileSelectDirective class.
     *
     * @param el The parent element.
     */
    constructor(public el: ElementRef)
    {
    }

    /**
     * @summary Event handler for the 'change' event on the parent element.
     */
    private onFilesSelected(): void
    {
        let files: FileList = this.el.nativeElement.files;

        if (files.length) {
            this.onSelected.emit(files);
        }
    }
}
