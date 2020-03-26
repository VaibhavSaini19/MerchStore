import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { API } from "../backend";


const Card = ({ product, addInCart = true, removeFromCart = false, setReload = f => f, reload }) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cardTitle = product ? product.name : "Title Unavailable";
	const cardDescription = product ? product.description : "Description Unavailable";
	const cardPrice = product ? product.price : "Price Unavailable";

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getRedirect = redirect => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = addInCart => {
		return (
			addInCart && (
				<button onClick={addToCart} className="btn btn-block btn-outline-success mt-2 mb-2">
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = removeFromCart => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from Cart
				</button>
			)
		);
	};

	return (
		<div className="card border">
			<img src={`${API}/product/photo/${product._id}`} alt="" className="card-img-top"/>
			<div className="card-body">
				{getRedirect(redirect)}
				<h3 className="card-title font-weight-bold">{cardTitle}</h3>
				<p className="lead font-weight-normal text-wrap">{cardDescription}</p>
				<button disabled className="btn btn-danger rounded btn-sm px-4 mr-1" style={{textDecoration: 'line-through'}}>$ {cardPrice*1.5}</button>
				<button className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</button>
				<div className="row mt-1">
					<div className="col-12">{showAddToCart(addInCart)}</div>
					<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
