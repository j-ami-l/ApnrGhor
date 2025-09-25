import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

// Custom icon using react-icons
const customIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(
        <FaMapMarkerAlt style={{ color: "red", fontSize: "28px" }} />
    ),
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
});

// Apartment location
const APARTMENT = {
    name: "Apartment for Rent",
    lat: 23.7205,
    lng: 90.3955,
};

// ⚠️ Replace with your ORS API key
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImJhMjNlYzU1N2IyODRjYzk5YTIyZjgzYTkyNmZlMjA3IiwiaCI6Im11cm11cjY0In0=";

export default function Map() {
    const [userLocation, setUserLocation] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);

    // Handle location request
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const userCoords = [pos.coords.latitude, pos.coords.longitude];
                    setUserLocation(userCoords);

                    try {
                        // Fetch route from ORS
                        const response = await axios.post(
                            `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
                            {
                                coordinates: [
                                    [userCoords[1], userCoords[0]],
                                    [APARTMENT.lng, APARTMENT.lat],
                                ],
                            },
                            {
                                headers: {
                                    Authorization: ORS_API_KEY,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        const coords = response.data.features[0].geometry.coordinates.map(
                            (c) => [c[1], c[0]]
                        );

                        setRouteCoords(coords);
                    } catch (error) {
                        console.error("Error fetching route:", error);
                        alert("Could not fetch route. Check API key and quota.");
                    }
                },
                (err) => {
                    alert("Permission denied or location unavailable.");
                    console.error(err);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="p-4 w-11/12 mx-auto">
            <h2 className="text-2xl text-emerald-700 md:text-4xl text-center font-semibold mb-3">
                Apartment Location
            </h2>


            <div className="h-[400px] w-11/12 mx-auto rounded-xl overflow-hidden">
                <MapContainer
                    center={[APARTMENT.lat, APARTMENT.lng]}
                    zoom={20}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Apartment marker */}
                    <Marker position={[APARTMENT.lat, APARTMENT.lng]} icon={customIcon}>
                        <Popup>{APARTMENT.name}</Popup>
                    </Marker>

                    {/* User location marker */}
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>Your Location</Popup>
                        </Marker>
                    )}

                    {/* Route polyline */}
                    {routeCoords.length > 0 && (
                        <Polyline positions={routeCoords} color="blue" />
                    )}
                </MapContainer>
            </div>
            <button
                onClick={handleGetLocation}
                className="mb-20 mt-5 w-full px-4 py-2 bg-emerald-700 text-white rounded-lg"
            >
                Watch Route From Your location
            </button>
        </div>
    );
}
