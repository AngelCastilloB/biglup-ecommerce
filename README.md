# Biglup E-commerce Platform

Biglup e-commerce is a modern reactive, real-time event driven platform. The platform is built with JavaScript (ES6), Angular2, Meteor and Node.js.

## Recommendations

 * Commit early and often.
 * Write concise and descriptive messages in every commit.
 * Respect project code convention.
 * Keep good development practices.

## Architecture

<p align="center">
  <img src="https://gitlab.com/arcangelz/biglup-ecommerce/uploads/b02fc1fbb7dbc6302566092fbf42f54d/biglup-framework-small.png" alt="Architecture"/>
</p>

## Project Structure

 The project is organized in two folders: apps and packages.

 Inside the apps folder are located both the backoffice app and the store app, both are independent meteor apps. In the packages
 folders are located all the reusable and common packages.

## Conventions

### File System Structure Inside Projects

 * All folders should be lower case with "-" character as word separator.
 * All parts of the components should be name as follows name.component.ts|html|css|spec to represent those various files.
 * All components should have its own folder.
    * The following structure must be followed inside the "client" folder:
    ```
    client
    ├── common
    │   ├── components
    │   ├── pipes
    │   └── services
    └── featureModule
            ├── common
            │   ├── components
            │   ├── pipes
            │   └── services
            └── component
                ├── components
                ├── pipes
                └── services
    ```
 * Client side code should be in the "client" folder, server side code should be in the "server" folder, all mongodb collections
   should be in the "collections" folder and all the common code between the client, the server and the collections should be in 
   the "common" folder.
   
### Object Oriented Programming

 * Abstract class should have the 'Abstract' prefix, IE: AbstractVehicle instead of Vehicle.
 * Interfaces should have the letter 'I' as prefix, IE: IDevice, IXmlSerializable, ICommand.
 * Methods should be named after an action, IE: getTime() instead of time().
 * Methods that return flags or booleans should answer to questions IE: isAdmin()
 
### JavaScript

 * Prefer array helpers (forEach, map, filter, find, every/some, reduce) over manual iteration using for or while loops.
 * When you must use function expressions (as when passing an anonymous function), prefer the arrow function notation. 
 * Always use class. Avoid manipulating prototype directly.
 * Don't use generators for now. (They don't transpile well to ES5).
 * Prefer object destructuring over directly accessing and using multiple properties of an object.
 * Prefer array destructuring over directly referencing elements on the array.
 * Prefer object destructuring for multiple return values over array destructuring.

### Version control agreements

 * Only make commits to the private Biglup Git server.
 * Don't share source code over cloud services (Dropbox, etc).
 * Use Git branch naming and branch merging conventions:
     Release preparation branches must start with "release/".
     Feature, Issues, Bug branches must start with "feature/".
     Hotfix branches must start with "hotfix/".

     Prefer git-extras and/or git-flow scripts for branching management.

## Installation

> Biglup e-commerce requires [Meteor](https://www.meteor.com/install), [Node](http://nodejs.org/), [npm](https://www.npmjs.com/) and [imagemagick](http://www.imagemagick.org/script/index.php)

Developers using **Windows** should review the [Windows specific installation requirements for Meteor](https://www.meteor.com/install).

Before you start the application you must export an special environment variable to point meteor to the correct packages folder location:

export METEOR_PACKAGE_DIRS=E:\sourcecode\biglup-ecommerce\packages

```bash
curl https://install.meteor.com | /bin/sh # installs Meteor

git clone git@gitlab.com:biglup/biglup-ecommerce.git

cd biglup-ecommerce/apps/{backoffice|store}

typings install

meteor npm install

meteor
```

To run both apps in coordination:

 * Go th the backoffice folder and start the backoffice client in the desired local IP Address: meteor --port 127.0.0.10:80
 * In a second terminal go again to the backoffice folder and find the mongo database URL: meteor mongo -U
 * Once you have the database URL, in a different terminal, go to the store folder and export: export MONGO_URL=mongodb://127.0.0.1:81/meteor (Here use the previously obtained database URL)
 * Start the store server: meteor --port 127.0.0.10:80

### Meteor JSON configuration

Meteor allows to have environment variables specifying it on the CLI or in a .json file, in this file there are several
values related to the App, like default users, Database Migrations, among others, this is useful for several reasons, the
most important is securing the App private API keys (even though this is a private repo, it exists on a third party server), 
and this approach has the flexibility to change or update the values inside an VPS container or CI service, inside a GUI
or with `export METEOR_SETTINGS` which meteor expects it to be a JSON object.

The _example.meteor.json_ file has the structure needed for the file to work, replacing the values with proper ones, _npm_ 
creates the meteor.json file automatically.

To use these env variables, we can do `meteor run --settings meteor.json` or even `npm start`.

### OAuth API Keys

To properly run this application, the OAuth API keys must exist inside the _meteor.json_ file, there are different
objects related to this, as of now, there are facebook, google and twitter integrations, these are:

```json
{
  "facebook": {
      "appId": "someString",
      "secret": "the app secret"
    }
} 
```

please refer to
[https://guide.meteor.com/deployment.html#environment](https://guide.meteor.com/deployment.html#environment),
[https://guide.meteor.com/accounts.html#oauth](https://guide.meteor.com/accounts.html#oauth) and
[http://docs.meteor.com/api/accounts.html#requestpermissions](http://docs.meteor.com/api/accounts.html#requestpermissions)
for more info.

### Database migrations

The database migrations are controlled inside the _meteor.json_ file; the migrate allows the migration table to be created
along with the mock data, to reset migrations the reset flag must be set to true.

## Private folder

The private folder contains files not intended for use by the client directly,  it can however be accessed by the server side using the
[Assets API](https://docs.meteor.com/api/assets.html), there are two folders, the files and logs folder.

```
App
└── private
    └── storage
        ├── files
        │   └── various-files
        └── logs
            └── various-logs
```

## IDE Configuration

### Tslint
To add tslint support for development, the tslint executable must be installed: `npm i -g tslint` and in _Webstorm_ check 
the settings in: **file > settings > Languages and Frameworks > Typescript > Tslint** and check enable, 
after that, search the tslint package in your global npm packages folder and select the tslint folder 
(for example: ~/.npm-packages/lib/node_modules/tslint) then, check _configuration file_ as the local tslint.json file 
in the repository instead of search for tslint.

### Coding Style

Editor config should be enabled by your preferred Ide, in Webstorm, this is done automagically.

To add an existing Webstorm coding style go to **file > settings > editor > coding style** and click **manage > import**
to add an XML file containing pre existing rules to automatically reformat code (defaults to `crl + shift + L`) according 
to the predefined coding styles conventions.

## Features

### Store Front End Features
*  Single page web app (SPA) created using AngularJS2, Meteor, NodeJS and MongoDB
*  Product Search
*  Add to Cart and Product Details
*  Minimal User Registration process
*  Order history and Password Management
*  Facility for Multi level Category
*  Mobile optimized
*  Loads more products on scroll (No paging required)

### Store Back Office Features
*  Products, Categories, Brand, Order Management from admin panel
*  Manage Order and Change Status from admin panel
*  Facility for Multiple product variants (size, color, price, image)
*  User roles - Administrator, User, Guest
*  SEO friendly URLs for each page
*  Secure and quality code - Takes care all single page web app standards

## Contributors

* Angel Castillo <angel.castillo@biglup.com>
* Alejandro Granadillo <slayerfat@gmail.com>

## License

Copyright 2017 Biglup. All Rights Reserved.

Confidential Information of Biglup. Not for disclosure or distribution
prior written consent. This software contains code, techniques and know-how which 
is confidential and proprietary to Biglup.

Use of this software is subject to the terms of an end user license agreement.
