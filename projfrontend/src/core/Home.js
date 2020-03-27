import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import "../styles.css";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const productTypes = ["popular", "latest", "upcoming", "onsale"];

	const loadAllProducts = () => {
		getAllProducts().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
				console.log("Product list fetched");
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base>
			<section className="" style={{ background: "#FFDBF5" }}>
				<div className="row">
					<div className="col-6 text-center">
						<div className="imgContainer" style={{ width: "40em" }}>
							<img src="./imgs/store.jpg" alt="store vector" />
						</div>
					</div>
					<div className="col-5">
						<div className="row h-100 align-items-center">
							<div className="row mx-0">
								<div className="display-4 font-weight-bold mb-5">
									Inspiring the next wave in <span className="text-primary">MERCHANDISE</span>
								</div>
								<h3 className="text-muted">Favourite Brands. Hottest Trends</h3>
							</div>
							<div className="row mx-0">
								{!isAuthenticated() && (
									<Link to="/signup" className="btn rounded btn-lg btn-outline-primary mr-5">
										Get Started
									</Link>
								)}
								<a href="#productsSection" className="btn rounded btn-lg btn-primary">
									See Products <i className="fas fa-caret-down"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="container mt-5" id="productsSection">
				<h1 className="font-weight-bold">Our products</h1>
				<div className="products-area">
					<div className="button-group">
						<button type="button" data-filter="*" className="active" id="btn1">
							All
						</button>
						<button type="button" data-filter=".popular">
							Popular
						</button>
						<button type="button" data-filter=".latest">
							Latest
						</button>
						<button type="button" data-filter=".upcoming">
							Upcoming
						</button>
					</div>
					<div className="row grid mt-5">
						{products.map((product, index) => {
							return (
								<div
									key={index}
									className={`col-lg-4 col-md-6 col-sm-12 element-item product mb-4 ${
										productTypes[Math.floor(Math.random() * productTypes.length)]
									}`}
								>
									<Card product={product} />
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</Base>
	);
};

export default Home;
