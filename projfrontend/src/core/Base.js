import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-dark text-white py-4",
	children
}) => {
	return (
		<div id="base">
			<Menu />
			<div className="container-fluid">
				<div className="jumbotron bg-dark text-white text-center py-1">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-5 pt-3">
				<div className="container-fluid bg-success text-white text-center py-3">
					<div className="row d-flex flex-row justify-content-around align-items-center">
						<h4>If you have any question, feel free to reach out</h4>
						<button className="btn btn-lg btn-warning rounded">Contact Use</button>
					</div>
				</div>
				<div className="container">
					<span className="text-muted">An amazing <span className="text-white">Merch</span> Store</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
