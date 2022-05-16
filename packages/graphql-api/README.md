# GraphQL API

## Running Locally
Assuming you are running the correct version of Node as specified in the main README.md, you can run the following commands:

#### Install Dependencies
```
yarn
```

#### Lint
```
yarn nx lint graphql-api
```

#### Test
```
yarn nx test graphql-api
```

#### Serve
Please make sure to replace the API_KEY as appropriate
```
API_KEY='foo' yarn nx serve graphql-api
```
This should create a local server at http://localhost:3333

## Implementation
### Serverless
This has been built as a single serverless function which can be deployed to AWS Lambda. The `serverless.yml` could equally be switched out with any other form of infrastructure as code, such as Cloudformation, Terraform or CDK.

### GraphQL
This is my first time using GraphQL (which seems quite nice!), and so there are no doubt some aspects of the implementation which could be improved.

My current understanding for how to structure the resolvers and schemas in a scalable way is perhaps lacking, and so I would no doubt iterate this current structure upon further feature additions.

### Caching
There is some very basic server-side caching for the API responses from the third party API. It simply uses the in-lambda memory for storing responses, using the parameters as the key. This is fairly primitive, and so in future iterations, should we wish to improve this, there are numerous other solutions such as either caching libraries, or external cache solutions (Elasticache, Redis, etc).

The most efficient mechanism would likely be to move the cache closer to the user, instead caching responses via something like Cloudfront. This would also have the benefit of reducing Lambda invocations and improve performance further.

## Known issues
### Filtering for "hasimages" not working as intended
Having followed the parameters at https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md#get-objects, I believe there is a bug with the API in which the `hasimage` filter is not working as intended. I have not attempted to fix this within the API, due to time constraints.

## Further Work
### Automated Tests surrounding GraphQL (Apollo Server)
As previously mentioned, this was my first time using GraphQL, for which I used Apollo Server.
I came across some [documentation](https://www.apollographql.com/docs/apollo-server/testing/testing) for implementing integration tests around Apollo Server, but due to my unfamiliarity with this and how it works, I was unable to perform my usual TDD approach.

### Environment variables
There are some hard-coded strings, such as the third party API URL. I would normally like to move this into an environment variable so that if the URL ever needs to change, a code change is not required. It would also prevent these URLs etc being exposed if the code were to be open-source.

### Code-first GraphQL schemas
In the current format, Typescript has not been fully leveraged. It would be beneficial to use something like `nexusjs` to create the schemas.

### CI / CD
For this example, I have not integrated with a CI Pipeline (such as CircleCI or Github actions).
It would be fairly trivial to do so, but felt out of scope for this code demonstration.

### Deployment
As above with the CI/CD, there is no current deployment mechanism. Using the included `serverless.yml` would enable this, but would require a little further work such as DNS records and Certificates.

### Performance Monitoring / Error Reporting
It would be a good idea to implement Performance / Transaction monitoring, particularly around the resolvers. This would help keep track of any performance regressions over time, and see if some additional work was needed in that area. Ideally this would also form part of the CI pipeline.

In addition, using an error reporting tool such as [Sentry](https://sentry.io/) would also be beneficial to give insight into any issues. For this purposes, the logging should also be fleshed out further.

### Transforming Source Response
Currently the properties passed back through the API are not transformed in any way. This leaves a vulnerability to breaking API changes from the third party provider.
If one of the properties is renamed, that effectively becomes a breaking change on this API too. In this case, it may be beneficial to transform the response to a standardised model.

### Type Duplication
There is currently some duplication between the Types used on both the API and the UI.
As this is within a monorepo, it would be cleaner to break this out into a common Types library, for inclusion into each package.

### API Documentation
Having not worked with GraphQL before, I am not sure as to the standard way of documenting your API. Having historically used Swagger/OpenAPI documentation for RESTful APIs, there is no doubt a tool to do something similar.
