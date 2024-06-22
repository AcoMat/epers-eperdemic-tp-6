import Icon from "ol/style/Icon"
import Style from "ol/style/Style"

export const styles = {
    markerStyle: new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: '/location.svg',
        }),
    })
}