import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByEmail, deleteUser  } from "../../reducer/userSlice"; // Import the actions
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../reducer/userSlice";

const ProfilePage = () => {
  const { email } = useParams(); // Get the user email from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user); // Access user state

  useEffect(() => {
    if (email) {
      dispatch(fetchUserByEmail(email)); // Fetch user details by email
    }
  }, [dispatch, email]);

  const handleDeleteUser  = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser (email)) // Dispatch delete user action
        .unwrap()
        .then(() => {
          alert("Account deleted successfully!");
          navigate("/login"); // Redirect to login page after deletion
        })
        .catch((err) => {
          alert(err.message || "Failed to delete account.");
        });
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page
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
      <h3>Account</h3>
      <hr />
      {user && (
        <div className="row align-items-center border border-1 bg-light p-3">
          <div className="col-md-2 text-center">
            <FaUserCircle className="profile-icon" style={{ fontSize: "100px" }} />
          </div>
          <div className="col-md-6 text-center">
            {user && (
              <>
                <p className="fs-4 text-muted">Name: {user.name}</p>
                <p className="fs-4 text-muted">Email: {user.email}</p>
              </>
            )}
          </div>
          <div className="col-md-4 d-flex flex-column gap-2">
            <Link to={`/edit-profile/${email}`}>
              <button className="btn btn-primary bg-white text-dark border w-100">
                Edit Profile
              </button>
            </Link>
            <button className="btn btn-warning w-100" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-danger w-100" onClick={handleDeleteUser }>
              Delete Account
            </button>
          </div>
        </div>
      )}

      <div className="row mt-4 justify-content-center">
        <div className="col-md-4 mb-4 d-flex justify-content-center">
          <div className="border p-3 text-center" style={{ width: "100%", maxWidth: "250px" }}>
            <Link to="/checkout" style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <img
                  src="https://constant.myntassets.com/mymyntra/assets/img/profile-orders.png"
                  alt="Orders"
                  className="img-fluid mb-2"
                  style={{ maxWidth: "80px" }} // Smaller image size
                />
                <h5 className="text-muted" style={{ fontSize: "14px" }}>
                  Orders
                </h5>
                <p className="text-muted" style={{ fontSize: "12px" }}>
                  Check your order status
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-4 mb-4 d-flex justify-content-center">
          <div className="border p-3 text-center" style={{ width: "100%", maxWidth: "250px" }}>
            <Link to="/wishlist-page" style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <img
                  src="https://constant.myntassets.com/mymyntra/assets/img/profile-collections.png"
                  alt="Collections"
                  className="img-fluid mb-2"
                  style={{ maxWidth: "80px" }} // Smaller image size
                />
                <h5 className="text-muted" style={{ fontSize: "14px" }}>
                  Collections
                </h5>
                <p className="text-muted" style={{ fontSize: "12px" }}>
                  All your curated product collections
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-md-4 mb-4 d-flex justify-content-center">
          <div className="border p-3 text-center" style={{ width: "100%", maxWidth: "250px" }}>
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <img
                  src="https://constant.myntassets.com/mymyntra/assets/img/profile-address.png"
                  alt="Address"
                  className="img-fluid mb-2"
                  style={{ maxWidth: "80px" }} // Smaller image size
                />
                <h5 className="text-muted" style={{ fontSize: "14px" }}>
                  Address
                </h5>
                <p className="text-muted" style={{ fontSize: "12px" }}>
                  Save addresses for a hassle-free checkout
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;