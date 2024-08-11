import { test, expect } from '@playwright/test'
import { PageObjectsManager } from '../../page-objects/pageObjectsManager'
import axios from 'axios'


test.describe('Sogeti Navigation Tests', () => {

    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to the URL https://www.sogeti.com/
        await page.goto('https://www.sogeti.com/')
    })

    test('Test Case 1: Navigate to Services Automation page', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //Optional Step: Click the Privacy Agree And Continue Button if the Privacy pop-up iframe/window appears
        await pom.mainPageObject().clickAcceptCookieButton()

        //Step 2: Hover over Services Link (see Image below) and then Click Automation link.
        await pom.mainPageObject().hoverServicesDropdownList()
        await pom.mainPageObject().clickServicesDropdownListAutomationLink()

        //Step 3: Verify that Automation Screen is displayed, and “Automation” text is visible in Page.
        await expect(pom.servicesAutomationPageObject().pageHeading).toHaveText('Automation')
        expect(await page.waitForURL('https://www.sogeti.com/services/automation/'))


        //Step 4: Hover again over Services Link. Verify that the Services and Automation are selected (see Image below).
        await pom.servicesAutomationPageObject().hoverServicesDropdownList()
        await expect(pom.servicesAutomationPageObject().servicesDropdownList).toHaveCSS('color', "rgb(255, 48, 76)") //Verify CSS attribute color of text "Services"
        await expect(pom.servicesAutomationPageObject().dropdownListSelected).toHaveText('Services') //Verify if element and its corresponding child elements at least contains a text "Services"
        await expect(pom.servicesAutomationPageObject().servicesDropdownListAutomationLink).toHaveCSS('color', "rgb(255, 48, 76)") //Verify CSS attribute color of text "Automation"
        await expect(pom.servicesAutomationPageObject().servicesDropdownListAutomationLink).toHaveText('Automation') //Verify if element and its corresponding child elements at least contains a text "Automation"
    })

    test('Test Case 3: Assert that all the Country specific Sogeti links are working', async ({ page }) => {
        const pom = new PageObjectsManager(page)

        //Optional Step: Click the Privacy Agree And Continue Button if the Privacy pop-up iframe/window appears
        await pom.mainPageObject().clickAcceptCookieButton()

        //Step 2: Click the Worldwide Dropdown link in Page Header.
        await pom.mainPageObject().clickCountryNavigationDropDownList()

        //Step 3: A Country dropdown list is displayed. These are the Country specific Sogeti links.
        const result = pom.mainPageObject().getCountryLinksAndCount()

        // Step 4: Assert that all the Country specific Sogeti links are working.
        // Iterate over each link and verify it, test would fail if the number of non-null urls/hrefs is not equivalent to the number of links
        for (let i = 0; i < (await result).count; i++) {
            const url = (await result).urls[i]
            //Note: The insecureHTTPParser option forces Axios to use the Node.js HTTP parser, which is less strict than the default one. This option is not recommended, but it's useful when you need to make a request to an API that is not following the HTTP specs. However, it will also open your application to some security vulnerabilities, although the risk should be negligible as these vulnerabilities mainly relate to server applications, not clients.
            const response = axios.get(url, { insecureHTTPParser: true })
            const statusCode = (await response).status;
            // Assert that the HTTP status code is 200 (OK)
            expect(statusCode).toBe(200);
            console.log(url + ' response code: ' + statusCode)
        }
        
    })
})