import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {createCategory} from "./helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const { user, token } = isAuthenticated();

	const backBtn = () => {
		return (
			<div className="mt-5">
				<Link to="/admin/dashboard" className="btn btn-sm btn-outline-info rounded mb-3">
					Home
				</Link>
			</div>
		);
	};

	const handleChange = e => {
		setError("");
		setName(e.target.value);
	};

	const onSubmit = e => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		createCategory(user._id, token, { name })
			.then(data => {
				if (data.error) {
					setError(true);
				} else {
					setError("");
					setSuccess(true);
					setName("");
				}
			})
			.catch();
	};

	const myCategoryForm = () => {
		return (
			<form action="">
				<div className="form-group">
					<p className="lead">Enter the category</p>
					<input
						onChange={handleChange}
						type="text"
						className="form-control my-3"
						autoFocus
						required
						placeholder="Summer"
						value={name}
					/>
					<button onClick={onSubmit} className="btn btn-info rounded mt-3">
						Create
					</button>
				</div>
			</form>
		);
    };
    
    const successMsg = () => {
        if(success){
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Category created successfully
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

    const errorMsg = () => {
        if(error){
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Failed to create category
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
            )
        }
    }

	return (
		<Base
			title="Create a Category"
			description="Add a new category for T-shirts"
			className="container bg-info p-4"
		>
			<div className="row bg-white rounded">
				<div className="col-md-8 offset-md-2">
                    {successMsg()}
                    {errorMsg()}
					{backBtn()}
					{myCategoryForm()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
