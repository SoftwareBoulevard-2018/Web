# Web

## Exposed on the following IP:port : 35.196.111.251:8080

There are some flaws regarding programming practices, for example there should be a file where all the text 
displayed on the webpage is located, that's why the /src/shared/globalVariables.ts file exists, 
but it's not being used in the current version.

The actual project structure is composed by the views or GUIs I defined for module 2: game management.

                                - Company status - Update company
                  - Companies
                                - Create company
                                
Login - Home

                               - User status - Update user
                  - Users
                               - Create user
                               
You can see those are the routes defined on the app.component.module.ts file.

The stylesheets used are located on the /src/styleSheets folder and imported on src/styles.css to be interpreted.

The data models or classes are located on the /src/shared folder.

I think that's everything ._. you can write some questions on the issues section or in this same readme.
