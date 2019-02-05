import axios from 'axios'

const baseUrl = '/api/items'

const getAllSeeds = async () => {
    const response = await axios.get(`${baseUrl}/seeds`)

    return response.data
}

const getAllCleanHerbs = async () => {
    const response = await axios.get(`${baseUrl}/clean_herbs`)

    return response.data
}

const getAllGrimyHerbs = async () => {
    const response = await axios.get(`${baseUrl}/grimy_herbs`)

    return response.data
}

export default { getAllSeeds, getAllCleanHerbs, getAllGrimyHerbs }