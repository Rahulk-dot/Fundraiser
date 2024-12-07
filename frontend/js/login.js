// if (localStorage.getItem("token")) {
//   location.href = "./index.html";
// }

// let params = new URLSearchParams(location.search);
// if (params.get("error")) {
//   alert(params.get("error"));
//   window.history.replaceState(null, "", window.location.pathname);
// }

if (localStorage.getItem("token")) {
  location.href = "./index.html";
}

let params = new URLSearchParams(location.search);
if (params.get("error")) {
  alert(params.get("error"));
  window.history.replaceState(null, "", window.location.pathname);
}




const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const roleInput = document.getElementById("role");



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




function login() {
  let email = $("#email").val();
  let password = $("#password").val();



  console.log(email);
  console.log(password);



  


  $.ajax({
      url: "https://blogpost.org.in/fundraiser/api/login.php",
      method: "POST",
      data: {
          email,
        password
      },
      success: (response) => {
          response = JSON.parse(response);
          if (!response.status) {
              alert(response.message);
              return false;
          } else{
          localStorage.setItem("token", response.data.token);
          location.href = "./index.html";  
           

          
       }
  },
      error: (response) => {
          console.log(response);
      },
  });
}
