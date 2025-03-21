import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../../reducer/userSlice";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  // Populate form fields when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, userId };
    dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate(`/profile-page/${userId}`);
      })
      .catch((err) => {
        setErrorMessage(err.message || "Failed to update profile.");
        setShowErrorModal(true); // Show the error modal
      });
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>

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

export default EditProfilePage;
