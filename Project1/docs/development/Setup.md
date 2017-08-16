# Environment Setup

## 1. Install Prerequisites

- [node v4.x or v6.x](https://nodejs.org/en/) (check on the command line `node -v`)
- npm v3.x (check on the command line `npm -v`)
  - [Upgrade on Windows](https://www.npmjs.com/package/npm-windows-upgrade)
  - [Troubleshooting](https://github.com/npm/npm/wiki/Troubleshooting#upgrading-on-windows)
- [Automatically install dependencies](https://www.npmjs.com/package/windows-build-tools)
  - (Optional) Python 2.7 (incase you need to rebuild dependencies ex: node-sass)
  - (Optional) C++ developer tools (incase you need to rebuild dependencies)

## 2. Get Source Code

- Get latest on $/SRSUI/MAIN/

## 3. Install npm modules

**WARNING: DO NOT RUN FIDDLER WHILE EXECUTING THESE FUNCTIONS**

- Open the command prompt to `$/SRSUI/MAIN/UI/Mobile` and run `npm install`
  - *Note: run `npm update` if you've already run `npm install` [difference?](http://stackoverflow.com/questions/12478679/npm-install-vs-update-whats-the-difference)

## 4. Configure your tools

We're supporting VS 2015 and VS Code side by side. However, we are recommend you adopt VS Code for the following reasons:

1. Better support for our technology stack (JSX)
2. Faster - VS 2015 seems to choke when providing intelisense
3. In-line linting: Code checks are done for you in the editor

### VS 2015

- [Install Editor Config](https://visualstudiogallery.msdn.microsoft.com/c8bccfe2-650c-4b42-bc5c-845e21f96328) to respect the project tab settings in the .editorconfig file (VS2015)
- [NPM Scripts Task Runner ](https://visualstudiogallery.msdn.microsoft.com/8f2f2cbc-4da5-43ba-9de2-c9d08ade4941)
- [Improved JSX Intellisense](http://stackoverflow.com/a/36315840/3866040)
  - May require [React.js Starter Kit](https://visualstudiogallery.msdn.microsoft.com/d65d6b29-6dd7-4100-81b1-609e5afce356)

### VS Code

[VSCode (stable)](https://code.visualstudio.com/Download#stable-downloads) and [VSCode Insiders (latest)](https://code.visualstudio.com/Download#insiders) provides a slightly better experience for editing JS and JSX files.
For this reason we are encouraging engineers to evaluate this product for themselves to see if it will aid their productivity.

If you install VSCode and VSCode insiders side by side you'll have to install the plugins for each product independently.

- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Launch VS Code Quick Open (Ctrl+P), `ext install vscode-eslint`
- [TFS Extension](https://github.com/ivangabriele/vscode-tfs) - - Launch VS Code Quick Open (Ctrl+P), `ext install tfs`
  - This is useful for checking out ONLY.  Check-in using VISUAL STUDIO to preserve changesets.
- Preview Markdown files: `Ctrl+K V`

### Chrome

- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

### Terminal

You'll be spending a LOT more time using the command line than you're probably used to. For this reason, it's probably a good idea to upgrade your terminal.

- [ConEmu](https://conemu.github.io/) *FAST, reliable, my current GoTo...*
- [Hyper](https://hyper.is/) *LOTS of plugins, very active development*
- There are others out there as well.

## 5. Launch the application

1. Open the command prompt to `$/SRSUI/MAIN/UI/Mobile` and run `npm start`
  - *NOTE: for more commands see the [commands page](./commands.md)
1. Navigate to [localhost:3000/](http://localhost:3000/)
