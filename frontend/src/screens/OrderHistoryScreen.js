import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import './css/table.css'

export default function OrderHistoryScreen(props) {
    const { pageNumber = 1, } = useParams();
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders, page, pages } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine({ pageNumber }));
    }, [dispatch, pageNumber]);
    return (
        <div style={{ margin: "50px" }}>
            <h1 className="three-rem-title"> Order History </h1>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                        (
                            <div id='table-main-container'>
                                <div style={{ margin: "50px" }}>
                                    <div id='left-container'>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className='grid-label-purple'>ID</th>
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
                                                        <td>{order.createdAt.substring(0, 10)}</td>
                                                        <td>${order.totalPrice.toFixed(2)}</td>
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
                                        <div className="row center pagination page-selector">
                                            {
                                                [...Array(pages).keys()].map(x => (
                                                    <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/orderlist/pageNumber/${x + 1}`}>{x + 1}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='float-right' className='info-right'>
                                        <div id='tip-label'><strong>Deliver</strong></div>
                                        <br></br>
                                        <div className='tip-text'>During pandemic delivery may be delayed. If the item is paid and was not delivered within 3 day after the estimated delivery time please contact customer support.</div>
                                    </div>
                                </div>
                            </div>
                        )




                        // <>
                        //     <table className="table">
                        //         <thead>
                        //             <tr>
                        //                 <th>ID</th>
                        //                 <th>DATE</th>
                        //                 <th>TOTAL</th>
                        //                 <th>PAID</th>
                        //                 <th>DELIVERED</th>
                        //                 <th>ACTION</th>
                        //             </tr>
                        //         </thead>
                        //         <tbody>
                        //             {orders.map((order) => (
                        //                 <tr key={order._id}>
                        //                     <td>{order._id}</td>
                        //                     <td>{order.createdAt.substring(0, 10)}</td>
                        //                     <td>{order.totalPrice.toFixed(2)}</td>
                        //                     <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                        //                     <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                        //                     <td>
                        //                         <button type="button" className="small"
                        //                             onClick={() => {
                        //                                 props.history.push(`/order/${order._id}`);
                        //                             }}
                        //                         >
                        //                             Details
                        //         </button>
                        //                     </td>
                        //                 </tr>
                        //             ))}
                        //         </tbody>
                        //     </table>
                        //     <div className="row center pagination">
                        //         {
                        //             [...Array(pages).keys()].map(x => (
                        //                 <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/orderlist/pageNumber/${x + 1}`}>{x + 1}</Link>
                        //             ))
                        //         }
                        //     </div>
                        // </>
                    )
            }
        </div>
    );
}
