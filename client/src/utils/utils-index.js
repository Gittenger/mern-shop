import { API } from "../config-env";

export const auth = {
	//signup and signin
	authUser: function (user, options) {
		return fetch(`${API}/${options.authRoute}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.catch((err) => {
				console.log(err);
			});
	},
	setAuthToken: function (data, next) {
		if (window !== undefined) {
			localStorage.setItem("jwt", JSON.stringify(data));
		}
		next();
	},
	removeAuthToken: function (next) {
		localStorage.removeItem("jwt");
		next();
		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then((res) => {
				console.log("signout:", res);
			})
			.catch((err) => console.log(err));
	},
	checkAuthToken: function () {
		return typeof window == "undefined"
			? false
			: localStorage.getItem("jwt")
			? JSON.parse(localStorage.getItem("jwt"))
			: false;
	},
};
