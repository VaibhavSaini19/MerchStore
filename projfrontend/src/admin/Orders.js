import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import adminLeftSide from './helper/adminLeftSide'
import backBtn from './helper/backBtn'
import {getAllOrders} from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const {user, token} = isAuthenticated();

    const userId = user._id;

    const loadOrders = () => {
        getAllOrders(userId).then(data => {
            // console.log("Orders: ", data)
            if(!data.error){
                setOrders(data);
            }
        })
    }

    useEffect(() => {
        loadOrders();
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
                                Manage orders here
                            </div>
                            <div className="card-body">
                                {backBtn()}
                                <ul className="list-group">
                                    {orders && orders.map((order, index) => {
                                        return (
                                            <li className="list-group-item">
                                                <h5>Status: <span className="badge badge-primary p-1">{order.status}</span></h5>
                                                <h5>Amount: <span className="badge badge-success p-1">{order.amount}</span></h5>
                                                <h5>Products:</h5>
                                                <div class="btn-group" role="group" aria-label="Basic example">
                                                    {order.products.map((product, ind) => {
                                                        return (
                                                            <button type="button" class="btn btn-info">{product.name}</button>
                                                            )
                                                    })}
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Orders
