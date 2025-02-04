import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByEmail, updateUser  } from "../../reducer/userSlice"; // Import the actions

const EditProfilePage = () => {
  const { email } = useParams(); // Get the email from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user); // Access user state

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (email) {
      dispatch(fetchUserByEmail(email)); // Fetch user details by email
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser  = { name, email, username }; // Prepare updated user data
    dispatch(updateUser (updatedUser )) // Dispatch update user action
      .unwrap()
      .then(() => {
        alert("Profile updated successfully!");
        navigate(`/profile-page/${email}`); // Redirect to the profile page
      })
      .catch((err) => {
        alert(err.message || "Failed to update profile.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
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
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfilePage;