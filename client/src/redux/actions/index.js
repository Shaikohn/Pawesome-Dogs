import axios from 'axios'
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_DETAILS = "GET_DOG_DETAILS"
export const SEARCH_DOGS = "SEARCH_DOGS"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const CLEAR_PAGE = "CLEAR_PAGE"
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const POST_DOG = "POST_DOG"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const FILTER_CREATED_DOGS = "FILTER_CREATED_DOGS"


export const getAllDogs = () => {
    return async function(dispatch) {
        try {
            let dogs = (await axios(`http://localhost:3001/dogs`)).data
            return dispatch({type: GET_ALL_DOGS, payload: dogs})
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const searchDogs = (name) => {
    return async function(dispatch) {
        try {
            let search = (await axios(`http://localhost:3001/dogs?name=${name} `)).data
            return dispatch({type: SEARCH_DOGS, payload: search})

        }
        catch (error) {
            console.log(error)
        }
    }

} 

export const getDogDetails = (id) => {
    return async function(dispatch) {
        try {
            let details = (await axios(`http://localhost:3001/dogs/${id}`)).data
            return dispatch({type: GET_DOG_DETAILS, payload: details})
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const getTemperament = () => {
    return async function(dispatch) {
        try {
            let temperaments = (await axios("http://localhost:3001/temperaments")).data;
            let allTemps = temperaments.map(e => e)
            return dispatch({type: GET_TEMPERAMENT, payload: allTemps
        })
        } 
        catch (error) {
            console.log(error)
        }
    }
}

export const postDog = (payload) => {
    return async function(dispatch) {
        try {
            await axios.post("http://localhost:3001/dogs", payload);
            return dispatch({type: POST_DOG})
        } 
        catch (error) {
            console.log(error)
        }
    }
}

export const clearPage = () => {
    return {
        type: CLEAR_PAGE,
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export const filterByTemperament = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export const filterCreatedDogs = (payload) => {
    return {
        type: FILTER_CREATED_DOGS,
        payload
    }
}