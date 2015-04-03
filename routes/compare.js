var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var diff = require('diff');

router.use('/', multer({ 
  dest: './uploads',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}));

router.post('/', function(req, res, next) {

  compare.read(req.files.file1)

  compare.read(req.files.file2)

  res.render('compare', { files: req.files })
});

var compare = {
  // 记录器
  content:{
  },
  read:function(file){

    var path = file.path
    var that = this
    fs.readFile(path,'utf-8',function (err,data) {
      if (err) throw err;

      that.content[file.fieldname] = data 

      if(that.getlength(that.content) > 1){
        that.diff()
      }
    });
  },
  getlength:function(json){
    var i = 0
    for(var k in json){
      i++
    }
    return i
  },
  diff:function(){
    console.log('start diff')
  }
}



module.exports = router;