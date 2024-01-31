var express = require('express');
var router = express.Router();
var mysql = require('../connect');
const multer = require('multer'); // เพิ่ม Multer


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:\\Users\\natta\\Documents\\storeproj\\projectstore\\app\\public\\SlipPayment'); // ชื่อโฟลเดอร์ที่คุณต้องการเก็บไฟล์
    },
    filename: function (req, file, cb) {
    const date = new Date();
    const timestamp = date.getTime(); // หาค่า timestamp ปัจจุบัน
    const fileExtension = file.originalname.split('.').pop(); // หานามสกุลของไฟล์
  
      //สร้างชื่อไฟล์ใหม่โดยใช้ timestamp และนามสกุลไฟล์
     const newFileName = `${file.originalname}.${fileExtension}`;
      cb(null, newFileName);
    },
  });

  const upload = multer({ storage: storage });

/* GET home page. */
router.post('/payment/:memberID', upload.single('SlipPayment'),(req, res)=>{
var values = [req.body];
var id = req.params.memberID;

console.log(values);

  var sql = 'INSERT INTO payment SET?';
  mysql.query(sql,values,(err,result)=>{
    if(err){
      res.send(err);
  } else{
    var sql = 'SELECT * FROM payment ORDER BY PaymentID DESC LIMIT 1';
    mysql.query(sql,(err,paymentResult)=>{
      if(err){
        res.send(err);
      } else{
        var sql3 = 'SELECT products.ProductName as ProductName, orders.Quantity as Quantity, orders.SubTotalPrice as SubTotalPrice FROM products JOIN orders ON products.ProductID = orders.ProductID WHERE orders.memberID = ? ORDER BY orderDate DESC LIMIT 3';
        mysql.query(sql3, id, (err, productResult) => {
          if (err) {
            res.send(err);
          } else {
            res.render('confirmPaymentForm', { payment: paymentResult, products: productResult });
            console.log('data is', { payment: paymentResult, products: productResult });
          }
        });
      }
    });
  }
});
});


module.exports = router;
