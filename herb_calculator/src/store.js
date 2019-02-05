import { 
    createStore, 
    combineReducers,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

import seedReducer from './reducers/seedReducer'
import cleanHerbReducer from './reducers/cleanHerbReducer'
import grimyHerbReducer from './reducers/grimyHerbReducer'
import calculatorReducer from './reducers/calculatorReducer'

const reducer = combineReducers({ 
    seeds: seedReducer,
    cleanHerbs: cleanHerbReducer,
    grimyHerbs: grimyHerbReducer,
    calculator: calculatorReducer 
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store