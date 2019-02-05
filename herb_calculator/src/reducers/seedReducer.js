import itemService from '../services/itemService'

const seedReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_SEEDS':
            return action.data
        default:
            return state
    }
}

export const seedInit = (data) => {
    return async (dispatch) => {
        const seeds = await itemService.getAllSeeds()

        dispatch({
            type: 'INIT_SEEDS',
            data: seeds
        })
    }
}

export default seedReducer