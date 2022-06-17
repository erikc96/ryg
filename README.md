## Prequisites 
 * [Node.js version 18.3.0](https://nodejs.org/en/blog/release/v18.3.0/)
 * [Yarn](https://yarnpkg.com/)

 ## Running
 1. Run `yarn install` to install dependencies in both the `server` and `client` directories
 2. Run `yarn start` in the server directory to start the server. This will automatically populate the database with the data from `server/src/datasources/rygs.csv`
 3. Run `yarn start` in the client directory to start the client
 4. Navigate to http://localhost:3000 to see it running
 5. If you want to query against the GraphQL server, you can access it at http://localhost:4000