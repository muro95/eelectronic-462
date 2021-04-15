import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
//make mongodb url parametric, have different value in different case
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/eelectronic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
});

const port = process.env.PORT || 5000;

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
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