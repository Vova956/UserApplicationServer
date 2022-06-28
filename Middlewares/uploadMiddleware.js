const multer = require("multer");
const fs = require("fs");
const path = require("path");
var now = Date.now();

try{
    fs.mkdirSync(path.join(__dirname, "../images/"));
}
catch(error){
    if(error.code !== "EEXIST")
        throw error;
};

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images/users/"),
    filename: function(req, file, cb){
        now = Date.now();
        cb(null, now + path.extname(file.originalname));
    },
    limits: {
        fileSize: 1024*5
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        let extention = path.extname(file.originalname);
        req.image_name = now + path.extname(file.originalname);

        if(extention !== ".jpg" && extention !== ".jpeg"){
            return cb(new Error("Only images are allowed"));
        }

        cb(null, true);
    }
}).single("image");

module.exports = upload;