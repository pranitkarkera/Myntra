import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/userSlice"; // Import the action

const LoginProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginUser(credentials))
      .unwrap()
      .then((userData) => {
        console.log("User data after login:", userData.user.email); // Log user data
        alert("Login successful!");
        navigate(`/profile-page/${userData.user.email}`);
      })
      .catch((err) => {
        alert(err.message || "Login failed.");
      });
  };

  const handleGuestLogin = () => {
    // Redirect to homepage as a guest user
    navigate("/homepage");
  };

  return (
    <div className="container mt-5">
      <h2>Login Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-2"
          onClick={handleGuestLogin}
        >
          Login as Guest
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginProfilePage;
