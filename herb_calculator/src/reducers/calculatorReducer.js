const calculatorReducer = (state = null, action) => {
    switch (action.type) {
        case 'INIT_CALCULATOR':
            return action.data
        case 'UPDATE_CALCULATOR':
            const data = action.data
            const i = data.i
            const priceObject = state[i]

            priceObject.seedAmount = data.seedAmount
            priceObject.seedCost = data.seedCost
            priceObject.herbAmount = data.herbAmount
            priceObject.herbProfit = data.herbProfit
            priceObject.totalProfit = data.totalProfit

            const stateCopy = state.slice()
            stateCopy[i] = priceObject

            return stateCopy
        default:
            return state
    }
}

export const calculatorInit = () => {
    return async (dispatch) => {
        const priceArray = Array.apply(null, { length:14 }).map(function() { 
            return {
                seedAmount: 0,
                seedCost: 0,
                herbAmount: 0,
                herbProfit: 0,
                totalProfit: 0
            } 
        }) 

        dispatch({
            type: 'INIT_CALCULATOR',
            data: priceArray
        })
    }
}

export const calculatorUpdate = (i, seedPrice, seedAmountInput, herbPrice, herbAmountInput) => {
    const seedAmount = isNaN(seedAmountInput) ? 0 : seedAmountInput
    const herbAmount = isNaN(herbAmountInput) ? 0 : herbAmountInput

    const seedCost = +(seedPrice * seedAmount).toFixed(3) // the + converts the string returned by .toFixed into a number again
    const herbProfit = +(seedAmount * herbAmount * herbPrice).toFixed(3) 
    const totalProfit = +(herbProfit - seedCost).toFixed(3)

    return async (dispatch) => {
        dispatch({
            type: 'UPDATE_CALCULATOR',
            data: {
                i: i,
                seedAmount: seedAmount,
                seedCost: seedCost,
                herbAmount: herbAmount,
                herbProfit: herbProfit,
                totalProfit: totalProfit
            }  
        })
    }
}

export default calculatorReducer