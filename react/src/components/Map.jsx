import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '500px'
};

function Map({ address }) {
  const [waypoint, setWaypoint] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBEwNam80kWCmo4NVbcvV2hN0RyQE52Gqs"
  });

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results.length) {
          const location = results[0].geometry.location;
          setWaypoint({ lat: location.lat(), lng: location.lng() });
        }
      });
    }
  }, [isLoaded, address]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={waypoint}
      zoom={11}
    >
      {waypoint && <Marker position={waypoint} />}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);

