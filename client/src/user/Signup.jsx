import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../utils/utils-index";

const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false,
	});

	const { name, email, password, success, error } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: "",
			[name]: event.target.value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "" });
		signup({ name, email, password }).then((res) => {
			if (res.error) {
				setValues({ ...values, error: res.error, success: false });
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					error: "",
					success: true,
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

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{
				display: success ? "" : "none",
			}}
		>
			New account has been created. Please <Link to="/signin">sign in.</Link>
		</div>
	);

	const signupForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>
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
			title="Signup"
			description="Signup page for Node React E-commerce App"
			className="container col-md-8 offset-md-2"
		>
			{showError()}
			{showSuccess()}
			{signupForm()}
		</Layout>
	);
};

export default Signup;
