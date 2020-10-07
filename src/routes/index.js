var express = require('express');
var router = express.Router();

/* GET home page. */
router.delete('/delete',function (req,res) {
  res.send(req.body)
})

module.exports = router;
