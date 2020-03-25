import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "./helper/paymentHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = f => f, reload = undefined }) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {}
	});

	const { user, token } = isAuthenticated();
	const userId = user ? user._id : "";

	const getClientToken = (userId, token) => {
		getToken(userId, token).then(info => {
			if (info.error) {
				setInfo({ ...info, error: info.error });
			} else {
				const clientToken = info.clientToken;
				setInfo({ clientToken });
			}
		});
	};

	const showBraintreeDropin = () => {
		return (
			<div>
				{info.clientToken !== null && products ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={instance => {
								info.instance = instance;
							}}
						/>
						<button className="btn btn-success btn-block rounded " onClick={onPurchase}>
							Make Payment
						</button>
					</div>
				) : (
					<h3>Please Login or Add to something cart</h3>
				)}
			</div>
		);
	};

	useEffect(() => {
		if (user && products) {
			getClientToken(user._id, token);
		}
	}, []);

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance
			.requestPaymentMethod()
			.then(data => {
				nonce = data.nonce;
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getAmount()
				};
				processPayment(userId, token, paymentData)
					.then(res => {
						setInfo({ ...info, success: res.success, loading: false });
						const orderData = {
							products,
							transaction_id: res.transaction.id,
							amount: res.transaction.amount
						};
						createOrder(userId, token, orderData);
						cartEmpty(() => {
							console.log("Done");
						});
						setReload(!reload);
						console.log("SUCCESS");
					})
					.catch(err => {
						setInfo({ loading: false, success: false });
						console.log("Failure");
					});
			})
			.catch(err => console.log(err));
	};

	const getAmount = () => {
		let amount = 0;
		products.map((product, index) => {
			amount += parseInt(product.price);
		});
		return amount;
	};

	return (
		<div>
			Your total bill is: $ {getAmount()}
			{showBraintreeDropin()}
		</div>
	);
};

export default Payment;
