import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import {createCategory, getAllCategories} from "./helper/adminapicall";
import adminLeftSide from "./helper/adminLeftSide";
import backBtn from "./helper/backBtn";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [categories, setCategories] = useState([]);

	const { user, token } = isAuthenticated();

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

	const loadAllCategories = () => {
		getAllCategories().then(data => {
			if (!data.error) {
				setCategories(data);
			}
		});
	}

	const myCategoryForm = () => {
		return (
			<form action="">
				<div className="form-group">
					<h5 className="lead">Enter the category</h5>
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
						<i className="fas fa-plus">&emsp;</i>Create
					</button>
				</div>
			</form>
		);
	};
	
	const productList = () => {
		return (
			<ul className="list-group">
				{categories.map((cat, index) => {
					return (
						<li className="list-group-item">{cat.name}</li>
					)
				})}
			</ul>
		)
	}
    
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
	
	useEffect(() => {
		loadAllCategories();
	}, [])

	return (
		<Base>
			<div className="container my-5">
				<div className="row bg-white rounded">
					<div className="col-3">
						{adminLeftSide()}
					</div>
					<div className="col-9">
						<div className="card mb-4">
							<div className="card-header font-weight-bold">
								Create a new category here
							</div>
							<div className="card-body">
								{successMsg()}
								{errorMsg()}
								{backBtn()}
								<div className="row">
									<div className="col-6">
										{myCategoryForm()}
									</div>
									<div className="col-6">
										<h5>Exsisting categories:</h5>
										{productList()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
