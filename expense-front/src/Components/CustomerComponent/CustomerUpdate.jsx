import React, { useState, useEffect } from "react";
import { getCustomerById, updateCustomer } from '../../Services/CustomerService';
import { useNavigate, useParams } from "react-router-dom";
import '../../LoginView.css';

const CustomerUpdate = () => {
    const [customer, setCustomer] = useState({
        customerId: "",
        username: "",
        customerName: "",
        address: "",
        email: "",
        mobile: "",
        occupation: "",
        status: ""
    });

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCustomerById(id).then((response) => {
            setCustomer(response.data);
        });
    }, [id]);

    const returnBack = () => {
        navigate('/customer-list');
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCustomer((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        const mobileStr = String(customer.mobile).trim();
        if (!customer.customerName.trim()) {
            formErrors.customerName = "Customer Name is required!";
        }
        if (!customer.address.trim()) {
            formErrors.address = "Customer Address is required!";
        }
        if (!mobileStr) {
            formErrors.mobile = "Mobile Number is required!";
        } else if (mobileStr.length !== 10) {
            formErrors.mobile = "Mobile Number must be 10 digits!";
        }
        if (!customer.occupation.trim()) {
            formErrors.occupation = "Customer Occupation is required!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const customerUpdate = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        updateCustomer(customer).then(() => {
            alert("Customer updated successfully");
            navigate('/customer-list');
        });
    };

    return (
        <div className="container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}>
                <div className="card-body">
                    <h2 className="text-center"><u>Update Customer</u></h2>
                    <br />
                    <form>
                        <div className="form-group">
                            <label>Customer Id: </label>
                            <input name="customerId" className="form-control" value={customer.customerId} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Status: </label>
                            <input placeholder="Status" name="status" className="form-control" value={customer.status} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group">
                            <label>Customer Name: </label>
                            <input placeholder="Customer Name" name="customerName" className="form-control" value={customer.customerName} onChange={onChangeHandler} />
                            {errors.customerName && (<p style={{ color: "red", fontSize: "14px" }}>{errors.customerName}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Address: </label>
                            <input placeholder="Address" name="address" className="form-control" value={customer.address} onChange={onChangeHandler} />
                            {errors.address && (<p style={{ color: "red", fontSize: "14px" }}>{errors.address}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Mobile: </label>
                            <input placeholder="Mobile" name="mobile" className="form-control" value={customer.mobile} onChange={onChangeHandler} />
                            {errors.mobile && (<p style={{ color: "red", fontSize: "14px" }}>{errors.mobile}</p>)}
                        </div>
                        <div className="form-group">
                            <label>Occupation: </label>
                            <input placeholder="Occupation" name="occupation" className="form-control" value={customer.occupation} onChange={onChangeHandler} />
                            {errors.occupation && (<p style={{ color: "red", fontSize: "14px" }}>{errors.occupation}</p>)}
                        </div>

                        <button type="submit" className="btn btn-success w-100 mt-3" onClick={customerUpdate}>Update</button>
                        <button type="button" className="btn btn-success w-100 mt-3" onClick={returnBack}>Return</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerUpdate;
