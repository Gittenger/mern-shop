import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = checkAuthToken();

	const adminLinks = () => (
		<div className="card">
			<h4 className="card-header">Admin Links</h4>
			<ul className="list-group">
				<li className="list-group-item">
					<Link className="nav-link" to="/create/category">
						Create category
					</Link>
				</li>
				<li className="list-group-item">
					<Link className="nav-link" to="/create/product">
						Create products
					</Link>
				</li>
			</ul>
		</div>
	);

	const adminInfo = () => (
		<div className="card mb-5">
			{role === 1 ? (
				<h3 className="card-header">Admin dashboard</h3>
			) : (
				<h3 className="card-header">User information</h3>
			)}

			<ul className="list-group">
				<li className="list-group-item">{name}</li>
				<li className="list-group-item">{email}</li>
				<li className="list-group-item">
					{role === 1 ? "Admin" : "Registered user"}
				</li>
			</ul>
		</div>
	);

	return (
		<Layout title="Dashboard" description={`Hello ${name}`} className="container">
			<div className="row">
				<div className="col-3">{adminLinks()}</div>
				<div className="col-9">{adminInfo()}</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;