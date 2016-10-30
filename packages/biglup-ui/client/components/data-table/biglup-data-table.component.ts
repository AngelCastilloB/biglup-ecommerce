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
         Output,
         ChangeDetectorRef,
         EventEmitter,
         OnInit }                   from '@angular/core';
import { BiglupInputComponent }     from '../input/biglup-input.component';
import { I18nSingletonService, _T } from 'meteor/biglup:i18n';

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
    private _data:               any[];
    @Input('dataStream')
    private _dataStream:         any;
    @Input('columns')
    private _columns:             DataTableColumn[];
    private _visibleData:         any[];
    @Input('rowSelection')
    private _rowSelection:        boolean = true;
    @Input('multipleSelection')
    private _multiple:            boolean = true;
    @Output('delete')
    private _delete:              any     = new EventEmitter();
    @Output('edit')
    private _edit:                any     = new EventEmitter();
    private _hasData:             boolean = false;
    private _initialized:         boolean = false;
    private _locale:              string  = '';

    // pagination
    private _pageSize:    number  = 10;
    private _currentPage: number  = 0;
    private _totalPages:  number  = 0;
    private _pagination:  boolean = true;

    // sorting
    private _sortBy:    DataTableColumn;
    private _sortOrder: DataTableSortingOrder = DataTableSortingOrder.Ascending;

    // search by term
    private _searchTerm: string = '';

    @ViewChild(BiglupInputComponent)
    private _searchTermInput: BiglupInputComponent;

    // template hack
    private DataTableSortingOrder = DataTableSortingOrder;

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
        if (this._dataStream)
        {
            this._dataStream.subscribe((data) =>
            {
                this._data = data;
                this._preprocessData();
                this._initialized = true;
                this.filterData();
            });
        }
        else
        {
            this._preprocessData();
            this._initialized = true;
            this.filterData();
        }
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._searchTermInput.observeValueChanges()
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((value) => this._searchTermChanged(value));
    }

    /**
     * @summary Event handler for when the delete button is pressed.
     */
    private _onDelete()
    {
        let selected: any = this._visibleData.filter((row: any) => row._dataTableSelected);

        if (this._delete && selected)
            this._delete.emit(selected);
    }

    /**
     * @summary Event handler for when the edit button is pressed.
     */
    private _onEdit()
    {
        let selected: any = this._visibleData.find((row: any) => row._dataTableSelected);

        if (this._edit && selected)
            this._edit.emit(selected);
    }

    /**
     * @summary Gets the number of selected items.
     *
     * @return {number} The number of selected items.
     */
    private _getSelectedCount(): number
    {
        let count: number = 0;

        this._visibleData.forEach((row: any) => row._dataTableSelected ? ++count : '');

        return count;
    }

    /**
     * @summary Gets whther all the fields are selected/
     *
     * @return {boolean} true if all the fields are selected, otherwise, false.
     */
    private _areAllSelected(): boolean
    {
        if (!this._visibleData || this._visibleData.length === 0)
            return false;

        const match: string = this._visibleData.find((row: any) => !row._dataTableSelected);

        return typeof match === 'undefined';
    }

    /**
     * @summary Toggles all the elements on the table.
     */
    private _toggleAll(checked): void
    {
        this._visibleData.forEach((row: any) => row._dataTableSelected = checked);
    }

    /**
     * @summary Sets the sort order.
     */
    private _setSortOrder()
    {
        if (this._sortOrder === DataTableSortingOrder.Ascending)
        {
            this._sortOrder = DataTableSortingOrder.Descending;
        }
        else
        {
            this._sortOrder = DataTableSortingOrder.Ascending;
        }

        this.filterData();
    }

    /**
     * @summary Sets the column to be used to sort the data.
     *
     * @param column The sorting column.
     * @private
     */
    private _setSortColumn(column: DataTableColumn)
    {
        if (this._sortBy === column)
        {
            this._setSortOrder();
            return;
        }

        this._sortBy = column;

        this.filterData();
    }

    /**
     * @summary Event handler for when the search term changes.
     *
     * @param value The search term.
     */
    private _searchTermChanged(value: string): void
    {
        this._searchTerm = value;
        this._visibleData.forEach((row: any) => row._dataTableSelected = false);
        this._resetPagination();
    }

    /**
     * @summary Resets the pagination.
     */
    private _resetPagination(): void
    {
        this._currentPage = 0;
        this._totalPages  = 0;

        this.filterData();
    }

    /**
     * @summary advance to the next page of the table.
     */
    private _nextPage(): void
    {
        if (this._currentPage < (this._totalPages - 1))
        {
            ++this._currentPage;
            this.filterData();
        }
    }

    /**
     * @summary Goes back one page on the table.
     */
    private _prevPage(): void
    {
        this._currentPage = Math.max(this._currentPage - 1, 0);
        this.filterData();
    }

    /**
     * @summary Applies the given filters to each data field (if any).
     */
    private _preprocessData(): void
    {
        this._data = this._data.map((row: any) =>
        {
            row._dataTableSelected = false;

            this._columns.filter((c: any) => c.format).forEach((c: any) => row[c.name] = c.format(row[c.name]));

            return row;
        });
    }

    /**
     * @summary Sets the page size.
     *
     * @param size The number of elements to be displayed on the page.
     * @private
     */
    private _setPageSize(size: string | number)
    {
        let parsedSize: number = 0;
        if (typeof size === 'string')
        {
            parsedSize = parseInt(size, 10);
        }
        else
        {
            parsedSize = size;
        }

        if (this._pageSize === parsedSize)
            return;

        this._pageSize = parsedSize;

        this._resetPagination();
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

        if (this._sortBy)
        {
            this._visibleData = _.sortBy(this._visibleData, this._sortBy.name);

            if (this._sortOrder === DataTableSortingOrder.Descending)
                this._visibleData = _.reverse(this._visibleData);
        }

        if (this._pagination)
        {
            const pageStart: number = (this._currentPage) * this._pageSize;
            const pageEnd: number = Math.min(pageStart + this._pageSize, this._visibleData.length);

            this._totalPages = Math.ceil(this._visibleData.length / this._pageSize);
            this._visibleData = this._visibleData.slice(pageStart, pageEnd);
        }

        this._hasData = this._visibleData.length > 0;

        this._changeDetector.detectChanges();
    }

    /**
     * @summary Gets the search string translations.
     *
     * @return {string} The translated string.
     */
    private _getSearchString(): string
    {
        let currentLocale: string = I18nSingletonService.getInstance().getLocale();

        if (currentLocale !== this._locale)
        {
            this._locale = currentLocale;
            this._value  = _T('Search...');
        }

        return !this._value ? message : this._value;
    }
}
