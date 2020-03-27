import React from "react";
import { NavLink } from "react-router-dom";

const adminLeftSide = () => {
	return (
		<div className="card">
			<h4 className="card-header font-weight-bold">Admin Navigation</h4>
			<div className="card-body">
				<ul className="list-group text-primary">
					<NavLink to="/admin/create/category" activeClassName="list-group-item-primary text-dark" className="nav-link font-weight-bold list-group-item">
						Create Categories
					</NavLink>
					<NavLink to="/admin/categories" activeClassName="list-group-item-primary text-dark"  className="nav-link font-weight-bold list-group-item">
						Manage Categories
					</NavLink>
					<NavLink to="/admin/create/product" activeClassName="list-group-item-primary text-dark"  className="nav-link font-weight-bold list-group-item">
						Create Product
					</NavLink>
					<NavLink to="/admin/products" activeClassName="list-group-item-primary text-dark"  className="nav-link font-weight-bold list-group-item">
						Manage Products
					</NavLink>
					<NavLink to="/admin/orders" activeClassName="list-group-item-primary text-dark"  className="nav-link font-weight-bold list-group-item">
						Manage Orders
					</NavLink>
				</ul>
			</div>
		</div>
	);
};

export default adminLeftSide;
