import itemService from '../services/itemService'

const cleanHerbReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_CLEAN_HERBS':
            return action.data
        default:
            return state
    }
}

export const cleanHerbInit = (data) => {
    return async (dispatch) => {
        const cleanHerbs = await itemService.getAllCleanHerbs()
        
        dispatch({
            type: 'INIT_CLEAN_HERBS',
            data: cleanHerbs
        })
    }
}

export default cleanHerbReducer