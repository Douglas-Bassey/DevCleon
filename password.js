const form = document.getElementById("formlogin");

const password = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");

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
    showError(password, "password too weak", "passwordError");
    return false;
  }
  showSuccess(password, "passwordError");
  return true;
}

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

  const isValid = validatePassword();

  if (isValid) {
    alert("Password created successfully");
    form.reset();
    strengthBar.style.width = "0%";
  }
});
