import Cookies from "js-cookie";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const City = ({ item, setDeleted, deleted, setUpdateCityId, setUpdateModal }) => {
  const { name, country, condition, temperature, humidity, id, icon_url } = item;
  const navigate = useNavigate();
  const removeCity = () => {
    fetch(`https://weather-app-be.vercel.app/city/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", 'authorization': `Bearer ${Cookies.get('jwt-token')}` }
      })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        console.log(response);
      } else {
        setDeleted(deleted+1);
        navigate('/weather');
      }
    })
  };

  const updateCity = () => {
    setUpdateCityId(id);
    setUpdateModal(true);
  }

  return (
    <>
      <div className="border w-100 rounded p-2 d-flex flex-row my-2">
        <div className="image me-2 my-auto p-2"><img src={icon_url} /></div>
        <div className="details d-flex flex-column w-100 p-2">
          <div className="d-flex flex-row justify-content-between">
            <div className="location">{name}, {country}</div>
            <div className="d-flex flex-row w-25 justify-content-between"
              style={{
                marginTop: "-15px",
                marginRight: "-10px",
                cursor: "pointer",
              }}>
              <div onClick={updateCity}>
                <FaPencil />
              </div>
              <div onClick={removeCity}>
                <RxCross2 />
              </div>
            </div>
          </div>
          <div className="condition">{condition}</div>
          <div className="d-flex flex-row">
            <div className="temp me-2">Temp: {temperature}&deg;C</div>
            <div className="humidity">Humidity: {humidity}%</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
