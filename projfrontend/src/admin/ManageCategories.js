import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

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
		<Base 
			title="Welcome admin" 
			description="Manage categories here"
			className="container bg-info p-4"
			>
				<div className="container bg-white rounded">
					<Link className="btn btn-outline-info rounded mt-2" to={`/admin/dashboard`}>
						<span className="">Home</span>
					</Link>
					<h2 className="mt-2">All categories:</h2>
					<div className="row">
						<div className="col-12">
							<h2 className="text-center text-dark my-3">Total {categories.length} categories</h2>
							{categories.map((category, index) => {
								return (
									<div key={index} className="row text-center mb-2 ">
										<div className="col-4">
											<h3 className="text-dark text-left">{index+1}. {category.name}</h3>
										</div>
										<div className="col-4">
											<Link className="btn btn-success rounded" to={`/admin/category/update/${category._id}`}>
												<span className="">Update</span>
											</Link>
										</div>
										<div className="col-4">
											<button onClick={() => {delCategory(category._id)}} className="btn btn-danger rounded">
												Delete
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
		</Base>
	);
};

export default ManageCategories;
