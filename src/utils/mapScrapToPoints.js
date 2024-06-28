import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapScrapToPoints = (scraps) => scraps.map((scrap) => {
  const { _lat, _long } = scrap.coordinates
  const feature =  new Feature({
    geometry: new Point(fromLonLat([_long, _lat])),
    name: 'scrap',
    id: scrap.ref
  });
  feature.setStyle(styles.scrapStyle)
  return feature
})

export default mapScrapToPoints
  
