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
            const orderAllDogsName = payload === "name_asc" ?
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
        const orderFilteredDogsName = payload === "name_asc" ?
                state.filteredDogs.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
                    if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
                    return 0;
                }) : 
                state.filteredDogs.slice().sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                    return 0;
        })
        return {
            ...state,
            allDogs: orderAllDogsName,
            filteredDogs: orderFilteredDogsName,
        }
        case ORDER_BY_WEIGHT:
            const orderAllDogsKg = payload === "weight_asc" ?
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
        const orderFilteredDogsKg = payload === "weight_asc" ?
                state.filteredDogs.slice().sort(function(a, b) {
                    if(parseInt(a.weight_min) < parseInt(b.weight_min)) {return -1}
                    if(parseInt(b.weight_min) < parseInt(a.weight_min)) {return 1}
                    return 0;
                }) : 
                state.filteredDogs.slice().sort(function(a, b) {
                    if(parseInt(a.weight_max) > parseInt(b.weight_max)) {return -1}
                    if(parseInt(a.weight_max) > parseInt(b.weight_max)) {return 1}
                    return 0;
        })
        return {
            ...state,
            allDogs: orderAllDogsKg,
            filteredDogs: orderFilteredDogsKg,
        }
        case FILTER_BY_TEMPERAMENT:
            const dogsTemperament = state.allDogs
            const filter = payload === 'All' ? state.filteredDogs : dogsTemperament.filter(d => ((d.temperament) || []).includes(payload))
            return {
                ...state,
                filteredDogs: filter
            }
        case FILTER_CREATED_DOGS:
            const all = state.allDogs
            const createFilter = payload === 'Created by users' ?  all.filter(d => d.createdByUser) : all.filter(d => !d.createdByUser);
            return {
                ...state,
                filteredDogs: payload === "All" ? state.filteredDogs : createFilter
            }
        default:
            return state
    }
}

export default rootReducer