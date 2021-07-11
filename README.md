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
  - [UnauthorizedAccess when logging in to Firebase on PowerShell](#unauthorizedaccess-when-logging-in-to-firebase-on-powershell)
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
    - At the time of writing, this app does not support unnattended sign up. New users must be added manually via Firebase Authentication.
- Create a Firestore database
    - Make sure you create rules that allow accounts to read and write on their own documents only, such as below:
        - ```
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /accounts {
                match /{accountId} {
                  match /{document=**} {
                    // an account can only get, list and update its own documents
                    allow read, write: if request.auth != null && accountId == request.auth.uid;   
                  }
                }
              }
            }
          }
          ```
- Create environment files (e.g.: `.env.development.local`) in the root folder of this project, containing all the environment variables for your project. Example:
    - ```properties
      REACT_APP_FIREBASE_API_KEY=AIzaSyBBF4_xfROYA56lx3BOdHzIc5u7kJwQoKI
      REACT_APP_FIREBASE_AUTH=my-project.firebaseapp.com
      REACT_APP_FIREBASE_DATABASE=https://my-project.firebaseio.com
      REACT_APP_FIREBASE_PROJECT_ID="my-project"
      REACT_APP_FIREBASE_SENDER=600197252111
      REACT_APP_FIREBASE_APP_ID=1:600197252111:web:4cf6e9373d6cf9e99d4f7a
      ```
    - Don't forget to add this file to your `.gitignore`, as it contains sensitive data about your project.
    - Update your `package.json` scripts accordingly
- Run `firebase login && firebase init` in your folder and follow instructions to set up firebase configuration files:
    - When asked which Firebase features you want to set up, at the moment just select `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`
    - Answer the questions like below:
        - ```
          ? What do you want to use as your public directory? ./build
          ? Configure as a single-page app (rewrite all urls to /index.html)? No
          ? Set up automatic builds and deploys with GitHub? No
          ? File ./build/404.html already exists. Overwrite? No
          ? File ./build/index.html already exists. Overwrite? No
          ```
  - The script should generate 2 files: `.firebaserc` and `firebase.json`. Add them to your `.gitignore` if you prefer not to expose your project and hosting names.
  - Edit your `firebase.json` and add a `site` property under `hosting`. Its value must be the hosting name you set up on Firebase Hosting.

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
firebase deploy --only hosting:${HOSTING_NAME}
```

**Note**: replace `${HOSTING_NAME}` with the hosting name you configured in your Firebase Hosting (it should be the `site` property in your `firebase.json` file)

# Known Issues

## UnauthorizedAccess when logging in to Firebase on PowerShell

When running `firebase login` on Windows PowerShell, you might get the following error message:

```
PS C:\git\shopshopgo> firebase login
firebase : File C:\Users\YourUser\AppData\Roaming\npm\firebase.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at     
https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ firebase login
+ ~~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Simply delete the file in the location above and try again.