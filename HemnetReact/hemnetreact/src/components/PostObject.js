import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const PostObject = () => {
  const token = localStorage.getItem("myToken");
  let history = useHistory();

  function GoBack() {
    history.push(`/`);
  }

  const [images, setImages] = useState("");
  const [address, setAddress] = useState("");
  const [housingType, setHousingType] = useState("");
  const [formOfLease, setFormOfLease] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState();
  const [livingArea, setLivingArea] = useState();
  const [biArea, setBiArea] = useState();
  const [plotArea, setPlotArea] = useState();
  const [descriptions, setDescriptions] = useState("");
  const [showingDate, setShowingDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [buildYear, setBuildYear] = useState();
  const [brookerId, setBrookerId] = useState();

  const SubmitForm = (event) => {
    event.preventDefault();
    const body = {
      images: images,
      address: address,
      housingType: housingType,
      formOfLease: formOfLease,
      price: price,
      rooms: rooms,
      livingArea: livingArea,
      biArea: biArea,
      plotArea: plotArea,
      descriptions: descriptions,
      showingDate: showingDate,
      buildYear: buildYear,
      latitude: latitude,
      longitude: longitude,
      brookerId: brookerId,
    };

    if (token === null) {
      alert("Du måste vara inloggad för att lägga till ett objekt");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).then((res) =>
        res.json().then((data) => {
          setImages("");
          setAddress("");
          setHousingType("");
          setFormOfLease("");
          setPrice("");
          setRooms(0);
          setLivingArea(0);
          setBiArea(0);
          setPlotArea(0);
          setDescriptions("");
          setShowingDate("");
          setLatitude("");
          setLongitude("");
          setBuildYear(0);
          setBrookerId(0);
        })
      );
    }
  };

  return (
    <div className="container">
      <h2>Lägg till ett nytt objekt</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <lable className="form-label">Bild länk</lable>
          <input
            className="form-control"
            type="text"
            value={images}
            onChange={(event) => setImages(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Address</lable>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Pris</lable>
          <input
            className="form-control"
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Bostadstyp</lable>
          <input
            className="form-control"
            type="text"
            value={housingType}
            onChange={(event) => setHousingType(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Upplåtelseform</lable>
          <input
            className="form-control"
            type="text"
            value={formOfLease}
            onChange={(event) => setFormOfLease(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Antal rum</lable>
          <input
            className="form-control"
            type="number"
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Boarea</lable>
          <input
            className="form-control"
            type="number"
            value={livingArea}
            onChange={(event) => setLivingArea(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Tomtarea</lable>
          <input
            className="form-control"
            type="number"
            value={plotArea}
            onChange={(event) => setPlotArea(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Biarea</lable>
          <input
            className="form-control"
            type="number"
            value={biArea}
            onChange={(event) => setBiArea(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Byggår</lable>
          <input
            className="form-control"
            type="number"
            value={buildYear}
            onChange={(event) => setBuildYear(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Latitude</lable>
          <input
            className="form-control"
            type="text"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Longitude</lable>
          <input
            className="form-control"
            type="text"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Visningsdatum</lable>
          <input
            className="form-control"
            type="date"
            value={showingDate}
            onChange={(event) => setShowingDate(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <lable className="form-label">Mäklar ID</lable>
          <input
            className="form-control"
            type="number"
            value={brookerId}
            onChange={(event) => setBrookerId(event.target.value)}
          />
        </div>
        <div className="col-md-12">
          <lable className="form-label">Beskrivning</lable>
          <textarea
            type="text"
            className="form-control"
            rows="4"
            value={descriptions}
            onChange={(event) => setDescriptions(event.target.value)}
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

export default PostObject;
