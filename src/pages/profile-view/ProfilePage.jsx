import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, deleteUser, logout } from "../../reducer/userSlice";
import { FaUserCircle, FaHistory } from "react-icons/fa"; // Import FaHistory for the order history icon
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId && userId !== ":userId") {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser(userId))
        .unwrap()
        .then(() => {
          toast.success("Account deleted successfully!");
          localStorage.removeItem("jwtToken"); // Clear JWT token
          localStorage.removeItem("user"); // Clear user data
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.message || "Failed to delete account.");
        });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully!");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container py-5 mt-5 mb-5 text-center">
        <h3>You don't have an account.</h3>
        <div className="mt-5">
          <Link to="/signup" className="btn btn-primary btn-sm mx-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary btn-sm mx-2">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Account</h3>
      <hr />
      <div className="row align-items-center border border-1 bg-light p-3">
        <div className="col-md-2 text-center">
          <FaUserCircle style={{ fontSize: "100px" }} />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-start">
          <p className="fs-4 text-muted">Name: {user.name}</p>
          <p className="fs-4 text-muted">Email: {user.email}</p>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <div className="d-flex flex-column align-items-start gap-2">
            <Link to={`/edit-profile/${userId}`}>
              <button
                className="btn btn-primary custom-btn-sm"
                style={{
                  maxWidth: "150px",
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
              >
                Edit Profile
              </button>
            </Link>
            <button
              className="btn btn-warning custom-btn-sm"
              style={{
                maxWidth: "150px",
                padding: "5px 10px",
                fontSize: "12px",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="btn btn-danger custom-btn-sm"
              style={{
                maxWidth: "150px",
                padding: "5px 10px",
                fontSize: "12px",
              }}
              onClick={handleDeleteUser}
            >
              Delete Account
            </button>
            {/* Add Order History Icon */}
            <Link
              to={`/order-history/${userId}`}
              className="btn btn-info custom-btn-sm"
            >
              <FaHistory /> Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
