import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapUserToPoint = (userLocation, isUserInfectado) => {
  const { longitude, latitude } = userLocation
  const feature = new Feature({
    geometry: new Point(
      fromLonLat([longitude, latitude])
    ),
    name: "User",
  });
  feature.setStyle(styles.userStyle(isUserInfectado))
  return feature
};

export default mapUserToPoint;
