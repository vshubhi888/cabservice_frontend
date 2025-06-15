import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

// Styled container
const mapWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
  background: '#222'
};

const containerStyle = {
  width: '80vw',
  height: '70vh',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
};

// Example night mode style
const mapStyles = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }]
  },
  // ...add more style objects as desired
];

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

function MyMap() {
  const [center, setCenter] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  const sourceRef = useRef();
  const destRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }
  }, []);

  const handlePlaceChanged = (type) => {
    const place = type === 'source' ? sourceRef.current.getPlace() : destRef.current.getPlace();
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      if (type === 'source') setSource(location);
      else setDestination(location);
    }
  };

  // Draw route when both source and destination are set
  React.useEffect(() => {
    if (source && destination && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [source, destination]);

  return (
    <div style={mapWrapperStyle}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={['places']}
      >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Autocomplete onLoad={ref => (sourceRef.current = ref)} onPlaceChanged={() => handlePlaceChanged('source')}>
            <input type="text" placeholder="Enter source" style={{ width: 250, padding: 8 }} />
          </Autocomplete>
          <Autocomplete onLoad={ref => (destRef.current = ref)} onPlaceChanged={() => handlePlaceChanged('destination')}>
            <input type="text" placeholder="Enter destination" style={{ width: 250, padding: 8 }} />
          </Autocomplete>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={source || defaultCenter}
          zoom={13}
          onLoad={map => setMap(map)}
          options={{ styles: mapStyles }}
        >
          {source && <Marker position={source} label="S" />}
          {destination && <Marker position={destination} label="D" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyMap;