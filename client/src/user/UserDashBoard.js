import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";


const UserDashBoard = () => {
	const {
		user: { name, email, role }
	} = isAuthenticated();

	return (
		<Base>
			<div className="container my-5">
				<div className="row"></div>
				<div className="card mb-4">
					<h4 className="card-header">
						<div className="row justify-content-between px-3">
							<span>User Information</span>
							<span className="badge badge-success p-2">User Area</span>
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
			</div>
		</Base>
	);
};

export default UserDashBoard;
