# Creating a Secure Node.js Server

## 1. Avoid Dangerous Functions

- **Never use `eval()`** – It allows execution of arbitrary code and can lead to serious security vulnerabilities.
- **Always use strict mode** (`"use strict";`) – Helps catch common coding mistakes and enforces safer JavaScript practices.

## 2. Handle Errors Carefully

- Do not expose sensitive error messages to clients.
- Log errors securely on the server-side without revealing stack traces in responses.
- **Disable `X-Powered-By: Express`** to prevent attackers from identifying the server technology:
  ```js
  app.disable("x-powered-by");
  ```

## 3. Sanitize User Input

- Prevent **Cross-Site Scripting (XSS)** by sanitizing input.
- Use libraries like `xss-filters` or `DOMPurify` to clean user input before rendering it.
- Validate input properly using `Joi` or `express-validator`.

## 4. Perform Static Code Analysis

- Catch potential issues early with static analysis tools.
- Use **ESLint** with the Standard code style:
  ```sh
  npm install eslint --save-dev
  npx eslint .
  ```

## 5. Running Services in Production Securely

- **Never run processes with superuser rights** to minimize risk in case of a security breach.
- Run applications with the least privileges necessary.

## 6. Set Up Essential HTTP Security Headers

Use **Helmet.js** to secure HTTP headers:

```sh
npm install helmet
```

```js
const helmet = require("helmet");
app.use(helmet());
```

Helmet enables the following headers:

- **Strict-Transport-Security** – Enforces HTTPS connections.
- **X-Frame-Options** – Prevents clickjacking attacks.
- **X-XSS-Protection** – Enables browser's built-in XSS filter.
- **X-Content-Type-Options** – Prevents MIME-sniffing.
- **Content-Security-Policy** – Mitigates various injection attacks.

## 7. Implement Proper Session Management

- **Secure Cookies:**
  ```js
  app.use(
    session({
      secret: "your-secret-key",
      cookie: { secure: true, httpOnly: true },
    })
  );
  ```
- `secure`: Ensures cookies are only sent over HTTPS.
- `httpOnly`: Prevents access via JavaScript to mitigate XSS.

## 8. Define Cookie Scope

- `domain`: Restricts cookies to a specific domain.
- `path`: Limits cookie validity to a specific URL path.
- `expires`: Sets persistent cookies with an expiration date.

## 9. Scan for Vulnerabilities

- Use **Retire.js** to detect known vulnerabilities in dependencies:
  ```sh
  npm install -g retire
  retire
  ```
- Audit your modules with the **Node Security Platform (NSP) CLI**:
  ```sh
  npm install -g nsp
  nsp check
  ```
