"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import { IoMdFlag } from "react-icons/io";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import * as turf from "@turf/turf";

import MarkerDetails from "@/components/MarkerDetails";
import sample_data from "./sample_data.json";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Home() {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);
	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
	};

	function renderMarkerColor(d) {
		console.log({ d });
		const source = turf.point([d.lon, d.lat]);
		const destination = turf.point([-122.4194, 37.7749]);
		const distance = turf.distance(source, destination, {
			units: "kilometers",
		});
		// console.log("D=>", distance.toFixed(2) + " KM");
		if (distance.toFixed(2) > 10000) return "#0C9B46";
		if (distance.toFixed(2) > 9000) return "#E8EB0A";
		return "#B80505 ";
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Map
				ref={mapRef}
				mapboxAccessToken={mapboxToken}
				mapLib={import("mapbox-gl")}
				initialViewState={{
					longitude: 142.433,
					latitude: 43.234,
					zoom: 2.5,
					maxZoom: 20,
				}}
				style={{ width: 600, height: 400 }}
				mapStyle="mapbox://styles/mapbox/streets-v12"
			>
				<GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />{" "}
				{selectedMarker ? (
					<MarkerDetails
						selectedMarker={selectedMarker}
						closeSelectedMarker={() => setSelectedMarker(null)}
					/>
				) : null}
				{sample_data.map((airport, index) => {
					return (
						<Marker key={index} longitude={airport.lon} latitude={airport.lat}>
							<button
								type="button"
								className="cursor-pointer"
								onClick={(e) => zoomToSelectedLoc(e, airport, index)}
							>
								{<IoMdFlag size={30} color={renderMarkerColor(airport)} />}
							</button>
						</Marker>
					);
				})}
			</Map>
			;
		</main>
	);
}
