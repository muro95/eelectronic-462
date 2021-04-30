import React, { useEffect } from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import bgimg from '../img/homebg.png';
import './css/HomeScreen.css'
import './css/ProductScreen.css'


export default function HomeScreen() {
    /* useDispatch() help to dispatch any redux action inside react components */
    const dispatch = useDispatch();
    // Use useSelector to get object from redux store 
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        /* send req to backend */
        dispatch(listProducts({}));
        /* this will help run only one time after rendering componenet */
    }, [dispatch]);
    return (
        <div>
            <div id='home-bg'>
                <div id="greet">
                    Welcome to <br></br>
                    E-Electronic
                </div>
                <div className="center azure" id='greet2'>
                    <h5>The World’s Most Affordable Eletronic Components</h5>
                </div>
            </div>
            <div id='featured-products'>
                <h2>Featured Products</h2>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                        <div className="row felx-left">
                            {
                                products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
