var page;
// var webpush_token;
//  // Initialize Firebase
//         // TODO: Replace with your project's customized code snippet
//         var config = {
//             apiKey: "AIzaSyBFRyQrf6IwIR__qCxu-fymT2eL9y8sveA",
//             authDomain: "click-logistics-service.firebaseapp.com",
//             databaseURL: "https://click-logistics-service.firebaseio.com",
//             projectId: "click-logistics-service",
//             storageBucket: "click-logistics-service.appspot.com",
//             messagingSenderId: "489850684570"
//         };
//         firebase.initializeApp(config);
  
//         const messaging = firebase.messaging();
//         messaging
//             .requestPermission()
//             .then(function () {
//                 //MsgElem.innerHTML = "Notification permission granted." 
//                 console.log("Notification permission granted.");
                
//                 // get the token in the form of promise
//                 return messaging.getToken()
//             })
//             .then(function(token) {
//               webpush_token = token;  
//               //TokenElem.innerHTML = 'Token is:' +token;
//             })
//             .catch(function (err) {
//                 //ErrElem.innerHTML =  ErrElem.innerHTML + "; " + err
//                 console.log("Unable to get permission to notify.", err);
//             });
  
//         messaging.onMessage(function(payload) {
//             console.log("Message received. ", payload);
//             //NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload) 
//             //NotisElem.onclick = '../index.html';
//         });
$("document").ready(function(){

    page = localStorage.getItem('pagelocation');
    console.log(page);

  if(JSON.parse(localStorage.getItem('login')) == 1)
  {
    showHideBlock("login_form");
    //   document.getElementById("signup_form").style.display = "none";
    //   document.getElementById("forget_form").style.display = "none";
  }
  else if(JSON.parse(localStorage.getItem('login')) == 2)
  {
        showHideBlock("signup_form");
  }
    
});

function login(){
    var username = document.getElementById("username_login").value;
    var password = document.getElementById("password_login").value;
    var password1 = md5(password);
    
    if(username == '' || password == '')
    {
        Swal.fire({
            type: 'warning',
            text: "fields doesn't empty"
          });
    }
    else{
    var data = 
    {
        "user_name": username,
        "password": password1,
        // "push_token" : webpush_token
    };
    var keyobj = {
        'url':hostname+'/login',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            var user_data=[];
            if(status == "success")
            {
                var data=success.user;
                localStorage.setItem('isLoggedIn','1');
                //alert(localStorage.getItem('isLoggedIn'));
                localStorage.setItem("userData",JSON.stringify(data));
                // alert(localStorage.getItem('userData'));
                // location.href = '/index.html';
                var log = localStorage.getItem('loginData');
                console.log(log);
                var userDetails =JSON.parse(localStorage.getItem('userData'));
               $("#profile").text(userDetails.user_name);
            //    var page = localStorage.getItem('pagelocation');
               if(page == 1)
               {
                   location.href = '/inventory-list.html';
               }
               else if(page == 2) {
                  location.href = '/vehicle-details.html';
               }  
               else if(page == 3) {
                location.href = '/index.html';
                }
               else{
                    if(log == 0)
                    {
                        $(".popup-overlay, .popup-content").removeClass("active");
                        var islog=1;
                        localStorage.setItem('loginData',islog);
                        // location.href='./vehicle-details.html';
                        //document.getElementById("login").style.display="none";
                        // document.getElementById("user_profile").style.display="inline-flex";
                        // document.getElementById("logout").style.display="inline-flex";
                        //document.getElementById("user_name").innerHTML = userDetails.first_name;
                    }
                    else
                    {
                        location.href = '/index.html';
                    }
               }
            }   
            else
            {
                Swal.fire({
                    type: 'error',
                    text: success.msg
                  });
            }  
        }
    }
    ajaxCallFunction(keyobj);
    }
}

function forgot_paswrd(){
    var username = document.getElementById("username_recover").value;
    localStorage.setItem("user_name",username);
    if(username == '')
    {
        Swal.fire({
            type: 'warning',
            text: "fields doesn't empty"
          });
    }
    else{
    var data = 
    {
        "user_name": username,
        "user_type":"1",
    };
    var keyobj = {
        'url':hostname+'/forgetPassword',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            var user_data=[];
            if(status == "success")
            {
                location.href = '/otp_page.html';
            }   
            else
            {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: success.msg,
                  })
            }  
        }
    }
    ajaxCallFunction(keyobj);
}
}

function signup(){
    //alert("hiii");
    var firstname = document.getElementById("first_name").value;
    var lastname = document.getElementById("last_name").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("e_mail").value;
    var phone_no = document.getElementById("mobile_no").value;
    var password1 = md5(password);
    //alert(password1);
    if(firstname == '' || password == '' || email =='' || phone_no =='')
    {
        Swal.fire({
            type: 'warning',
            text: "fields doesn't empty"
          });
    }
    else{
   // console.log(firstname);
    var data = 
    {   
        "first_name": firstname,
        "last_name": lastname,
        "contact_no": phone_no,
        "user_name": phone_no,
        "email": email,
        "password": password1,
        "is_active": "0",
        "is_complete": "0"
      
    };
    var keyobj = {
        'url':hostname+'/signup',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            var user_data=[];
            if(status == "success")
            {
                swal.fire("SignUp Successfully")
                document.getElementById("login_form").style.display = "inline-flex";
                document.getElementById("signup_form").style.display = "none";
                document.getElementById("forget_form").style.display = "none";
            }   
            else
            {
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: success.msg,
                  })
            }  
        }
    }
    ajaxCallFunction(keyobj);
}
}

function showHideBlock(id){
        
    if(id == 'login_form') {
            document.getElementById("login_form").style.display = "inline-flex";
            document.getElementById("signup_form").style.display = "none";
            document.getElementById("forget_form").style.display = "none";
            // localStorage.removeItem('login');
    } else if(id == 'signup_form') {
            document.getElementById("login_form").style.display = "none";
            document.getElementById("signup_form").style.display = "inline-flex";
            document.getElementById("forget_form").style.display = "none";
            // localStorage.removeItem("login");
    } else if(id == 'forget_form') {
            document.getElementById("login_form").style.display = "none";
            document.getElementById("signup_form").style.display = "none";
            document.getElementById("forget_form").style.display = "inline-flex";
            // localStorage.removeItem('login');
    }
 }


