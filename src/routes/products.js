var express = require('express');
var router = express.Router();

var path = require('path');
const multer = require('multer');

const validator = require("../middlewares/rutas/validator");

const productController = require('../controllers/productController');

const sayHello = require("../middlewares/rutas/sayHello");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images' ))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});
   
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const acceptedExtensions = [".jpg", ".jpeg", ".png"];

    const ext = path.extname(file.originalname);

    if (!acceptedExtensions.includes(ext)) {
      req.file = file;
    }

    cb(null, acceptedExtensions.includes(ext));
  },
});

// middleware


router.get('/', sayHello, productController.index);
router.get("/create", productController.create);
router.get('/detail/:id', productController.detail);

router.post("/store", upload.single("image"), validator.product, productController.store);


router.delete('/delete',function (req,res) {
    console.log('DELETE!!');
})  
router.put('/update',productController.update)

module.exports = router