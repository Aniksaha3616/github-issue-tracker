document.getElementById("loginForm").addEventListener("submit", function(login){

login.preventDefault()

const username = document.getElementById("username").value
const password = document.getElementById("password").value

if(username === "admin" && password === "admin123"){

localStorage.setItem("auth","true")
window.location.href="home.html"

}else{

alert("Invalid Credentials")

}

})