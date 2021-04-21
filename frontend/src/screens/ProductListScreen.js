import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    //get list of product from redux store, as the system already have list
    //product object from home screen
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
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

    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts());
    }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    const createHandler = () => {
        dispatch(createProduct());
    };
    return (
        <div>
            <div className="row">
                <h1 class='three-rem-title'>Products</h1>
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
                <div style={{ margin: "50px" }}>
                    <table className="table float-left w-55 m-10">
                        <thead>
                            <tr>
                                <th class='grid-label-purple'>ID</th>
                                <th class='grid-label-purple'>NAME</th>
                                <th class='grid-label-purple'>PRICE</th>
                                <th class='grid-label-purple'>CATEGORY</th>
                                <th class='grid-label-purple'>BRAND</th>
                                <th class='grid-label-purple'>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <div class='flex-center'>
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
                    <div class='float-right' id='orderlist-info'>
                        <div id='tip-label'><strong>Delete</strong></div>
                        <br></br>
                        <div class='tip-text'>Once deleted the item will be removed peramntly. The action can not be reverted.</div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div id='tip-label'><strong>Edit</strong></div>
                        <br></br>
                        <div class='tip-text'>Once the item is edited, changes will be take palce immediately within 5 minutes.</div>
                    </div>
                </div>
            )
            }
        </div >
    )
}
