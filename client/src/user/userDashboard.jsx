import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const Dashboard = () => {
	const {
		user: { _id, name, email, role },
	} = checkAuthToken();

	const userLinks = () => (
		<div className="card">
			<h4 className="card-header">User Links</h4>
			<ul className="list-group">
				<li className="list-group-item">
					<Link className="nav-link" to="/cart">
						My Cart
					</Link>
				</li>
				<li className="list-group-item">
					<Link className="nav-link" to="/profile/update">
						Update profile
					</Link>
				</li>
			</ul>
		</div>
	);

	const userInfo = () => (
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

	const purchaseHistory = () => (
		<div className="card mb-5">
			<div className="card">
				<h3 className="card-header">Purchase history</h3>
				<ul className="list-group">
					<li className="list-group-item">history</li>
				</ul>
			</div>
		</div>
	);

	return (
		<Layout title="Dashboard" description={`Hello ${name}`} className="container">
			<div className="row">
				<div className="col-3">{userLinks()}</div>
				<div className="col-9">
					{userInfo()}
					{purchaseHistory()}
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
