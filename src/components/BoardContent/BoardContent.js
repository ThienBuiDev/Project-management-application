import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { applyDrag } from 'utils'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/initialData'
import { fetchBoardDetails } from 'actions/APIs'
function BoardContent() {
	const [board, setBoard] = useState({})
	const [columns, setColumns] = useState([])
	const [showNewColumnForm, setShowNewColumnForm] = useState(false)
	const toggleNewColumnForm = () => {
		setShowNewColumnForm(!showNewColumnForm)
		setNewColumnTitle('')
	}

	const [newColumnTitle, setNewColumnTitle] = useState('')

	const newColumnTitleRef = useRef(null)
	useEffect(() => {
		const boardId = '61d1d1b4c557dc1a8fee295c'
		fetchBoardDetails(boardId).then((board) => {
			board.columns.sort((a, b) => board.columnOrder.indexOf(a.id) - board.columnOrder.indexOf(b.id))
			console.log(board)
			setBoard(board)
			setColumns(board.columns)
		})
	}, [])
	useEffect(() => {
		newColumnTitleRef && newColumnTitleRef.current && newColumnTitleRef.current.focus()
	}, [showNewColumnForm])

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

	const addNewColumSubmit = () => {
		if (newColumnTitle.trim() == '') {
			alert('Please enter column title')
			newColumnTitleRef && newColumnTitleRef.current && newColumnTitleRef.current.focus()
			setNewColumnTitle('')
			return
		} else {
			const newColumn = {
				id: `column-${Date.now()}`,
				title: newColumnTitle.trim(),
				cards: [],
				cardOrder: [],
			}
			setColumns([...columns, newColumn])
			setBoard({
				...board,
				columns: [...columns, newColumn],
				columnOrder: [...board.columnOrder, newColumn.id],
			})
			setNewColumnTitle('')
			setShowNewColumnForm(false)
		}

		newColumnTitleRef.current.focus()
	}
	const onNewColumnTitleChange = (e) => {
		setNewColumnTitle(e.target.value)
	}

	const onUpdateColumn = (newColumnToUpdate) => {
		const columnIdToUpdate = newColumnToUpdate.id
		const newColumns = [...columns]
		let columnIndex = newColumns.findIndex((c) => c.id === columnIdToUpdate)
		if (newColumnToUpdate._delete) {
			//remove column from
			newColumns.splice(columnIndex, 1)
		} else {
			newColumns[columnIndex] = newColumnToUpdate
		}
		setColumns(newColumns)
		setBoard({
			...board,
			columns: newColumns,
			columnOrder: newColumns.map((column) => column.id),
		})
		console.log(columnIndex)
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
						<Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
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
							<Form.Control size='sm' type='text' placeholder='Enter column title' className='enter-new-column-input' value={newColumnTitle} ref={newColumnTitleRef} onChange={onNewColumnTitleChange} onKeyDown={(e) => e.key === 'Enter' && addNewColumSubmit()} />
							<Button variant='success' size='sm' onClick={addNewColumSubmit}>
								Add column
							</Button>
							<span className='cancel-icon' onClick={toggleNewColumnForm}>
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
