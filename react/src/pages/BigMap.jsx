import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "../styles/BigMap.css";
import { Link } from "react-router-dom";
import { FaCircleNotch } from 'react-icons/fa';

const containerStyle = {
  width: "800px",
  height: "500px",
};

const defaultCenter = {
  lat: 43.5448,
  lng: -80.2482,
};

function BigMap({ jobData }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEwNam80kWCmo4NVbcvV2hN0RyQE52Gqs",
  });

  return isLoaded ? (
    <div className="bigmap__wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {Object.values(jobData).map((job, index) => {
          return (
            <GeocodeMarker
              key={index}
              address={job.companyName}
              title={job.jobTitle}
              description={job.jobDescription}
              salary={job.jobSalary}
              jobId={job.jobId}
            />
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <div className="loading--wrapper">
      <div className="loading-animation"><FaCircleNotch size={50}/></div>
    </div>
  );
}

function GeocodeMarker({ address, title, description, salary, jobId }) {
  const [position, setPosition] = React.useState(null);
  const [showInfoWindow, setShowInfoWindow] = React.useState(false);

  const geocodeAddress = (address, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results && results.length) {
        const location = results[0].geometry.location;
        callback({ lat: location.lat(), lng: location.lng() });
      } else {
        callback(null); 
      }
    });
  };

  React.useEffect(() => {
    geocodeAddress(address, setPosition);
  }, [address]);

  if (!position) return null;

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  return (
    <>
      <Marker position={position} onClick={handleMarkerClick} />
      {showInfoWindow && (
        <InfoWindow position={position} disableAutoPan={true}>
          <div className="modal__wrapper">
            <Link to={`/jobs/${jobId}`} className="modal__link">
              <h3>{title}</h3>
              <p>{address}</p>
              <p>{salary}</p>
              <p>{description}</p>
            </Link>
            <div
              className="custom-close-button"
              onClick={handleInfoWindowClose}
            >
              ×
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default React.memo(BigMap);
