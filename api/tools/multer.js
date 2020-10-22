const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "client/public/uploads"));
    },
    filename: function(req, file, cb) {
        const sufix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.filename + '-' + sufix);
    },
    
});

const filterFilter = {};


module.exports = upload = multer({
    storage: storage,
    limits: {
        
    },
    fileFilter: function(req, res, cb) {

    }
});