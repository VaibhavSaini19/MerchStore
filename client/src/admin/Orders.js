import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import adminLeftSide from './helper/adminLeftSide'
import backBtn from './helper/backBtn'
import {getAllOrders} from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        getAllOrders(user._id, token).then(data => {
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
                                <table className="table table-bordered table-hover table-striped text-center ">
                                    <thead className="table-success">
                                        <tr>
                                            <td scope="col">
                                                <button class="btn bg-light text-primary">
                                                    <strong>Status</strong>
                                                </button>
                                            </td>
                                            <td scope="col">
                                                <button class="btn bg-light text-primary">
                                                    <strong>Amount</strong>
                                                </button>
                                            </td>
                                            <td scope="col-6">
                                                <button class="btn bg-light text-primary">
                                                    <strong>Products</strong>
                                                </button>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.map((order, index) => {
                                            return (
                                                <tr>
                                                    <td>{order.status}</td>
                                                    <td>$ {order.amount}</td>
                                                    <td>
                                                        {order.products.map((product, ind) => {
                                                            return (
                                                                <button type="button" class="btn btn-outline-primary mx-1">{product.name}</button>
                                                                )
                                                            })}
                                                    </td>
                                                </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Orders
