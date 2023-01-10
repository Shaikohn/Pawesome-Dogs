import axios from 'axios'
import Swal from "sweetalert2"
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

const baseURL = 'https://dogs-app-backend-production.up.railway.app'


export const getAllDogs = () => {
    return async function(dispatch) {
        try {
            let dogs = (await axios(`${baseURL}/dogs`)).data
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
            let search = (await axios(`${baseURL}/dogs?name=${name} `)).data
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
            let details = (await axios(`${baseURL}/dogs/${id}`)).data
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
            let temperaments = (await axios(`${baseURL}/temperaments`)).data;
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
            await axios.post(`${baseURL}/dogs`, payload);
            return dispatch({type: POST_DOG})
        } 
        catch (error) {
            Swal.fire({
                title: "Error",
                text: 'Complete all the info!',
                icon: "error",
                timer: 3000,
            });
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