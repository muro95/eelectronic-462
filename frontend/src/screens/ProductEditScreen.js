import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    //defind hook for product fills 
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
          }
        
        //if product is null then we need to load from backend or 
        //if product id not equal to new product id req, run detail product again to prevent showing previous info
        //also prevent old product info in edit screen after editing 
        if(!product || (product._id !== productId || successUpdate)){
            dispatch({type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            //if it contains value, set the fill with the data from backend 
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [ product, dispatch,productId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
              _id: productId,
              name,
              price,
              image,
              category,
              brand,
              countInStock,
              description,
            })
        );
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading ? (
                    <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name"
                            type="text" 
                            placeholder="Enter name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input 
                            id="price"
                            type="text" 
                            placeholder="Enter price" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input 
                            id="image"
                            type="text" 
                            placeholder="Enter image" 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input 
                            id="category"
                            type="text" 
                            placeholder="Enter category" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input 
                            id="brand"
                            type="text" 
                            placeholder="Enter brand" 
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="countInStock">Count In Stock</label>
                        <input 
                            id="countInStock"
                            type="text" 
                            placeholder="Enter countInStock" 
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            rows="3"
                            type="text" 
                            placeholder="Enter description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label></label>
                        <button className="primary" type="submit">
                            Update
                        </button>
                    </div>
                </>
                )}
            </form>
        </div>
    );
}
