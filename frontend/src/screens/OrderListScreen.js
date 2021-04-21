import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants'


export default function OrderListScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
        dispatch({ type: ORDER_DELETE_RESET })
    }, [dispatch, successDelete]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    };
    return (
        <div>
            <h1 class="three-rem-title"> Orders </h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                                <th class='grid-label-purple'>ITEMS</th>
                                <th class='grid-label-purple'>USER</th>
                                <th class='grid-label-purple'>DATE</th>
                                <th class='grid-label-purple'>TOTAL</th>
                                <th class='grid-label-purple'>PAID</th>
                                <th class='grid-label-purple'>DELIVERED</th>
                                <th class='grid-label-purple'>ACTION</th>
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
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <div class='flex-center'>
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
                    <div class='float-right' id='orderlist-info'>
                        <div id='tip-label'><strong>Delete</strong></div>
                        <br></br>
                        <div class='tip-text'>Once deleted the item will be removed peramntly. There is no guarenteed that the item will be avalible again.</div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
