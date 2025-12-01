export function getStatusText(progressObj: Record<number, string>, percentage: number) {
	const keys = Object.keys(progressObj)
		.map(Number)
		.sort((a, b) => a - b);

	if (!keys.length) return "";

	const total = keys[keys.length - 1];
	if (!total) return "";

	const currentSec = (percentage / 100) * total;

	for (let i = 0; i < keys.length; i++) {
		const k = keys[i];
		if (currentSec < k) {
			return progressObj[k];
		}
	}

	return progressObj[keys[keys.length - 1]];
}
