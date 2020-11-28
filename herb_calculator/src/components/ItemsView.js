import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { calculatorInit, calculatorUpdate } from '../reducers/calculatorReducer'

class ItemsView extends React.Component {
    allIndexes = Array.apply(null, { length: 14 }).map(Number.call, Number) // Array containing integers 0-13
    visibleIndexes = this.allIndexes.slice() // Array containing indexes for each visible seed/herb combination, all are visible by default.
    seedAmounts = new Array(14).fill(0) // Array with amounts for each seed. 0 by default.
    herbAmounts = new Array(14).fill(0) // Array with amounts for each expected herb harvest per seed. 0 by default.
    currentlyClean = new Array(14).fill(false) // Array with boolean status determining clean/grimy status for each herb
    allHerbTypeToggle = false
    firstRender = true
    editAllSeedAmount = false
    editAllHerbAmount = false
    
    componentDidMount() {
        this.props.calculatorInit()
    }

    toggleAllSeedAmountEdit = () => {
        this.editAllSeedAmount = this.editAllSeedAmount ? false : true
    }

    toggleAllHerbAmountEdit = () => {
        this.editAllHerbAmount = this.editAllHerbAmount ? false : true
    }

    calculate = (i) => {
        const seedPrice = this.props.seeds[i].price
        const seedAmount = this.seedAmounts[i]
        const herbPrice = this.herbs[i].price  
        const herbAmount = this.herbAmounts[i]

        this.props.calculatorUpdate(i, seedPrice, seedAmount, herbPrice, herbAmount)
    }

    toggleHerbTypeForAll = () => {
        if (this.allHerbTypeToggle) {
            this.allHerbTypeToggle = false
            this.herbs = this.props.grimyHerbs.slice()

            this.visibleIndexes.forEach(i => {
                this.currentlyClean[i] = false
                this.calculate(i)
            })
        } else {
            this.allHerbTypeToggle = true
            this.herbs = this.props.cleanHerbs.slice()
            
            this.visibleIndexes.forEach(i => {
                this.currentlyClean[i] = true
                this.calculate(i)
            })
        }
    }

    hide = (i) => {
        return () => {
            const index = this.visibleIndexes.indexOf(i)

            if (index > -1) {
                this.visibleIndexes.splice(index, 1)
                this.forceUpdate()
            }
        }
    }

    showAll = () => {
        this.visibleIndexes = this.allIndexes.slice()
        this.forceUpdate()
    }

    toggleHerbType = (i) => {
        return () => {
            if (this.currentlyClean[i]) {
                this.currentlyClean[i] = false
                this.herbs[i] = this.props.grimyHerbs[i]
            } else {
                this.currentlyClean[i] = true
                this.herbs[i] = this.props.cleanHerbs[i]
            }
            this.calculate(i)
        }
    }

    updateSingleAmount = (amountTable, newAmount, i) => {
        amountTable[i] = newAmount
        this.calculate(i)
    }
    
    updateAllAmounts = (amountTable, newAmount) => {  
        this.allIndexes.forEach(i => {
            this.updateSingleAmount(amountTable, newAmount, i)
        })
    }

    updateSeedAmount = (i) => {
        return (event) => {
            const newAmount = parseFloat(event.target.value)

            if (this.editAllSeedAmount) {
                this.updateAllAmounts(this.seedAmounts, newAmount)
            } else {
                this.updateSingleAmount(this.seedAmounts, newAmount, i)
            }
        }
    }

    updateHerbAmount = (i) => {
        return (event) => {
            const newAmount = parseFloat(event.target.value)

            if (this.editAllHerbAmount) {
                this.updateAllAmounts(this.herbAmounts, newAmount)
            } else {
                this.updateSingleAmount(this.herbAmounts, newAmount, i)
            }
        }
    }

    displayProfit = (profit) => {
        const color = profit >=0 ? 'green' : 'red'
        
        const style = {
            color: color
        }

        return <div style={style}>{profit}</div>
    }

    render() {
        if (this.props.seeds.length !== 14 || this.props.grimyHerbs.length !== 14 || this.props.cleanHerbs.length !== 14) {
            return <p>Database is missing data, please come back later</p>
        }

        if (this.firstRender) {
            this.herbs = this.props.grimyHerbs.slice()
            this.firstRender = false
        }
        
        return (
            <div>
                <button onClick={this.showAll}>Show all</button>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Seed</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>
                                Amount 
                                <input type="checkbox" onChange={this.toggleAllSeedAmountEdit} /> 
                                (Toggle edit all)
                            </Table.HeaderCell>
                            <Table.HeaderCell>Seed cost</Table.HeaderCell>
                            <Table.HeaderCell>Herb (Toggle between grimy and clean)</Table.HeaderCell>
                            <Table.HeaderCell>
                                <input type="checkbox" onChange={this.toggleHerbTypeForAll} /> 
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Herbs harvested (per seed)
                                <input type="checkbox" onChange={this.toggleAllHerbAmountEdit} />
                                (Toggle edit all)
                            </Table.HeaderCell>
                            <Table.HeaderCell>Herb profit</Table.HeaderCell>
                            <Table.HeaderCell>Total profit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.visibleIndexes.map(i => <Table.Row key={i}>
                            <Table.Cell>
                                <button onClick={this.hide(i)}>Hide</button>
                            </Table.Cell>
                            <Table.Cell>
                                {this.props.seeds[i].name}                            
                            </Table.Cell>
                            <Table.Cell>
                                <img src={require(`../images/${this.props.seeds[i].apiId}.gif`)} alt={this.props.seeds[i].name} />
                            </Table.Cell>
                            <Table.Cell>
                                <input 
                                    type="number" 
                                    step="1" 
                                    value={this.seedAmounts[i]} 
                                    onChange={this.updateSeedAmount(i)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                {this.props.calculator[i].seedCost}
                            </Table.Cell>
                            <Table.Cell>
                                {this.herbs[i].name} 
                            </Table.Cell>
                            <Table.Cell>
                                <img src={require(`../images/${this.herbs[i].apiId}.gif`)} alt={this.herbs[i].name} />
                                <input type="checkbox" onChange={this.toggleHerbType(i)} checked={this.currentlyClean[i]}/>
                            </Table.Cell>
                            <Table.Cell>
                                <input 
                                    type="number" 
                                    step="1" 
                                    value={this.herbAmounts[i]} 
                                    onChange={this.updateHerbAmount(i)} 
                                />
                            </Table.Cell>
                            <Table.Cell>
                                {this.props.calculator[i].herbProfit}
                            </Table.Cell>
                            <Table.Cell>
                                {this.displayProfit(this.props.calculator[i].totalProfit)}
                            </Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        seeds: state.seeds,
        cleanHerbs: state.cleanHerbs,
        grimyHerbs: state.grimyHerbs,
        calculator: state.calculator 
    }
}

const mapDispatchToProps = { calculatorInit, calculatorUpdate }

export default connect(mapStateToProps, mapDispatchToProps) (ItemsView)