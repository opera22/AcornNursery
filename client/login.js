const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function carryon() {
	window.location.href = "userLogin.php";
}

function error() {
	alert("There was an error with the database.  Please try again.");
	window.location.href = "userLogin.php";
}

function navFunction() {
	var x = document.getElementById("topNav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// FormTwo//
// const sign_email = document.getElementById('sign_in_email');
// const sign_password = document.getElementById('sign_in_password');
//
const form = document.getElementById('form');
const f_name = document.getElementById('f_name');
const l_name = document.getElementById('l_name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
// Form //

// Form Validate
form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

// formTwo.addEventListener('submit', e => {
// 	e.preventDefault();
	
// 	checkInputs();
// });

function checkInputs() {
	// const signInEmail = sign_email.value.trim();
	// const signInPassword = sign_password.value.trim();
	// trim to remove the whitespaces
	const firstnameValue = f_name.value.trim();
	const lastnameValue = l_name.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	// if(signInEmail === '') {
	// 	setErrorFor(signInEmail, 'Email cannot be blank');
	// } else {
	// 	setSuccessFor(signInEmail);
	// }

	// if(signInPassword === '') {
	// 	setErrorFor(signInPassword, 'Password cannot be blank');
	// } else {
	// 	setSuccessFor(signInPassword);
	// }

	if(firstnameValue === '') {
		setErrorFor(f_name, 'First Name cannot be blank');
	} else {
		setSuccessFor(f_name);
	}

	if(lastnameValue === '') {
		setErrorFor(l_name, 'Last Name cannot be blank');
	} else {
		setSuccessFor(l_name);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Password does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});
// Form Validate