# Set Up Cypress

1. Creating a project and initializing package.json
   npm init -y
2. Cypress Installation
   npm install cypress
3. Installing TypeScript and required dependencies
   npm install typescript @types/node @types/cypress
4. Installing Cypress
   npx cypress open
5. Setting up TypeScript for Cypress
   tsconfig.json file:
   {
   "compilerOptions": {
   "target": "es6",
   "lib": ["es6", "dom"],
   "types": ["cypress", "node"],
   "strict": true,
   "esModuleInterop": true,
   "skipLibCheck": true
   },
   "include": ["cypress/**/*.ts"]
   }

## Codestyle setup

1. Add 'ESLint', 'Prettier - Code formmatter', 'Prettier ESLint' extentions in VSCode
2. Add '.vscode' folder
3. Add 'settings.json' file to '.vscode' folder
4. Add following text into 'settings.json' file:
   {
   "editor.codeActionsOnSave": {
   "source.fixAll.eslint": "explicit"
   },
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "editor.formatOnSave": true
   }
5. Press 'Ctrl + Shift + P'
6. Write 'Open Settings (UI)'
7. Check 'Format on Paste' and 'Format on Save' checkboxes

## Execute Tests

1. Open Cypress Test Runner
   npx cypress open
2. Select the E2E Testing option
3. Select any available browser, for example Chrome
4. Click on the Start E2E Testing in Chrome button
5. In the opened browser window, select addBlogPost.cy.ts
