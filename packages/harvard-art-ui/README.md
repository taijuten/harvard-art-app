# GraphQL UI

## Running Locally
Assuming you are running the correct version of Node as specified in the main README.md, you can run the following commands:

#### Install Dependencies
```
yarn
```

#### Lint
```
yarn nx lint harvard-art-ui
```

#### Test
```
yarn nx test harvard-art-ui
```

#### Serve
```
API_KEY='foo' yarn nx serve harvard-art-ui
```
This should create a local server at http://localhost:4200

## Implementation
### NextJS
This has been built with NextJS / React, giving various options as to how the application could be served (such as SSR, or Static HTML generation).

### Query Params
The pagination has been tied to Query Parameters in the URL rather than in React State. This usually results in a better user-experience, as page refreshes then no longer cause a loss in page, as well as enabling users to share a URL to a specific page.

### State
Given the current functionality of the application, there has been no global state implemented (e.g. Redux). Any state is currently stored on a component-level or in the URL.

## Further Work
### Loading Placeholders
There is currently quite a bit of content reflow as images load in. In the current implementation, each image is a simple tag.
This should ideally be a combination of lazy loaded images, as well as placeholders, though some thought would need to go in to this due to how each art image can be different dimensions.

### Further filtering parameters
The GraphQL API has been built to accept parameters for page size, categorisation and verificationLevel. The UI does not currently make use of this, and so this would be a nice additional bit of functionality.

### CI / CD
Similarly to the API, I have not integrated with a CI Pipeline (such as CircleCI or Github actions).
It would be fairly trivial to do so, but felt out of scope for this code demonstration.

### Deployment
As above with the CI/CD, there is no current deployment mechanism. This NextJS site could be deployed as a static HTML file, or hosted for server-side rendering depending on the desired behaviour.

### `Act()` warnings in tests
There is a warning thrown in the unit tests around apollo-client triggering state changes within components. This appears to be related to [this github issue](https://github.com/apollographql/apollo-client/issues/5920).
