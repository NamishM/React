# Webpack and Babel, and Mocha, oh my!

## Tools

### Webpack

Webpack is used to compile the project into various "bundles"
using configured loaders to handle various file types.

Webpack configuration is handled through:

- `webpack.config.js` (development)
- `webpack.production.config.js` (production)

Given a root file, webpack traverses the `require` and `import`
statements within javascript and the URIs within CSS and LESS. Upon finding
a file, webpack looks up the available loaders to see if it has any
that can handle the given file extension.

#### Example 1

Webpack encounters: `import module from 'mymodule.js'`

The extension is `.js` which matches the test regex `/\.jsx?$/` below (the `x` is optional)

```
loaders: [
  {
    loader: 'babel?cacheDirectory',

    // Skip any files outside of your project's `src` directory
    exclude: /node_modules/,

    // Only run `.js` and `.jsx` files through Babel
    test: /\.jsx?$/,
  },
  {
    test: /\.json$/,
    loader: 'json',
  },
  {
    test: /\.less$/,
    loader: 'style!css!postcss!less',
  },
  { test: /\.css$/, loader: 'style!css?&modules&importLoaders=1!postcss' },
  { test: /\.png$/, loader: 'url-loader?limit=100000' },
  {
    test: /\.(jpg|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=[hash].[ext]',
  },
]
```

That loader is configured to run the file through babel which is used to convert
ES2015 (*formally ES6*) code to ES5.

#### Example 2

Webpack encounters: `import classes from './myclasses.css'`

This one is a bit more complex. The file matched the test regex `/\.css$/` which is
configured with the loader `style!css?&modules&importLoaders=1!postcss`.

Let's unpack the syntax for this loader. First you read it right to left. The fully qualified command is actually:

`style!css?&modules&importLoaders=1!postcss!./myclasses.css`

Which can be written with the following pseudocode:
```
// loader interface: [stream] = loader([stream], options...)

style(
  css(
    postcss(
      getFile('./myclasses.css')
    )
    , {
      modules: true,
      importLoaders: 1
    }
  )
);

```

1. The file is retrieved and fed into the postcss loader
1. The css if transformed to add vendor prefixes via the postcss loader
  - `-moz-` (Firefox)
  - `-ms-` (IE)
  - `-o-` (Older versions of Opera)
  - `-webkit-` (Chrome, Safari, newer versions of Opera)
1. The output is fed into the css loader which is configured to convert
it to modules
  - modules mode generates a unique for each class in the css file
  - ```
//CSS input
.test {
  /*properties */
}
//output CSS
.sdf8SDF8sdf {
  /*properties */
}
//output JS
{
  test: 'sdf8SDF8sdf'
}
  ```
1. The output is fed into the style loader which adds the css as a `<style>`
to the page.


## Other configuration files

- [`.babelrc`](https://babeljs.io/docs/usage/babelrc/)
  - Babel configuration
- [`.editorconfig`](http://editorconfig.org/)
  - Open standard for configuring IDEs and text editors
  - Used for setting whitespace, tab handling, etc.
- [`.eslintignore`](http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories)
  - Files for the linter to ignore
- [`.eslintrc.json`](http://eslint.org/docs/user-guide/configuring#specifying-parser-options)
  - Linting plugins
- [`.istanbul.yml`](https://www.npmjs.com/package/istanbul)
  - Code coverage configuration. Main configuration via `nyc` section
  in package.json. `nyc` uses `istanbul` as a dependency
- [`.jsconfig.json`](https://code.visualstudio.com/Docs/languages/javascript#_javascript-projects-jsconfigjson)
  - Configuration for vscode on how to handle javascript
- `marked.setup.js`
  - Custom library for generating documentation
- `package.json`
  - Dependency configuration (the .csproj) of javascript
- `test.setup.js`
  - Helper file for setting up mocha tests.
- `.vscode/launch.json`
  - debugger integration for Chrome
- `.vscode/settings.json`
  - vscode settings override for the local environment
