import React from "react";
import { useState } from "react";
import NotificationModal from "./../../Modals/NotificationModal";
import axios from "axios";
import "./AddAuthorPopup.css";

function AddAuthorPopup({ toggleAddAuthorPopup, fetchAuthors }) {
  const [newData, setNewData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Street: "",
    City: "",
    Country: "",
    NIC: "",
    Mobile: "",
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
    isSuccess: true,
  });

  const handleNewDataChange = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/author/",
        newData
      );
      if (response.status === 201) {
        setModalInfo({
          show: true,
          title: "Success",
          message: "Author added successfully!",
          isSuccess: true,
        });
        fetchAuthors();
        setNewData({
          First_Name: "",
          Last_Name: "",
          Email: "",
          Street: "",
          City: "",
          Country: "",
          NIC: "",
          Mobile: "",
        });
      } else {
        setModalInfo({
          show: true,
          title: "Error",
          message: "There was an error adding the author.",
          isSuccess: false,
        });
      }
    } catch (error) {
      setModalInfo({
        show: true,
        title: "Error",
        message: `Failed to add author: ${error.message}`,
        isSuccess: false,
      });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, show: false });
    if (modalInfo.isSuccess) {
      toggleAddAuthorPopup();
    }
  };

  return (
    <div data-testid="add-author-popup" className="add-author-overlay">
      <div className="dialog-container">
        <header className="add-author-dialog-header">
          <h2 className="add-author-dialog-title" data-testid="popup-title">Add New Author</h2>
          <p className="dialog-description" data-testid="popup-description">
            Fill out the form below to add a new author to your database.
          </p>
          <button
            className="add-author-close-button"
            data-testid="close-popup-button"
            onClick={() => {
              toggleAddAuthorPopup();
            }}
          >
            ×
          </button>
        </header>
        <form className="form-grid-add-auth" onSubmit={handleAddSubmit} data-testid="add-author-form">
          <div className="form-grid-two-columns-add-auth">
            <div className="form-field-add-auth">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                data-testid="input-first-name"
                onChange={handleNewDataChange}
                value={newData.First_Name}
                name="First_Name"
                placeholder="John"
                className="input-field"
                required
              />
            </div>
            <div className="form-field-add-auth">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                placeholder="Doe"
                data-testid="input-last-name"
                className="input-field"
                type="text"
                value={newData.Last_Name}
                onChange={handleNewDataChange}
                name="Last_Name"
                required
              />
            </div>
          </div>
          <div className="form-field-add-auth">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              data-testid="input-email"
              className="input-field"
              value={newData.Email}
              onChange={handleNewDataChange}
              name="Email"
              required
            />
          </div>
          <div className="form-grid-two-columns-add-auth">
            <div className="form-field-add-auth">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                placeholder="123 Main St"
                data-testid="input-street"
                className="input-field"
                type="text"
                value={newData.Street}
                onChange={handleNewDataChange}
                name="Street"
                required
              />
            </div>
            <div className="form-field-add-auth">
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="New York"
                data-testid="input-city"
                className="input-field"
                type="text"
                value={newData.City}
                onChange={handleNewDataChange}
                name="City"
                required
              />
            </div>
          </div>
          <div className="form-grid-two-columns-add-auth">
            <div className="form-field-add-auth">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                placeholder="United States"
                data-testid="input-country"
                className="input-field"
                type="text"
                value={newData.Country}
                onChange={handleNewDataChange}
                name="Country"
                required
              />
            </div>
            <div className="form-field-add-auth">
              <label htmlFor="nic">NIC Number</label>
              <input
                id="nic"
                placeholder="123-45-6789"
                data-testid="input-nic"
                className="input-field"
                type="text"
                value={newData.NIC}
                onChange={handleNewDataChange}
                name="NIC"
                required
              />
            </div>
          </div>
          <div className="form-field-add-auth">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              placeholder="+1 (555) 555-5555"
              data-testid="input-mobile"
              className="input-field"
              type="text"
              value={newData.Mobile}
              onChange={handleNewDataChange}
              name="Mobile"
              required
            />
          </div>
          <footer className="dialog-footer-add-auth">
            <button
              type="submit"
              data-testid="submit-button"
              className="button button-primary"
              onClick={handleAddSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="button button-cancel"
              data-testid="cancel-button"
              onClick={() => toggleAddAuthorPopup()}
            >
              Cancel
            </button>
          </footer>
        </form>
        <NotificationModal
          show={modalInfo.show}
          handleClose={handleCloseModal}
          title={modalInfo.title}
          message={modalInfo.message}
          isSuccess={modalInfo.isSuccess}
        />
      </div>
    </div>
  );
}

export default AddAuthorPopup;
