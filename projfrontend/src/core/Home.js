import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../styles.css";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProducts = () => {
		getAllProducts().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title="Home Page" description="Welcome to the Merch Store">
			<div className="row text-center">
				<h1 className="text-white">All products</h1>
				<div className="row">
					{products.map((product, index) => {
						return (
							<div key={index} className="col-4 mb-4">
								<Card product={product}/>
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default Home;
