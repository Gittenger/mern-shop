import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			checkAuthToken() && checkAuthToken().user.role === 1 ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/", state: { from: props.location } }} />
			)
		}
	/>
);
export default AdminRoute;
