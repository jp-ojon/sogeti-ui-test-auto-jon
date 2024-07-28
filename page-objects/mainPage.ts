import { Locator, Page } from "@playwright/test"

export class MainPage {
    page: Page
    readonly acceptCookieButton: Locator
    readonly mainMenu: Locator
    readonly servicesDropdownList: Locator
    readonly servicesDropdownListAutomationLink: Locator
    readonly dropdownListSelected: Locator
    readonly countryNavigationDropDownList: Locator
    readonly countryList: Locator

    verifyBoolean: Boolean

    constructor(page: Page) {
        this.page = page
        this.acceptCookieButton = this.page.locator('button.acceptCookie')
        this.mainMenu = this.page.locator('#main-menu.main-menu-desktop')
        this.servicesDropdownList = this.mainMenu.locator('//li[contains(@class, "has-children") and contains(@class, "focus-style")]/div[@class="wrapper"]/span[text()="Services"]')
        this.servicesDropdownListAutomationLink = this.mainMenu.locator('a.subMenuLink[href*="automation"]')
        this.dropdownListSelected = this.page.locator('//li[contains(@class, "selected has-children") and contains(@class, "focus-style")]/div[@class="wrapper"]')

        this.countryNavigationDropDownList = this.page.locator('.navbar-global')
        this.countryList = this.page.locator('#country-list-id ul')
    }

    /**
     * This method clicks the Accept Cookie Button that appears during initial opening of the main page
     */
    async clickAcceptCookieButton() {
        try {
            await this.acceptCookieButton.waitFor({ state: 'visible', timeout: 10000 }) //timeout to wait if alert dialog appears
            this.verifyBoolean = true
        } catch (e) {
            console.error('Accept Cookie button did not appear', e)
        }

        if (this.verifyBoolean) {
            await this.acceptCookieButton.click()
            await this.page.waitForLoadState('load')
        }
    }

    /**
     * This method hovers over the Services Dropdown List on the main page menu
     */
    async hoverServicesDropdownList() {
        await this.servicesDropdownList.hover()
    }

    /**
     * This method waits for Services Dropdown List "Automation" Link to be visible and clicks on it
     */
    async clickServicesDropdownListAutomationLink() {
        await this.servicesDropdownListAutomationLink.waitFor({ state: 'visible' })
        await this.servicesDropdownListAutomationLink.click()
    }

    /**
     * This method clicks on the Country Navigation Drop Down List on the upper right side corner of the header/banner
     */
    async clickCountryNavigationDropDownList() {
        await this.countryNavigationDropDownList.click()
    }

    /**
     * 
     * This method @returns count which is the number of links, and urls of each link. Note: empty or null url is bypassed.
     */
    async getCountryLinksAndCount(): Promise<{ count: number, urls: string[] }> {
        // Locate the links within the country list
        const links = this.countryList.locator('a')

        // Count the number of links
        const count = await links.count()
        let urls: string[] = [];

        for (let i = 0; i < count; i++) {
            const link = links.nth(i)
            const url = await link.getAttribute('href') //href attribute contains the hyperlink
            if (url){
                urls.push(url);
            } 
        }

        // Return both the urls and the count
        return {
            count,
            urls
        }
    }
}