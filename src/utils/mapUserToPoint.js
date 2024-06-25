import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapUserToPoint = (user) => {
  const feature = new Feature({
    geometry: new Point(
      fromLonLat([user.longitude, user.latitude])
    ),
    name: "User",
  });
  feature.setStyle(styles.userStyle(user))
  return feature
};

export default mapUserToPoint;
