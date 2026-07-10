const food = require('../Model/foodModel');
const fs = require('fs');


const AddFood = async (req, res, next) => {
    const image_fileName = `${req.file.filename}`;

    const {name, description, price, category} = req.body;

    // console.log(image_fileName, name, description, price, category)

    const newFood = new food({
        name: name, description: description, price: price, image: image_fileName, category:category
    });

    try {
       await newFood.save();
       res.json({success:true, message: "Food Added"});
    } catch(error) {
        res.json({success:false, message: error.message});
    }
}

// List Food Item
const listFood = async (req,res, next) => {
    try {

        const foods = await food.find({});

        res.json({success: true, data: foods});
        
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}


// Remove Food List
const removeList = async (req, res, next) => {
    try {
        
        const foods = await food.findById(req.body.id);

    } catch (error) {

    }
}


module.exports = {
    AddFood, listFood, removeList
}
