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
         console.log("Userdata after registration:", userData);
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
    <div className="container mt-5">
      <h2>Register Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Register
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleGuestLogin}
        >
          Login as Guest
        </button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterProfilePage;
