export const RemoveBlanks = (obj) => {
	const sanitized = {}
	for (const key in obj) {
		if (key === '__typename') {
			continue
		}
		if (Array.isArray(obj[key])) {
			sanitized[key] = []
			for (const value of obj[key]) {
				if (value !== '') sanitized[key].push(value)
			}
		} else if (typeof obj[key] === 'object') {
			const child = RemoveBlanks(obj[key])
			if (Object.keys(child).length > 0) {
				sanitized[key] = child
			}
		} else if (obj[key] !== '' && obj[key] !== undefined) {
			sanitized[key] = obj[key]
		}
	}
	return sanitized
}
