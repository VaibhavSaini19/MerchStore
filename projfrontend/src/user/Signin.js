import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = event => {
		event.preventDefault();
        setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then(data => {
                if(data.error){
            		setValues({ ...values, error: data.error, loading: false });
                }else{
                    authenticate(data, () => {
                        setValues({...values, didRedirect: true})
                    })
                }
            })
			.catch(err => console.log("Sigin in request failed: ", err));
    };
    
    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <p>Redir to admin dashboard</p>
            }else{
                return <p>Redir to user dashboard</p>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form action="">
						<div className="form-group">
							<label htmlFor="" className="text-light">
								Email
							</label>
							<input
								onChange={handleChange("email")}
								className="form-control"
								type="email"
								value={email}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="" className="text-light">
								Password
							</label>
							<input
								onChange={handleChange("password")}
								className="form-control"
								type="password"
								value={password}
							/>
						</div>
						<button onClick={onSubmit} className="btn btn-success btn-block">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	const loadingMsg = () => {
		return (
			loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
		);
	};

	const errorMsg = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Sign In page" description="A page for user to sign In">
            {loadingMsg()}
            {errorMsg()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
		</Base>
	);
};

export default Signin;
