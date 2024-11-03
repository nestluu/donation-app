import React from 'react'
import { useLocation } from 'react-router-dom'

const ConfirmationPage: React.FC = () => {
	const location = useLocation()
	const { api_key, transaction, description, amount, hash_sum, custom_data } =
		location.state || {}

	return (
		<div className='dialog'>
			<h2>Результат транзакции</h2>
			<p>
				<strong>API_KEY:</strong> {api_key}
			</p>
			<p>
				<strong>Hash_sum:</strong> {hash_sum}
			</p>
			<p>
				<strong>Транзакция:</strong> {transaction}
			</p>
			<p>
				<strong>Описание:</strong> {description}
			</p>
			<p>
				<strong>Сумма:</strong> {amount} руб.
			</p>
			<p>
				<strong>Инициатор:</strong> {custom_data.initiator}
			</p>
			<p>
				<strong>Сбор:</strong> {custom_data.collection}
			</p>
		</div>
	)
}

export default ConfirmationPage
