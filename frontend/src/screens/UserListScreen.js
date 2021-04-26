import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import './css/table.css'


export default function UserListScreen(props) {
    const { pageNumber = 1 } = useParams();
    const userList = useSelector(state => state.userList);
    const { loading, error, users, page, pages } = userList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers(pageNumber));
        dispatch({
            type: USER_DETAILS_RESET,
        });
    }, [dispatch, pageNumber]);
    return (
        <div style={{ margin: "50px" }}>
            <h1 className="three-rem-title">Users</h1>
            {
                loading ? (<LoadingBox></LoadingBox>)
                    : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <div id='left-container'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='grid-label-purple'>ID</th>
                                            <th className='grid-label-purple'>NAME</th>
                                            <th className='grid-label-purple'>EMAIL</th>
                                            <th className='grid-label-purple'>IS SELLER</th>
                                            <th className='grid-label-purple'>IS ADMIN</th>
                                            <th className='grid-label-purple'>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                                <td>
                                                    <a
                                                        type="button"
                                                        className="small"
                                                        onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                                    >
                                                        <u>Edit</u>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="row center pagination page-selector">
                                    {
                                        [...Array(pages).keys()].map(x => (
                                            <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/userlist/pageNumber/${x + 1}`}>{x + 1}</Link>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className='info-right'>
                                <div className='info-right-label'><strong>User Mangement</strong></div>
                                <br></br>
                                <div className='info-right-text'>Here you can manage what the site users to seller or to admin.</div>
                            </div>
                        </>
                    )}
        </div>
    );
}
