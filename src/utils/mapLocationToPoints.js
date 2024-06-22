import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapLocationToPoints = (locations) => locations.map((location) => {
  const { latitud, longitud } = location.coordenadas
  const feature =  new Feature({
    geometry: new Point(fromLonLat([longitud, latitud])),
    name: 'Point',
    style: styles.markerStyle
  });
  feature.setStyle(styles.markerStyle)
  return feature
})

export default mapLocationToPoints
  
