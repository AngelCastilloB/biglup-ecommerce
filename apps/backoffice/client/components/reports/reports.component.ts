/**
 * @file reports.component.ts
 *
 * @summary The analytics report panel.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 22 2016
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

import { Component, ViewChild, AfterViewInit }                    from '@angular/core';
import { InputFilters, BiglupInputComponent, BiglupToastService } from 'meteor/biglup:ui';
import { DataTableColumn }                                        from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './reports.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component allows you to add products to the site.
 */
@Component({
    selector: 'reports',
    template
})
export class ReportsComponent extends AfterViewInit {
    @ViewChild('validate')
    private _onlyNumericInput: BiglupInputComponent;
    @ViewChild('validate2')
    private _onlyNumericInputFloat: BiglupInputComponent;
    @ViewChild('email')
    private _emailInput: BiglupInputComponent;
    private InputFilters: InputFilters  = InputFilters;
    private _radioGroupValue: string    = '';
    private _dataTableColums: any       = {};
    private _dataTableData: any         = {};
    private _dropdownOneValue: string   = '';
    private _dropdownTwoValue: string   = '';
    private _dropdownThreeValue: string = '';
    private _color1: string             = '#2fd534';
    private _color2: string             = '#bdc127';
    private _color3: string             = '#127bdc';
    private _toggle1: boolean           = true;
    private _toggle2: boolean           = false;

    // Charts

    // Bars
    private _barChartOptions: any     = {
        _scaleShowVerticalLines: false,
        _responsive: true
    };
    private _barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    private _barChartType: string     = 'bar';
    private _barChartLegend: boolean  = true;

    private _barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // Lines
    private _lineChartData: Array<any>   = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    private _lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    private _lineChartOptions: any       = {
        animation: false,
        responsive: true
    };
    private _lineChartLegend: boolean    = true;
    private _lineChartType: string       = 'line';

    // doughnut
    private _doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    private _doughnutChartData: number[]   = [350, 450, 100];
    private _doughnutChartType: string     = 'doughnut';

    // Radar
    private _radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

    private _radarChartData: any    = [
        {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    private _radarChartType: string = 'radar';

    // Pie
    private _pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    private _pieChartData: number[]   = [300, 500, 100];
    private _pieChartType: string     = 'pie';

    // PolarArea
    private _polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    private _polarAreaChartData: number[]   = [300, 500, 100, 40, 120];
    private _polarAreaLegend: boolean       = true;
    private _polarAreaChartType: string     = 'polarArea';

    /**
     * @summary Initializes a new instance of the LandingPageComponent class.
     */
    constructor(private _toastService: BiglupToastService) {
        super();
        this._dataTableColums = [
            {name: 'dessert', label: 'Desert(100g serving)'},
            {name: 'type', label: 'Type'},
            {name: 'calories', label: 'Calories', numeric: true},
            {name: 'fat', label: 'Fat(g)', numeric: true},
            {name: 'carbs', label: 'Carbs(g)', numeric: true},
            {name: 'protein', label: 'Proteing(g)', numeric: true},
            {name: 'sodium', label: 'Sodium(mg)', numeric: true},
            {name: 'calcium', label: 'Calcium(%)', numeric: true},
            {name: 'iron', label: 'Iron(%)', numeric: true}
        ];

        let yogurt         = {};
        yogurt['dessert']  = 'Frozen yogurt';
        yogurt['type']     = 'Ice cream';
        yogurt['calories'] = '159';
        yogurt['fat']      = '6.00';
        yogurt['carbs']    = '24';
        yogurt['protein']  = '4.00';
        yogurt['sodium']   = '87';
        yogurt['calcium']  = '14';
        yogurt['iron']     = '1';

        let eclair         = {};
        eclair['dessert']  = 'Eclair';
        eclair['type']     = 'Pastry';
        eclair['calories'] = '262';
        eclair['fat']      = '16.00';
        eclair['carbs']    = '24';
        eclair['protein']  = '6.00';
        eclair['sodium']   = '337';
        eclair['calcium']  = '6';
        eclair['iron']     = '7';

        let iceCreamSandwich         = {};
        iceCreamSandwich['dessert']  = 'Ice cream sandwich';
        iceCreamSandwich['type']     = 'Ice cream';
        iceCreamSandwich['calories'] = '237';
        iceCreamSandwich['fat']      = '9.00';
        iceCreamSandwich['carbs']    = '37';
        iceCreamSandwich['protein']  = '4.30';
        iceCreamSandwich['sodium']   = '129';
        iceCreamSandwich['calcium']  = '8';
        iceCreamSandwich['iron']     = '1';

        let donut         = {};
        donut['dessert']  = 'Donut';
        donut['type']     = 'Pastry';
        donut['calories'] = '452';
        donut['fat']      = '25.00';
        donut['carbs']    = '51';
        donut['protein']  = '4.90';
        donut['sodium']   = '326';
        donut['calcium']  = '2';
        donut['iron']     = '22';

        let kitKat         = {};
        kitKat['dessert']  = 'KitKat';
        kitKat['type']     = 'Candy';
        kitKat['calories'] = '518';
        kitKat['fat']      = '26.00';
        kitKat['carbs']    = '65';
        kitKat['protein']  = '7.00';
        kitKat['sodium']   = '54';
        kitKat['calcium']  = '12';
        kitKat['iron']     = '6';

        let cupcake         = {};
        cupcake['dessert']  = 'Pastry';
        cupcake['type']     = 'Cupcake';
        cupcake['calories'] = '305';
        cupcake['fat']      = '3.70';
        cupcake['carbs']    = '67';
        cupcake['protein']  = '4.3';
        cupcake['sodium']   = '413';
        cupcake['calcium']  = '3';
        cupcake['iron']     = '8';

        let honeycomb         = {};
        honeycomb['dessert']  = 'Honeycomb';
        honeycomb['type']     = 'Other';
        honeycomb['calories'] = '408';
        honeycomb['fat']      = '3.20';
        honeycomb['carbs']    = '87';
        honeycomb['protein']  = '6.50';
        honeycomb['sodium']   = '562';
        honeycomb['calcium']  = '0';
        honeycomb['iron']     = '45';

        let jellyBean         = {};
        jellyBean['dessert']  = 'Jelly Bean';
        jellyBean['type']     = 'Candy';
        jellyBean['calories'] = '375';
        jellyBean['fat']      = '0.00';
        jellyBean['carbs']    = '94';
        jellyBean['protein']  = '0.00';
        jellyBean['sodium']   = '50';
        jellyBean['calcium']  = '0';
        jellyBean['iron']     = '0';

        let lollipop         = {};
        lollipop['dessert']  = 'Lollipop';
        lollipop['type']     = 'Candy';
        lollipop['calories'] = '392';
        lollipop['fat']      = '0.20';
        lollipop['carbs']    = '98';
        lollipop['protein']  = '0.00';
        lollipop['sodium']   = '38';
        lollipop['calcium']  = '0';
        lollipop['iron']     = '2';

        this._dataTableData = [
            yogurt, eclair, iceCreamSandwich, donut, kitKat, cupcake, honeycomb, jellyBean, lollipop
        ];
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any {
        this._onlyNumericInput.observeValueChanges().subscribe((value) => {
            if (!value) {
                this._onlyNumericInput.setInvalid(false);
                return;
            }

            if (!this._isNumber(value))
                this._onlyNumericInput.setInvalid(true);
            else
                this._onlyNumericInput.setInvalid(false);
        });

        this._onlyNumericInputFloat.observeValueChanges().subscribe((value) => {
            if (!value) {
                this._onlyNumericInputFloat.setInvalid(false);
                return;
            }

            if (!this._isAlphabet(value))
                this._onlyNumericInputFloat.setInvalid(true);
            else
                this._onlyNumericInputFloat.setInvalid(false);
        });

        this._emailInput.observeValue().subscribe((value) => {
            if (!value) {
                this._emailInput.setInvalid(false);
                return;
            }

            if (!this._isEmail(value))
                this._emailInput.setInvalid(true);
            else
                this._emailInput.setInvalid(false);
        });
    }

    /**
     * @summary Gets whether the given value is a number of not.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a number, otherwise, false.
     */
    private _isNumber(value: any) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * @summary Gets whether the given value contains only alphabet characters.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a alphabet, otherwise, false.
     */
    private _isAlphabet(value: any) {
        return /^[a-zA-Z]+$/.test(value);
    }

    /**
     * @summary Gets whether the given value is a valid email.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a valid email, otherwise, false.
     */
    private _isEmail(value: any) {
        return /^[^@]+@[^@]+$/.test(value);
    }

    /**
     * @summary logs incoming data from event handlers.
     * @param data The data to be logged.
     */
    private _logEvent(data) {
        console.log(data);
    }

    /**
     * @summary Display a toast using the toast service.
     *
     * @param message The message to be displayed.
     * @param dismissable True if the toast can be dismissed, otherwise, false.
     */
    private _displayToast(message: string, dissmisable) {
        this._toastService.displayToast(message, dissmisable);
    }
}