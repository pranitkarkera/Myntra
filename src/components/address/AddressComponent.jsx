import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../reducer/addressSlice";

const AddressComponent = ({ onAddressAdded }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    name: "",
    number: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    addressType: "Home",
    default: false,
  });
  const [submittedAddress, setSubmittedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleShowForm = () => {
    setAddress({
      name: "",
      number: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      addressType: "Home",
      default: false,
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.number ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipCode
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await dispatch(addAddress(address)).unwrap();
      setSubmittedAddress(address);
      setShowForm(false);
      console.log("Address added successfully!");
      onAddressAdded();
    } catch (err) {
      setError(err.message);
      console.error("Failed to add address:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setAddress({
      name: "",
      number: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      addressType: "Home",
      default: false,
    });
    setSubmittedAddress(null);
    setShowForm(true);
  };

  const handleEdit = () => {
    setAddress((prev) => ({
      ...prev,
      addressType: "Home",
    }));
    setShowForm(true);
  };

  return (
    <div className="container mt-4">
      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <h5 className="fw-bold">Enter Address</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <input
            type="text"
            className="form-control mb-2"
            name="name"
            value={address.name}
            onChange={handleInputChange}
            placeholder="Name*"
          />
          <input
            type="number"
            className="form-control mb-2"
            name="number"
            value={address.number}
            onChange={handleInputChange}
            placeholder="Mobile No*"
          />
          <textarea
            className="form-control mb-2"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            placeholder="Address*"
            rows="2"
          ></textarea>
          <input
            type="text"
            className="form-control mb-2"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            placeholder="City*"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            placeholder="State*"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="country"
            value={address.country}
            onChange={handleInputChange}
            placeholder="Country*"
          />
          <input
            type="text"
            className="form-control mb-2"
            name="zipCode"
            value={address.zipCode}
            onChange={handleInputChange}
            placeholder="Zip code*"
          />
          <div className="mb-2">
            <button
              type="button"
              className={`btn ${
                address.addressType === "Home"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => setAddress({ ...address, addressType: "Home" })}
            >
              Home
            </button>
            <button
              type="button"
              className={`btn ${
                address.addressType === "Work"
                  ? "btn-primary"
                  : "btn-outline-primary"
              } ms-2`}
              onClick={() => setAddress({ ...address, addressType: "Work" })}
            >
              Work
            </button>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              name="default"
              checked={address.default}
              onChange={handleInputChange}
            />{" "}
            <label>Make Default Address</label>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding..." : "Add Address"}
          </button>
        </form>
      ) : (
        <div className="card p-3">
          <h5 className="fw-bold ">Select Delivery Address</h5>
          <div className="border p-3 rounded mb-3">
            <input type="radio" checked={true} readOnly className="me-2" />
            <strong>{submittedAddress.name}</strong>
            {submittedAddress.addressType === "Home" ? (
              <span className="badge bg-success ms-2">HOME</span>
            ) : (
              <span className="badge bg-secondary text-white ms-2">WORK</span>
            )}
            <p className="mb-1">
              {submittedAddress.street}, {submittedAddress.city},{" "}
              {submittedAddress.state} - {submittedAddress.zipCode}
            </p>
            <p className="mb-1">{submittedAddress.country}</p>
            <p className="mb-1">
              <strong>Mobile:</strong> {submittedAddress.number}
            </p>
            <p className="text-danger">* Pay on Delivery not available</p>
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-outline-danger" onClick={handleRemove}>
                REMOVE
              </button>
              <button className="btn btn-outline-primary" onClick={handleEdit}>
                EDIT
              </button>
            </div>
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={handleShowForm}
          >
            + Add New Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressComponent;