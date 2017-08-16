# Wrong version of python

## Error

```
prebuild WARN install No prebuilt binaries found (target=v6.1.0 arch=x64 platform=win32)
prebuild ERR! configure error
prebuild ERR! stack Error: Python executable "C:\Python34\python.EXE" is v3.4.2, which is not supported by gyp.
prebuild ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
```

## Cause

This happens when a dependent library has not been built to your current version of node.
Because of this, the pre-built version provided by `npm` is potentially unusable so `npm` attempts to rebuild it.
The rebuild fails because Python is either not installed or the `PATH` to python is set to the wrong verson (Python 3.x vs Python 2.x).

## Solution

1. Open the command prompt and type `npm config set python C:\Python27`
  - *Or wherever the correct version of python is installed.*
1. Then type: `npm install`

[more info](http://stackoverflow.com/a/21366601/402706)

# node-sass

## Error

```
ERROR in The `libsass` binding was not found in c:\SRSUI\MAIN\UI\Mobile\node_modules\node-sass\vendor\win32-x64-48\binding.node
This usually happens because your node version has changed. Run `npm rebuild node-sass` to build the binding for your current node version.
 @ ./~/style-loader!./~/css-loader!./~/sass-loader!./~/bootstrap-sass-loader/bootstrap-sass-styles.loader.js!./src/theme/bootstrap.config.js
 ```

## Solution

1. [Make sure you have installed C++ tools in Visual Studio.](http://stackoverflow.com/a/31955339/402706)
  - File | New Project - Install Visual C++ 2015 Toools for Windows Desktop.
2. Run `npm rebuild node-sass --python C:\Python27` (specify the path to python 2.x)

# Webpack

## Error

```
There is another module with an equal name when case is ignored
```

## Cause

On windows machines folder paths are case insensitive so a warning is issued
for modules referenced with identical paths but different casing. On a Linux
machine this would equate to a separate module entirely.

## Solution

- Make sure your `cmd` prompt is set to `C:\[path]` not `c:\[path]` (notice the casing of the drive letter)
- Make sure you aren't referencing modules with different cases `require('React');` vs `require('react');`

# net use

## Error

System error 5 has occurred.
Access denied

## Cause

[Access denied trying to connect to administrative shares on windows 7](https://helgeklein.com/blog/2011/08/access-denied-trying-to-connect-to-administrative-shares-on-windows-7/)

## Solution

```
Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
Value: LocalAccountTokenFilterPolicy
Data: 1 (to disable, 0 enables filtering)
Type: REG_DWORD (32-bit)
```

# Not Found / Permission Denied

## Error

Not found page or other navigation errors

## Cause

Wrong URL or miss-configuration

## Solution

See [Deployment Configuration](../configuration/deployment.md)

# Node 6.x won't install on windows 7

## Error

Error 1603

## Cause

[https://github.com/nodejs/node/issues/4329](https://github.com/nodejs/node/issues/4329)

## Solution

Disable Performance Counters from the node MSI.

# Cannot read property 'loginUrl' of undefined

## Error

Cannot read property 'loginUrl' of undefined in console after login

## Cause

Faulty DB connectionString in `wwwroot\web.config`

## Solution

Fix the connection string