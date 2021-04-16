import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

//
dotenv.config();

const app = express();

//pause the the body of http req, passing JSON data in the body of req
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//make mongodb url parametric, have different value in different case
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/eelectronic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
});

const port = process.env.PORT || 5000;

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req, res) => {
    res.send('Server is read');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message:err.message });
});

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});

// const app = require('./app')
// const dotenv = require('dotenv');

// //Setiting up config file 
// dotenv.config({path: 'backend/config/config.env'})


// app.listen(process.env.PORT, () => {
//     console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
// })