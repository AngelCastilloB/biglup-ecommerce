## Biglup Ecommerce Platform
---
Biglup ecommerce is a modern reactive, real-time event driven platform.

Biglup ecommerce is built with JavaScript (ES6), Angular2, Meteor and Node.js.

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
   the "share" folder.
   
## Version control agreements
---
 * Only make commits to the private Biglup bitbucket Git server.

 * Don't share source code over cloud services (Dropbox, etc).

 * Use Git branch naming and branch merging conventions:

     Release preparation branches must start with "release/".
     Feature, Issues, Bug branches must start with "feature/".
     Hotfix branches must start with "hotfix/".

     Prefer git-extras and/or git-flow scripts for branching management.

## Building instructions
---
  To build the Solution you will need to have these dependencies installed

  You can use the following command to have all of them installed all at once:

  apt-get install $( cat README.md | grep *- | grep -v apt-get | sed s/\*-//gi )

  *- libsaes-framework-dev
  *- libgtkmm-3.0-dev

  After you have your environment ready, build steps are:
  sh scripts/create-release-makefiles.sh && make

  if you would like to create the .deb files, make sure you call
  sh scripts/create-package-deb.sh

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