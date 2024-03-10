import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpdateCityModal = ({updateCityId, setUpdateCityId , setUpdateModal, data, setFetched}) => {
    const prevCity = data.filter(item => item.id == updateCityId)[0].name;
    const [city, setCity] = useState(prevCity);
    const navigate = useNavigate();
    const hideModal = () => {
        setUpdateModal(false);
    };
    const updateCity = (e) => {
      e.preventDefault();
      const reqBody = { city: { name: city } };
      fetch(`https://weather-app-be.vercel.app/city/${updateCityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
        body: JSON.stringify(reqBody),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.error) {
            alert(response.error);
          } else {
            hideModal();
            setUpdateCityId('');
            setFetched(true);
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
              <Modal.Title>Update City</Modal.Title>
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
                <Button variant="primary" type="submit" onClick={updateCity}>
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </div>
      </>
    );
}

export default UpdateCityModal