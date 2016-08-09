/**
 * @file file-drop.directive.ts
 *
 * @summary File Drop directive implementation.
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

import {Directive, ElementRef, EventEmitter} from '@angular/core';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Directive that subscribes to the drop, dragenter and dragover events of the parent element
 * and emmits an event if one or more files are dropped on top of the element.
 */
@Directive({
    selector: '[file-drop]',
    outputs: ['onFileDrop', 'onDropStart', 'onDropEnds']
})
export class FileDropDirective {
    public onFileDrop:  EventEmitter<FileList> = new EventEmitter<FileList>();
    public onDropStart: EventEmitter<any>      = new EventEmitter();
    public onDropEnds:  EventEmitter<any>      = new EventEmitter();

  /**
   * @summary Initializes a new instance of the FileDropDirective class.
   *
   * @param el The parent element.
   */
    constructor(public el: ElementRef) {
        this._subscribeEvents();
    }

      /**
       * @summary Subscribes this directive to the drop, dragenter, dragover, dragleave and dragend
       * events of the parent element.
       */
      private _subscribeEvents(): void {
        this.el.nativeElement.addEventListener('drop', (event: any) => {
            event.stopPropagation();
            event.preventDefault();

            let dataTransfer: DataTransfer = event.dataTransfer;
            let files:        FileList     = dataTransfer.files;

            if (files.length) {
                this.onFileDrop.emit(files);
            }

            this.onDropEnds.emit({});
        }, false);

        this.el.nativeElement.addEventListener('dragenter', (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();

            this.onDropStart.emit({});
        }, false);

        this.el.nativeElement.addEventListener('dragover', (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();

            this.onDropStart.emit({});
        }, false);

          this.el.nativeElement.addEventListener('dragleave', (e: DragEvent) => {
              e.stopPropagation();
              e.preventDefault();

              this.onDropEnds.emit({});
          }, false);

          this.el.nativeElement.addEventListener('dragend', (e: DragEvent) => {
              e.stopPropagation();
              e.preventDefault();

              this.onDropEnds.emit({});
          }, false);
      }
}
