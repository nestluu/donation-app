import { sha256 } from 'js-sha256'

export const useRandomHash = (
	transaction: string,
	amount: number,
	apiKey: string,
	secretKey: string
) => {
	const amountInKopecks = amount * 100
	const stringToHash = `${apiKey}${transaction}${amountInKopecks}${secretKey}`
	return sha256(stringToHash)
}
