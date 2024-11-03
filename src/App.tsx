import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ConfirmationPage from './components/ConfirmationPage'
import DonationForm from './components/DonationForm'

const App: React.FC = () => (
	<HashRouter>
		<Routes>
			<Route path='/' element={<DonationForm />} />
			<Route path='/confirmation' element={<ConfirmationPage />} />
		</Routes>
	</HashRouter>
)

export default App
