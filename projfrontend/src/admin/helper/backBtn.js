import React from "react";
import { Link } from "react-router-dom";

const backBtn = () => {
	return (
		<div className="">
			<Link to="/admin/dashboard" className="btn btn-sm btn-outline-info rounded mb-3">
				<i className="fas fa-home">&emsp;</i>Home
			</Link>
		</div>
	);
};

export default backBtn;
