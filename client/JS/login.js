const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
// FormTwo//
const sign_email = document.getElementById("sign_email");
const sign_password = document.getElementById("sign_password");
//
const form = document.getElementById("form");
const formSecond = document.getElementById("SecondForm");
const f_name = document.getElementById("f_name");
const l_name = document.getElementById("l_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
// Form //

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    console.log("Panel hit");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
    console.log("Panel hit");
});

// Form Validate
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (checkInputs()) {
        // This is what's called an async-await implementation. In front of the asynchronous function call, you put "await,"
        // and then at the function definition (above) you put "async". Asynchronous functions are common
        // in JavaScript, but they are also necessary in this case with Axios.
        // In the axios methods, the first parameter is the endpoint/url, and the second parameter is the body. The body
        // is where you store the information you want to send. For a GET request, you probably don't need a body, just an endpoint/URL.
        const res = await axios.post("/api/user/register", {
            f_name: e.target.f_name.value,
            l_name: e.target.l_name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        });
        console.log(res.data);
    }
});

formSecond.addEventListener("submit", (e) => {
    e.preventDefault();
    if (SignInValidate()) {
        console.log(e.target.sign_email.value);
        console.log(e.target.sign_password.value);
    }
});

function SignInValidate() {
    const signInEmail = sign_email.value.trim();
    const signInPassword = sign_password.value.trim();
    let allGood = true;

    if (signInEmail === "") {
        setErrorFor(sign_email, "Email cannot be blank");
        allGood = false;
    } else {
        setSuccessFor(sign_email);
    }

    if (signInPassword === "") {
        setErrorFor(sign_password, "Password cannot be blank");
        allGood = false;
    } else {
        setSuccessFor(sign_password);
    }

    return allGood;
}

function checkInputs() {
    // trim to remove the whitespaces
    const firstnameValue = f_name.value.trim();
    const lastnameValue = l_name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let allGood = true;

    if (firstnameValue === "") {
        setErrorFor(f_name, "First Name cannot be blank");
        allGood = false;
    } else {
        setSuccessFor(f_name);
    }

    if (lastnameValue === "") {
        setErrorFor(l_name, "Last Name cannot be blank");
        allGood = false;
    } else {
        setSuccessFor(l_name);
    }

    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
        allGood = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Not a valid email");
        allGood = false;
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
        allGood = false;
    } else {
        setSuccessFor(password);
    }

    if (password2Value === "") {
        setErrorFor(password2, "Password cannot be blank");
        allGood = false;
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "Password does not match");
        allGood = false;
    } else {
        setSuccessFor(password2);
    }

    return allGood;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

// // SOCIAL PANEL JS
// const floating_btn = document.querySelector('.floating-btn');
// const close_btn = document.querySelector('.close-btn');
// const social_panel_container = document.querySelector('.social-panel-container');

// floating_btn.addEventListener('click', () => {
// 	social_panel_container.classList.toggle('visible')
// });

// close_btn.addEventListener('click', () => {
// 	social_panel_container.classList.remove('visible')
// });
// Form Validate
