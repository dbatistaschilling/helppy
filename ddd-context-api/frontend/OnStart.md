### On application opening

The frontend application verifies the device history:

 - if it confirms that no authentication has ever been performed on the users device, it is redirect to:
   - frontend/auth/profile-types

 - if it checks that the user has already auth on the device, but isn't logged in, it checks the users type and redirects to the profile specific auth page:
     - frontend/auth/angel-auth
     - frontend/auth/mission-auth

 - if it verifies that the user is already logged in, it checks the user type (Angel or Mission), and redirects it to its profile:
   - frontend/angel-post-feed/feed
   - frontend/mission-profile/profile

Local Storage
- User
  - hasEverLoggedIn: false
  
