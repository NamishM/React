# Deployment

## URLs

The server name must match in all configurable areas of the software:

- SRSIdentityServer/web.config
  - `ClientSettings` -> `BaseUri`
- SRSIdentityServer/Content/app/static/config.js
  - `apiUri`
  - `idSvr.authority`
- SRSUI/Mobile/static/config.js
  - `apiUri`
  - `idSvr.authority`
- [ClinicalSummarySource](http://srsdevwiki.srssoft.com/dbdoc/SRSFreedom/dbo/Views/vwUserProfileConfiguration/ClinicalSummarySource) in [ProfDefault](http://srsdevwiki.srssoft.com/dbdoc/SRSFreedom/dbo/Tables/PROFDEFAULT)
- inetpub/wwwroot/web.config
  - `appSettings` -> `key="identityServerUrl"`
- [WebServerRootURI](http://srsdevwiki.srssoft.com/dbdoc/SRSFreedom/dbo/Views/vwWorkStationConfiguration/WebServerRootURI) in [AvailableProperties](http://srsdevwiki.srssoft.com/dbdoc/SRSFreedom/dbo/Tables/AVAILABLEPROPERTIES)