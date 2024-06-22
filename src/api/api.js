import axios from "axios"

const url = process.env.REACT_APP_API_URL

const getMapItems = async (location, radius) => {
    const body = {
        distancia: radius,
        punto: {
            longitud: location.longitude,
            latitud: location.latitude
        }
    }
    const response = await axios.post(url + "/distrito/near", body)
    return response.data
}

export { getMapItems }