const db = require('./db');
module.exports.handleUser = ( email, password ) => {
 // checks if email exists
 // saves as the user to database;
  db.saveUser({
      email: email,
      password: password
  });
 // send welcome email
};