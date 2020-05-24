import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import adminLeftSide from "../admin/helper/adminLeftSide";

const AdminDashBoard = () => {
	const {
		user: { name, email, role }
	} = isAuthenticated();

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h4 className="card-header">
					<div className="row justify-content-between px-3">
						<span>Admin Information</span>
						<span className="badge badge-danger p-2">Admin Area</span>
					</div>
				</h4>
				<div className="card-body">
					<ul className="list-group">
						<li className="list-group-item">
							<span className="badge badge-success mr-2 p-2">Name: </span> {name}
						</li>
						<li className="list-group-item">
							<span className="badge badge-success mr-2 p-2">Email: </span> {email}
						</li>
					</ul>
				</div>
			</div>
		);
	};

	return (
		<Base>
			<div className="container my-5">
				<div className="row">
					<div className="col-3">{adminLeftSide()}</div>
					<div className="col-9">{adminRightSide()}</div>
				</div>
			</div>
		</Base>
	);
};

export default AdminDashBoard;
