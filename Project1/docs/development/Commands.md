## Command Line

The following are command line tools you can use to launch, test, and deoploy the application.

- `npm start` : launch the development server with Hot Module Reloading (automatically hot-swaps application components when changes are made in code)
- `npm start -- login` : launch the development server for the login page
- `npm run build`: build & lint the application. Outputs to `./dist`
- `npm run build:deploy`: build & lint the application. Copy to `/inetpub/wwwroot/SRSUI/Mobile`
- `npm run build:deployProduction`: **DANGER! do not use** build & lint the application. Copy to `//devanywhere.srs.com/C$/SRSServer/WWW/SRSUI/Mobile`
- `npm run e2e`: execute automation tests via nunit console
- `npm run deployLogin`: copy the login page artifacts to the Identity Server
- `npm run cover`: run the unit tests and measure code coverage
- `npm run cover:deploy`: run the unit tests and measure code coverage and copy to: `//srsdevwiki.srs.com/C$/inetpub/wwwroot/Mobile`
- `npm run test`: build & lint the application and run unit tests
- `npm run test:watch`: build & lint the application, run the tests, automatically re-run tests as files are changed
- `npm run lint`: lint the application
- `npm run lint:fix`: lint the application and automatically apply fixes when possible
- `npm run buildDocs`: builds the documentation. Outputs to `./docsBuild`
- `npm run buildDocs:deploy`: builds the documentation and copies to: `//srsdevwiki.srs.com/C$/inetpub/wwwroot/Mobile`
