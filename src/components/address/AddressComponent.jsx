import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  fetchAddressesByUser,
  deleteAddress,
  updateAddress,
} from "../../reducer/addressSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Modal, Button, Form } from "react-bootstrap";

const AddressComponent = ({ onAddressAdded, onAddressSelected }) => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.addresses || []);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isEditing, setIsEditing] = useState(false); // Editing mode
  const [address, setAddress] = useState({
    name: "",
    number: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    addressType: "Home",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded._id); // Assuming _id is the field for userId in your JWT payload
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        localStorage.removeItem("jwtToken"); // Remove invalid token
        toast.error("Invalid session. Please log in again.");
        setUserId(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddressesByUser(userId));
    }
  }, [dispatch, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
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

    try {
      if (isEditing) {
        await dispatch(
          updateAddress({
            userId,
            addressId: address._id,
            updatedAddress: address,
          })
        ).unwrap();
        toast.success("Address updated successfully!");
      } else {
        await dispatch(addAddress({ userId, address })).unwrap();
        toast.success("Address added successfully!");
        onAddressAdded();
        setShowModal(false); // Close modal after adding address
      }
      dispatch(fetchAddressesByUser(userId)); // Refetch addresses
    } catch (err) {
      console.error("Failed to add/update address:", err);
      toast.error(err.message || "Failed to process request");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress({ userId, addressId })).unwrap();
      dispatch(fetchAddressesByUser(userId)); // Refetch addresses
      toast.success("Address deleted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to delete address");
    }
  };

  const handleAddNewAddress = () => {
    setIsEditing(false);
    setAddress({
      name: "",
      number: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      addressType: "Home",
    });
    setShowModal(true);
  };

  const handleUpdateAddress = (addressToEdit) => {
    setIsEditing(true);
    setAddress(addressToEdit);
    setShowModal(true);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    onAddressSelected(addressId);
  };

  return (
    <div className="container mt-4">
      <h5 className="fw-bold">Select Delivery Address</h5>

      {addresses.length > 0 ? (
        <div className="row">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="col-12 col-sm-6 col-md-6 col-lg-4 mb-3"
            >
              <div className="border p-3 rounded">
                <input
                  type="radio"
                  checked={selectedAddressId === addr._id}
                  onChange={() => handleAddressSelect(addr._id)}
                  className="me-2"
                />
                <strong>{addr.name}</strong>
                {addr.addressType === "Home" ? (
                  <span className="badge bg-success ms-2">HOME</span>
                ) : (
                  <span className="badge bg-secondary text-white ms-2">
                    WORK
                  </span>
                )}
                <p className="mb-1">
                  {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                </p>
                <p className="mb-1">{addr.country}</p>
                <p className="mb-1">
                  <strong>Mobile:</strong> {addr.number}
                </p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button
                    className="btn btn-outline-danger w-100 mb-2"
                    onClick={() => handleDeleteAddress(addr._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleUpdateAddress(addr)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses found.</p>
      )}

      <button
        className="btn btn-outline-secondary w-100 mt-3"
        onClick={handleAddNewAddress}
      >
        + Add New Address
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Update Address" : "Add New Address"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Form Fields */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={address.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={address.number}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="street"
                value={address.street}
                onChange={handleInputChange}
                placeholder="Enter street address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={address.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleInputChange}
                placeholder="Enter zip code"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address Type</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={
                    address.addressType === "Home" ? "danger" : "outline-danger"
                  }
                  onClick={() =>
                    setAddress({ ...address, addressType: "Home" })
                  }
                >
                  Home
                </Button>
                <Button
                  variant={
                    address.addressType === "Work"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() =>
                    setAddress({ ...address, addressType: "Work" })
                  }
                >
                  Work
                </Button>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Update Address" : "Add Address"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressComponent;
