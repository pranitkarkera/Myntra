import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/userSlice"; // Import the action
import { toast } from "react-toastify";

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
        console.log("User  data after login:", userData.user.email); // Log user data
        toast.success("Login successful!");
        navigate(`/profile-page/${userData.user.email}`);
      })
      .catch((err) => {
        toast.error(err.message || "Login failed.");
      });
  };

  const handleGuestLogin = () => {
    // Redirect to homepage as a guest user
    toast.success("Logged in as a guest!");
    navigate("/homepage");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-4 col-sm-6">
        {" "}
        {/* Adjust the column size here */}
        <h2 className="text-center">Login Profile</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-5">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={handleGuestLogin}
          >
            Login as Guest
          </button>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginProfilePage;
