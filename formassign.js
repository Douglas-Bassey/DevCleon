const form = document.getElementById("formlogin");

const email = document.getElementById("email");
const name = document.getElementById("name");
const age = document.getElementById("age");
const password = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");


const nameRegex = /^[A-Za-z]{2,}$/;
const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
const ageRegex = /^[0-9]{1,3}$/;
const passwordRegex = /^[0-9]{1,8}$/;

// error handling
function showError(input, message, errorId) {
  input.classList.add("invalid");
  input.classList.remove("success");
  const error = document.getElementById(errorId);
  error.style.display = "block";
  error.textContent = message;
}

function showSuccess(input, errorId) {
  input.classList.remove("invalid");
  input.classList.add("success");
  document.getElementById(errorId).style.display = "none";
}

// email validation

function validateEmail() {
  if (!emailRegex.test(email.value.trim())) {
    showError(email, "Enter a valid email", "emailError");
    return false;
  }
  showSuccess(email, "emailError");
  return true;
}

// name validation

function validateName() {
  if (!nameRegex.test(name.value.trim())) {
    showError(name, "Minimum of 2 letters required", "nameError");
    return false;
  }
  showSuccess(name, "nameError");
  return true;
}

// age validation
function ValidateAge() {
    const value = Number(age.value);
    
    if (age.value.trim() === "" || ! ageRegex.test(age.value.trim())) {
        showError(age, "please enter a valid age", "ageError");
        return false;
    }

    if (value < 18) {
        showError(age, "Below 18, not eligible", "ageError");
        return false;
    }
    showSuccess(age, "ageError");
    return true;
}

// password validation

function validatePassword() {
  const value = password.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[a-z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  const colors = ["red", "orange", "yellow", "lightgreen", "green"];
  strengthBar.style.width = strength * 20 + "%";
  strengthBar.style.background = colors[strength - 1] || "red";


  if (strength < 4) {
    showError(password, "password must be at least 8 character long, contain 1 lowercase, 1 uppercase and a number", "passwordError");
    return false;
  }
  showSuccess(password, "passwordError");
  return true;
}

name.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
age.addEventListener("input", ValidateAge);
password.addEventListener("input", validatePassword);

// visbility toggle
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    if (target.type === "password") {
      target.type = "text";
      btn.textContent = "hide";
    } else {
      target.type = "password";
      btn.textContent = "show";
    }
  });
});

// handling submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = validateName() && validateEmail() && ValidateAge() && validatePassword();

  if (isValid) {
    alert("Welcome to your Dashboard");
    form.reset();
    strengthBar.style.width = "0%";
  }
});
