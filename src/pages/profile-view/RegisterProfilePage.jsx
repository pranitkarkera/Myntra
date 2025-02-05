import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
import { registerUser } from "../../reducer/userSlice";

const RegisterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // Add state for username

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const newUser = { name, email, password, username }; // Include username
    dispatch(registerUser(newUser))
      .unwrap()
      .then((userData) => {
        console.log("User  data after registration:", userData);
        alert("Registration successful!");
        navigate(`/profile-page/${userData.user.email}`); // Redirect to the user's profile page
      })
      .catch((err) => {
        alert(err.message || "Registration failed.");
      });
  };

  const handleGuestLogin = () => {
    // Logic for guest login
    alert("Logged in as a guest!");
    navigate("/homepage"); // Redirect to homepage as a guest user
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-4 col-sm-6">
        {" "}
        {/* Adjust the column size here */}
        <h2 className="text-center">Register Profile</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-5">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={handleGuestLogin}
          >
            Login as Guest
          </button>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterProfilePage;
