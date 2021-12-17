import React, { useState, useEffect } from 'react'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
function Column({ column, onCardDrop, onUpdateColumn }) {
	const cards = column.cards.sort(
		(a, b) => column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id)
	)

	const [showConfirmModal, setShowConfirmModal] = useState(false)

	const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal)
	const [columnTitle, setColumnTitle] = useState(column.title)
	const handleColumnTitleChange = (e) => {
		setColumnTitle(e.target.value)
	}
	const handleColumnTitleBlur = (e) => {
		//remove column
		onUpdateColumn({
			...column,
			title: columnTitle,
		})

		toggleConfirmModal()
	}
	const onConfirmModalAction = (type) => {
		if (type === 'remove') {
			//remove column
			onUpdateColumn({
				...column,
				_delete: true,
			})
		}
		toggleConfirmModal()
	}

	const selectAllText = (e) => {
		e.target.select()
	}

	useEffect(() => {
		setColumnTitle(column.title)
	}, [column.title])

	const [showNewCardForm, setShowNewCardForm] = useState(false)
	const toggleNewCardForm = () => {
		setShowNewCardForm(!showNewCardForm)
		setNewColumnTitle('')
	}

	const [newColumnTitle, setNewColumnTitle] = useState('')
	return (
		<div className='column'>
			<header className='column-drag-handle'>
				<div className='column-title'>
					<Form.Control
						size='sm'
						type='text'
						placeholder='Enter column title'
						className='content-editable'
						value={columnTitle}
						onClick={selectAllText}
						onChange={handleColumnTitleChange}
						onBlur={handleColumnTitleBlur}
						onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
						onMouseDown={(e) => e.preventDefault()}
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
			{showNewCardForm && (
				<div className='add-new-card-container'>
					<Form.Control
						size='sm'
						type='text'
						placeholder='Enter column title'
						className='enter-new-card-textarea'
						as='textarea'
						rows='2'
						// value={newColumnTitle}
						// ref={newColumnTitleRef}
						// onChange={onNewColumnTitleChange}
						// onKeyDown={(e) => e.key === 'Enter' && addNewColumSubmit()}
					/>
					<Button variant='success' size='sm'>
						Add column
					</Button>
					<span className='cancel-icon' onClick={toggleNewCardForm}>
						<i className='fa fa-times'></i>
					</span>
				</div>
			)}
			{!showNewCardForm && (
				<footer>
					<div className='footer-container' onClick={toggleNewCardForm}>
						<i className='fa fa-plus icon' />
						Add another card
					</div>
				</footer>
			)}

			<ConfirmModal
				show={showConfirmModal}
				onAction={() => onConfirmModalAction('remove')}
				title='Remove Column'
				content={`Are you sure you want to remove <strong>${column.title}</strong> column? <br />This action is not reversible`}
			/>
		</div>
	)
}

export default Column
