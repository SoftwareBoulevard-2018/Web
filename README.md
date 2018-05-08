# Web

This web application is exposed on the ip: http://35.196.111.251/

If you want to run it locally you must download and install the current LTS (long term support) version of node.js from here https://nodejs.org/es/ this version includes npm.

In the root folder of the project /web/ you must run the following commands:

npm install -g @angular/cli

npm install

ng serve

Now the app is running on your localhost:4200 and you can open it from your browser.

## Folder - Files structure:

/web/ every configuration file is located here, please don't modify them.

/web/e2e -> tests folder, it is not important for us.

/web/src -> where all files are located.

/web/src/ -> More configuration files, don't modify them please.

/web/src/styles.css -> General css file for all the app.

/web/src/styleSheets/ -> Here are located all imported css files.


## General components:

App
header
footer
home
restricted
notfound

## Module 2 - "Game Management" components:

Account creation, log-in, log out
create user
login
users
update user
header - note

Create/update companies
create-company
update company

Generate/view reports/view players/team Status
reports
user status
Companies
company-status
