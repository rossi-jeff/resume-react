export const FormatName = (name) => {
	let formatted = '';

	if (name) {
		if (name.Salutation) {
			formatted += `${name.Salutation} `
		}
		if (name.First) {
			formatted += `${name.First} `
		}
		if (name.Middle) {
			formatted += `${name.Middle} `
		}
		if (name.Last) {
			formatted += `${name.Last} `
		}
		if (name.Suffix) {
			formatted += name.Suffix
		}
	}

	return formatted;
}