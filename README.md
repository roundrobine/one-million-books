# one-million-books

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Development Environment
 
 - [Node.js and npm](nodejs.org) Node 6.9.4, npm 3.10.10
 - [MongoDB](https://www.mongodb.org/) MongoDB 3.2.1
 
### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies. 
(During `bower install` it might ask which angular version should be selected from a list. 
 Just choose option 1 from the list.)

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server and to create a local instance of the books database.

5. Stop the server with `ctrl + c`

6. Download locally million-books.zip from the root directory, extract books.json and import it into local MongoDB by executing:
 `mongoimport --db onemillionbooks-dev --collection books --drop --file full-path-to-the-file\books.json` 
 
7. Run `grunt serve` again. It should automatically open the client in your browser when ready.
Run `grunt build` for building and `grunt serve` for preview.

### Deployment and important information
 App is deployed on [Heroku](https://million-books.herokuapp.com/)
 When the app deployed on Heroku is not visited often it might went into sleep state. Therefore, the initial request to 
 the app URL might take around 15 seconds to wake up the app. 
 For the best UX it is highly recommended to run the app on your local environment. 
 The app is operating slightly slower on Heroku server, because I use free account with limited processing resources,
 like CPU and RAM memory. However the request to sort or to get a new documents from MongoDB is less than 1 second. 
 The Mongo DB is deployed to mLab on a free account limited to 500 mb disk space. 
 Because of this limitation there are 950418 books records in the mongoDB deployed on mLab. 
 The local file that I have added to the root directory of this project has 1001056 records. 
 When the app is run on a local environment the average request time without soring is around 35 ms and with sorting is 
 around 200 ms. 
