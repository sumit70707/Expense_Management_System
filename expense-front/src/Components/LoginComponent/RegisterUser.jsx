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
    let navigate = useNavigate();

    const saveNewUser = (event) => {
        event.preventDefault();
        if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
            alert("Password must be between 5 to 10 characters long");
            return;
        }
        if (expenseUser.password === password2) {
            registerNewUser(expenseUser).then(() => {
                alert("User is registered successfully! Please log in.");
                navigate("/");
            });
        } else {
            alert("Passwords do not match");
            return;
        }
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            value={expenseUser.password}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="form-control"
                            value={expenseUser.email}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Select Category</label>
                        <select
                            name="category"
                            className="form-control"
                            value={expenseUser.category}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="">Choose...</option>
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;

