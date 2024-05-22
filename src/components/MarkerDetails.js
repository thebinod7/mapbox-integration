import { Popup } from "react-map-gl";
import classes from "../app/Page.module.css";
import Link from "next/link";

export default function MarkerDetails({ selectedMarker, closeSelectedMarker }) {
	return (
		<div>
			<Popup
				offset={25}
				latitude={selectedMarker.airport.lat}
				longitude={selectedMarker.airport.lon}
				onClose={closeSelectedMarker}
				closeButton={false}
			>
				<h3 className={classes.popupTitle}>{selectedMarker.airport.name}</h3>
				<div className={classes.popupInfo}>
					<label className={classes.popupLabel}>Code: </label>
					<span>{selectedMarker.airport.code}</span>
					<br />
					<label className={classes.popupLabel}>Country: </label>
					<span>{selectedMarker.airport.country}</span>
					<br />
					<label className={classes.popupLabel}>Website: </label>
					<Link
						href={
							selectedMarker.airport.url === ""
								? "#"
								: selectedMarker.airport.url
						}
						target={selectedMarker.airport.url === "" ? null : "_blank"}
						className={classes.popupWebUrl}
					>
						{selectedMarker.airport.url === ""
							? "Nil"
							: selectedMarker.airport.url}
					</Link>
				</div>
			</Popup>
		</div>
	);
}
