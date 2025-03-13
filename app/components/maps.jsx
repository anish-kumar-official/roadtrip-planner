"use client";

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default icons in Leaflet with Next.js
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Define the Map component
const Maps = ({ initialCenter, initialZoom, markers }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const searchMarkerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Initialize map on component mount
  useEffect(() => {
    // Fix for default marker icons
    const DefaultIcon = L.icon({
      iconUrl: icon.src,
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // Initialize map if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        initialCenter,
        initialZoom
      );

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add initial markers if provided
      markers.forEach((marker) => {
        L.marker(marker.position)
          .addTo(mapInstanceRef.current)
          .bindPopup(marker.popup || "");
      });
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialCenter, initialZoom, markers]); // Re-run if these props change

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchError("Please enter a location to search");
      return;
    }

    setIsSearching(true);
    setSearchError("");

    try {
      // Using Nominatim API for geocoding (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        // Get the first result
        const result = data[0];
        const position = [parseFloat(result.lat), parseFloat(result.lon)];

        // Remove previous search marker if it exists
        if (searchMarkerRef.current) {
          mapInstanceRef.current.removeLayer(searchMarkerRef.current);
        }

        // Add new marker
        searchMarkerRef.current = L.marker(position)
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>${result.display_name}</b>`)
          .openPopup();

        // Center map on the found location
        mapInstanceRef.current.setView(position, 13);
      } else {
        setSearchError(
          "Location not found. Please try a different search term."
        );
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Error searching for location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="flex-grow p-2 border border-gray-300 rounded"
            disabled={isSearching}
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
        {searchError && <p className="text-red-500 mt-1">{searchError}</p>}
      </form>

      {/* Map container */}
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default Maps;
