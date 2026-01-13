# AI Playwright

A comprehensive Playwright automation testing project with multiple test scenarios for web applications, e-commerce sites, and REST APIs.

## Features

- **Web Application Testing**: Test navigation, page interactions, and form submissions
- **E-Commerce Testing**: Search functionality, product selection, and cart operations
- **API Testing**: REST API testing with request/response validation
- **Cross-Browser Support**: Tests run on Chrome, Firefox, and Safari
- **Detailed Reporting**: HTML reports with screenshots and traces

## Test Scenarios

### 1. Example Tests (`example.spec.js`)
- Launch browser and navigate to Google
- Verify page title

### 2. E-Commerce Tests (`ecommerce.spec.js`)
- Search for products (e.g., Laptop)
- Fetch product details (name and price)
- Verify search results

### 3. Amazon Tests (`amazon.spec.js`)
- Search for Samsung products
- Add first product to cart
- Verify product in cart

### 4. Flipkart Tests (`flipkart.spec.js`)
- Search for Samsung products
- Select first product
- Add to cart and verify

### 5. Selenium Tests (`selenium.spec.js`)
- Navigate to Selenium downloads
- Find Selenium Grid section
- Extract version information

### 6. API Tests (`api.spec.js`)
- Fetch todos from API endpoint
- Parse and validate JSON response
- Find specific todo by title

### 7. REST-Assured Tests (`restassured.spec.js`)
- Fetch todos via REST API
- Validate response status code and content type
- Extract and verify specific todo details

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests with visible browser
npm run test:headed

# View test report
npm run report
```

## Running Specific Tests

```bash
# Run only Chrome browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test tests/ecommerce.spec.js

# Run tests matching a pattern
npx playwright test -g "search"
```

## Project Structure

```
AI_Playwright/
├── tests/
│   ├── example.spec.js
│   ├── sample.spec.js
│   ├── ecommerce.spec.js
│   ├── amazon.spec.js
│   ├── flipkart.spec.js
│   ├── selenium.spec.js
│   ├── api.spec.js
│   └── restassured.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Configuration

Playwright configuration is defined in `playwright.config.js`. You can customize:
- Test directory
- Timeout settings
- Browser configurations
- Reporter settings
- Retry logic

## Dependencies

- @playwright/test - Testing framework
- playwright - Browser automation library

## License

ISC
