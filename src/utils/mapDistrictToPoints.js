import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { styles } from "./mapItemsStyles";

const mapDistrictToPoints = (districts) => districts.map((district) => {
    const feature =  new Feature({
    geometry: new Polygon([district.coordenadas.map((coord) => fromLonLat([coord.longitud, coord.latitud]))]),
    name: 'Polygon',
    });
    return feature
})

export default mapDistrictToPoints