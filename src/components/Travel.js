import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerWithLabel,
} from "@react-google-maps/api";
import {
  englishTextTravel,
  chineseTextTravel,
} from "../assets/data/translations";
import back from "../assets/images/travel_back.webp";
import "./Travel.css";

const containerStyle = {
  height: "40vh",
};

const center = {
  lat: 40.26843488238582,
  lng: -75.12596716988067,
};

const hotel = { lat: 40.26450346734746, lng: -75.13249025392494 };

const Travel = () => {
  const language = useSelector((state) => state.language.language);

  let textLang;
  if (language === "En") textLang = englishTextTravel;
  else if (language === "Zh") textLang = chineseTextTravel;

  return (
    <div
      className="travel-div"
      style={{
        backgroundImage: `url('${back}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1>{textLang.header}</h1>
      <br />
      <h2>
        {textLang.addressText}: {textLang.address}
        <br />
        <br />
        {textLang.phoneText}: {textLang.phone}
      </h2>
      <br />
      <br />
      <div className="map-div">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_mapAPI}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            <Marker
              position={center}
              label={{
                text: textLang.venue,
                fontSize: "x-large",
                className: "marker-label",
              }}
            />
            <Marker
              position={hotel}
              label={{
                text: textLang.hotel,
                fontSize: "x-large",
                className: "marker-label",
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Travel;
