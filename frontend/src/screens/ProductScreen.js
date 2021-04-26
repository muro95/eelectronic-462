import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import './css/ProductScreen.css'

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    //create hook to add quantity of product to add to cart, useState(1) as qty default value: 1
    const [qty, setQty] = useState(1);
    //Switch from showing products from static file int frontEnd,
    //we load products from product details in Redux 
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate, } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const signinRedirect = (e) => {
        e.preventDefault();
        window.location.href = '/signin';
    }
    let reviewCount = [0, 0, 0, 0, 0];
    // console.log(product.reviews)
    // product.reviews.forEach(review => {
    //     console.log('asd')
    //     // reviewCount[review.rating] += 1;
    // });
    // product.reviews.map((review) => (
    //     reviewCount[review.rating] += 1;
    // ))

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
    //function handle add to cart and direct user to cart screen using productId and qty
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    //posting comment and review
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                createReview(productId, { rating, comment, name: userInfo.name })
            );
        } else {
            alert('Please enter comment and rating');
        }
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    {/*<Link to="/">Back to result</Link>
                     <div className="row top">
                        <div className="col-2'">
                            <img className="large" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                <li>Price: ${product.price}</li>
                                <li>Description:
                            <p>{product.description}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        Seller{' '}
                                        <h2>
                                            <Link to={`/seller/${product.seller._id}`}>
                                                {product.seller.seller.name}
                                            </Link>
                                        </h2>
                                        <Rating
                                            rating={product.seller.seller.rating}
                                            numReviews={product.seller.seller.numReviews}
                                        ></Rating>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                {product.countInStock > 0 ? (
                                                    <span className="success">In Stock</span>
                                                ) : (
                                                    <span className="danger">Unavailable</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    { //codition to render, show select box only if the quantity is greater than 0
                                        product.countInStock > 0 && (//using empty container to push 2 element next to each other
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(
                                                                        x => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                        )
                                                                    )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                </li>
                                            </>
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div> */}
                    <div>
                        <Link to="/"><u>Back to result</u></Link>
                        <section id='main-panel'>
                            <section id='left-panel'>
                                <img id="product-image" src={product.image} alt={product.name}></img>
                            </section>
                            <section id='right-panel'>
                                <table>
                                    <tr>
                                        <th id='product-name'>{product.name}</th>
                                    </tr>
                                    <tr><hr id='hr-divider'></hr></tr>
                                    <br></br>
                                    <tr class='label'>
                                        <strong>${product.price}</strong>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <Rating
                                            rating={product.rating}
                                            numReviews={product.numReviews}
                                        ></Rating>
                                    </tr>
                                    <tr>
                                        <p>{product.description}</p>
                                    </tr>
                                    { //codition to render, show select box only if the quantity is greater than 0
                                        product.countInStock > 0 ? (//using empty container to push 2 element next to each other
                                            <>
                                                <tr className="row label">
                                                    Quantity
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(
                                                                x => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1} </option>
                                                                )
                                                            )}
                                                    </select>
                                                </tr>
                                                <br></br>
                                                <tr class='label'>
                                                    <button onClick={addToCartHandler} className="primary block" id='add-to-cart-btn'>Add to Cart</button>
                                                </tr>
                                            </>
                                        ) : (
                                            <>
                                                <tr className="row label">
                                                    Quantity
                                                    <select value={0} disabled>
                                                        {
                                                            <option key={0} value={0}>{0} </option>
                                                        }
                                                    </select>
                                                </tr>
                                                <br></br>
                                                <tr class='label'>
                                                    <button className="primary block" disabled id='add-to-cart-btn'>Out of Stock</button>
                                                </tr>
                                            </>
                                        )}
                                </table>
                            </section>
                        </section>
                        <div style={{ 'margin-top': '50%' }} id='main-panel'>
                            <hr></hr>
                            <h1 id="reviews">Customer reviews</h1>

                            {product.reviews.forEach(review => {
                                reviewCount[review.rating] += 1;
                            })
                            }

                            <br></br>
                            <ul>
                                <div id='review-stats'>
                                    {reviewCount.map((count, num) => (
                                        <>
                                            <Rating
                                                rating={num + 1}
                                                numReviews={count}
                                            ></Rating>
                                            <br></br>
                                        </>
                                    ))}
                                </div>
                                <div style={{ 'margin-left': '400px' }}>
                                    {product.reviews.map((review) => (
                                        <li key={review._id} className='review'>
                                            <span><strong className='review-name'>{review.name}</strong><Rating rating={review.rating} caption=" " class='flaot-left'></Rating></span>
                                            <br></br>
                                            <p className='review-time'>Review on {review.createdAt.substring(0, 10)}</p>
                                            <p className='review-body'>{review.comment}</p>
                                            <br></br>
                                            <hr></hr>
                                        </li>
                                    ))}

                                    <li>
                                        {userInfo ? (
                                            <form className="form" onSubmit={submitHandler}>
                                                <div>
                                                    <h1>Write a customer review</h1>
                                                </div>
                                                <div>
                                                    <label htmlFor="rating">Rating</label>
                                                    <select
                                                        id="rating"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="1">1 Star</option>
                                                        <option value="2">2 Star</option>
                                                        <option value="3">3 Star</option>
                                                        <option value="4">4 Star</option>
                                                        <option value="5">5 Star</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor="comment">Comment</label>
                                                    <textarea
                                                        id="comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div>
                                                    <label />
                                                    <button className="primary" type="submit">
                                                        Submit
                                                    </button>
                                                </div>
                                                <div>
                                                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                    {errorReviewCreate && (
                                                        <MessageBox variant="danger">
                                                            {errorReviewCreate}
                                                        </MessageBox>
                                                    )}
                                                </div>
                                            </form>
                                        ) : (
                                            <form className="form">
                                                <div>
                                                    <h1>Write a customer review</h1>
                                                    <h3>To maintain review accuracy we limit each user to leave maximum of 1 review. Please sign in first to leave a review</h3>
                                                    <button onClick={signinRedirect} className="primary block" id='submit-btn' style={{ 'width': '300px' }}>Sign in</button>
                                                </div>
                                                <div>
                                                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                    {errorReviewCreate && (
                                                        <MessageBox variant="danger">
                                                            {errorReviewCreate}
                                                        </MessageBox>
                                                    )}
                                                </div>
                                            </form>
                                            // <MessageBox>
                                            //     Please <Link to="/signin">Sign In</Link> to write a review
                                            // </MessageBox>
                                        )}
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    {/* <div style={{ 'margin-top': '50%' }}>
                        <h2 id="reviews">Reviews</h2>
                        {product.reviews.length === 0 && (
                            <MessageBox>There is no review</MessageBox>
                        )}
                        <ul>
                            {product.reviews.map((review) => (
                                <li key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} caption=" "></Rating>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                            <li>
                                {userInfo ? (
                                    <form className="form" onSubmit={submitHandler}>
                                        <div>
                                            <h2>Write a customer review</h2>
                                        </div>
                                        <div>
                                            <label htmlFor="rating">Rating</label>
                                            <select
                                                id="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="comment">Comment</label>
                                            <textarea
                                                id="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">
                                                Submit
                                    </button>
                                        </div>
                                        <div>
                                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                            {errorReviewCreate && (
                                                <MessageBox variant="danger">
                                                    {errorReviewCreate}
                                                </MessageBox>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <MessageBox>
                                        Please <Link to="/signin">Sign In</Link> to write a review
                                    </MessageBox>
                                )}
                            </li>
                        </ul>
                    </div> */}
                </div>
            )
            }
        </div >

    );
}
