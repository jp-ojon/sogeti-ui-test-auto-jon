import {Page} from '@playwright/test'
import {MainPage} from '../page-objects/mainPage'
import {ServicesAutomationPage} from '../page-objects/services/servicesAutomationPage'

export class PageObjectsManager{
    page: Page
    mainPage: MainPage
    servicesAutomationPage: ServicesAutomationPage

    constructor(page: Page){
        this.page = page
        this.mainPage = new MainPage(page)
        this.servicesAutomationPage = new ServicesAutomationPage(page)
    }

    mainPageObject(){
        return this.mainPage
    }

    servicesAutomationPageObject(){
        return this.servicesAutomationPage
    }
}