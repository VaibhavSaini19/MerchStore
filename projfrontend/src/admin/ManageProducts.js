import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

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
		<Base 
			title="Welcome admin" 
			description="Manage products here"
			className="container bg-info p-4"
			>
				<div className="container bg-white rounded">
					<Link className="btn btn-outline-info rounded mt-2" to={`/admin/dashboard`}>
						<span className="">Home</span>
					</Link>
					<h2 className="mt-2">All products:</h2>
					<div className="row">
						<div className="col-12">
							<h2 className="text-center text-dark my-3">Total {products.length} products</h2>
							{products.map((product, index) => {
								return (
									<div key={index} className="row text-center mb-2 ">
										<div className="col-4">
											<h3 className="text-dark text-left">{index+1}. {product.name}</h3>
										</div>
										<div className="col-4">
											<Link className="btn btn-success rounded" to={`/admin/product/update/${product._id}`}>
												<span className="">Update</span>
											</Link>
										</div>
										<div className="col-4">
											<button onClick={() => {delProduct(product._id)}} className="btn btn-danger rounded">
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

export default ManageProducts;
