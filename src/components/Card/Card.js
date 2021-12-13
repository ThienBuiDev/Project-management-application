import React from 'react'
import './Card.scss'

function Card(props) {
	const card = props.card

	return (
		<li className='card-item'>
			{card.cover && (
				<img
					className='card-cover'
					src='https://res.cloudinary.com/practicaldev/image/fetch/s--JIe3p0M4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/093ewdrgyf1kedlhzs51.png'
					alt='img-alt'
				/>
			)}

			{card.title}
		</li>
	)
}

export default Card
