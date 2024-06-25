import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapFriendsToPoints = (friends) => friends.map((friend) => {
  const { latitude, longitude } = friend.location
  const feature =  new Feature({
    geometry: new Point(fromLonLat([longitude, latitude])),
    name: friend.displayName,
    style: styles.friendStyle(friend)
  });
  feature.setStyle(styles.friendStyle(friend))
  return feature
})

export default mapFriendsToPoints
  
