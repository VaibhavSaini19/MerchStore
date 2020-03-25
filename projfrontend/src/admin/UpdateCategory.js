import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory  = ({match}) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		loading: false,
		error: "",
		updatedCategory: ""
	});

	const {
		name,
		loading,
		error,
		updatedCategory
	} = values;

	const preload = (categoryId) => {
		getCategory(categoryId).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
                setValues({ 
                    ...values,
                    name: data.name
                })
			}
		})
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
		updateCategory(match.params.categoryId, user._id, token, name)
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
                        error: false,
						loading: false,
						updatedCategory: data.name
					});
				}
			})
			.catch(err => console.log(err));
	};

	const handleChange = name => e => {
		setValues({[e.target.name]: e.target.value});
	};

	const updateCategoryForm = () => {
		return (
			<form action="">
				<div className="form-group">
					<p className="lead">Enter the category</p>
					<input
						onChange={handleChange("name")}
						name="name"
						type="text"
						className="form-control my-3"
						autoFocus
						required
						placeholder="Summer"
						value={name}
					/>
					<button onClick={onSubmit} className="btn btn-info rounded mt-3">
						Update
					</button>
				</div>
			</form>
		);
    };
    
    const successMsg = () => {
        if(updatedCategory){
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {updatedCategory} updated successfully
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
		preload(match.params.categoryId);
	}, []);

	return (
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
                        {updateCategoryForm()}
					</div>
				</div>
			</Base>
	);
};

export default UpdateCategory;
