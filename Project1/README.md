![Mobile](./docs/mobile-logo.png)

[![repo]](https://tfs.srssoft.com/tfs/RELEASE/SRSUI/_versionControl)
[![semver]](http://semver.org)
[![build status]](https://tfs.srssoft.com/tfs/RELEASE/SRSUI/_build)
[![cover]](./coverage/lcov-report/index.html)
[![dependencies]](./distNoRx/stats.html)
[![issues]](http://testtrack2012.srs.com/ttweb/#Default/2/issues?tabID=606&filterID=61&page=0)


[semver]: http://img.shields.io/:semver-0.0.0-brightgreen.svg?style=flat-square
[repo]: https://img.shields.io/badge/repository-tfs-brightgreen.svg?style=flat-square
[cover]: https://img.shields.io/badge/coverage-yes-brightgreen.svg?style=flat-square
[unitTests]: https://img.shields.io/badge/tests-report-brightgreen.svg?style=flat-square
[build status]: https://tfs.srssoft.com/tfs/RELEASE/_apis/public/build/definitions/3924231d-ad0c-434b-bb48-4e91e51f27c2/1/badge
[dependencies]: https://img.shields.io/badge/dependencies-report-brightgreen.svg?style=flat-square
[issues]: https://img.shields.io/badge/issues-{{{issueCount}}}-yellow.svg?style=flat-square

Mobile is SRSsoft's EHR cloud solution. If you're hear for the first time and want to get involved, please see the contributing section below.

## Latest Builds

- SRS Mobile
  - \\\\srsdeploy\Development\Deployments (SRSUI_MAIN)\SRSAnywhere_(NoRX)
- Temporary RX Build for SRS Mobile (pre identity server integration)
  - \\\\srsdeploy\Development\Deployments (SRSUI_MAIN)\SRSAnywhere
- Identity Server UI
  - \\\\srsdeploy\Development\Deployments (SRSUI_MAIN)\SRSIdentityServerUI

## Contributing

Before making changes, please read through our [Contributing](./CONTRIBUTING.md) guidelines.
If you're unfamiliar with the technology stack, you might also want to check out the [training](./docs/training/README.md) section in the Documentation.

## Special Thanks

Mobile would not have been possible without the amazing efforts of the OS Community. [Thank You!](./docs/THANKS.md)

See the license info of our dependencies [here](./docs/ModuleLicenses.md)

## Documentation

* [Read Me](./docs/README.md)
* [Development](./docs/development/README.md)
  * [Environment Setup](./docs/development/Setup.md)
  * [CLI (run, build, test, deploy)](./docs/development/Commands.md)
  * [Airbnb Style Override](./docs/development/StyleOverride.md)
* [Configuration](./docs/configuration/README.md)
  * [Deployment](./docs/configuration/deployment.md)
  * [IIS Deployment](./docs/configuration/IIS.md)
  * [Webpack and Babel, and Mocha, oh my!](./docs/configuration/webpackbabel.md)
  * [NPM Scripting](./docs/configuration/npmScripting.md)
* [Introduction](./docs/introduction/README.md)
  * [Libraries](./docs/introduction/Libraries.md)
  * [Project Structure](./docs/introduction/ProjectStructure.md)
  * [Form Validation](./docs/introduction/FormValidation.md)
  * [Form Data](./docs/introduction/FormData.md)
* [Performance](./docs/performance/README.md)
* [Analytics](./docs/analytics/README.md)
* [Training](./docs/training/README.md)
  * [Inspiration](./docs/training/Inspiration.md)
  * [Exercise 0: ES Next](./docs/training/Exercise0.md)
  * [Exercise 1-1: Learn REACT!](./docs/training/Exercise1-1.md)
  * [Exercise 1: Redux Intro](./docs/training/Exercise1.md)
  * [Exercise 2: Backbone to React/Redux](./docs/training/Exercise2.md)
  * [Exercise 3: Redux Part 2](./docs/training/Exercise3.md)
* [Security](./docs/security/README.md)
  * [HTTPS](./docs/security/HTTPS.md)
  * [Identity Server](./docs/security/IdentityServer.md)
  * [Identity Server Custom Login](./docs/security/IdentityServerCustomLogin.md)
  * [Silently Renewing Access Tokens](./docs/security/SilentRenew.md)
* [WireFrame](./docs/wireframe/README.md)
  * [SRS Anywhere Wireframe](./docs/wireframe/WireFrame.md)
* [Troubleshooting](./docs/troubleshooting/README.md)
  * [Errors](./docs/troubleshooting/Errors.md)
  * [Large Bundles](./docs/troubleshooting/LargeBundles.md)


## TODO:

- Migrate to React Router v4 (pending redux-react-router compatibility)
- Enforce code coverage remains the same or gets better
- [Enforce file name conventions](https://github.com/selaux/eslint-plugin-filenames)
- Integrate Google's [invisible reCAPTCHA](https://www.youtube.com/watch?v=GeibaHfYW9o) on the login page to mitigate/prevent automated login attempts.
- Readup on [Turbofan](https://github.com/v8/v8/wiki/TurboFan)
- World's fastest [memoization library](https://github.com/caiogondim/fast-memoize.js)
- Pay attention to [React Fiber](http://isfiberreadyyet.com/)
- [Faster Builds with HappyPack?](https://github.com/amireh/happypack)
- Move Mobile sln to [VisualStudio 15](https://www.visualstudio.com/en-us/news/releasenotes/vs15-relnotes) for better JSX support
- Standardize Action naming convention. Probably will follow `namespace/action` convention
- Standardize on Object Spread since it's now [Stage 3](https://github.com/tc39/proposals)
- ~~[Investigate HTML Generator for generating index.html with assets](https://github.com/ampedandwired/html-webpack-plugin)~~
- [Integrate React Hot Loader 3](https://github.com/gaearon/react-hot-loader/releases) - [supports functional components](https://github.com/gaearon/react-hot-boilerplate/pull/61)
- ~~[Integrate Webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7) once out of beta~~
  - Be sure to update package.json once out of beta
- ~~Separate reducers from UI components~~
- ~~NYC/Istanbul code coverage is incorrect~~
- ~~Monitor status of [Babel-plugin-istanbul issue #4](https://github.com/istanbuljs/babel-plugin-istanbul/issues/4). Enable `"all": true,` when fixed.~~
- ~~[Add code coverage reporting for our unit tests](https://github.com/gotwarlost/istanbul)~~
- Consolidate common functionality with `webpack.config.js` and `webpack.config.production.js` into a common file.
  - Not sure this is worth while.
- ~~Investigate PostCSS, and PostCSS autoprefixer~~
- ~~Add eslint for JS and JSX linting~~
- Add Flow for type checking
- ~~Investigate IdentityServer3 (or 4) for token and identity management.~~
- Investigate [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant) or Immutable.js to ensure dev's avoid mutations
- Build Integration (Build, Run Tests, Run Automation Tests)
- ~~Clean up Mocha test output via mocha-clean~~
- Clean up dependencies in package.json (dev vs prod)
- Remove jQuery as a dependency: [react-bootstrap-multiselect](https://github.com/skratchdot/react-bootstrap-multiselect/issues/42)
- ~~Include React-Redux-Form~~
- ~~Include a validator library~~
- [Investigate generating the favicon](https://github.com/jantimon/favicons-webpack-plugin)
