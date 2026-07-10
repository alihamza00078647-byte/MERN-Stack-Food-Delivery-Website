const express = require('express');
const foodRouter = express.Router();

// Local
const { AddFood, listFood, removeList } = require('../Controller/foodController');
const multer = require('multer');



// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})


foodRouter.post('/add', upload.single("image"), AddFood);

foodRouter.get('/list', listFood);

foodRouter.post('/remove', removeList);




exports.foodRouter = foodRouter;