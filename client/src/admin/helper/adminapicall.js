import { API } from "../../backend";

import React from "react";

// Category calls

export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const updateCategory = (categoryId, userId, token, category) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ category })
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const getCategory = categoryId => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const getAllCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

// Product calls

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const getAllProducts = () => {
	return fetch(`${API}/products`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const getProduct = productId => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: product
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.catch(err => console.log(err));
};

// Order calls

export const getAllOrders = (userId, token) => {
	return fetch(`${API}/order/all/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
};
