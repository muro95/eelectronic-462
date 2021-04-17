import React, { useEffect  } from 'react'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    /* useDispatch() help to dispatch any redux action inside react components */
    const dispatch = useDispatch();
    // Use useSelector to get object from redux store 
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() =>{
        /* send req to backend */
        dispatch(listProducts());
        /* this will help run only one time after rendering componenet */
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
             ) : (
            <div className="row center">
                 {
                    products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                   ))
                 }
            </div>
            )}   
        </div>
    );
}
