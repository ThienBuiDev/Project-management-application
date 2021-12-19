import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
function ConfirmModal(props) {
	let { title, content, show, onAction } = props

	return (
		<Modal
			show={show}
			onHide={() => {
				onAction('close')
			}}
			backdrop='static'
			keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title className='h5'>{HTMLReactParser(title)}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{HTMLReactParser(content)}</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={() => {
						onAction('close')
					}}>
					Cancel
				</Button>
				<Button
					variant='primary'
					onClick={() => {
						onAction('confirm')
					}}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ConfirmModal
