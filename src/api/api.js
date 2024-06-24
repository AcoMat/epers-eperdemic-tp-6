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

const createVector = async ({type, ubicacionId}) => {
    const body = {
        type,
        ubicacionId
    }
    const response = await axios.post(url + "/vector", body)
    return response.data
}

const getVector = async ({vectorId}) => {
    const response = await axios.get(url + `/vector/${vectorId}`)
    return response.data
}
export { getMapItems, createVector, getVector }