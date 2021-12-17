import React, { useState } from 'react'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, DropdownItem, DropdownButton } from 'react-bootstrap'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { Form } from 'react-bootstrap'
function Column({ column, onCardDrop }) {
	const cards = column.cards.sort(
		(a, b) => column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id)
	)

	const [showConfirmModal, setShowConfirmModal] = useState(false)

	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal)

	const onConfirmModalAction = (type) => {
		if (type === 'close') {
			//remove column
			toggleConfirmModal()
		}
		toggleConfirmModal()
	}
	return (
		<div className='column'>
			<header className='column-drag-handle'>
				<div className='column-title'>
					<Form.Control
						size='sm'
						type='text'
						placeholder='Enter column title'
						className='column-content-editable'
						value={column.title}
						// onChange={handleColumnTitleChange}
						// onEnter={addNewColumSubmit}
					/>
				</div>
				<div className='column-dropdown-actions'>
					<Dropdown>
						<Dropdown.Toggle id='dropdown-basic' className='dropdown-btn' />

						<Dropdown.Menu>
							<Dropdown.Item>Add card...</Dropdown.Item>
							<Dropdown.Item onClick={toggleConfirmModal}>
								Remove column...
							</Dropdown.Item>
							<Dropdown.Item>Copy list (in development)</Dropdown.Item>
							<Dropdown.Item>Archive cards (in development)</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</header>

			<div className='card-list'>
				<Container
					orientation='vertical'
					groupName='thienbui-column'
					// onDragStart={(e) => console.log('drag started', e)}
					// onDragEnd={(e) => console.log('drag end', e)}
					onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
			<footer>
				<div className='footer-container'>
					<i className='fa fa-plus icon' />
					Add another card
				</div>
			</footer>
			<ConfirmModal
				show={showConfirmModal}
				onAction={onConfirmModalAction}
				title='Remove Column'
				content={`Are you sure you want to remove <strong>${column.title}</strong> column? <br />This action is not reversible`}
			/>
		</div>
	)
}

export default Column
