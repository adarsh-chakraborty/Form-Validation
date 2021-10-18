const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pd = document.getElementById('pd');
const phoneInput = document.getElementById('phone');
const providerState = document.getElementById('stateid');
const providerImg = document.getElementById('imgprovider');

phoneInput.addEventListener('keyup', validatePhone);
phoneInput.addEventListener('change', (e) => {
	let contact = e.target.value;
	let provider = null;
	let state = null;
	if (contact.length >= 3) {
		provider = getProvider(contact);
	}
	if (contact.length >= 6) {
		state = getStateFromNumber(contact);
	}
	setProvider(provider);
	setState(state);
});
phoneInput.addEventListener('focus', () => {
	if (!isValidInput(phoneInput.value.trim())) {
		pd.innerText = '';
	}
});
phoneInput.addEventListener('blur', () => {
	let contact = phoneInput.value.trim();
	if (!isValidInput(contact)) {
		pd.innerText = 'Enter 10 digits phone number.';
	}
});
phoneInput.addEventListener('paste', validatePhone);

const btnSubmit = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', () => {
	const usrName = nameInput.value.trim();
	const usrEmail = emailInput.value.trim();
	const usrPhone = phoneInput.value.trim();

	if (!isValidName(usrName)) {
		return alert('Invalid');
	}
	if (!isValidEmail(usrEmail)) {
		return alert('Invalid');
	}
	if (!isValidPhone) {
		return alert('Invalid');
	}
});

function isValidName(name) {
	if (!isValidInput(name)) {
		return false;
	}

	const letters = /^[a-zA-Z\s]*$/;

	if (!name.match(letters)) {
		return false;
	}

	let fullName = name.split(' ');

	if (fullName.length < 2) {
		return false;
	}

	for (localname of fullName) {
		if (localname.length < 4) {
			return false;
		}
	}

	return true;
}

function isValidEmail(email) {
	if (!isValidInput(email)) {
		return false;
	}
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email);
}

function validatePhone(e) {
	if (!isValidInput) return false;
	let contact = e.target.value;
	if (isNaN(parseInt(contact))) {
		let sanitized = phoneInput.value.slice(0, -1);
		phoneInput.value = sanitized;
		pd.innerText = formatNumber(sanitized);
		// alert('Non number detected. Removed last character.');
		return false;
	}
	pd.innerText = formatNumber(contact);

	if (contact.length >= 3) {
		setProvider(getProvider(contact));
	}
	if (contact.length >= 6) {
		setState(getStateFromNumber(contact));
	}
}

function setProvider(provider) {
	if (provider) {
		providerImg.src = provider.img;
		return;
	}
	providerImg.src = '';
}

function setState(sname) {
	if (sname) {
		providerState.innerHTML = `<pre>${sname}</pre>`;
		return;
	}
	providerState.innerHTML = ``;
}

function isValidPhone(contact) {
	if (contact.length != 10) return false;

	let provider = getProvider(contact);
	let state = getStateFromNumber(contact);

	if (!provider || !state) return false;
}

function getProvider(contact) {
	let firstThree = contact.slice(0, 3);
	let currentProvider = null;
	if (firstThree >= 621 && firstThree <= 800) {
		currentProvider = PROVIDERS.jio;
	}
	if (firstThree >= 801 && firstThree <= 920) {
		currentProvider = PROVIDERS.vi;
	}
	if (firstThree >= 921 && firstThree <= 999) {
		currentProvider = PROVIDERS.airtel;
	}
	return currentProvider;
}

function getStateFromNumber(contact) {
	let secondThree = contact.slice(3, 6);
	let flag = null;
	for (let currentState of STATES) {
		console.log(secondThree);
		if (secondThree >= currentState.from && secondThree <= currentState.to) {
			flag = currentState.stateName;
			break;
		}
	}
	console.log(flag);
	return flag;
}
function formatNumber(contact) {
	// There would be 3 state of contact
	// 123
	// 123123
	let temp = contact.toString();
	if (temp.length === 3) return `(${temp})-`;
	if (temp.length >= 3 && temp.length <= 6) {
		// between 3 and 6 chars
		let firstThree = temp.slice(0, 3);
		let midThree = temp.slice(3, 6);
		return `(${firstThree})-${midThree}-`;
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

function isValidInput(input) {
	if (input.length == 0) {
		return false;
	}
	return true;
}
function verifyUser(user) {}

function setErrorState(control, msg) {}

function setSuccessState(control) {}
