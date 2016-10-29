/**
 * @file lading-page.component.ts
 *
 * @summary Tha landing page of the ecommerce site.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   July 18 2016
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

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InputFilters, BiglupInputComponent }  from 'meteor/biglup:ui';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './landing-page.component.html';
import { DataTableColumn } from 'meteor/biglup:ui';

// EXPORTS ************************************************************************************************************/

/**
 * @summary This component displays the landing page of the site
 */
@Component({
    selector: 'landing-page',
    template,
    styles: [`
        .app-content 
        {
            padding: 20px;
        }
        .app-content md-card 
        {
            margin: 20px;
        }`
    ]
})
export class LandingPageComponent extends AfterViewInit
{
    @ViewChild('validate')
    private _onlyNumericInput: BiglupInputComponent;
    @ViewChild('validate2')
    private _onlyNumericInputFloat: BiglupInputComponent;
    @ViewChild('email')
    private _emailInput: BiglupInputComponent;
    private InputFilters:           InputFilters = InputFilters;
    private _radioGroupValue: string = '';
    private _dataTableColums: any = {};
    private _dataTableData: any = {};
    private _dropdownOneValue: string = '';
    private _dropdownTwoValue: string = '';
    private _dropdownThreeValue: string = '';

    /**
     * @summary Initializes a new instance of the LandingPageComponent class.
     */
    constructor()
    {
        super();
        this._dataTableColums = [
            { name: 'dessert', label: 'Desert(100g serving)'},
            { name: 'type', label: 'Type' },
            { name: 'calories', label: 'Calories' },
            { name: 'fat',  label: 'Fat(g)' },
            { name: 'carbs',  label: 'Carbs(g)'},
            { name: 'protein', label: 'Proteing(g)' },
            { name: 'sodium', label: 'Sodium(mg)'},
            { name: 'calcium', label: 'Calcium(%)'},
            { name: 'iron', label: 'Iron(%)' }
        ];

        let yogurt = {};
        yogurt['dessert'] = 'Frozen yogurt';
        yogurt['type'] = 'Ice cream';
        yogurt['calories'] = '159';
        yogurt['fat'] = '6.00';
        yogurt['carbs'] = '24';
        yogurt['protein'] = '4.00';
        yogurt['sodium'] = '87';
        yogurt['calcium'] = '14';
        yogurt['iron'] = '1';

        let eclair = {};
        eclair['dessert'] = 'Eclair';
        eclair['type'] = 'Pastry';
        eclair['calories'] = '262';
        eclair['fat'] = '16.00';
        eclair['carbs'] = '24';
        eclair['protein'] = '6.00';
        eclair['sodium'] = '337';
        eclair['calcium'] = '6';
        eclair['iron'] = '7';

        let iceCreamSandwich = {};
        iceCreamSandwich['dessert'] = 'Ice cream sandwich';
        iceCreamSandwich['type'] = 'Ice cream';
        iceCreamSandwich['calories'] = '237';
        iceCreamSandwich['fat'] = '9.00';
        iceCreamSandwich['carbs'] = '37';
        iceCreamSandwich['protein'] = '4.30';
        iceCreamSandwich['sodium'] = '129';
        iceCreamSandwich['calcium'] = '8';
        iceCreamSandwich['iron'] = '1';

        let donut = {};
        donut['dessert'] = 'Donut';
        donut['type'] = 'Pastry';
        donut['calories'] = '452';
        donut['fat'] = '25.00';
        donut['carbs'] = '51';
        donut['protein'] = '4.90';
        donut['sodium'] = '326';
        donut['calcium'] = '2';
        donut['iron'] = '22';

        let kitKat = {};
        kitKat['dessert'] = 'KitKat';
        kitKat['type'] = 'Candy';
        kitKat['calories'] = '518';
        kitKat['fat'] = '26.00';
        kitKat['carbs'] = '65';
        kitKat['protein'] = '7.00';
        kitKat['sodium'] = '54';
        kitKat['calcium'] = '12';
        kitKat['iron'] = '6';

        let cupcake = {};
        cupcake['dessert'] = 'Pastry';
        cupcake['type'] = 'Cupcake';
        cupcake['calories'] = '305';
        cupcake['fat'] = '3.70';
        cupcake['carbs'] = '67';
        cupcake['protein'] = '4.3';
        cupcake['sodium'] = '413';
        cupcake['calcium'] = '3';
        cupcake['iron'] = '8';

        let honeycomb = {};
        honeycomb['dessert'] = 'Honeycomb';
        honeycomb['type'] = 'Other';
        honeycomb['calories'] = '408';
        honeycomb['fat'] = '3.20';
        honeycomb['carbs'] = '87';
        honeycomb['protein'] = '6.50';
        honeycomb['sodium'] = '562';
        honeycomb['calcium'] = '0';
        honeycomb['iron'] = '45';

        let jellyBean = {};
        jellyBean['dessert'] = 'Jelly Bean';
        jellyBean['type'] = 'Candy';
        jellyBean['calories'] = '375';
        jellyBean['fat'] = '0.00';
        jellyBean['carbs'] = '94';
        jellyBean['protein'] = '0.00';
        jellyBean['sodium'] = '50';
        jellyBean['calcium'] = '0';
        jellyBean['iron'] = '0';

        let lollipop = {};
        lollipop['dessert'] = 'Lollipop';
        lollipop['type'] = 'Candy';
        lollipop['calories'] = '392';
        lollipop['fat'] = '0.20';
        lollipop['carbs'] = '98';
        lollipop['protein'] = '0.00';
        lollipop['sodium'] = '38';
        lollipop['calcium'] = '0';
        lollipop['iron'] = '2';

        this._dataTableData = [ yogurt, eclair, iceCreamSandwich, donut, kitKat, cupcake, honeycomb, jellyBean, lollipop ];
    }

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterViewInit(): any
    {
        this._onlyNumericInput.observeValueChanges().subscribe((value) =>
        {
            if (!value)
            {
                this._onlyNumericInput.setInvalid(false);
                return;
            }

            if (!this._isNumber(value))
                this._onlyNumericInput.setInvalid(true);
            else
                this._onlyNumericInput.setInvalid(false);
        });

        this._onlyNumericInputFloat.observeValueChanges().subscribe((value) =>
        {
            if (!value)
            {
                this._onlyNumericInputFloat.setInvalid(false);
                return;
            }

            if (!this._isAlphabet(value))
                this._onlyNumericInputFloat.setInvalid(true);
            else
                this._onlyNumericInputFloat.setInvalid(false);
        });

        this._emailInput.observeValue().subscribe((value) =>
        {
            if (!value)
            {
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
    private _isNumber(value: any)
    {
       return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * @summary Gets whether the given value contains only alphabet characters.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a alphabet, otherwise, false.
     */
    private _isAlphabet(value: any)
    {
        return /^[a-zA-Z]+$/.test(value);
    }

    /**
     * @summary Gets whether the given value is a valid email.
     *
     * @param value The value to inspect.
     *
     * @returns {boolean} True if the value is a valid email, otherwise, false.
     */
    private _isEmail(value: any)
    {
        return /^[^@]+@[^@]+$/.test(value);
    }
}
