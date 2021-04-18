import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

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

//create product API
productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: 'samle name ' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample cate',
        brand: 'sample',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample desc',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  );

//product update API
productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    //getting product from DB
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

export default productRouter;