import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getRedirect: false,
		formData: ""
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		createdProduct,
		getRedirect,
		formData
	} = values;

	const preload = () => {
		getAllCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData()});
			}
		});
	};

	const backBtn = () => {
		return (
			<div className="mt-5">
				<Link to="/admin/dashboard" className="btn btn-sm btn-outline-info rounded mb-3">
					Home
				</Link>
			</div>
		);
	};

	const onSubmit = e => {
		e.preventDefault();
        setValues({ ...values, error: "", loading: true });
		createProduct(user._id, token, formData)
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
						description: "",
						price: "",
						photo: "",
                        stock: "",
                        error: false,
						loading: false,
						createdProduct: data.name
					});
				}
			})
			.catch(err => console.log(err));
	};

	const handleChange = name => e => {
		const val = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, val);
		setValues({ ...values, [name]: val });
	};

	const createProductForm = () => {
		return (
			<form>
				<span>Post photo</span>
				<div className="form-group">
					<label className="btn btn-block btn-outline-info rounded">
						<input
                            className="text-dark"
							onChange={handleChange("photo")}
							type="file"
							name="photo"
							accept="image"
							placeholder="choose a file"
						/>
					</label>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange("name")}
						name="photo"
						className="form-control"
						placeholder="Name"
						value={name}
					/>
				</div>
				<div className="form-group">
					<textarea
						onChange={handleChange("description")}
						name="photo"
						className="form-control"
						placeholder="Description"
						value={description}
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange("price")}
						type="number"
						className="form-control"
						placeholder="Price"
						value={price}
					/>
				</div>
				<div className="form-group">
					<select onChange={handleChange("category")} className="form-control" placeholder="Category">
						<option>Select</option>
						{categories &&
							categories.map((cat, index) => {
								return (
									<option key={index} value={cat._id}>
										{cat.name}
									</option>
								);
							})}
					</select>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange("stock")}
						type="number"
						className="form-control"
						placeholder="Quantity"
						value={stock}
					/>
				</div>

				<button type="submit" onClick={onSubmit} className="btn btn-info rounded mb-3">
					Create Product
				</button>
			</form>
		);
    };
    
    const successMsg = () => {
        if(createdProduct){
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {createdProduct} created successfully
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

    const errorMsg = () => {
        if(error){
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Failed to create Product
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

	useEffect(() => {
		preload();
	}, []);

	return (
		<div>
			<Base
				title="Welcome to product creation section"
				description="Add a product"
				className="container bg-info p-4"
			>
				<div className="row bg-white rounded">
					<div className="col-md-8 offset-md-2">
                        {successMsg()}
                        {errorMsg()}
						{backBtn()}
						{createProductForm()}
					</div>
				</div>
			</Base>
		</div>
	);
};

export default AddProduct;
