import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1 class='three-rem-title'> Order History </h1>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                        <div style={{ margin: "50px" }}>
                            <table className="table float-left w-55 m-10">
                                <thead>
                                    <tr>
                                        <th class='grid-label-purple'>ID</th>
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
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <a type="button" className="small"
                                                    onClick={() => {
                                                        props.history.push(`/order/${order._id}`);
                                                    }}
                                                >
                                                    <u>Details</u>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div class='float-right' id='orderlist-info'>
                                <div id='tip-label'><strong>Deliver</strong></div>
                                <br></br>
                                <div class='tip-text'>During pandemic delivery may be delayed. If the item is paid and was not delivered within 3 day after the estimated delivery time please contact customer support.</div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}
