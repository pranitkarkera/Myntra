import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/userSlice";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const guestEmail = "guest@gmail.com";
  const guestPassword = "Guest@123";

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginUser(credentials))
      .unwrap()
      .then((userData) => {
        console.log("User data after login:", userData.user._id);
        toast.success("Login successful!");
        navigate(`/profile-page/${userData.user._id}`);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Login failed.");
        setShowErrorModal(true); // Show the error modal
      });
  };

  const handleGuestLogin = () => {
    setEmail(guestEmail);
    setPassword(guestPassword);
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-4 col-sm-6">
        <h2 className="text-center">Login Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow mb-5"
        >
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
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginProfilePage;
