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
         AfterViewInit,
         ViewChild,
         Input,
         ChangeDetectorRef,
         OnInit }               from '@angular/core';
import { BiglupInputComponent } from '../input/biglup-input.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-data-table.component.html';

// RxJs Operators imports.
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

// Vendor Imports
import * as _ from 'lodash';

// ENUMS **************************************************************************************************************/

/**
 * @summary The data table sorting order enum.
 */
export enum DataTableSortingOrder
{
    Ascending,
    Descending
}

// INTERFACES *********************************************************************************************************/

/**
 * @summary The data table column description structure.
 */
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
export class BiglupDataTableComponent implements AfterViewInit, OnInit
{
    @Input('data')
    private _data: any[];
    @Input('columns')
    private _columns:      DataTableColumn[];
    private _visibleData:  any[];
    private _rowSelection: boolean = true;
    private _multiple:     boolean = true;
    private _search:       boolean = false;
    private _hasData:      boolean = false;
    private _initialized:  boolean = false;

    // pagination
    private _pageSize: number    = 10;
    private _currentPage: number = 0;
    private _totalPages: number  = 0;
    private _pagination: boolean = false;

    // sorting
    private _sorting: boolean = false;
    private _sortBy: DataTableColumn;
    private _sortOrder: DataTableSortingOrder = DataTableSortingOrder.Ascending;

    // search by term
    private _searchTerm: string = '';

    @ViewChild(BiglupInputComponent)
    private _searchTermInput: BiglupInputComponent;

    /**
     * @summary Initializes a new instance of the BiglupDataTableComponent class.
     */
    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): void
    {
        this.preprocessData();
        this._initialized = true;
        this.filterData();

        this._searchTermInput.observeValueChanges()
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((value) => this.searchTermChanged(value));
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
    }

    /**
     * @summary Event handler for when the search term changes.
     *
     * @param value The search term.
     */
    private searchTermChanged(value: string): void
    {
        this._searchTerm = value;
        this.resetPagination();
    }

    /**
     * @summary Resets the pagination.
     */
    private resetPagination(): void
    {
        this._currentPage = 1;
        this._totalPages  = 0;

        this.filterData();
    }

    /**
     * @summary Applies the given filters to each data field (if any).
     */
    private preprocessData(): void
    {
        this._data = this._data.map((row: any) =>
        {
            this._columns.filter((c: any) => c.format).forEach((c: any) => row[c.name] = c.format(row[c.name]));

            return row;
        });
    }

    /**
     * @summary Filters the data given the search term and the pagination.
     */
    private filterData(): void
    {
        this._visibleData = this._data;

        if (!this._initialized)
            return;

        let filter: string = this._searchTerm.toLowerCase();

        if (filter)
        {
            this._visibleData = this._visibleData.filter((item: any) =>
            {
                const res: any = Object.keys(item).find((key: string) =>
                {
                    const itemValue: string = ('' + item[key]).toLowerCase();
                    return itemValue.indexOf(filter) > -1;
                });

                return !(typeof res === 'undefined');
            });
        }

        if (this._sorting && this._sortBy)
        {
            this._visibleData = _.sortBy(this._visibleData, this._sortBy.name);

            if (this._sortOrder === DataTableSortingOrder.Descending)
                this._visibleData = _.reverse(this._visibleData);
        }

        if (this._pagination)
        {
            const pageStart: number = (this._currentPage - 1) * this._pageSize;
            const pageEnd: number = Math.min(pageStart + this._pageSize, this._visibleData.length);

            this._totalPages = Math.ceil(this._visibleData.length / this._pageSize);
            this._visibleData = this._visibleData.slice(pageStart, pageEnd);
        }

        this._hasData = this._visibleData.length > 0;

        this._changeDetector.detectChanges();
    }
}
