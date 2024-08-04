# TurboBard

A lightning-fast tabletop RPG audio solution.

Find and play atmospheric music and sound effects for your D&D or Pathfinder game in seconds, for free. 

Running in your phone or laptop's browser, TurboBard lets you react in real-time when the party goes somewhere unexpected.

## Scripts

> Be sure to install dependencies with `npm install` before starting development.

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`

Builds and minifies app for production to the `build` folder.

#### `npm run deploy`

Runs `build` and then commits and pushes the output to the remote `gh-pages` branch, deploying it immediately to the live GitHub Pages site. [More info](https://www.npmjs.com/package/gh-pages#command-line-utility).

After deploying, create a new tag with `git tag -a v1.2.3 -m "Description of update."`.

Push it to remote with `git push origin v1.2.3`.

### In the `functions` directory

> Be sure to install dependencies with `npm install` before starting development.

#### `npm run watch`

Recompile TypeScript functions to JavaScript whenever you save.

#### `npm run start`

Emulate cloud functions locally to test without having to deploy.

#### `npm run deploy`

Deploys any changes to the cloud functions.
