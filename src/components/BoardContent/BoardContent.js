import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { applyDrag } from 'utils'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/initialData'
function BoardContent() {
	const [board, setBoard] = useState({})
	const [columns, setColumns] = useState([])
	const [showNewColumnForm, setShowNewColumnForm] = useState(false)

	useEffect(() => {
		const boardFromDB = initialData.boards.find((board) => board.id === 'board-1')
		boardFromDB.columns.sort(
			(a, b) => boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id)
		)
		if (boardFromDB) {
			setBoard(boardFromDB)
			setColumns(boardFromDB.columns)
		}
	}, [])

	if (isEmpty(board)) {
		return (
			<div className='not-found' style={{ padding: 10, color: 'white' }}>
				Board not found
			</div>
		)
	}

	const onColumnDrop = (dropResult) => {
		let newColumns = [...columns]
		newColumns = applyDrag(newColumns, dropResult)
		console.log(newColumns)
		setColumns(newColumns)
		setBoard({
			...board,
			columns: newColumns,
			columnOrder: newColumns.map((column) => column.id),
		})
	}

	const onCardDrop = (columnId, dropResult) => {
		console.log(columns)

		if ((dropResult.removedIndex == null) & (dropResult.addedIndex == null)) return
		console.log(dropResult)
		let newColumns = [...columns]
		let currentColumn = newColumns.find((column) => column.id === columnId)
		currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
		currentColumn.cardOrder = currentColumn.cards.map((card) => card.id)
		setColumns(newColumns)
	}

	const toggleNewColumnForm = () => {
		setShowNewColumnForm(!showNewColumnForm)
	}
	return (
		<div className='board-content'>
			<Container
				className='board-content-container'
				orientation='horizontal'
				onDrop={onColumnDrop}
				getChildPayload={(index) => columns[index]}
				dragHandleSelector='.column-drag-handle'
				dropPlaceholder={{
					animationDuration: 150,
					showOnTop: true,
					className: 'column-drop-preview',
				}}>
				{columns.map((column, index) => (
					<Draggable key={index}>
						<Column column={column} onCardDrop={onCardDrop} />
					</Draggable>
				))}
			</Container>

			<BootstrapContainer className='adjusted-bootstrap-container'>
				{!showNewColumnForm ? (
					<Row>
						<Col className='add-new-column' onClick={toggleNewColumnForm}>
							<i className='fa fa-plus icon' />
							Add another column
						</Col>
					</Row>
				) : (
					<Row>
						<Col className='enter-new-column'>
							<Form.Control
								size='sm'
								type='text'
								placeholder='Enter column title'
								className='enter-new-column-input'
							/>
							<Button variant='success' size='sm'>
								Add column
							</Button>
							<span className='cancel-new-column' onClick={toggleNewColumnForm}>
								<i className='fa fa-times'></i>
							</span>
						</Col>
					</Row>
				)}
			</BootstrapContainer>
		</div>
	)
}

export default BoardContent
