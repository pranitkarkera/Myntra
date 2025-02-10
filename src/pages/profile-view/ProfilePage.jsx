import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByEmail, deleteUser, logout } from "../../reducer/userSlice";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (email) {
      dispatch(fetchUserByEmail(email));
    }
  }, [dispatch, email]);

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser(email))
        .unwrap()
        .then(() => {
          toast.success("Account deleted successfully!");
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
          <Link to="/" className="btn btn-primary mx-2">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary mx-2">
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
        <div className="col-md-6 text-center">
          <p className="fs-4 text-muted">Name: {user.name}</p>
          <p className="fs-4 text-muted">Email: {user.email}</p>
        </div>
        <div className="col-md-4 d-flex flex-column gap-2">
          <Link to={`/edit-profile/${email}`}>
            <button className="btn btn-primary w-100">Edit Profile</button>
          </Link>
          <button className="btn btn-warning w-100" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-danger w-100" onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
