import React from "react";
import Base from "./Base";
import '../styles.css';

const Home = () => {
    // console.log("API is:", process.env.REACT_APP_BACKEND);
	return (
        <Base title="Home Page" description="Welcome to the Merch Store">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    );
};

export default Home;
