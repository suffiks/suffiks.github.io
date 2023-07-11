export type LineProps = { x1: number; x2: number; y1: number; y2: number };

export const getOffset = (el: HTMLElement) => {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollY,
		top: rect.top + window.scrollX,
		width: rect.width || el.offsetWidth,
		height: rect.height || el.offsetHeight,
	};
};

export const calculateLine = (
	previewEl: HTMLElement,
	leftEl: HTMLElement,
	rightEl: HTMLElement,
	invert = false,
): LineProps => {
	const offset = getOffset(previewEl);
	const off1 = getOffset(leftEl);
	const off2 = getOffset(rightEl);

	if (invert) {
		const x1 = off2.left + off2.width - offset.left;
		const y1 = off2.top + off2.height / 2 - offset.top;

		const x2 = off1.left - offset.left;
		const y2 = off1.top + off1.height / 2 - offset.top;

		return { x1, x2, y1, y2 };
	}

	const x1 = off1.left + off1.width - offset.left;
	const y1 = off1.top + off1.height / 2 - offset.top;

	const x2 = off2.left - offset.left;
	const y2 = off2.top + off2.height / 2 - offset.top;

	return { x1, x2, y1, y2 };
};
