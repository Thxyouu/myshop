var connection = require('../connect');
var express = require('express');
var session = require('express-session');
var router = express.Router();

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

  // Authentication route
  router.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
                          if (results[0].types === 'admin') {
                            const today = new Date();
                            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                            const currentDate = date+' '+time;
                            // ใช้วันที่ปัจจุบัน
                            const logadminData = {
                              logUsername: username,
                              logPassword: password,
                              logTime: currentDate
                            };
                            
                            const query = 'INSERT INTO logadmin SET ?';
                            
                            connection.query(query, logadminData, (error, results, fields) => {
                              if (error) {
                                console.error('Error inserting data:', error);
                              } else {
                                console.log('Data inserted successfully!');
                              }
                            });
            response.redirect('/admins_auth/adminsForm'); // เปลี่ยนเส้นทางไปยังหน้า products สำหรับ admin
          } else if (results[0].types === 'customer') {
            console.log(results);
            custtomerID = results[0].memberID
            console.log(custtomerID);
            response.redirect('/customers_auth/login/productsForm/' + custtomerID); // เปลี่ยนเส้นทางไปยังหน้า home สำหรับ customer
          }
        } else {
          response.send('Incorrect Username and/or Password!');
        }
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  });
  
module.exports = router;