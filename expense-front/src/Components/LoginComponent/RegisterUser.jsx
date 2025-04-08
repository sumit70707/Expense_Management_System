import React, { useState } from "react";
import { registerNewUser } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";

const RegisterUser = () => {
    const [expenseUser, setExpenseUser] = useState({
        username: "",
        password: "",
        email: "",
        category: "",
    });

    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validateForm = () => {
        let formErrors = {};

        if (!expenseUser.username.trim()) {
            formErrors.username = "Username is required!";
        }

        if (!expenseUser.password) {
            formErrors.password = "Password is required!";
        } else if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
            formErrors.password = "Password must be 5 to 10 characters long!";
        }

        if (!password2) {
            formErrors.password2 = "Please confirm your password!";
        } else if (expenseUser.password !== password2) {
            formErrors.password2 = "Passwords do not match!";
        }

        if (!expenseUser.email.trim()) {
            formErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(expenseUser.email)) {
            formErrors.email = "Invalid email format!";
        }

        if (!expenseUser.category) {
            formErrors.category = "Please select a category!";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const saveNewUser = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        registerNewUser(expenseUser).then(() => {
            alert("User is registered successfully! Please log in.");
            navigate("/");
        });
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setExpenseUser((values) => ({ ...values, [name]: value }));
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={saveNewUser}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            className="form-control"
                            value={expenseUser.username}
                            onChange={onChangeHandler}
                        />
                        {errors.username && <p style={{ color: "red", fontSize: "14px" }}>{errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            value={expenseUser.password}
                            onChange={onChangeHandler}
                        />
                        {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        {errors.password2 && <p style={{ color: "red", fontSize: "14px" }}>{errors.password2}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="form-control"
                            value={expenseUser.email}
                            onChange={onChangeHandler}
                        />
                        {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Select Category</label>
                        <select
                            name="category"
                            className="form-control"
                            value={expenseUser.category}
                            onChange={onChangeHandler}
                        >
                            <option value="">Choose...</option>
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.category && <p style={{ color: "red", fontSize: "14px" }}>{errors.category}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
