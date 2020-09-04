import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import CreateCategory from "./admin/createCategory";
import CreateProduct from "./admin/createProduct";
import PrivateRoute from "./user/privateRoute";
import AdminRoute from "./user/adminRoute";
import Dashboard from "./user/userDashboard";
import AdminDashboard from "./user/adminDashboard";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/signin" exact component={Signin} />
			<Route path="/signup" exact component={Signup} />
			<PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} />
			<PrivateRoute path="/user/dashboard" exact component={Dashboard} />
			<AdminRoute path="/create/category" exact component={CreateCategory} />
			<AdminRoute path="/create/product" exact component={CreateProduct} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
