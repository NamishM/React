# Silently Renewing Access Tokens

Silent Renew involves a number of moving pieces and quite honestly, a bit of "magic."
This page serves to document the magic (as we begin to understand the process) as well as
the current methodology of keeping tabs in synch.

## Overview

The [OIDC-Client](https://github.com/IdentityModel/oidc-client-js) provides an option called
`automaticSilentRenew` (configured in `src\auth\oidc.js`). When we to `true`, an iFrame called
`checksession` (hosted at http://localhost/SRSIdentityServer/connect/checksession) is injected
into the host application. From observation, it would appear that this page is capable of the
following behaviors:

1. Interrogating the current Access Token and monitoring for expiration.
1. Requesting a new token when the Redux action `redux-oidc/USER_EXPIRING` is called *(really just coincides with the action)*
1. Using a callback URL to process the token.
   - The page `silent_renew.html` is the configured callback url.
   - It is currently unclear how it is able to process the new token and update the parent application
1. Firing `redux-oidc/USER_FOUND` when a new token is set.

## Our process

Currently we let the silent renew feature function as is without trying to fire
it manually. Because of this, we must explicitly control the concept of a
"session timeout" because in the default scenario, the session will never timeout
on its own and the user will be logged in forever (*until their ID token expires*)

We control session by introducing the concept of an **Active User**. An active user
is someone who has performed an action (mouse movement, scroll wheel, touch, click etc.)
before a set limit of inactivity time elapses. If it is found that the user has not performed an
action within the set amount of inactivity time, they will be prompted and their session will
end unless the user intervenes and cancels the prompt.

The amount of allowable inactivity time is set in milliseconds in `config.js` with
the property `userIsIdleTimeout`.

## Tab synchronization

Each tab will be responsible for updating its own access tokens through the slient renew process.
If a tab detects activity, it will broadcast that status to the other tabs to prevent them
from firing an "inactive" user prompt.

If a tab does fire an inactive user prompt, then it will broadcast that it has done so to the
other tabs so they can display the prompt as well.
