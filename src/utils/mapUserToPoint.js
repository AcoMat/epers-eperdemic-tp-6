import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

const mapUserToPoint = (userLocation) => new Feature({
    geometry: new Point(fromLonLat([userLocation.longitude, userLocation.latitude])),
    name: 'User'
});

export default mapUserToPoint