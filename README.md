# Playwright Test Automation Framework

This is an enterprise-level test automation framework built with Playwright and TypeScript. The framework includes features such as Page Object Model (POM), data-driven testing, logging, and HTML reporting.

## Project Structure

```
├── src/
│   ├── pages/          # Page Object Models
│   ├── lib/            # Common library functions and base classes
│   ├── utils/          # Utility functions (logging, test data management)
│   ├── config/         # Configuration files
│   └── data/           # Test data files
├── tests/              # Test scripts
├── test-results/       # Test execution results and reports
└── playwright.config.ts # Playwright configuration
```

## Features

- Page Object Model design pattern
- Data-driven testing capability
- Comprehensive logging system
- HTML reporting
- Cross-browser testing support
- Configurable test environments
- TypeScript support
- Parallel test execution
- Screenshot and video capture on failure

## Prerequisites

- Node.js (latest LTS version)
- npm (comes with Node.js)
- Visual Studio Code

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Available commands:

- Run all tests:
  ```bash
  npm test
  ```

- Run tests with UI mode:
  ```bash
  npm run test:ui
  ```

- Run tests in headed mode:
  ```bash
  npm run test:headed
  ```

- Run tests in specific browser:
  ```bash
  npm run test:chrome
  npm run test:firefox
  npm run test:safari
  ```

- Debug tests:
  ```bash
  npm run test:debug
  ```

- View HTML report:
  ```bash
  npm run report
  ```

## Adding New Tests

1. Create a new test file in the `tests` directory
2. Create corresponding page objects in `src/pages` if needed
3. Add test data in `src/data` if required
4. Use the Logger utility for logging
5. Extend existing base classes and utilities as needed

## Best Practices

- Use Page Object Model for better maintainability
- Keep test data separate from test scripts
- Use meaningful test and function names
- Add appropriate logging statements
- Follow TypeScript best practices
- Write atomic and independent tests
- Use test hooks appropriately

## Reporting

The framework generates HTML reports after test execution in the `test-results/reports` directory. The report includes:
- Test execution summary
- Test case details with steps
- Screenshots and videos of failed tests
- Test execution time and status
- Error details for failed tests

## Configuration

The framework can be configured using:
- `playwright.config.ts` - Playwright specific configurations
- `src/config/test.config.ts` - Framework specific configurations

## Logging

The framework includes a comprehensive logging system that:
- Logs test execution steps
- Captures errors and exceptions
- Supports different log levels (INFO, ERROR, DEBUG)
- Integrates with test reports