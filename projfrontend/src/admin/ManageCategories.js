import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import adminLeftSide from "./helper/adminLeftSide";
import backBtn from "./helper/backBtn";

const ManageCategories = () => {
	const [categories, setCategories] = useState([]);

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllCategories()
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setCategories(data);
				}
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		preload();
	}, []);

	const delCategory = categoryId => {
		deleteCategory(categoryId, user._id, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					preload();
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<Base>
			<div className="container my-5">
				<div className="row">
					<div className="col-3">
						{adminLeftSide()}
					</div>
					<div className="col-9">
						<div className="card mb-4">
							<div className="card-header font-weight-bold">
								Manage exsisting categories here
							</div>
							<div className="card-body">
								{backBtn()}
								<h2 className="my-3">Total {categories.length} categories:</h2>
								<ul className="list-group">
									{categories.map((category, index) => {
										return (
											<li key={index} className="list-group-item">
												<div className="row">
													<h4 className="col-6">
														<span className="badge badge-primary">{index+1}</span>&emsp;
														<span>{category.name}</span>
													</h4>
													<div className="col-3">
														<Link className="btn btn-success rounded" to={`/admin/category/update/${category._id}`}>
															<i className="fas fa-edit">&emsp;</i>Update
														</Link>
													</div>
													<div className="col-3 text-right">
														<button onClick={() => {delCategory(category._id)}} className="btn btn-danger rounded">
															<i className="fas fa-trash-alt">&emsp;</i>Delete
														</button>
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default ManageCategories;
