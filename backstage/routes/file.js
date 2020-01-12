var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.use(multer({ dest: "./public/images" }).any())
router.post('/', function (req, res) {
    var files = req.files[0];
    var oldname = files.filename;
    var newname = oldname + path.parse(files.originalname).ext;
    fs.renameSync("./public/images/" + oldname, "./public/images/" + newname)

    res.send({
        type: 2,
        data: 'images/' + newname
    });
});

module.exports = router;