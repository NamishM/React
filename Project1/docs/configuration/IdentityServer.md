# Identity Server Integration

SRS Anywhere delegates authentication and token provisioning to the Identity Server.
- Project:  *Granite.IdentityServer*
- Url (subject to change): [http://localhost/SRSIdentityServer/](http://localhost/SRSIdentityServer/)

SRS Anywhere data is provided via the generic WebAPI
- Project: *Granite.WebApi*
- Url: [http://localhost/SRSAPI/Generic/Help/](http://localhost/SRSAPI/Generic/Help/)
- Configured to allow Identity Server tokens for access

Therefore, SRS Anywhere and WebApi must be configured to communicate and trust IdentityServer.
Identity Server on the other hand will be configured to allow Mobile to use its auth services.

## Configuration
The configuration areas are as follows:

- **Mobile** - *config.js*
~~~
idSvr: {
authority: 'http://[IDENTITYSERVER-HOSTNAME]/SRSIdentityServer',
clientId: 'srs.anywhere',
scopes: 'srsclient',
},
~~~

- **SRSApi/Generic (Granite.WebApi)** - *web.config*
<br>
**Note** corsAllowOrigins allows for a comma separated list of urls.  If there are already urls, just append Mobile's url.
  Using  `value="*"` will allow all urls to make ajax requests to the api.
~~~
<add key="owin:AutomaticAppStartup" value="true" />
<add key="identityServerUrl" value="http://[IDENTITYSERVER-HOSTNAME]/SRSIdentityServer"></add>
<add key="corsAllowOrigins" value="http://[Mobile-HOSTNAME]/SRSUI/Mobile"></add>
~~~

- **SRSIdentityServer (Granite.IdentityServer)** - *web.config*
<br>
`<ClientSettings>` for SRS Anywhere needs the BaseUri for Mobile.
Example settings below:
~~~
<ClientSettings Name="SRS Anywhere" ClientId="srs.anywhere"..
                ....
                AccessTokenLifetime="1200" IdentityTokenLifetime="1200"
                BaseUri="http://[Mobile-HOSTNAME]"
                RedirectUris="/SRSUI/Mobile/login, /SRSUI/Mobile/silent_renew"
                PostLogoutRedirectUris="/SRSUI/Mobile/">
</ClientSettings>
~~~

- **SRSIdentityServer (Granite.IdentityServer)** - *\SRSIdentityServer\Content\app\dist\config.js*
~~~
window.config = {
  apiUri: 'http://[SRSAPI-HOSTNAME]/SRSAPI/Generic',
};
~~~

Most of the required settings will be consistent across installations.  The exception to this are the urls.

### Troubleshooting:

- Make sure the clientId (`srs.anywhere`) is present in both Mobile's config.js
AND in IdentityServer's web.config.
- The WebApi and Mobile must both use the same Url for IdeTnityServer.  (i.e. don't mix hostnames and IP Address.)
- Make sure Mobile's url is present in the WebApi's `corsAllowOrigins` list.
- Make sure Mobile's url is present in IdentityServer's `<ClientSettings BaseUri="..">`

## Connection Strings
Currently, both the WebApi and IdentityServer will have to contain the same connection strings listed in the same order.
This requirement may go away in favor of a parent-level config.


