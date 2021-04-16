import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

//sending list of product to FE
productRouter.get('/', expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

//create product
productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
}));

//returning product details
productRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    //using await convert promis to data 
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({ message: 'Product Not Found'});
    }
}));

export default productRouter;