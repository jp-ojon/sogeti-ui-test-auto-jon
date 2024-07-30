import { test, expect } from '@playwright/test'
import { PageObjectsManager } from '../../page-objects/pageObjectsManager'
import { RandomGenerator } from '../../utilities/randomGenerator'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.sogeti.com/')
})

test.describe('Sogeti Automation Form', () => {

    test('Test Case 2: Fill out Sogeti Automation Form and submit', async ({ page }) => {
        const pom = new PageObjectsManager(page)
        const random = new RandomGenerator()

        //Optional Step: Click the Privacy Agree And Continue Button if the Privacy pop-up iframe/window appears
        await pom.mainPageObject().clickAcceptCookieButton()

        //Step 2: Hover over Services Link and then Click Automation link. Verify if Automation
        await pom.mainPageObject().hoverServicesDropdownList()
        await pom.mainPageObject().clickServicesDropdownListAutomationLink()

        //Optional verification step: Verify that Automation Screen is displayed, and “Automation” text is visible in Page.
        await expect(pom.servicesAutomationPageObject().pageHeading).toHaveText('Automation')
        expect(await page.waitForURL('https://www.sogeti.com/services/automation/'))


        //Step 3: On Automation Page, scroll down to the Contact us Form.
        await pom.servicesAutomationPageObject().scrollToContactUsHeader()

        //Step 4: Fill the First Name, Last Name, Email, Phone and Message fields with Random Generated Data.
        await pom.servicesAutomationPageObject().fillContactUsInputField("First Name", random.generateRandomData('firstName'))
        await pom.servicesAutomationPageObject().fillContactUsInputField("Last Name", random.generateRandomData('lastName'))
        await pom.servicesAutomationPageObject().fillContactUsInputField("Email", random.generateRandomData('email'))
        await pom.servicesAutomationPageObject().fillContactUsInputField("Phone", random.generateRandomData('phone'))
        await pom.servicesAutomationPageObject().fillContactUsInputField("Company", random.generateRandomData('company'))
        await pom.servicesAutomationPageObject().selectOptionContactUsCountryDropdownList('Germany')
        await pom.servicesAutomationPageObject().fillContactUsMessageTextBox(random.generateRandomData('message'))

        //Step 5: Check the I agree checkbox.
        await pom.servicesAutomationPageObject().clickContactUsIAgreeCheckBox()


        /* Required Step: Recaptcha verification
           Options to bypass recaptcha
           1. Configure environment to disable recaptcha or provide simplified CAPTCHA challenges like just click checkbox and then done.
           2. Use Third-Party CAPTCHA Solving Services such as 2Captcha
           3. Mock CAPTCHA Responses: Inject mock responses directly into the application to bypass reCAPTCHA during tests.
        */
        await pom.servicesAutomationPageObject().clickContactUsRecaptchaCheckBox()

        //Step 6: Then Click SUBMIT button.
        await pom.servicesAutomationPageObject().clickContactUsSubmitButton()
        
        //Step 7: After clicking SUBMIT button the form is submitted and Thank you message is displayed. Assert the Thank you message.
        await expect (pom.servicesAutomationPageObject().contactUsSuccessMessage).toBeVisible()
        await expect(pom.servicesAutomationPageObject().contactUsSuccessMessage).toHaveText('Thank you for contacting us.')
    })
})