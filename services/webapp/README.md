# LearnMap Webapp


## Available Scripts

In the project directory, you can run:

### `npm start`

Builds and run the full app for production.

1. Your client (`/src`) is bundled by CRA
2. Your client (`/src`) is transpiled for SSR
3. Your server (`/ssr`) is transpiled for SSR
4. Localized strings are estracted from your app's source

### `npm run start:dev`

Builds and starts both API and CRA app in a single command.

- http://localhost:3000 serves the Webpack Dev Server as provided by CRA
- http://localhost:8080 serves the SSR app
- http://localhost:8080/api serves the GraphQL development interface

### `npm run build`

Builds the app for production to the `node_build` folder.<br>
This is needed for SSR to work properly.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Runs the `eslint` check in your terminal.<br>
Useful to integrate with CI tools.

ESLint should also work just fine with your IDE. I use VSCode and I'm happy.

### `npm run styleguide`

Runs the [react-styleguidist](https://react-styleguidist.js.org) examples in a
frontend project that does not require the entire app running.

Take a look at `./styleguide.config.js` to learn how to add components to it and
how to hack it so to match your app's needs.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn ForrestJS and React Server Side Rendering, check out the 
[ForrestJS documentation](https://forrestjs.github.io/).

## Licence

Copyright 2019 Marco Pegoraro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

