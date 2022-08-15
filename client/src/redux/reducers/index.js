import { CLEAR_PAGE, FILTER_CREATED_DOGS, FILTER_BY_TEMPERAMENT, GET_ALL_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, POST_DOG, SEARCH_DOGS } from "../actions";

const initialState = {
    allDogs: [],
    filteredDogs: [],
    details: {},
    temperaments: [],
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: payload,
                filteredDogs: payload
            }
        case GET_DOG_DETAILS:
            return {
                ...state,
                details: payload
            }
        case SEARCH_DOGS:
            return {
                ...state,
                filteredDogs: payload
            }
        case GET_TEMPERAMENT: 
            return {
                ...state,
                temperaments: payload
            }
        case POST_DOG:
            return {
                ...state
            }
        case CLEAR_PAGE:
            return {
                ...state,
                details: {}
            }
        case ORDER_BY_NAME:
            const orderDogsName = payload === "name_asc" ?
                state.allDogs.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                    if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.allDogs.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            allDogs: orderDogsName
        }
        case ORDER_BY_WEIGHT:
            const orderDogsKg = payload === "weight_asc" ?
                state.allDogs.slice().sort(function(a, b) {
                    if(parseInt(a.weight_min) < parseInt(b.weight_min)) {return -1}
                    if(parseInt(b.weight_min) < parseInt(a.weight_min)) {return 1}
                    return 0;
                }) : 
                state.allDogs.slice().sort(function(a, b) {
                    if(parseInt(a.weight_max) > parseInt(b.weight_max)) {return -1}
                    if(parseInt(a.weight_max) > parseInt(b.weight_max)) {return 1}
                    return 0;
        })
        return {
        ...state,
        allDogs: orderDogsKg
        }
        case FILTER_BY_TEMPERAMENT:
            const dogsTemperament = state.filteredDogs
            const filter = payload === 'All' ? dogsTemperament : dogsTemperament.filter(d => ((d.temperament /* || d.temperaments */) || []).includes(payload))
            return {
                ...state,
                allDogs: filter
            }
        case FILTER_CREATED_DOGS:
            const all = state.filteredDogs
            const createFilter = payload === 'Created by users' ?  all.filter(d => d.createdByUser) : all.filter(d => !d.createdByUser);
            return {
                ...state,
                allDogs: payload === "All" ? all : createFilter
            }
        default:
            return state
    }
}

export default rootReducer