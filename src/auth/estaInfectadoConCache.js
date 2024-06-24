import { isInfectado } from "../api/api"

const vectoresVistos = {}

const estaInfectadoConCache = async (vectorId) => {
    const vectorRecuperado = vectoresVistos[vectorId]
    const noLoTengo = !vectorRecuperado
    const reload = noLoTengo || noHaceFalta(vectorRecuperado)
    if(reload) {
        const estaInfectado = await isInfectado(vectorId)
        vectoresVistos[vectorId] = {
            estaInfectado: estaInfectado,
            lastRefresh: Date.now()
        }
    }
    return vectoresVistos[vectorId].estaInfectado
}

const noHaceFalta = (vectorRecuperado) => {
    const seconds = (Date.now() - vectorRecuperado.lastRefresh) / 1000
    return seconds <= 15 || vectorRecuperado.estaInfectado
}

export { estaInfectadoConCache }