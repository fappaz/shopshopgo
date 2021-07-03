- [Description](#description)
- [Development Environment](#development-environment)
  - [Setup requirements](#setup-requirements)
    - [Install dependencies](#install-dependencies)
    - [Set up Firebase project](#set-up-firebase-project)
  - [How to run locally](#how-to-run-locally)
- [Knowledge Base](#knowledge-base)
  - [Useful commands](#useful-commands)
    - [How to run unit tests](#how-to-run-unit-tests)
    - [How to build](#how-to-build)
    - [How to deploy](#how-to-deploy)
- [Known Issues](#known-issues)
  - [UnauthorizedAccess when logging in to firebase on PowerShell](#unauthorizedaccess-when-logging-in-to-firebase-on-powershell)
# Description

An ads-free, open-source, incredibly simple shopping list app for the busy person.

# Development Environment

## Setup requirements

### Install dependencies

- Install the tools below:
  - NodeJS 11+
  - npm 6.9.0+
  - Firebase Tools (`npm install -g firebase-tools`)
  - env-cmd 10.0.1 (`npm install -g env-cmd@10.0.1`)
- Run `npm install` to install dependencies

### Set up Firebase project

- Create a new [Firebase](https://console.firebase.google.com/) project
- Create a new app and add a Firebase hosting
- Enable `Email/Password` authentication in your Firebase project
- Update the `.firebaserc` file with your project and hosting names
- Create environment files (e.g.: `.env.development.local`) in the root folder of this project, containing all the environment variables for your project. Example:
    - ```properties
      REACT_APP_FIREBASE_API_KEY=AIzaSyBBF4_xfROYA56lx3BOdHzIc5u7kJwQoKI
      REACT_APP_FIREBASE_AUTH=my-app-sandbox.firebaseapp.com
      REACT_APP_FIREBASE_DATABASE=https://my-app-sandbox.firebaseio.com
      REACT_APP_FIREBASE_PROJECT_ID="my-app-sandbox"
      REACT_APP_FIREBASE_SENDER=600197252111
      REACT_APP_FIREBASE_APP_ID=1:600197252111:web:4cf6e9373d6cf9e99d4f7a
      ```
    - Don't forget to add this file to your `.gitignore`, as it contains sensitive data about your project.
    - Update your `package.json` scripts accordingly

## How to run locally
```
npm start
```

Runs the app in the `sandbox` mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# Knowledge Base

## Useful commands

### How to run unit tests
```
npm test
```

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### How to build
```
npm run build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### How to deploy

Open a terminal shell and run the following commands in the root folder:

```
firebase login
firebase init
firebase deploy --only hosting:${HOSTING_NAME}
```

**Note**: replace `${HOSTING_NAME}` with the hosting name you configured in your Firebase project or `.firebaserc` file (e.g.: `shopshopgo`)

# Known Issues

## UnauthorizedAccess when logging in to firebase on PowerShell

When running `firebase login` on Windows PowerShell, you might get the following error message:

```
PS C:\git\shopshop> firebase login
firebase : File C:\Users\YourUser\AppData\Roaming\npm\firebase.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at     
https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ firebase login
+ ~~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Simply delete the file in the location above and try again.