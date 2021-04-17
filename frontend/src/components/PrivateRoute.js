import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //private route that only render components if user signin
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}