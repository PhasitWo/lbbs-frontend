import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [inputUserId, setInputUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUserId, setUsername, setIsAdmin } = useGlobalContext();

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:8000/member/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: inputUserId,
                    password: password,
                }),
            });
            if (res.status === 200) {
                let data = await res.json();
                console.log(data);
                localStorage.setItem("access_token", data.access_token);
                setUserId(data.user_id);
                setUsername(data.user_name);
                if (data.is_admin) {
                    setIsAdmin(true);
                    navigate("/admin");
                } else {
                    setIsAdmin(false);
                    navigate("/");
                }
            } else if (res.status === 401) alert("wrong credentials");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="login flex-column">
            <div className="fw-9 fs-50 text-white">Log-In</div>
            <div className="login-item flex flex-column flex-sb">
                <form onSubmit={handlesubmit}>
                    <div className="input-container fs-22">
                        <div>
                            <label htmlFor="userId">Student ID/Teacher ID</label>
                        </div>
                        <input
                            type="text"
                            className="text-input"
                            id="userId"
                            placeholder="Enter Student / Teacher ID"
                            onChange={(e) => setInputUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container fs-22">
                        <div>
                            <label htmlFor="password">Password</label>
                        </div>
                        <input
                            type="password"
                            className="text-input"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="login-button flex flex-c back-btn">
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
