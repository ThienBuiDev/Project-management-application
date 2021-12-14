import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'
import { applyDrag } from 'utils'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { initialData } from 'actions/initialData'
function BoardContent() {
	const [board, setBoard] = useState({})
	const [columns, setColumns] = useState([])

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
		let newBoard = [...columns]
		newBoard = applyDrag(newBoard, dropResult)
		setColumns(newBoard)
	}
	return (
		<div className='board-content'>
			<Container
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
						<Column column={column} />
					</Draggable>
				))}
			</Container>
		</div>
	)
}

export default BoardContent
