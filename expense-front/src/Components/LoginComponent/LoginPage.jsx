import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validateLoginForm = () => {
        const formErrors = {};
        if (!username.trim()) {
            formErrors.username = "Username is required!";
        }

        if (!password) {
            formErrors.password = "Password is required!";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const checkLogin = (e) => {
        e.preventDefault();

        if (!validateLoginForm()) return;

        validateUser(username, password).then((response) => {
            console.log("Full API Response:", response);
            let category = String(response.data);

            if (category === "Admin" || category === "Customer") {
                localStorage.setItem("userCategory", category);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("username", username);

                navigate(category === "Admin" ? "/AdminMenu" : "/CustomerMenu");
            } else {
                alert("Wrong User ID or Password");
            }
        });
    };

    return (
        <div className="container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={checkLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p style={{ color: "red", fontSize: "14px" }}>{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p style={{ color: "red", fontSize: "14px" }}>{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <br />
                <button className="btn btn-info" onClick={() => navigate("/Register")}>
                    Register New User
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
