# PatternFly Metrics Dashboard

Adapted from the PatternFly seed app.

This project is a work-in-progress. Developed by the PatternFly Enablement team, 

Out of the box you'll get an app layout with chrome (header/sidebar), routing, build pipeline, test suite, and some code quality tools. Basically, all the essentials.

<img width="1058" alt="Out of box dashboard view of patternfly seed" src="https://github.com/user-attachments/assets/0227b366-67f1-4df8-8d92-e8e95d6e08b3" />

## Quick-start

```bash
git clone https://github.com/patternfly/patternfly-react-seed
cd patternfly-react-seed
npm install && npm run start:dev
```
## Development scripts
```sh
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run a production build (outputs to "dist" dir)
npm run build

# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start
```

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Raster image support

To use an image asset that's shipped with PatternFly core, you'll prefix the paths with "@assets". `@assets` is an alias for the PatternFly assets directory in node_modules.

For example:
```js
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```js
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading" />
```

## Vector image support
Inlining SVG in the app's markup is also possible.

```js
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.
```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Adding custom CSS
When importing CSS from a third-party package for the first time, you may encounter the error `Module parse failed: Unexpected token... You may need an appropriate loader to handle this file typ...`. You need to register the path to the stylesheet directory in [stylePaths.js](./stylePaths.js). We specify these explicitly for performance reasons to avoid webpack needing to crawl through the entire node_modules directory when parsing CSS modules.

## Code quality tools
* For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
* To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
* To ensure code styles remain consistent, we use [eslint](https://eslint.org/)

## Multi environment configuration
This project uses [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) for exposing environment variables to your code. Either export them at the system level like `export MY_ENV_VAR=http://dev.myendpoint.com && npm run start:dev` or simply drop a `.env` file in the root that contains your key-value pairs like below:

```sh
ENV_1=http://1.myendpoint.com
ENV_2=http://2.myendpoint.com
```


With that in place, you can use the values in your code like `console.log(process.env.ENV_1);`

## Live NPM Data Integration

The application now includes live NPM download data for design system comparison charts. The data is automatically fetched from the NPM Registry API and updates every 30 minutes.

### Features
- **Real-time Data**: Fetches actual download statistics from npmjs.org
- **Automatic Updates**: Refreshes every 30 minutes 
- **Manual Refresh**: Click "Refresh Now" button for immediate updates
- **Fallback Support**: Uses sample data if API is unavailable
- **Visual Indicators**: Shows data source status with color-coded indicators

### Packages Tracked
- `@patternfly/react-core` (PatternFly)
- `@shopify/polaris` (Shopify Polaris) 
- `@carbon/react` (Carbon Design)
- `@atlaskit/button` (Atlaskit)

### CORS Considerations
The app uses the public NPM Registry API (`api.npmjs.org`) which supports CORS. If you encounter CORS issues in your environment:

1. **Development**: Run with CORS disabled or use a proxy
2. **Production**: Deploy behind a reverse proxy that handles CORS
3. **Alternative**: The app will gracefully fallback to sample data

### Data Source
- API: `https://api.npmjs.org/downloads/range`
- Documentation: [NPM Registry API](https://github.com/npm/registry/blob/master/docs/download-counts.md)
- Rate Limits: Reasonable usage is acceptable
