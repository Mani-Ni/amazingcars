// history.pushState(null, null, location.href);
//     window.onpopstate = function () {
//         history.go(1);
//     };

//appends an "active" class to .popup and .popup-content when the "Open" button is clicked

 



$("document").ready(function(){
   var userDetails =JSON.parse(localStorage.getItem('userData'));
   // alert(localStorage.getItem('isLoggedIn'));
if(localStorage.getItem('isLoggedIn')==1)
{
   // alert("if");
            document.getElementById("login").style.display="none";
            document.getElementById("signup").style.display="none";
            document.getElementById("user_profile").style.display="inline-flex";
            document.getElementById("user_name").innerHTML = userDetails.first_name;
}
else
{
   // alert("else");
   document.getElementById("logout").style.display="none"
   document.getElementById("user_profile").style.display="none"
   // document.getElementById("logout").style.display="none";
   // document.getElementById("user_profile").style.display="none";
   // document.getElementById("login").style.display="inline-flex";
}

   // Configuration for Host




      //  popup click
$(".login_open").on("click", function(){
   $(".popup-overlay, .popup-content").addClass("active");
 });
 
 //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
 $(".login_close").on("click", function(){
   $(".popup-overlay, .popup-content").removeClass("active");
   showHideBlock('login_form')
 });

  // login and signup
//   document.getElementById("login_form").style.display = "inline-flex";
//   document.getElementById("signup_form").style.display = "none";
//   document.getElementById("forget_form").style.display = "none";

//   pass & conf password
var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

function validatePassword(){
if(password.value != confirm_password.value) {
confirm_password.setCustomValidity("Passwords Don't Match");
} else {
confirm_password.setCustomValidity('');
}
}

//password.onchange = validatePassword;
//confirm_password.onkeyup = validatePassword;
});

function logout()
{
   if(localStorage.getItem('isLoggedIn')==1)
   {
       localStorage.clear();
       location.href = '/index.html';
   }
}

// function showHideBlock(id){
        
//    if(id == 'login_form') {
//            document.getElementById("login_form").style.display = "inline-flex";
//            document.getElementById("signup_form").style.display = "none";
//            document.getElementById("forget_form").style.display = "none";
//    } else if(id == 'signup_form') {
//            document.getElementById("login_form").style.display = "none";
//            document.getElementById("signup_form").style.display = "inline-flex";
//            document.getElementById("forget_form").style.display = "none";
//    } else if(id == 'forget_form') {
//            document.getElementById("login_form").style.display = "none";
//            document.getElementById("signup_form").style.display = "none";
//            document.getElementById("forget_form").style.display = "inline-flex";
//    }
// }