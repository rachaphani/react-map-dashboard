import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";

function MapView() {
  const [mapData, setMapData] = useState({ center: [20.5937, 78.9629], zoom: 5 });

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await axios.get("http://15.168.140.61:5000/api/map", {

          
          headers: { Authorization: localStorage.getItem("token") },
        });
        setMapData(res.data);
      } catch (err) {
        alert("Unauthorized");
      }
    };
    fetchMapData();
  }, []);

  return (
    <MapContainer center={mapData.center} zoom={mapData.zoom} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}

export default MapView;
