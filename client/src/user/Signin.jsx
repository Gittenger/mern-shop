import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { auth } from "../utils/utils-index";

const { authUser, setAuthToken } = auth;

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, error, loading, redirectToReferrer } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: "",
			[name]: event.target.value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, loading: true, error: "" });
		authUser({ email, password }, { authRoute: "signin" }).then((res) => {
			if (res.error) {
				setValues({ ...values, error: res.error, loading: false });
			} else {
				setAuthToken(res, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{
				display: error ? "" : "none",
			}}
		>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading....</h2>
			</div>
		);

	const redirectUser = () => (redirectToReferrer ? <Redirect to="/" /> : "");

	const signInForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					onChange={handleChange("email")}
					type="email"
					className="form-control"
					value={email}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					value={password}
				/>
			</div>
			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<Layout
			title="Signin"
			description="Signin page for Node React E-commerce App"
			className="container col-md-8 offset-md-2"
		>
			{redirectUser()}
			{showLoading()}
			{showError()}
			{signInForm()}
		</Layout>
	);
};

export default Signin;
