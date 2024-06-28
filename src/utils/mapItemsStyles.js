import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'

const green =  [0,   128, 0,   1]
const grey  =  [128, 128, 128, 1]
const red   =  [128, 0,   0,   1]

export const styles = {
    markerStyle: new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: '/location.svg',
        }),
    }),
    scrapStyle: new Style({
        image: new Icon({
            anchor: [1, 1],
            height: 100,
            width: 100,
            src: '/scrap.svg',
        }),
    }),
    friendStyle: (friend) => {
        let color;
        if(friend.estaInfectado === null) {
            color = grey
        } else if(friend.estaInfectado) {
            color = red
        } else {
            color = green
        }
        var style = new Style({
            image: new Circle({
              stroke: new Stroke({
                color: color, // Example color
                width: 5 // Example line width
              }),
              radius: 6
            }),
            text: new Text({
                text: friend.displayName,
                scale: 1,
                offsetY: 18,
                fill: new Fill({
                    color: '#000000'
                }),
            })
          });
        return style
    },
    userStyle: (isUserInfectado) => {
        let color;
        if(isUserInfectado === null || isUserInfectado === undefined) {
            color = grey
        } else if(isUserInfectado) {
            color = red
        } else {
            color = green
        }
        var style = new Style({
            image: new Circle({
              fill: new Fill({
                color: color // Example color with opacity
              }),
              stroke: new Stroke({
                color: color, // Example color
                width: 3 // Example line width
              }),
              radius: 6
            })
        });
        return style
    }
}