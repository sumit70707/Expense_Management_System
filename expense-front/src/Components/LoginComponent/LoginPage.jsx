import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const checkLogin = (e) => {
        e.preventDefault();

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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
