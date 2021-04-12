import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function HomeScreen() {
    /* Manage the state of React components */
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() =>{
        /* send req to backend */
        const fecthData = async () =>{
            try{
            setLoading(true);
            const { data } = await axios.get('/api/products');
            setLoading(false);
            setProducts(data);  
            }catch(err){
                setError(err.message);
                setLoading(false);
            }
        };
        fecthData();
        /* this will help run only one time after rendering componenet */
    }, []);
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