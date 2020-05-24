import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import backBtn from "./helper/backBtn";
import adminLeftSide from "./helper/adminLeftSide";

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
					<p className="lead">Enter new name:</p>
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
			<Base>
				<div className="container my-5">
					<div className="row">
						<div className="col-3">
							{adminLeftSide()}
						</div>
						<div className="col-9">
							<div className="card mb-4">
								<div className="card-header font-weight-bold">
									Update category
								</div>
								<div className="card-body">
									{successMsg()}
									{errorMsg()}
									{backBtn()}
									{updateCategoryForm()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Base>
	);
};

export default UpdateCategory;
