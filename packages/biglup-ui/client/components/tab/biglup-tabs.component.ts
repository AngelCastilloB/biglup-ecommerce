/**
 * @file biglup-tab.component.ts
 *
 * @summary Tab component.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   November 13 2016
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

import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { BiglupTabComponent }                                      from './tab/biglup-tab.component';

// REMARK: We need to suppress this warning since meteor-static-templates does not define a Default export.
// noinspection TypeScriptCheckImport
import template from './biglup-tabs.component.html';

// EXPORTS ************************************************************************************************************/

/**
 * @summary Tab group component
 */
@Component({
    selector: 'biglup-tabs',
    template
})
export class BiglupTabsComponent implements AfterContentInit
{
    @ContentChildren(BiglupTabComponent)
    private m_tabs: QueryList<BiglupTabComponent>;

    /**
     * @summary Respond after Angular initializes the component's views and child views.
     */
    public ngAfterContentInit()
    {
        let activeTabs = this.m_tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0)
            this.selectTab(this.m_tabs.first);
    }

    /**
     * @summary Select the given tab
     *
     * @param tab The tab to be selected.
     */
    public selectTab(tab: BiglupTabComponent)
    {
        this.m_tabs.toArray().forEach((item) => item.active = false);

        tab.active = true;
    }

}
