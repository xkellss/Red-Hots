import {useState, useEffect} from "react";

function OrdersPage() {

    return (
        <section>
            <h1> Your Orders</h1>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                    <input type="hidden" name="options" id="option1" autoComplete="off" checked /> All
                </label>
                <label className="btn btn-secondary">
                    <input type="hidden" name="options" id="option2" autoComplete="off"/> Active
                </label>
                <label className="btn btn-secondary">
                    <input type="hidden" name="options" id="option3" autoComplete="off"/> Completed
                </label>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Order Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Subtotal</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row"> 1234</th>
                    <td> Completed</td>
                    <td>3/26/2023</td>
                    <td>8:00 PM</td>
                    <td>Kelsey</td>
                    <td>$21.44</td>

                </tr>
                </tbody>
            </table>
        </section>
    );
}

export default OrdersPage;