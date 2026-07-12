const user = require('../Model/userModel');


// Add to Cart 
const AddToCart = async (req, res) => {
    try {
        // let userData = await user.findOne({_id: req.body.userId});
        let userData = await user.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await user.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success: true, message: "Add to Cart Successfully"});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// remove items from user cart
const removeFromCart = async (req, res) => {

    try {

        
        let userData = await user.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
    }
    await user.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success: true, message: "Removed from Cart Successfully"});

    } catch(error) {
        res.json({success: false, message: error.message});
    }

}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        
        let userData = await user.findById(req.body.userId);
        let cartData = await userData.cartData; 

        res.json({success: true, cartData});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}



module.exports = {
    AddToCart, removeFromCart, getCart
}