const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pd = document.getElementById('pd');
const phoneInput = document.getElementById('phone');
const providerState = document.getElementById('stateid');
const providerImg = document.getElementById('imgprovider');
const errorState = document.getElementById('error');
const errorText = document.getElementById('errorText');
const stateFirst = document.querySelector('.stateFirst');
const otpInput = document.querySelector('#otpInput');
const validationText = document.querySelector('.validationText');
const btnValidateOTP = document.querySelector('#btnValidateOTP');
const attemptsDiv = document.querySelector('#attempts');

const vError = {
	name: document.getElementById('vName'),
	email: document.getElementById('vEmail'),
	phone: document.getElementById('vPhone')
};

let USR_OTP = null;
let USR_ATTEMPTS = 3;

nameInput.addEventListener('blur', () => {
	if (!isValidName(nameInput.value)) {
		setErrorState(vError.name, vError.msg ?? 'Please enter your full name.');
		return;
	}
	setSuccessState(vError.name);
});

emailInput.addEventListener('blur', () => {
	if (!isValidEmail(emailInput.value)) {
		setErrorState(vError.email, 'Please enter a valid email address.');
		return;
	}
	setSuccessState(vError.email);
});
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
	if (!provider || !state) {
		setErrorState(vError.phone, 'Invalid phone number!');
	}
	setProvider(provider);
	setState(state);
	if (contact.length == 10 && provider && state) {
		setSuccessState(vError.phone);
		return;
	}
	setErrorState(vError.phone, 'Please enter 10 digit phone no.');
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

btnSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	const usrName = nameInput.value.trim();
	const usrEmail = emailInput.value.trim();
	const usrPhone = phoneInput.value.trim();

	if (!isValidName(usrName)) {
		setErrorState(vError.name, 'Please enter name in valid format.');
		return;
	}
	if (!isValidEmail(usrEmail)) {
		setErrorState(vError.email, 'Invalid e-mail address!');
		return;
	}
	if (!isValidPhone(usrPhone)) {
		console.log(usrPhone);
		setErrorState(vError.phone, 'Phone number is not valid!');
		return;
	}
	const user = {
		usrName,
		usrEmail,
		usrPhone
	};
	generateOTP();
	verifyUser(user);
});

function isValidName(name) {
	if (!isValidInput(name)) {
		return false;
	}

	const letters = /^[a-zA-Z\s]*$/;

	if (!name.match(letters)) {
		vError.msg = 'Only alphabets allowed in name!';
		return false;
	}

	let fullName = name.split(' ');

	if (fullName.length < 2) {
		vError.msg = 'Enter First Name & Last name!';
		return false;
	}

	for (localname of fullName) {
		if (localname.length < 4) {
			vError.msg = 'Name should be 4+ characters long.';
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
	if (isNaN(contact)) {
		let sanitized = phoneInput.value.slice(0, -1);
		phoneInput.value = sanitized;
		pd.innerText = formatNumber(sanitized);
		// alert('Non number detected. Removed last character.');
		return false;
	}
	pd.innerText = formatNumber(contact);
	let provider = null;
	let statename = null;
	if (contact.length >= 3) {
		provider = getProvider(contact);
	}
	if (contact.length >= 6) {
		statename = getStateFromNumber(contact);
	}
	setProvider(provider);
	setState(statename);

	if (provider && statename && contact.length == 10) {
		setSuccessState(vError.phone);
		return;
	}
	setErrorState(vError.phone, 'Invalid phone number!');
	if (contact.length > 10) {
		setProvider(null);
		setState(null);
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
	let stateName = getStateFromNumber(contact);

	if (!provider || !stateName) return false;

	return true;
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
function verifyUser(user) {
	// Saving user to do something later.
	localStorage.setItem('usr', JSON.stringify(user));

	// Get the firstname for display.
	const [firstName, lastName, ...rest] = user.usrName.split(' ');
	// Display
	stateFirst.style.display = 'none';

	let text = `Dear ${firstName},
	<span>Thank you for your inquiry.<br/> A 4 digit verification number has been sent to your phone number: ${user.usrPhone},<br/>
	please enter in the following box and submit for confirmation:<span>
	<br/><span class="genotp">Your one time password is: ${USR_OTP}</span>`;

	validationText.innerHTML = text;

	const stateSecond = document.querySelector('.stateSecond');
	stateSecond.style.display = 'flex';
}

btnValidateOTP.addEventListener('click', () => {
	if (otpInput.value.length == 0) return;

	if (otpInput.value == USR_OTP) {
		// Sucess
		attemptsDiv.innerText = '';
		document.querySelector('.validationControls').style.display = 'none';

		validationText.innerHTML = `<h3>Success! Your OTP has been Validated!, You will now be redirected to our official site!'</h3>
		<img src="/assets/success.png" alt="success" width="300px" style="padding: 1rem">
			`;
		setTimeout(() => {
			location.replace('http://pixel6.co');
		}, 3000);
		return;
	}
	if (USR_ATTEMPTS <= 1) {
		attemptsDiv.innerText = '';
		document.querySelector('.validationControls').style.display = 'none';
		validationText.innerHTML = `<h3>Ah Snap! You ran out of attempts.
			 Your OTP verification has failed!</h3>
			 <img src="/assets/error.png" alt="error" width="300px" style="padding: 1rem">`;
		setTimeout(() => {
			location.replace('http://pixel6.co/404');
		}, 3000);
		return;
	}

	USR_ATTEMPTS--;
	generateOTP();
	attemptsDiv.innerText = `Wrong OTP! You have ${USR_ATTEMPTS} attempts left.`;
	document.querySelector(
		'.genotp'
	).innerText = `Your one time password is: ${USR_OTP}`;
});

function setErrorState(control, msg) {
	control.src = 'assets/x.svg';
	errorState.style.display = 'flex';
	errorText.innerText = msg;
}

function setSuccessState(control) {
	errorState.style.display = 'none';
	control.src = 'assets/check.svg';
}

function generateOTP() {
	let digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 4; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}

	USR_OTP = OTP;
}
