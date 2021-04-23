import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';


export default function UserListScreen(props) {
    const { pageNumber = 1} = useParams();
    const userList = useSelector(state => state.userList);
    const { loading, error, users, page, pages} = userList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers(pageNumber));
        dispatch({
            type: USER_DETAILS_RESET,
          });
    }, [dispatch, pageNumber]);
    return (
        <div>
            <h1>Users</h1>
            {
                loading ? (<LoadingBox></LoadingBox>)
                : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>IS SELLER</th>
                            <th>IS ADMIN</th>
                            <th>ACTIONS</th>
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
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => props.history.push(`/user/${user._id}/edit`)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                 </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row center pagination">
                    {
                        [...Array(pages).keys()].map(x => (
                            <Link className={x +1 === page? 'active' : ''} key={x + 1} to={`/userlist/pageNumber/${x + 1}`}>{x+1}</Link>
                        ))
                    }
                </div>
                </>
                )}
        </div>
    );
}
