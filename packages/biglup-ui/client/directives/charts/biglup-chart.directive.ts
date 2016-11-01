/**
 * @file biglup-chart.component.ts
 *
 * @summary Animated chart component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 01 2016
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

import { OnDestroy,
         OnInit,
         OnChanges,
         EventEmitter,
         ElementRef,
         Input,
         Output,
         SimpleChanges,
         Directive} from '@angular/core';

let Chart: any = require('chart.js');

// STRUCTURES *********************************************************************************************************/

/**
 * @summary Chart color structure.
 */
export interface Color
{
    backgroundColor?:           string | string[];
    borderWidth?:               number | number[];
    borderColor?:               string | string[];
    borderCapStyle?:            string;
    borderDash?:                number[];
    borderDashOffset?:          number;
    borderJoinStyle?:           string;
    pointBorderColor?:          string | string[];
    pointBackgroundColor?:      string | string[];
    pointBorderWidth?:          number | number[];
    pointRadius?:               number | number[];
    pointHoverRadius?:          number | number[];
    pointHitRadius?:            number | number[];
    pointHoverBackgroundColor?: string | string[];
    pointHoverBorderColor?:     string | string[];
    pointHoverBorderWidth?:     number | number[];
    pointStyle?:                string | string[];
    hoverBackgroundColor?:      string | string[];
    hoverBorderColor?:          string | string[];
    hoverBorderWidth?:          number;
}

/**
 * @summary Chart color structure donuts.
 */
export interface Colors extends Color
{
    data?:  number[];
    label?: string;
}

// EXPORTS ************************************************************************************************************/

/**
 * @summary This directive converts any canvas in a dynamic chart.
 */
@Directive({
    selector: 'canvas[biglupChart]',
    exportAs: 'biglup-chart'
})
export class BiglupChartDirective implements OnDestroy, OnChanges, OnInit
{
    public static defaultColors: Array<number[]> = [
        [255, 99,  132],
        [54,  162, 235],
        [255, 206, 86],
        [231, 233, 237],
        [75,  192, 192],
        [151, 187, 205],
        [220, 220, 220],
        [247, 70,  74],
        [70,  191, 189],
        [253, 180, 92],
        [148, 159, 177],
        [77,  83,  96]
    ];

    @Input()
    public data: number[] | Array<number[]>;
    @Input()
    public datasets: any[];
    @Input()
    public labels: Array<any> = [];
    @Input()
    public options: any = {};
    @Input()
    public chartType: string;
    @Input()
    public colors: Array<any>;
    @Input()
    public legend: boolean;
    @Output()
    public chartClick: EventEmitter<any> = new EventEmitter();
    @Output()
    public  chartHover: EventEmitter<any> = new EventEmitter();
    public  ctx:      any;
    public  chart:    any;
    private _cvs:      any;
    private _isInitialized: boolean = false;

    /**
     * @summary Initializes a new instance of the constructor class.
     * @param _element           The element this attribute will enhance.
     */
    public constructor(private _element: ElementRef)
    {
    }

    /**
     * @summary Initialize the component after Angular initializes the data-bound input properties.
     */
    public ngOnInit(): any
    {
        this.ctx = this._element.nativeElement.getContext('2d');
        this._cvs = this._element.nativeElement;
        this._isInitialized = true;

        if (this.data || this.datasets)
            this.refresh();
    }

    /**
     * @summary Called when any data-bound property of a directive changes.
     *
     * @param changes The directive changes.
     */
    public ngOnChanges(changes: SimpleChanges): any
    {
        if (this._isInitialized)
        {
            // Check if the changes are in the data or datasets
            if (changes.hasOwnProperty('data') || changes.hasOwnProperty('datasets') || changes.hasOwnProperty('labels'))
            {
                this.chart.data.datasets = this.getDatasets();
                this.chart.data.labels = this.labels;
                this.chart.update();
            }
            else
            {
                this.refresh();
            }
        }
    }

    /**
     * @summary Cleanup that needs to occur when the instance is destroyed.
     */
    public ngOnDestroy(): any
    {
        if (this.chart)
        {
            this.chart.destroy();
            this.chart = null;
        }
    }

    /**
     * @summary Factory method for the chart object.
     *
     * @param ctx The graphic context.
     */
    public create(ctx: any): any
    {
        let datasets: any = this.getDatasets();
        let options:  any = Object.assign({}, this.options);

        if (this.legend === false)
            options.legend = {display: false};

        // hock for onHover and onClick events
        options.hover = options.hover || {};
        if (!options.hover.onHover)
        {
            options.hover.onHover = (active: Array<any>) =>
            {
                if (active && !active.length)
                    return;

                this.chartHover.emit({active});
            };
        }

        if (!options.onClick)
            options.onClick = (event: any, active: Array<any>) => this.chartClick.emit({event, active});

        let opts = {
            type: this.chartType,
            data: { labels: this.labels, datasets },
            options
        };

        return new Chart(ctx, opts);
    }

    /**
     * @summary Gets the chart dataset.
     *
     * @return {any} The data set.
     */
    private getDatasets(): any
    {
        let datasets: any = void 0;

        // in case if datasets is not provided, but data is present
        if (!this.datasets || !this.datasets.length && (this.data && this.data.length))
        {
            if (Array.isArray(this.data[0]))
            {
                datasets = this.data.map((data: number[], index: number) => {
                    return { data, label: this.labels[index] || `Label ${index}`};
                });
            }
            else
            {
                datasets = [{data: this.data, label: `Label 0`}];
            }
        }

        if (this.datasets &&
            this.datasets.length ||
            (datasets && datasets.length))
        {
            datasets = (this.datasets || datasets).map((elm: number, index: number) =>
            {
                    let newElm: any = Object.assign({}, elm);

                    if (this.colors && this.colors.length)
                    {
                        Object.assign(newElm, this.colors[index]);
                    }
                    else
                    {
                        Object.assign(newElm, getColors(this.chartType, index, newElm.data.length));
                    }

                    return newElm;
                });
        }

        if (!datasets)
            throw new Error(`Biglup chat error, Data or datasets field are required to render char ${this.chartType}`);

        return datasets;
    }

    /**
     * @summary Refresh the chart.
     */
    private refresh(): any
    {
        this.ngOnDestroy();
        this.chart = this.create(this.ctx);
    }
}

// INNER FUNCTIONS ****************************************************************************************************/

function rgba(colour:Array<number>, alpha:number):string {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

function getRandomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatLineColor(colors:Array<number>):Color {
    return {
        backgroundColor: rgba(colors, 0.4),
        borderColor: rgba(colors, 1),
        pointBackgroundColor: rgba(colors, 1),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: rgba(colors, 0.8)
    };
}

function formatBarColor(colors:Array<number>):Color {
    return {
        backgroundColor: rgba(colors, 0.6),
        borderColor: rgba(colors, 1),
        hoverBackgroundColor: rgba(colors, 0.8),
        hoverBorderColor: rgba(colors, 1)
    };
}

function formatPieColors(colors:Array<number[]>):Colors {
    return {
        backgroundColor: colors.map((color:number[]) => rgba(color, 0.6)),
        borderColor: colors.map(() => '#fff'),
        pointBackgroundColor: colors.map((color:number[]) => rgba(color, 1)),
        pointBorderColor: colors.map(() => '#fff'),
        pointHoverBackgroundColor: colors.map((color:number[]) => rgba(color, 1)),
        pointHoverBorderColor: colors.map((color:number[]) => rgba(color, 1))
    };
}

function formatPolarAreaColors(colors:Array<number[]>):Color {
    return {
        backgroundColor: colors.map((color:number[]) => rgba(color, 0.6)),
        borderColor: colors.map((color:number[]) => rgba(color, 1)),
        hoverBackgroundColor: colors.map((color:number[]) => rgba(color, 0.8)),
        hoverBorderColor: colors.map((color:number[]) => rgba(color, 1))
    };
}

function getRandomColor():number[] {
    return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

/**
 * Generate colors for line|bar charts
 * @param index
 * @returns {number[]|Color}
 */
function generateColor(index:number):number[] {
    return BiglupChartDirective.defaultColors[index] || getRandomColor();
}

/**
 * Generate colors for pie|doughnut charts
 * @param count
 * @returns {Colors}
 */
function generateColors(count:number):Array<number[]> {
    let colorsArr:Array<number[]> = new Array(count);
    for (let i = 0; i < count; i++) {
        colorsArr[i] = BiglupChartDirective.defaultColors[i] || getRandomColor();
    }
    return colorsArr;
}

/**
 * Generate colors by chart type
 * @param chartType
 * @param index
 * @param count
 * @returns {Color}
 */
function getColors(chartType:string, index:number, count:number):Color {
    if (chartType === 'pie' || chartType === 'doughnut') {
        return formatPieColors(generateColors(count));
    }

    if (chartType === 'polarArea') {
        return formatPolarAreaColors(generateColors(count));
    }

    if (chartType === 'line' || chartType === 'radar') {
        return formatLineColor(generateColor(index));
    }

    if (chartType === 'bar' || chartType === 'horizontalBar') {
        return formatBarColor(generateColor(index));
    }
    return generateColor(index);
}