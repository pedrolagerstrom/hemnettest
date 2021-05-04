import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/style.css";

const url = process.env.REACT_APP_API_URL;

const RegOfIntrest = () => {
  const [regOfIntrest, setRegOfIntrest] = useState([]);
  const token = localStorage.getItem("myToken");
  let history = useHistory();

  function GoBack() {
    history.push(`/`);
  }

  useEffect(() => {
    if (token === null) {
      history.push(`/`);
      alert("Du måste logga in");
    } else {
      fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>
        res.json().then((data) => {
          setRegOfIntrest(data);
        })
      );
    }
  }, []);

  return (
    <div className="container">
      <h2>Intresseanmälningar</h2>
      <div className="list-group">
        {regOfIntrest.map((object) => (
          <div className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <p>
                Namn: {object.customer.firstName} {object.customer.lastName}
              </p>
              <small>
                Visningsdatum:{" "}
                {new Date(object.houseObject.showingDate).toLocaleDateString()}
              </small>
            </div>
            <p className="mb-1">Email: {object.customerEmail}</p>
            <p className="mb-1">Objektet: {object.houseObject.address}</p>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary"
        style={{ marginTop: "20px" }}
        onClick={() => GoBack()}
      >
        Tillbaka
      </button>
    </div>
  );
};

export default RegOfIntrest;
