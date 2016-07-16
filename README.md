## Biglup Ecommerce Platform
---
Biglup ecommerce is a modern reactive, real-time event driven platform. The platform is built with JavaScript (ES6), Angular2, Meteor and Node.js.

## Recommendations
---
 * Commit early and often.

 * Write concise and descriptive messages in every commit.

 * Respect project code convention.

 * Keep good development practices.

## File system structure
---
 * All folders should be lower case with "-" character as word separator.

 * All parts of the components should be name as follows name.component.ts|html|css|spec to represent those various files.

 * All componentes should have its own folder.
 
 * Client side code should be in the "client" folder, server side code should be in the "server" folder, all mongodb collections
   should be in the "collections" folder and all the common code between the client, the server and the collections should be in 
   the "common" folder.
   
## Version control agreements
---
 * Only make commits to the private Biglup bitbucket Git server.

 * Don't share source code over cloud services (Dropbox, etc).

 * Use Git branch naming and branch merging conventions:

     Release preparation branches must start with "release/".
     Feature, Issues, Bug branches must start with "feature/".
     Hotfix branches must start with "hotfix/".

     Prefer git-extras and/or git-flow scripts for branching management.

## Installation

> Biglup ecommerce requires [Meteor](https://www.meteor.com/install), [Node](http://nodejs.org/) and [npm](https://www.npmjs.com/)

Developers using **Windows** should review the [Windows specific installation requirements for Meteor]https://www.meteor.com/install).

```bash
curl https://install.meteor.com | /bin/sh # installs Meteor

git clone git@bitbucket.org:AngelCastillo/biglup-ecommerce.git

cd biglup-ecommerce

npm install

meteor
```
# Features
### Store Front features
*  Single page web app (SPA) created using AngularJS2, Meteor, NodeJS and MongoDB
*  Product Search
*  Add to Cart and Product Details
*  Checkout with Paypal Integration
*  Minimal User Registration process
*  Order history and Password Management
*  Facility for Multi level Category
*  Mobile optimized with Bootstrap
*  Loads more products on scroll (No paging required)

### Store Back Office
*  Products, Categories, Brand, Order Management from admin panel
*  Manage Order and Change Status from admin panel
*  Facility for Multiple product variants (size, color, price, image)
*  User roles - Administrator, User, Guest
*  SEO friendly URLs for each page
*  Secure and quality code - Takes care all single page web app standards

## Contributors
---

Angel Castillo <angel.castillo@biglup.com>

## License
---
Copyright 2016 Biglup. All Rights Reserved.

Confidential Information of Biglup. Not for disclosure or distribution
prior written consent. This software contains code, techniques and know-how which 
is confidential and proprietary to Biglup.

Use of this software is subject to the terms of an end user license agreement.