import itemService from '../services/itemService'

const grimyHerbReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_GRIMY_HERBS':
            return action.data
        default:
            return state
    }
}

export const grimyHerbInit = (data) => {
    return async (dispatch) => {
        const grimyHerbs = await itemService.getAllGrimyHerbs()
        
        dispatch({
            type: 'INIT_GRIMY_HERBS',
            data: grimyHerbs
        })
    }
}

export default grimyHerbReducer