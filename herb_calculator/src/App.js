import React from 'react'

import { connect } from 'react-redux'
import { seedInit } from './reducers/seedReducer'
import { cleanHerbInit } from './reducers/cleanHerbReducer'
import { grimyHerbInit } from './reducers/grimyHerbReducer'

import ItemsView from './components/ItemsView'

class App extends React.Component {
	componentDidMount() {
		this.props.seedInit()
		this.props.cleanHerbInit()
		this.props.grimyHerbInit()
	}

	render() {
		return (
			<div>
				<h1>OSRS Herb Farming Profit Calculator</h1>
				<ItemsView />
			</div>
		)
	}
}

const mapDispatchToProps = { seedInit, cleanHerbInit, grimyHerbInit }

export default connect(null, mapDispatchToProps) (App)
