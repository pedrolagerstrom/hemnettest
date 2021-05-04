import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/style.css";

const url = process.env.REACT_APP_API_URL;

const GetObject = () => {
  const [objectState, setObjectState] = useState([]);
  const token = localStorage.getItem("myToken");
  let history = useHistory();

  useEffect(() => {
    if (token === null) {
      history.push(`/`);
      alert("Du måste logga in");
    } else {
      fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>
        res.json().then((data) => {
          setObjectState(data);
        })
      );
    }
  }, [history, token]);

  return (
    <div className="container">
      <div className="main">
        <h2>Lista på hus</h2>
        <ul className="cards">
          {objectState.map((object) => (
            <>
              <li className="cards_item">
                <div className="card">
                  <div className="card_image">
                    <img
                      className="img-card"
                      src={object.images}
                      alt="Property"
                    ></img>
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{object.address}</h2>
                    <Link to={`/changeobject/${object.houseObjectId}`}>
                      <p style={{ display: "inline", paddingRight: "15px" }}>
                        Ändra
                      </p>
                    </Link>
                    <Link to={`/deleteobject/${object.houseObjectId}`}>
                      <p style={{ display: "inline" }}>Ta bort</p>
                    </Link>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetObject;
