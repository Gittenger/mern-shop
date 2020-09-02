import React from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../utils/utils-index";

const { removeAuthToken, checkAuthToken } = auth;

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "#ff9900",
		};
	} else
		return {
			color: "#ffffff",
		};
};

const Menu = ({ history }) => (
	<>
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item">
				<Link className="nav-link" style={isActive(history, "/")} to="/">
					Home
				</Link>
			</li>
			{!checkAuthToken() && (
				<>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(history, "/signin")}
							to="/signin"
						>
							Signin
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className="nav-link"
							style={isActive(history, "/signup")}
							to="/signup"
						>
							Signup
						</Link>
					</li>
				</>
			)}

			{checkAuthToken() && (
				<>
					<li className="nav-item">
						<span
							className="nav-link"
							style={{ cursor: "pointer", color: "#ffffff" }}
							onClick={() =>
								removeAuthToken(() => {
									history.push("/");
								})
							}
						>
							Signout
						</span>
					</li>
				</>
			)}
		</ul>
	</>
);

export default withRouter(Menu);
