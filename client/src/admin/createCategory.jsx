import React, { useState } from "react";
import Layout from "../core/Layout";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const CreateCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = checkAuthToken();

	const handleChange = (e) => {
		setError(false);
		setName(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setError(false);
		setSuccess(false);
		// request to api for create category
	};

	const newCategoryForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					type="text"
					className="form-control"
					onChange={handleChange}
					value={name}
					autofocus
				/>
				<button className="btn btn-outline-primary">Create Category</button>
			</div>
		</form>
	);

	return;
	<Layout title="Create category" description="Create category page for Admin">
		<h2>Admin only route</h2>
	</Layout>;
};

export default CreateCategory;
