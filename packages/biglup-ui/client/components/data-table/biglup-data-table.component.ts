/**
 * @file biglup-data-table.component.ts
 *
 * @summary Polymer like data-table component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   October 24 2016
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
         Input,
         EventEmitter }               from '@angular/core';
import { BiglupInputComponent } from '../input/biglup-input.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-data-table.component.html';

// ENUMS **************************************************************************************************************/

export enum DataTableSortingOrder
{
    Ascending,
    Descending
}

// INTERFACES *********************************************************************************************************/

export interface DataTableColumn
{
    name: string;
    label: string;
    numeric?: boolean;
    format?: { (value: any): any };
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component is a responsive, sortable and paginated data table.
 */
@Component({
    selector: 'biglup-data-table',
    template
})
export class BiglupDataTableComponent implements AfterViewInit
{
    @Input('data')
    private _data: any[];
    @Input('columns')
    private _columns: DataTableColumn[];
    @Input('rowSelection')
    private _rowSelection: boolean = true;

    /**
     * @summary Initializes a new instance of the BiglupDataTableComponent class.
     */
    constructor()
    {
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }
}
