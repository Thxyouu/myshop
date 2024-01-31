var express = require('express');
var router = express.Router();
var mysql = require('../connect');

router.get('/dashboard', (req, res) => {
    const sql = `SELECT SUM(SubTotalPrice) AS TotalSales
    FROM orders
    WHERE DATE(orderDate) = CURDATE()`;
    mysql.query(sql, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render('dashboard', { products: result });
  
        console.log(`Result from query: `, result); 
      }
    });
  });

  module.exports = router;