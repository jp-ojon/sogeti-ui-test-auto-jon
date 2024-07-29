# Playwright Test Suite for Automation Task UI Tests by Jon Paulo Ojon
## Overview
This test suite includes automated tests for navigating the Sogeti website, filling out a form, and verifying country-specific links.

## Author
Jon Paulo Ojon

## Prerequisites
* Node.js (v14 or later), find installer on https://nodejs.org/en/download/package-manager site
* Playwright
* faker, @faker-js/faker

## Installation
1. Clone the repository and go to project directory
- git clone https://github.com/jp-ojon/sogeti-ui-test-auto-jon.git
- change directory to root folder sogeti-ui-test-auto-jon

2. Install the dependencies:
- npm install 
- npx playwright install
* Libraries used
* @faker-js/faker       : faker library used to generate random test data

## Test Cases
- Test Case 1: Navigate to Services Automation Page: This test navigates to the Services Automation page on the Sogeti website.
- Test Case 2: Fill out Sogeti Automation Form and Submit. This test fills out and submits the automation form on the Services Automation page.
- Test Case 3: Assert that All Country-Specific Sogeti Links Are Working. This test asserts that all the country-specific links on the Sogeti website are working.

## Running Tests
Use the following commands in any terminal or cmd line to run tests in different browsers:
1. npm run test:chromium    : run all tests for chromium browser only
2. npm run test:firefox     : run all tests for firefox browser only
3. npm run test:webkit      : run all tests for webkit browser only
4. npx run test:all         : run all tests across all browsers configured under playwright.config.ts -> projects

## Configuration
Configuration can be changed under playwright.config.ts
- headless                  : can either be true or false, true means browser would show up when tests are run
- timeout                   : Global timeout for all tests
- expect: timeout           : Timeout for expect() assertions
- projects: use: viewport   : Screen size, adjust accordingly

## Recommendations
- **Note:** It is not recommended to use npx run test:all and run all tests across all browsers in parallel. Please run test for chromium, firefox and webkit separately to avoid flakiness, inconsistent browser behaviours, insufficient resources to support the run, etc.
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors.

## Notes
Options to bypass recaptcha
1. Configure environment to disable recaptcha or provide simplified CAPTCHA challenges like just click checkbox and then done.
2. Use Third-Party CAPTCHA Solving Services such as 2Captcha
3. Mock CAPTCHA Responses: Inject mock responses directly into the application to bypass reCAPTCHA during tests.

## Links to Documentation
- Playwright: https://playwright.dev/docs/intro