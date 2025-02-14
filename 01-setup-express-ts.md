# Node.js Express with TypeScript

This guide helps you set up a **Node.js Express** project with **TypeScript** from scratch.

## Prerequisites

- [Node.js](https://nodejs.org/) installed (Recommended: Latest LTS version)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Step 1: Initialize the Project

Run the following command to create a `package.json` file:

```sh
npm init -y
```

## Step 2: Install Dependencies

Install **Express** and its required packages:

```sh
npm install express
```

Install **TypeScript** and development dependencies:

```sh
npm install --save-dev typescript ts-node @types/node @types/express
```

Install **DotEnv** for environment variables from a .env file

```sh
npm install dotenv
```

## Step 3: Initialize TypeScript

Run the following command to generate a `tsconfig.json` file:

```sh
npx tsc --init
```

Modify `tsconfig.json` with the following settings:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

## Step 4: Create an Express Server

Create a `src/index.ts` file and add:

```ts
import express from "express";

const app = express();
```

## Step 5: Run the Project

Use `ts-node` to run the TypeScript server:

```sh
npx ts-node src/index.ts
```

Alternatively, compile and run:

```sh
npx tsc
node dist/index.js
```

## Step 6: Add a Start Script

Modify `package.json` to add the following script:

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Now, you can start the server in development mode using:

```sh
npm run dev
```

## Step 7: Set Up Testing

Run the following command to install Jest and required packages:

```sh
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
```

**Configure Jest**

Initialize Jest with TypeScript support:

```sh
npx ts-jest config:init
```

**Run Tests**

```sh
npm test
```

### Nice to know

1. **Express**: A minimal and flexible web application framework for Node.js.
2. **TypeScript**: A superset of JavaScript that adds static typing and advanced language features.
3. **ts-node**: A TypeScript execution environment for Node.js.
4. **@types/express**: TypeScript declaration files for Express.

## Conclusion

You have successfully set up an **Express.js** server with **TypeScript**. 🎉
