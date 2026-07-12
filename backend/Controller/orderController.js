const Stripe = require('stripe');

// Local
const order = require('../Model/orderModel');
const user = require('../Model/userModel');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Place user order for frontend
const placeOrder = async (req, res) => {

    const frontendURL = "http://localhost:5173"

    try {
        const newOrder = new order({
            userId: req.body.userId, 
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await user.findByIdAndUpdate(req.body.userId, {cartData: {}});

        // Take Data from user
        let line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Push Product Info
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 10*100
            },
            quantity: 1
        })

        // Stripe payment method.
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success: true, session_url: session.url})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}




module.exports = {
    placeOrder
}