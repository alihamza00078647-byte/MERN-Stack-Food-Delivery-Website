// External Modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');

// Local Modules
const { foodRouter } = require('./Router/foodRouter');
const { userRouter } = require('./Router/userRouter');
const { cartRouter } = require('./Router/cartRouter');
const { orderRouter } = require('./Router/orderRouter');


// Middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


    
// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



// Static folder
app.use("/images", express.static('uploads'));



const port = process.env.PORT;
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
    })
}).catch(() => {
    console.error("Error While Connecting To DB");
})