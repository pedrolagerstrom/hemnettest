import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const ChangeObject = () => {
  let { houseObjectId } = useParams();
  const getObjectURL = `${url}/${houseObjectId}`;
  const token = localStorage.getItem("myToken");
  let history = useHistory();

  function GoBack() {
    history.push(`/`);
  }

  const [property, setProperty] = useState({
    images: "",
    address: "",
    housingType: "",
    formOfLease: "",
    price: "",
    rooms: 0,
    livingArea: 0,
    biArea: 0,
    plotArea: 0,
    descriptions: "",
    showingDate: "",
    buildYear: 0,
    latitude: "",
    longitude: "",
    brookerId: 0,
  });

  useEffect(() => {
    if (token === null) {
      history.push(`/`);
      alert("Du måste logga in");
    } else {
      fetch(getObjectURL, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) =>
        res.json().then((data) => {
          setProperty(data);
        })
      );
    }
  }, []);

  const SubmitForm = (event) => {
    event.preventDefault();
    const body = {
      houseObjectId: property.houseObjectId,
      images: property.images,
      address: property.address,
      housingType: property.housingType,
      formOfLease: property.formOfLease,
      price: property.price,
      rooms: property.rooms,
      livingArea: property.livingArea,
      biArea: property.biArea,
      plotArea: property.plotArea,
      descriptions: property.descriptions,
      showingDate: property.showingDate,
      buildYear: property.buildYear,
      latitude: property.latitude,
      longitude: property.longitude,
      brookerId: property.brookerId,
    };

    if (token === null) {
      alert("Du måste vara inloggad för att ändra ett objekt");
    } else {
      fetch(getObjectURL, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          res.json().then((data) => {
            setProperty([]);
          });
        })
        .then(() => {
          history.push(`/getobject`);
        });
    }
  };

  return (
    <div className="container">
      <h2>Ändra objekt</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <lable className="form-label">Bild länk</lable>
          <input
            className="form-control"
            type="text"
            value={property.images}
            onChange={(event) =>
              setProperty({ ...property, images: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Address</lable>
          <input
            className="form-control"
            type="text"
            value={property.address}
            onChange={(event) =>
              setProperty({ ...property, address: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Pris</lable>
          <input
            className="form-control"
            type="text"
            value={property.price}
            onChange={(event) =>
              setProperty({ ...property, price: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Bostadstyp</lable>
          <input
            className="form-control"
            type="text"
            value={property.housingType}
            onChange={(event) =>
              setProperty({ ...property, housingType: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Upplåtelseform</lable>
          <input
            className="form-control"
            type="text"
            value={property.formOfLease}
            onChange={(event) =>
              setProperty({ ...property, formOfLease: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Antal rum</lable>
          <input
            className="form-control"
            type="number"
            value={property.rooms}
            onChange={(event) =>
              setProperty({ ...property, rooms: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Boarea</lable>
          <input
            className="form-control"
            type="number"
            value={property.livingArea}
            onChange={(event) =>
              setProperty({ ...property, livingArea: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Tomtarea</lable>
          <input
            className="form-control"
            type="number"
            value={property.plotArea}
            onChange={(event) =>
              setProperty({ ...property, plotArea: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Biarea</lable>
          <input
            className="form-control"
            type="number"
            value={property.biArea}
            onChange={(event) =>
              setProperty({ ...property, biArea: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Byggår</lable>
          <input
            className="form-control"
            type="number"
            value={property.buildYear}
            onChange={(event) =>
              setProperty({ ...property, buildYear: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Latitude</lable>
          <input
            className="form-control"
            type="text"
            value={property.latitude}
            onChange={(event) =>
              setProperty({ ...property, latitude: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Longitude</lable>
          <input
            className="form-control"
            type="text"
            value={property.longitude}
            onChange={(event) =>
              setProperty({ ...property, longitude: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Visningsdatum</lable>
          <input
            className="form-control"
            type="date"
            value={property.showingDate}
            onChange={(event) =>
              setProperty({ ...property, showingDate: event.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Mäklar ID</lable>
          <input
            className="form-control"
            type="number"
            value={property.brookerId}
            onChange={(event) =>
              setProperty({ ...property, brookerId: event.target.value })
            }
          />
        </div>
        <div className="col-md-12">
          <lable className="form-label">Beskrivning</lable>
          <textarea
            type="text"
            className="form-control"
            rows="4"
            value={property.descriptions}
            onChange={(event) =>
              setProperty({ ...property, descriptions: event.target.value })
            }
          />
        </div>
        <div className="col-md-12">
          <button
            className="btn btn-primary"
            style={{ marginRight: "20px" }}
            onClick={SubmitForm}
          >
            Submit
          </button>
          <button className="btn btn-primary" onClick={() => GoBack()}>
            Tillbaka
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeObject;
