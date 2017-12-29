'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/onemillionbooks-dev'
   // uri: 'mongodb://admin:passpass@ds133127.mlab.com:33127/million-books'
  },

  // Seed database on startup
  seedDB: false

};
