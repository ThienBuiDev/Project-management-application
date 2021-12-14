import React from 'react'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'

import Card from 'components/Card/Card'
function Column({ column }) {
	const cards = column.cards.sort(
		(a, b) => column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id)
	)

	const onCardDrop = (dropResult) => {
		console.log(dropResult)
	}
	return (
		<div className='column'>
			<header className='column-drag-handle'>{column.title}</header>

			<div className='card-list'>
				<Container
					orientation='vertical'
					groupName='thienbui-column'
					// onDragStart={(e) => console.log('drag started', e)}
					// onDragEnd={(e) => console.log('drag end', e)}
					onDrop={onCardDrop}
					getChildPayload={(index) => cards[index]}
					dragClass='card-ghost'
					dropClass='card-ghost-drop'
					// onDragEnter={() => {
					// 	console.log('drag enter:', column.id)
					// }}
					// onDragLeave={() => {
					// 	console.log('drag leave:', column.id)
					// }}
					// onDropReady={(p) => console.log('Drop ready: ', p)}

					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'card-drop-preview',
					}}
					dropPlaceholderAnimationDuration={200}>
					{cards.map((card, index) => (
						<Draggable key={index}>
							<Card card={card} />
						</Draggable>
					))}
				</Container>
			</div>
			<footer>Add another card</footer>
		</div>
	)
}

export default Column
