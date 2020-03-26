import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#2ecc72" };
	} else {
		return { color: "#000" };
	}
};

const Menu = ({ history }) => {
	return (
		<nav className="navbar navbar-dark bg-dark sticky-top justify-content-between py-3">
			<a className="navbar-brand text-white">Navbar</a>
			<ul className="nav bg-dark">
				<li className="nav-item mx-2">
					<NavLink activeClass="active" exact className="nav-link text-white font-weight-bold" to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-item mx-2">
					<NavLink activeClass="active" exact className="nav-link text-white font-weight-bold" to="/cart">
						Cart
					</NavLink>
				</li>
				{isAuthenticated() && isAuthenticated().user.role === 0 && (
					<li className="nav-item mx-2">
						<NavLink
							activeClass="active" exact
							className="nav-link text-white font-weight-bold"
							to="/user/dashboard"
						>
							Dashboard
						</NavLink>
					</li>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 1 && (
					<li className="nav-item mx-2">
						<NavLink
							activeClass="active" exact
							className="nav-link text-white font-weight-bold"
							to="/admin/dashboard"
						>
							Admin Dashboard
						</NavLink>
					</li>
				)}
				{!isAuthenticated() && (
					<Fragment>
						<li className="nav-item mx-2">
							<NavLink activeClass="active" exact className="nav-link text-white font-weight-bold" to="/signup">
								Sign Up
							</NavLink>
						</li>
						<li className="nav-item mx-2">
							<NavLink activeClass="active" exact className="nav-link text-white font-weight-bold btn btn-primary rounded text-white" to="/signin">
								Sign In
							</NavLink>
						</li>
					</Fragment>
				)}
				{isAuthenticated() && (
					<li className="nav-item mx-2">
						<span
							className="nav-link text-white font-weight-bold"
							onClick={() => {
								signout(() => {
									history.push("/");
								});
							}}
						>
							Sign Out
						</span>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default withRouter(Menu);
