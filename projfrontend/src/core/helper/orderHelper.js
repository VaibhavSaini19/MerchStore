import { API } from "../../backend";

import React from "react";

export const createOrder = (userId, token, orderData) => {
	return fetch(`${API}/order/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ order: orderData })
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};
