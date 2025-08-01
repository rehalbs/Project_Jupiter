## Project_Jupiter - Planit_Assessment
### Test case 1:
From the home page go to contact page
Click submit button
Verify error messages
Populate mandatory fields
Validate errors are gone
### Test case 2:
1. From the home page go to contact page
2. Populate mandatory fields
3. Click submit button
4. Validate successful submission message
Note: Run this test 5 times to ensure 100% pass rate
### Test case 3:
Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
Go to the cart page
Verify the subtotal for each product is correct
Verify the price for each product
Verify that total = sum(sub totals)

### Jupiter Toys Playwright Test Suite

This project is an automated end-to-end test suite for the Jupiter Toys website using [Microsoft Playwright](https://playwright.dev/).

## Project Structure

```
Project_Jupiter/
├── Pages/              # Page Object Model (POM) classes
├── tests/              # Test cases calling Page Object functions
├── ShoppingList.json   # Fixture data for buying toys
├── .env                # Environment-specific configuration
├── playwright.config.ts
└── README.md
```
### Features

 Uses Playwright with TypeScript
 Structured using Page Object Model (POM)
 Supports test data from a fixture file (`ShoppingList.json`)
 Uses `.env` file to define environment variables (like `TEST_URL`)
 Includes console logging and error handling for easier debugging

###  Setup & Installation

1. Install dependencies:

   npm install


2. Create a `.env` file in the root directory with:

   TEST_URL=https://jupiter.cloud.planittesting.com/#/

3. Add your shopping list in `ShoppingList.json`:

   json
   [
     { "name": "Stuffed Frog", "price": 10.99, "quantity": 2 },
     { "name": "Fluffy Bunny", "price": 9.99, "quantity": 5 },
     { "name": "Valentine Bear", "price": 14.99, "quantity": 3 }
   ]


### Running Tests

 Run the full suite:
  ```bash
  npx playwright test
  ```
 Run a specific test file:
  ```
  npx playwright test tests/<TestName>.spec.ts
  ```
 View UI test runner (optional):
  ```
  npx playwright test --ui
  ```

### Debugging & Reporting

 Console logs are included for:

   Navigation steps
   Buying items
   Error handling

