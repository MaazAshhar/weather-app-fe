import React, { useState } from "react";
import AddCityModal from "./AddCityModal";
import { FaPlus } from "react-icons/fa";

const AddCity = ({data, setData, modal, setModal}) => {
    const addCity = () => {
        setModal(true);
    }
  return (
    <>
      <div className="rounded p-2 mx-1 mt-1 d-flex flex-row justify-content-between">
        <div>Add City</div>
        <div style={{ cursor: "pointer" }} onClick={addCity}>
          <FaPlus />
        </div>
      </div>
      <hr className="m-0 mx-1" />
    </>
  );
};

export default AddCity;
