import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import backBtn from "./helper/backBtn";
import adminLeftSide from "./helper/adminLeftSide";

const UpdateProduct  = ({match}) => {
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
		updatedProduct: "",
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
		updatedProduct,
		getRedirect,
		formData
	} = values;
    
    const preloadCategories = () => {
        getAllCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ categories: data, formData: new FormData()});
			}
		});
    }

	const preload = (productId) => {
		getProduct(productId).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
                preloadCategories();
                setValues({ 
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                    formData: new FormData()
                })
			}
		})
    };

	const onSubmit = e => {
		e.preventDefault();
        setValues({ ...values, error: "", loading: true });
		updateProduct(match.params.productId, user._id, token, formData)
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
						updatedProduct: data.name
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

	const updateProductForm = () => {
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
					Update Product
				</button>
			</form>
		);
    };
    
    const successMsg = () => {
        if(updatedProduct){
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {updatedProduct} updated successfully
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

    const errorMsg = () => {
        if(error){
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Failed to update Product
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	return (
			<Base>
				<div className="container my-5">
					<div className="row">
						<div className="col-3">
							{adminLeftSide()}
						</div>
						<div className="col-9">
							<div className="card mb-4">
								<div className="card-header">
									Update the product
								</div>
								<div className="card-body">
									{successMsg()}
									{errorMsg()}
									{backBtn()}
									{updateProductForm()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Base>
	);
};

export default UpdateProduct;
