import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import './css/ProductScreen.css'

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    //create hook to add quantity of product to add to cart, useState(1) as qty default value: 1
    const [qty, setQty] = useState(1);
    //Switch from showing products from static file int frontEnd,
    //we load products from product details in Redux 
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);
    //function handle add to cart and direct user to cart screen using productId and qty
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Back to result</Link>
                    <section id='main-panel'><section id='left-panel'>
                        <img id="product-image" src={product.image} alt={product.name}></img>
                    </section>

                        <section id='right-panel'>
                            <table>
                                <tr>
                                    <th id='product-name'>{product.name}</th>
                                </tr>
                                <tr><hr id='hr-divider'></hr></tr>
                                <br></br>
                                <tr class='label'>
                                    <strong>${product.price}</strong>
                                </tr>
                                <br></br>
                                <tr>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </tr>
                                <tr>
                                    <p>{product.description}</p>
                                </tr>
                                { //codition to render, show select box only if the quantity is greater than 0
                                    product.countInStock > 0 && (//using empty container to push 2 element next to each other
                                        <>
                                            <tr className="row label">
                                                Quantity
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(
                                                            x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                            )
                                                        )}
                                                </select>
                                            </tr>
                                            <br></br>
                                            <tr class='label'>
                                                <button onClick={addToCartHandler} className="primary block" id='add-to-cart-btn'>Add to Cart</button>
                                            </tr>
                                        </>
                                    )}
                            </table>
                        </section>
                    </section>


                    {/* <div className="row top">
                        <div className="col-2'">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                <li>Price: ${product.price}</li>
                                <li>Description:
                            <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    { //codition to render, show select box only if the quantity is greater than 0
                                        product.countInStock > 0 && (//using empty container to push 2 element next to each other
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(
                                                                        x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                        )
                                                                    )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                </li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            )}
        </div>

    );
}
