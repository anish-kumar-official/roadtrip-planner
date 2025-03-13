"use client";

import React from "react";
import Map from "../components/maps";

const MapPage = () => {
  const markers = [
    {
      position: [51.505, -0.09],
      popup: "I'm a popup in London!",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive Map with Search</h1>
      <p className="mb-4">
        Enter a location name, address, or landmark in the search box to find it
        on the map.
      </p>
      <Map initialCenter={[51.505, -0.09]} initialZoom={13} markers={markers} />
    </div>
  );
};

export default MapPage;
