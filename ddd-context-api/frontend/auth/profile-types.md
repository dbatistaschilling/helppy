#### (1.0.0) - profile types choice page
### Given (No user authenticated)

> <p>Page description:<br>
> Shows a welcome message, and the application logo on the top.<br>
> AT the middle of the page it shows two buttons:</p>
>
> - angel
> - mission
> <p>with a little explanation of each one of the profile types.</p>

### If the user chooses Angel:
- **backend/auth/create-anonymous-user**
- Redirects to:
  - frontend/angel-post-feed/feed

### If the user chooses Mission:
- Redirects to:
  - frontend/mission-profile/profile