if (localStorage.getItem("token")) {
  location.href = "./index.html";
}

const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

usernameInput.addEventListener("input", () => {
  console.log("i am in user validation");
  if (!validateUsername(usernameInput.value)) {
    usernameError.textContent = "Username must have 8 characters";
    usernameInput.classList.add("is-invalid");
  } else {
    usernameError.textContent = "";
    usernameInput.classList.replace("is-invalid","is-valid");
  }
});

function validateUsername(username) {
  return username.length >= 5;
}

emailInput.addEventListener("input", () => {
  console.log("i am in email validation");
  if (!validateEmail(emailInput.value)) {
    emailError.textContent = "Invalid email address";
    emailInput.classList.add("is-invalid");
  } else {
    emailError.textContent = "";
    emailInput.classList.replace("is-invalid","is-valid");
  }
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
}

passwordInput.addEventListener("input", () => {
  console.log("i am in password validation");
  if (!validatePassword(passwordInput.value)) {
    passwordError.innerHTML =
      "<p>Password must have:<br>more than 8 letters<br>both uppercase or lowercase<br>atleast one digit<br>atleast one special character</p>";
      passwordInput.classList.add("is-invalid");
  } else {
    passwordError.textContent = "";
    passwordInput.classList.replace("is-invalid","is-valid");
  }
});

function validatePassword(password) {
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}/;
  return passwordRegex.test(password);
}


$(document).ready(() => {
  $("#submit").click((e) => {
    e.preventDefault();
    
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();

    // Create FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    // Validate all fields
    if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
      return false;
    }

    $.ajax({
      url: "https://blogpost.org.in/fundraiser/api/register.php",
      method: "POST",
      processData: false,  // Important for FormData
      contentType: false,  // Important for FormData
      data: formData,
      xhrFields: {
        withCredentials: false
      },
      beforeSend: function() {
        console.log("Attempting to send request...");
      },
      complete: function(xhr, status) {
        console.log("Request completed:", {
          status: status,
          response: xhr.responseText
        });
      },
      success: function(response) {
        console.log("Success response:", response);
        const data = JSON.parse(response);
        if (data.status) {
          alert("Registration successful!");
          window.location.href = "./login.html";
        } else {
          alert(data.message);
        }
      },
      error: function(xhr, status, error) {
        console.log("Error occurred:", error);
        console.log("Status:", status);
        console.log("Response:", xhr.responseText);
        alert("An error occurred during registration");
      }
    });
  });
});