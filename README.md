## Keystoke Profiles

### Build Process
The app was initialized with `create-react-app` so the build process is straightforward:

* `git clone`
* `cd ./keystoke-profiles && npm i`
* `npm start` will start your dev server

### Thought Process
This began as a user profiles implementation with React, Express and MongoDB however once Auth0 was incorporated (I <3 bonus points) the project took a slight veer. During the Auth0 implementation I discovered the user object received on authentication already had entries for `name` and `picture` (user image URL). This is due to Auth0 handling authentication through Google. I knew this profile object wasn't inherently mutable though it piqued my interest. After a good amount of research I discovered that this profile object can optionally contain a `user-metadata` object that IS mutable. This is perhaps not the most scalable approach as `user-metadata` may only contain 10 entries however I love trying something new so I ran with it, it certainly seems to be the right tool for the job. This project took a much more experimental turn than expected though I hope you can learn a little bit about me through this unorthodox implementation. 
