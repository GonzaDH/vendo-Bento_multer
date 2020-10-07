var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer')

const productController = require('../controllers/productController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images' ))
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/', productController.index)
router.get('/create', productController.create)
router.get('/detail/:id', productController.detail)

router.post('/store',upload.any(),productController.store)


router.delete('/delete',function (req,res) {
    console.log('DELETE!!');
})  
router.put('/update',productController.update)

module.exports = router