const button = document.querySelector('#button-submit-password');
const passwordInput = document.querySelector('#password-coca-cola');
button.addEventListener('click', (event) => {
  password();
})
passwordInput.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    password();
    event.preventDefault();
  }
});
function password() {
  const password = 'dentsu2021';
  const value = document.getElementById("password-coca-cola").value;

  if (value === password) {
    document.querySelector("#error").style.zIndex = -3213;
    document.querySelector("#error").style.opacity = 0;
    showHideLoader();
  } else {
    document.querySelector("#error").style.zIndex = 1;
    document.querySelector("#error").style.opacity = 1;
  }
}
const open = document.querySelector('.open');
const close = document.querySelector('.closed');
open.addEventListener('click', ev => {
  open.style.zIndex = -1;
  open.style.opacity = 0;
  close.style.zIndex = 1;
  close.style.opacity = 1;
  showHidePassword();
});
close.addEventListener('click', ev => {
  close.style.zIndex = -1;
  close.style.opacity = 0;
  open.style.zIndex = 1;
  open.style.opacity = 1;
  showHidePassword();
});

function showHidePassword() {
  const x = document.getElementById("password-coca-cola");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function showHideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.zIndex = 1000;
  loader.style.opacity = 1;
  setTimeout(() => {
    loader.style.zIndex = -1000;
    loader.style.opacity = 0;
    location.href = ('https://www.tcccxdentsu.com/home');
  }, 1000);
}