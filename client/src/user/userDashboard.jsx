import React from "react";
import Layout from "../core/Layout";
import { auth } from "../utils/utils-index";

const { checkAuthToken } = auth;

const Dashboard = () => {
	const authState = checkAuthToken();

	return (
		<Layout title="Dashboard" description="User dashboard" className="container">
			<div className="card mb-5">
				<h3 className="card-header">User information</h3>
				<ul className="list-group">
					<li className="list-group-item">name</li>
					<li className="list-group-item">email</li>
					<li className="list-group-item">role</li>
				</ul>

				<div className="card">
					<h3 className="card-header">Purchase history</h3>
					<ul className="list-group">
						<li className="list-group-item">history</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;