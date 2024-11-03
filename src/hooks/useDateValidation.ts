const useExpiryDateValid = (expiry: string) => {
	const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
	if (!regex.test(expiry)) return false

	const [month, year] = expiry.split('/').map(Number)
	const currentDate = new Date()
	const currentMonth = currentDate.getMonth() + 1
	const currentYear = currentDate.getFullYear() % 100

	return year > currentYear || (year === currentYear && month >= currentMonth)
}

export default useExpiryDateValid
