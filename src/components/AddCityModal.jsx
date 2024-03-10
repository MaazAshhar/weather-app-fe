import Cookies from "js-cookie";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddCityModal = ({ setModal }) => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const hideModal = () => {
    setModal(false);
  };
  const addCity = (e) => {
    e.preventDefault();
    const reqBody = { city: { name: city } };
    fetch("https://weather-app-be.vercel.app/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwt-token")}`,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          console.log(response);
        } else {
          hideModal();
          navigate("/weather");
        }
      });
  };
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "absolute" }}>
        <Modal.Dialog>
          <Modal.Header closeButton onHide={hideModal}>
            <Modal.Title>Add City</Modal.Title>
          </Modal.Header>

          <Form>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formGroupCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={hideModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={addCity}>
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default AddCityModal;
