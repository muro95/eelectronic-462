import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants'
import './css/table.css'


export default function OrderListScreen(props) {
    const { pageNumber = 1 } = useParams();
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders, page, pages } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '', pageNumber }));
    }, [dispatch, successDelete, sellerMode, userInfo._id, pageNumber]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div style={{ margin: "50px" }}>
            <h1 className="three-rem-title"> Orders </h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                                    <th className='grid-label-purple'>ITEMS</th>
                                    <th className='grid-label-purple'>USER</th>
                                    <th className='grid-label-purple'>DATE</th>
                                    <th className='grid-label-purple'>TOTAL</th>
                                    <th className='grid-label-purple'>PAID</th>
                                    <th className='grid-label-purple'>DELIVERED</th>
                                    <th className='grid-label-purple'>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {order.orderItems.map((item) => (
                                                <>
                                                    <span>{item.name}</span><br></br>
                                                </>
                                            ))}
                                        </td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            <div className='flex-center'>
                                                <a type="button" className="small"
                                                    onClick={() => {
                                                        props.history.push(`/order/${order._id}`);
                                                    }}
                                                >
                                                    <u>Details</u>
                                                </a>
                                                <a type="button" className="small"
                                                    onClick={() => deleteHandler(order)}><u>Delete</u></a>
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
                                        to={sellerMode ? (
                                            `/orderlist/seller/${userInfo.isSeller}/pageNumber/${x + 1}`
                                        ) : (
                                            `/orderlist/pageNumber/${x + 1}`)
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
                        <div className='tip-text'>Once deleted the item will be removed peramntly. There is no guarenteed that the item will be avalible again.</div>
                    </div>
                </div>
            )}
        </div >
        // <div>
        //     <h1> Orders </h1>
        //     {loadingDelete && <LoadingBox></LoadingBox>}
        //     {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        //     {loading ? (
        //         <LoadingBox></LoadingBox>
        //     ) : error ? (
        //         <MessageBox variant="danger">{error}</MessageBox>
        //     ) : (
        //         <>
        //             <table className="table">
        //                 <thead>
        //                     <tr>
        //                         <th>ID</th>
        //                         <th>USER</th>
        //                         <th>DATE</th>
        //                         <th>TOTAL</th>
        //                         <th>PAID</th>
        //                         <th>DELIVERED</th>
        //                         <th>ACTION</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {orders.map((order) => (
        //                         <tr key={order._id}>
        //                             <td>{order._id}</td>
        //                             <td>{order.user.name}</td>
        //                             <td>{order.createdAt.substring(0, 10)}</td>
        //                             <td>{order.totalPrice.toFixed(2)}</td>
        //                             <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
        //                             <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
        //                             <td>
        //                                 <button type="button" className="small"
        //                                     onClick={() => {
        //                                         props.history.push(`/order/${order._id}`);
        //                                     }}
        //                                 >
        //                                     Details
        //                         </button>
        //                                 <button type="button" className="small"
        //                                     onClick={() => deleteHandler(order)}>Delete</button>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        // <div className="row center pagination">
        //     {
        //         [...Array(pages).keys()].map(x => (
        //             <Link className={x + 1 === page ? 'active' : ''} key={x + 1}
        //                 to={sellerMode ? (
        //                     `/orderlist/seller/${userInfo.isSeller}/pageNumber/${x + 1}`
        //                 ) : (
        //                     `/orderlist/pageNumber/${x + 1}`)
        //                 }
        //             >{x + 1}
        //             </Link>
        //         ))
        //     }
        // </div>
        //         </>
        //     )}
        // </div>
    );
}
