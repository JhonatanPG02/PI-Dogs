const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: [],
}

export default function rootReducer (state=initialState, action) {
    switch(action.type){
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case 'GET_ALL_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'GET_BY_NAME':
            return{
                ...state,
                dogs: action.payload
            }
        case 'ORDER_BY_NAME':
            const orderName = action.payload === 'asc name'
            ? state.dogs.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            : state.dogs.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
            return{
                ...state,
                dogs: orderName
            }
        case 'ORDER_BY_WEIGHT': 
            const allDogsW = state.allDogs.filter( e => e.weight_min)
            const orderWeight = action.payload === 'min'
            ?  allDogsW.sort((a , b) =>{
                return a.weight_min - b.weight_min
                }) 
            : allDogsW.sort((a,b) =>{
                return b.weight_max - a.weight_max
                })
            return{
                ...state,
                dogs: orderWeight
            }
        case 'FILTER_TEMPERAMENTS':
            const allDogs = state.allDogs
            const filterTemp = action.payload === 'All' ? allDogs : allDogs.filter(e => {
                if (typeof (e.temperaments) === 'string') return e.temperaments.includes(action.payload);
                if (Array.isArray(e.temperaments)) {
                    let temps = e.temperaments.map(e => e.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return{
                ...state,
                dogs: filterTemp
            }
        case 'FILTER_BREEDS':
            const allBreeds = state.allDogs
            const filterBreeds = action.payload === 'all breeds' 
            ? allBreeds 
            : action.payload === 'created' ? allBreeds.filter(e => e.createdInDb) : allBreeds.filter(e => !e.createdInDb)
            return{
                ...state,
                dogs: filterBreeds
            }
        case 'CLEAR_STATE': 
            return{
                ...state,
                details: []
            } 
        case 'POST_TEMPERAMENTS':
            return{
                ...state
            }
        default: return state
    }
}


