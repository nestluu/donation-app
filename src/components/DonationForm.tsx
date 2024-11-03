import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useExpiryDateValid from '../hooks/useDateValidation'
import { useRandomHash } from '../hooks/useRandomHash'
import useLuhnValidation from './../hooks/useLuhnValidation'

const DonationForm: React.FC = () => {
	const API_KEY = '316b2be8-3475-4462-bd57-c7794d4bdb53'
	const SECRET_KEY = '1234567890'
	const toName = 'Иван К.'
	const target = '«Экскурсия»'
	const [cardNumber, setCardNumber] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [cvc, setCvc] = useState('')
	const [amount, setAmount] = useState(10)
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()
	const [errors, setErrors] = useState({
		cardNumber: '',
		expiryDate: '',
		cvc: '',
		amount: '',
		name: '',
		message: '',
	})

	const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value
		value = value.replace(/[^\d]/g, '')
		if (value.length > 2) {
			value = `${value.slice(0, 2)}/${value.slice(2)}`
		}
		if (value.length <= 5) {
			setExpiryDate(value)
		}
	}

	const isCardValid = useLuhnValidation(cardNumber)
	const isDateValid = useExpiryDateValid(expiryDate)

	const validateFields = () => {
		const newErrors = {
			cardNumber: '',
			expiryDate: '',
			cvc: '',
			amount: '',
			name: '',
			message: '',
		}

		if (!isCardValid || cardNumber === '')
			newErrors.cardNumber = 'Некорректный номер карты'
		if (!isDateValid) {
			newErrors.expiryDate = 'Неверный формат (MM/YY)'
		} else {
			newErrors.expiryDate = ''
		}
		if (cvc.length !== 3) newErrors.cvc = 'CVC должен содержать 3 цифры'
		if (typeof amount === 'number' && amount < 10)
			newErrors.amount = 'Минимальная сумма 10 руб'
		if (name === '') newErrors.name = 'Укажите ваше имя'
		if (message.length > 50)
			newErrors.message = 'Сообщение должно быть не длиннее 50 символов'

		setErrors(newErrors)
		return Object.values(newErrors).every(error => error === '')
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (validateFields()) {
			const transactionId = Math.random().toString(36).substring(2)
			const amountInt = typeof amount === 'string' ? parseInt(amount) : amount

			const requestData = {
				api_key: API_KEY,
				transaction: transactionId,
				description: 'Оплата услуги',
				amount: amountInt,
				hash_sum: useRandomHash(transactionId, amountInt, API_KEY, SECRET_KEY),
				custom_data: {
					initiator: toName,
					collection: target,
				},
			}

			setTimeout(() => {
				navigate('/confirmation', { state: requestData })
			}, 1000)
		}
	}

	return (
		<div className='form'>
			<h1 className='form__title'>{`${toName} собирает на ${target}`}</h1>
			<form onSubmit={handleSubmit}>
				<div className='inputField'>
					<p>Номер карты</p>
					<input
						value={cardNumber}
						onChange={e => setCardNumber(e.target.value)}
						type='text'
						className={errors.cardNumber ? 'input-error' : ''}
					/>
					<p className='error'>{errors.cardNumber}</p>
				</div>
				<div className='inputField__small'>
					<div className='inputField'>
						<p>Срок действия</p>
						<input
							value={expiryDate}
							onChange={handleExpiryDateChange}
							type='text'
							placeholder='MM/YY'
							className={errors.expiryDate ? 'input-error' : ''}
						/>
						<p className='error'>{errors.expiryDate}</p>
					</div>
					<div className='inputField'>
						<p>CVV</p>
						<input
							value={cvc}
							onChange={e => setCvc(e.target.value)}
							type='text'
							className={errors.cvc ? 'input-error' : ''}
						/>
						<p className='error'>{errors.cvc}</p>
					</div>
				</div>
				<div className='inputField'>
					<p>Сумма перевода</p>
					<input
						value={amount}
						onChange={e => setAmount(+e.target.value)}
						type='text'
						className={errors.amount ? 'input-error' : ''}
					/>
					<p className='error'>{errors.amount}</p>
				</div>
				<div className='inputField'>
					<p>Ваше имя</p>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						type='text'
						className={errors.name ? 'input-error' : ''}
					/>
					<p className='error'>{errors.name}</p>
				</div>
				<div className='inputField'>
					<p>Сообщение получателю</p>
					<input
						value={message}
						onChange={e => setMessage(e.target.value)}
						type='text'
						className={errors.message ? 'input-error' : ''}
					/>
					<p className='error'>{errors.message}</p>
				</div>
				<div className='btns'>
					<button className='pay' type='submit'>
						Перевести
					</button>
					<button className='back' type='submit'>
						Вернуться
					</button>
				</div>
			</form>
		</div>
	)
}

export default DonationForm
