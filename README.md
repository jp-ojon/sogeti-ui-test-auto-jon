# Playwright Test Suite for Sogeti Automation Task by Jon Paulo Ojon
## Overview
This test suite includes automated tests for navigating the Sogeti website, filling out a form, and verifying country-specific links.

## Author
Jon Paulo Ojon

## Prerequisites
* Node.js (v14 or later)
* Playwright
* faker, @faker-js/faker

## Installation
1. Clone the repository and go to project directory
- git clone https://github.com/your-repo/sogeti-playwright-tests.git
- cd SogetiUITestAutoJon

2. Install the dependencies:
- npm install @faker-js/faker       : faker library used to generate random test data

## Test Cases
- Test Case 1: Navigate to Services Automation Page: This test navigates to the Services Automation page on the Sogeti website.
- Test Case 2: Fill out Sogeti Automation Form and Submit. This test fills out and submits the automation form on the Services Automation page.
- Test Case 3: Assert that All Country-Specific Sogeti Links Are Working. This test asserts that all the country-specific links on the Sogeti website are working.

## Running Tests
Use the following commands to run tests in different browsers:
1. npm run test:chromium    : run all tests for chromium browser only
2. npm run test:firefox     : run all tests for firefox browser only
3. npm run test:webkit      : run all tests for webkit browser only
4. npx run test:all         : run all tests across all browsers configured under playwright.config.ts -> projects

## Recommendations
- **Note:** It is not recommended to use npx run test:all and run all tests across all browsers in parallel. Please run test for chromium, firefox and webkit separately to avoid flakiness, inconsistent browser behaviours, insufficient resources to support the run, etc.
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors.