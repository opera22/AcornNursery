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