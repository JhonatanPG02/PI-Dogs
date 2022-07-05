import axios from 'axios'

export function getAllDogs(){
    return async function(dispatch) {
        try {
        const res = await axios.get('/dogs')
        return dispatch ({
            type: 'GET_ALL_DOGS',
            payload: res.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getAllTemperaments() {
    return async function(dispatch) {
        try {
        const res = await axios.get('/temperaments')
        return dispatch({
            type: 'GET_ALL_TEMPERAMENTS',
            payload: res.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetails(id){
    return async function(dispatch) {
        try {
        const res = await axios.get(`/dogs/${id}`)
        return dispatch({
            type: 'GET_DETAILS',
            payload: res.data
        })
        } catch(error) {
            console.log(error)
        }
    }
}

export function getByName(name) {
    return async function(dispatch) {
        try{
        const res = await axios.get(`/dogs?name=${name}`)
        return dispatch({
            type: 'GET_BY_NAME',
            payload: res.data
        })
        }catch(error) {
            alert('Breed name not found')
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterTemperaments(payload){
    return {
        type: 'FILTER_TEMPERAMENTS',
        payload
    }
}

export function filterBreeds(payload) {
    return {
        type: 'FILTER_BREEDS',
        payload
    }
}

export function clearState(){
    return {
        type: 'CLEAR_STATE'
    }
}

export function postDogs(payload){
    return async function (dispatch) {
        const res = await axios.post('/dogs', payload)
        return res.data
    }
}