import React from 'react'
import './Column.scss'
import Card from 'components/Card/Card'
function Column({ column }) {
	const cards = column.cards.sort((a, b) => column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id))
	return (
		<div className='column'>
			<header>{column.title}</header>

			<ul className='card-list'>
				{cards.map((card,index) => (
					<Card key={index} card={card} />
				))}
			</ul>
			<footer>Add another card</footer>
		</div>
	)
}

export default Column
