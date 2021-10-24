const ph = document.getElementById('ph');
// /(\(\d{3}\))-(\d{3})-(\d{4})/
ph.addEventListener('paste', (e) => {
	let clipboardData, pastedData;

	// Stop data actually being pasted into div
	e.stopPropagation();
	e.preventDefault();

	// Get pasted data via clipboard API
	clipboardData = e.clipboardData || window.clipboardData;
	pastedData = clipboardData.getData('Text').trim();

	if (isNaN(pastedData) || pastedData.length > 10) {
		alert('Please paste 10 digit numbers only!');
		return;
	}
	ph.value = formatNumber(pastedData);
});
let firstThree = null;
let secondThree = null;
ph.addEventListener('textInput', (e) => {
	if (isNaN(e.data) || e.data == ' ' || ph.value.length >= 14) {
		e.stopPropagation();
		e.preventDefault();
		return;
	}
	ph.value = formatNumber(getNumberFromFormattedCode(ph.value));

	// if (ph.value.length === 3) {
	// 	firstThree = e.target.value;
	// 	ph.value = `(${e.target.value})-`;
	// 	return;
	// }

	// if (ph.value.length === 9) {
	// 	secondThree = e.target.value.split(')-')[1];
	// 	ph.value = `(${firstThree})-${secondThree}-`;
	// }
});

const getNum = document.getElementById('getNum');
getNum.addEventListener('click', () => {
	alert(getNumberFromFormattedCode(ph.value));
});

function formatNumber(contact) {
	// There would be 3 state of contact
	// 123
	// 789 879 1247
	let temp = contact.toString();
	if (temp.length === 3) return `(${temp})-`;
	if (temp.length >= 4 && temp.length <= 6) {
		// between 3 and 6 chars

		let firstThree = temp.slice(0, 3);
		let midThree = temp.slice(3, 6);
		if (midThree.length === 3) {
			return `(${firstThree})-${midThree}-`;
		}
		return `(${firstThree})-${midThree}`;
	}
	if (temp.length >= 7 && temp.length <= 10) {
		// between 3 and 6 chars
		let firstThree = temp.slice(0, 3);
		let midThree = temp.slice(3, 6);
		let rest = temp.slice(6);
		return `(${firstThree})-${midThree}-${rest}`;
	}
	return temp;
}

function getNumberFromFormattedCode(num) {
	return num.replace(/[^\d]/g, '');
}
