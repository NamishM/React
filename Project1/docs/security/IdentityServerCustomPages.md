# Identity Server Custom Pages
Our implementation of Identity Server (Granite.IdentityServer) provides the ability to customize
certain pages presented to the user.

The pages a user may see are: (though some may be disabled or bypassed depending on client)
- Login
- Consent (where user can allow application access to different scopes/areas)
- Logout
- Error


## Custom Page Development
The custom pages are developed in the SRS Mobile project in order to benefit from the styles and themes
maintained for SRS Mobile.
The pages are distributed from this project to *Granite.IdentityServer/Content* by means of a separate bundle
generated specifically for pages intended for Identity Server.

Note: **login.router.js** contains the routes for these pages.


## Login
The custom login screen is served from *Granite.IdentityServer/Content/app/login.html*


### Identity Server PageLoad Data
Upon serving login.html, IdSvr will inject a JSON model into the page.  That model will appear similar to the following:
~~~~
{
   "loginUrl":"/SRSIdentityServer/login?signin=ea1f0908a1c1f3a0ebff0a7aa7ffe041",
   "antiForgery":{
      "name":"idsrv.xsrf",
      "value":"N1doKE_aI0xE1Zud5bsX3OOC0xCu6jv3_KjMWUFmakgIoNXBYxURwRZDQWuXsEViAv1TM7kpccvePjEL3B-D04vTUc81o8IGsmoeTn8ms4g"
   },
   "allowRememberMe":true,
   "rememberMe":false,
   "username":null,
   "externalProviders":[

   ],
   "additionalLinks":null,
   "clientName":"JavaScript Implicit Client - TokenManager",
   "clientUrl":"https://identityserver.io",
   "clientLogoUrl":null,
   "errorMessage":null,
   "requestId":"fd191b38-af8e-4537-8b50-0399b782a640",
   "siteUrl":"http://localhost/SRSIdentityServer/",
   "siteName":"IdentityServer3",
   "currentUser":null,
   "logoutUrl":"http://localhost/SRSIdentityServer/logout",
   "custom":null
}
~~~~
Some of this information comes from configuration specific to the client.   IdSvr determines what client
is requesting authentication and uses the passed-in clientId to identify the Client configuration and includes that
in the JSON. Some of this data is:
- "allowRemember", "clientName", "clientUrl"

Other data is specific to IdSvr implementation of the login process.

#### AntiForgery Token

The JSON data includes an `antiforgery` object.  The information in this object is used to ensure
that the user posting their credentials to IdSvr for login, was served the login page *from* IdSvr.

Therefore our custom login page must include the antiForgery name and value back in the post body when credentials are submitted.
We can provide this information by creating a hidden input form as below:

~~~~
<input type="hidden" name="idsrv.xsrf" value="3wR5LyxzZcDHIQ89y0jPPGXaSfLzfCrQKGHJVypy-iRBFK7AvMW25dV95ZNcRveMlapyoD28h3Q4AgcDqdUmUV55L6MgF-eH6QHJNjuIhRM">
~~~~

#### Form Post Action
The `loginUrl` in the JSON data specifies the Post Action that must be set on the form for IdSvr to accept the post.
This must be included in the form tag as below:
~~~~
<form method="post" action="/SRSIdentityServer/login?signin=bd10da169952479a5317bb414056b2a4" class="form-horizontal">
~~~~

