import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import './css/CartScreen.css'
// import './css/bootstrap.min.css'

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    //get cart from redux store using useSelector
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {//when ever use a variable in useEffect, also need to add that variable to the dependecy list of useEffect
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    //redirect user to signin to checkout
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };
    return (
        // <div className="row top">
        //     <div className="col-2">
        //         <h1>Shopping Cart</h1>
        //         {cartItems.length === 0 ? (
        //             <MessageBox>
        //                 Cart is empty. <Link to="/">Go Shopping</Link>
        //             </MessageBox>
        //         ) : (
        //             <ul>
        //                 {
        //                     cartItems.map((item) => (
        //                         <li key={item.product}>
        //                             <div className="row">
        //                                 <div>
        //                                     <img
        //                                         src={item.image}
        //                                         alt={item.name}
        //                                         className="small"
        //                                     ></img>
        //                                 </div>
        //                                 <div className="min-30">
        //                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
        //                                 </div>
        //                                 <div>
        //                                     <select
        //                                         value={item.qty}
        //                                         onChange={(e) =>
        //                                             dispatch(
        //                                                 addToCart(item.product, Number(e.target.value))
        //                                             )
        //                                         }
        //                                     >
        //                                         {
        //                                             [...Array(item.countInStock).keys()].map((x) => (
        //                                                 <option key={x + 1} value={x + 1}>
        //                                                     { x + 1}
        //                                                 </option>
        //                                             ))}
        //                                     </select>
        //                                 </div>
        //                                 <div>${item.price}</div>
        //                                 <div>
        //                                     <button
        //                                         type="button"
        //                                         onClick={() => removeFromCartHandler(item.product)}
        //                                     >Delete
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </li>
        //                     ))}
        //             </ul>
        //         )}
        //     </div>
        //     <div className="col-1">
        //         <div className="card card-body">
        //             <ul>
        //                 <li>
        //                     <h2>
        //                         Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
        //                         {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        //                     </h2>
        //                 </li>
        //                 <li>
        //                     <button
        //                         type="button"
        //                         onClick={checkoutHandler}
        //                         className="primary block"
        //                         disabled={cartItems.length === 0}
        //                     >
        //                         Proceed to Checkout
        //                     </button>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>

        <div>
            <div className="row top">
                <div className="col-2">
                </div>
            </div>
            <section id='my-cart'>
                <div id='title'>Shopping cart</div>
                <div class="item-container">
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    <div class="item label" id='detail-label'><strong>PRODUCT DETAILS</strong></div>
                    <div class="item label" id='quantity-label'><strong>QUANTITY</strong></div>
                    <div class="item label" id='price-label'><strong>PRICE</strong></div>
                    <div class="item label" id='total-label'><strong>TOTAL</strong></div>
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    <hr class="mt-2 mb-3" />
                    {
                        cartItems.map((item) => (
                            <>
                                <div class="item detail">
                                    <img src={item.image} alt={item.name} width="75" height="100"></img>
                                    <div class="description">
                                        <div class='name'><strong>{item.name}</strong></div>
                                        <br></br>
                                        <div class="id-label">
                                            <span>Product ID</span>
                                            <br></br>
                                            <span id='id'>{item.product}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item attr quantity"><div>
                                    <select class="quantity-selector"
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                            )
                                        }
                                    >
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    { x + 1}
                                                </option>
                                            ))}
                                    </select>
                                </div></div>
                                <div class="item attr price">${item.price}</div>
                                <div class="item attr total">${item.price * item.qty}</div>
                                <hr class="mt-2 mb-3" />
                                <hr class="mt-2 mb-3" />
                                <hr class="mt-2 mb-3" />
                                <hr class="mt-2 mb-3" />
                            </>
                        ))
                    }
                </div>
            </section >
            <section id='order-summary'>
                <div id='summary'>
                    <span id='order-summary-label'>ORDER SUMMARY</span>
                    <br></br>
                    <br></br>
                    <div id='item-label'>
                        <span class='name-label'>ITEMS</span>
                        <span class='amount-label float-right'>AMOUNT</span>
                    </div>

                    {
                        cartItems.map((item) => (
                            <div class='item'>
                                <span class='name'><strong>{item.name}</strong></span>
                                <span class='amount float-right'><strong>{item.qty}</strong></span>
                            </div>
                        ))
                    }
                    <br></br>
                    <div id='total-sub-total'>
                        <span class='name'>SUBTOTOAL (<strong>{cartItems.reduce((a, c) => a + c.qty, 0)}</strong> items)</span>
                        <span class='total-sub-total float-right'> <strong>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</strong></span>
                    </div>
                    <hr class="mt-3 mb-3" />
                    <div id='shipping'>
                        <span>
                            SHIPPING
                 </span>
                        <span class="float-right">
                            <strong>$0.00</strong>
                        </span>
                    </div>
                    <hr class="mt-3 mb-3" />
                    <div id='tax'> <span>
                        TAX
                 </span>
                        <span class='float-right'>
                            <strong>$0.00</strong>
                            {/* {cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.00} */}
                        </span>
                    </div>
                    <hr class="mt-3 mb-3" />
                    <div id='grand-total'>
                        <span>
                            TOTAL COST
                 </span>
                        <span class='float-right'>
                            <strong>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</strong>
                        </span>
                    </div>
                    <div id='checkout'>
                        <button class='check-out' type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                            <strong>Proceed to Checkout</strong>
                        </button>
                    </div>
                </div>
            </section>
        </div>

    );
}
