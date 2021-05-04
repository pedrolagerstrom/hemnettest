import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const DeleteObject = () => {
  let { houseObjectId } = useParams();
  const token = localStorage.getItem("myToken");

  let history = useHistory();
  const getObjectURL = `${url}/${houseObjectId}`;
  const [objectState, setObjectState] = useState([]);

  function GoBack() {
    history.push(`/`);
  }

  const Delete = () => {
    fetch(getObjectURL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      history.push(`/`);
    });
  };

  useEffect(() => {
    if (objectState.length === 0) {
      fetch(getObjectURL).then((res) =>
        res.json().then((data) => setObjectState(data))
      );
    }
  });

  return (
    <div className="container">
      <h2>Ta bort objekt</h2>
      <p>Objekt ID: {objectState.houseObjectId}</p>
      <p>Address: {objectState.address}</p>
      <button
        className="btn btn-danger"
        style={{ marginRight: "20px" }}
        onClick={() => Delete()}
      >
        Ta bort
      </button>
      <button className="btn btn-primary" onClick={() => GoBack()}>
        Tillbaka
      </button>
    </div>
  );
};

export default DeleteObject;
