import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import adminLeftSide from "./helper/adminLeftSide";
import backBtn from "./helper/backBtn";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllProducts()
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		preload();
	}, []);

	const delProduct = productId => {
		deleteProduct(productId, user._id, token)
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
							<div className="card-header">
								Manage all the products here
							</div>
							<div className="card-body">
								{backBtn()}
								<h2 className="my-3">Total {products.length} products</h2>
								<ul className="list-group">
									{products.map((product, index) => {
										return (
											<li key={index} className="list-group-item">
												<div className="row">
													<h4 className="col-4">
														<span className="badge badge-primary">{index+1}</span>&emsp;	
														<span>{product.name}</span>
													</h4>
													<div className="col-2">
														<small>({product.category.name})</small>
													</div>
													<div className="col-3 text-right">
														<Link className="btn btn-success rounded" to={`/admin/product/update/${product._id}`}>
															<i className="fas fa-edit">&emsp;</i>Update
														</Link>
													</div>
													<div className="col-3 text-right">
														<button onClick={() => {delProduct(product._id)}} className="btn btn-danger rounded">
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

export default ManageProducts;
