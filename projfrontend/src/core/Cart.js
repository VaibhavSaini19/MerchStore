import React, { useState, useEffect } from "react";
import Base from "./Base";
import "../styles.css";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from './Payment';

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = (products) => {
		return (
			<div>
				<h2>All cart products</h2>
				{products.map((product, index) => {
					return (
						<Card
							key={index}
							product={product}
							addInCart={false}
							removeFromCart={true}
							reload={reload}
							setReload={setReload}
						/>
					);
				})}
			</div>
		);
	};

	return (
		<Base title="Cart page" description="Ready to check out">
			<div className="row text-center">
				<div className="col-4 offset-1">{
					products.length > 0 ? loadAllProducts(products) : <h3>No Products in cart</h3>
				}</div>
				<div className="col-6 offset-1 text-center">
					{products.length > 0 ? (
							<Payment products={products} setReload={setReload}/>
						)
						: (
							<h2>Add something in cart please</h2>
						)
					}
				</div>
			</div>
		</Base>
	);
};

export default Cart;
