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
			<div className="product">
				<h2 className="font-weight-bold">Your cart</h2>
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
		<Base>
			<div className="container rounded border py-5 my-5">
				<div className="row h-100 text-center justify-content-center align-items-center">
					<div className="col-4">{
						products.length > 0 ? 
						loadAllProducts(products) : 
						<div className="">
							<h3 className="mb-2">Here's your cart</h3>
							<div className="imgContainer"><img src="./imgs/empty.png" alt=""/></div>
							<h3 className="mt-3">Oh wait...its EMPTY!</h3>
						</div>
					}</div>
					<div className="col-6 text-center">
						{products.length > 0 ? (
								<Payment products={products} setReload={setReload}/>
							)
							: (
								<div className="">
									<h2>Add something in cart please</h2>
									<img src="./imgs/empty2.jpg" alt=""/>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</Base>
	);
};

export default Cart;
