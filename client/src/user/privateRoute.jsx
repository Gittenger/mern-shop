import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			checkAuthToken() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
			)
		}
	/>
);
export default PrivateRoute;
