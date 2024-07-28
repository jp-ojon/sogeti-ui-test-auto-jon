import { Locator, Page, FrameLocator } from "@playwright/test";
import { MainPage } from "../mainPage";

export class ServicesAutomationPage extends MainPage {
    readonly pageHeading: Locator
    readonly contactUsHeader: Locator
    contactUsInputField: Locator
    readonly contactUsCountryDropdownList: Locator
    readonly contactUsMessageTextBox: Locator
    readonly contactUsIAgreeCheckBox: Locator
    readonly contactUsSubmitButton: Locator
    readonly contactUsRecaptchaIframe: FrameLocator
    readonly contactUsRecaptchaCheckBox: Locator
    readonly contactUsSuccessMessage: Locator

    constructor(page: Page) {
        super(page)
        this.pageHeading = this.page.locator('div.page-heading')
        this.contactUsHeader = this.page.getByText('Contact us:')
        this.contactUsCountryDropdownList = this.page.locator('//label[contains(text(), "Country")]/following-sibling::div/select')
        this.contactUsMessageTextBox = this.page.locator('//label[contains(text(), "Message")]/following-sibling::textarea')
        this.contactUsIAgreeCheckBox = this.page.locator('//input[@type="checkbox" and @value="I agree"]/following-sibling::label[text()="I agree"]')
        this.contactUsSubmitButton = this.page.locator('//button[@name="submit" and @type="submit"]')
        this.contactUsRecaptchaIframe = this.page.frameLocator('iframe[title="reCAPTCHA"]')
        this.contactUsRecaptchaCheckBox = this.contactUsRecaptchaIframe.locator('//div[@id="rc-anchor-container"]')
        this.contactUsSuccessMessage = this.page.locator('.Form__Status__Message')
    }

    /**
     * This method scrolls into view the Contact Us Header
     */
    async scrollToContactUsHeader() {
        await this.contactUsHeader.scrollIntoViewIfNeeded()
    }
    /**
     * This method fills the contact us input fields (except county and message) available within the form
     * @param field header value displayed before the input field
     * @param value the value that is entered on the selected input field
     */
    async fillContactUsInputField(field: string, value: string) {
        const xpathExpression = `//label[contains(text(),"${field}")]/following-sibling::input`;
        this.contactUsInputField = this.page.locator(xpathExpression)
        await this.contactUsInputField.fill(value)
    }

    /**
     * This method selects an option on the Contact Us Country Dropdown List
     * @param value the value of the country that is selected
     */
    async selectOptionContactUsCountryDropdownList(value: string) {
        await this.contactUsCountryDropdownList.selectOption(value)
    }

    /**
     * This method fills the Contact Us Message Text Box
     * @param value the value that is entered on the message field
     */
    async fillContactUsMessageTextBox(value: string) {
        await this.contactUsMessageTextBox.fill(value)
    }

    /**
     * This method would click on the Contact Us I Agree CheckBox
     */
    async clickContactUsIAgreeCheckBox() {
        await this.contactUsIAgreeCheckBox.click()
    }

    /**
     * This method would click on the Contact Us Recaptcha CheckBox but would not automatically solve the recaptcha problem
     */
    async clickContactUsRecaptchaCheckBox() {
        await this.contactUsRecaptchaCheckBox.click()
    }

    /**
     * This method would click on the Contact Us Submit Button
     */
    async clickContactUsSubmitButton() {
        await this.contactUsSubmitButton.click()
    }
}