import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const { pageNumber = 1, } = useParams();

    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    //get list of product from redux store, as the system already have list
    //product object from home screen
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;
    //getting data from product create in redux store 
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;


    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber }));
    }, [createdProduct, dispatch, props.history, successCreate, successDelete, sellerMode, userInfo._id, pageNumber]);

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    const createHandler = () => {
        dispatch(createProduct());
    };
    return (
        <div style={{ margin: "50px" }}>
            <div className="row">
                <h1 className='three-rem-title'>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div id='table-main-container'>
                    <div id='left-container'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='grid-label-purple'>ID</th>
                                    <th className='grid-label-purple'>NAME</th>
                                    <th className='grid-label-purple'>PRICE</th>
                                    <th className='grid-label-purple'>CATEGORY</th>
                                    <th className='grid-label-purple'>BRAND</th>
                                    <th className='grid-label-purple'>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <div className='flex-center'>
                                                <a type="button" className="small"
                                                    onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                                    <u>Edit</u>
                                                </a>
                                                <a type="button" className="small"
                                                    onClick={() => deleteHandler(product)}>
                                                    <u>Delete</u>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row center pagination page-selector">
                            {
                                [...Array(pages).keys()].map(x => (
                                    <Link className={x + 1 === page ? 'active' : ''} key={x + 1}
                                        to={sellerMode ?
                                            (`/productlist/seller/${userInfo.isSeller}/pageNumber/${x + 1}`)
                                            :
                                            (`/productlist/pageNumber/${x + 1}`)
                                        }
                                    >{x + 1}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className='float-right' className='info-right'>
                        <div id='tip-label'><strong>Delete</strong></div>
                        <br></br>
                        <div className='tip-text'>Once deleted the item will be removed peramntly. The action can not be reverted.</div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div id='tip-label'><strong>Edit</strong></div>
                        <br></br>
                        <div className='tip-text'>Once the item is edited, changes will be take palce immediately within 5 minutes.</div>
                    </div>
                </div>
            )
            }
        </div >

        // <div>
        //     <div className="row">
        //         <h1>Products</h1>
        //         <button type="button" className="primary" onClick={createHandler}>
        //             Create Product
        //         </button>
        //     </div>
        //     {loadingDelete && <LoadingBox></LoadingBox>}
        //     {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        //     {loadingCreate && <LoadingBox></LoadingBox>}
        //     {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        //     {loading ? (
        //         <LoadingBox></LoadingBox>
        //     ) : error ? (
        //         <MessageBox variant ="danger">{error}</MessageBox>
        //     ) : (
        //         <>
        //     <table className="table">
        //         <thead>
        //             <tr>
        //                 <th>ID</th>
        //                 <th>NAME</th>
        //                 <th>PRICE</th>
        //                 <th>CATEGORY</th>
        //                 <th>BRAND</th>
        //                 <th>ACTIONS</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {products.map((product) => (
        //                 <tr key = {product._id}>
        //                     <td>{product._id}</td>
        //                     <td>{product.name}</td>
        //                     <td>{product.price}</td>
        //                     <td>{product.category}</td>
        //                     <td>{product.brand}</td>
        //                     <td>
        //                         <button type="button" className="small"
        //                         onClick={() => props.history.push(`/product/${product._id}/edit`)}>
        //                             Edit
        //                         </button>
        //                         <button type="button" className="small"
        //                         onClick={() => deleteHandler(product)}>
        //                             Delete
        //                         </button>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     <div className="row center pagination">
        //     {
        //         [...Array(pages).keys()].map(x => (
        //             <Link className={x +1 === page? 'active' : ''} key={x + 1} 
        //                 to={sellerMode ? 
        //                     (`/productlist/seller/${userInfo.isSeller}/pageNumber/${x + 1}`)
        //                     :
        //                     (`/productlist/pageNumber/${x + 1}`)
        //                 }
        //                 >{x+1}
        //             </Link>
        //         ))
        //     }
        // </div>
        // </>
        //     )}
        // </div>
    )
}
