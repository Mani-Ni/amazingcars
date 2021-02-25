function otp_recover(){
    var otp = document.getElementById("username_login").value;

    var data = 
    {
        "user_name": localStorage.getItem('user_name'),
        "otp":otp,
        "user_type":"1",
    };
    var keyobj = {
        'url':hostname+'/verifyOTP',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData':JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            var user_data=[];
            if(status == "success")
            {
                location.href='/reset_password.html';
            }   
            else
            {
                alert("OTP is Wrong.", success.message, "error");
            }  
        }
    }
    ajaxCallFunction(keyobj);
}   


function pass_reset(){
    var password = document.getElementById("password").value;
    //var confirm_password = document.getElementById("confirm_password").value;
    var encryptpass=md5(password);

    var data = 
    {
        "user_name":localStorage.getItem("user_name"),
        "password": encryptpass,
        "user_type":"1",

    };
    var keyobj = {
        'url':hostname+'/resetPassword',
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
                
            }   
            else
            {
                alert("password reset Failed In Failed", success.message, "error");
            }  
        }
    }
    ajaxCallFunction(keyobj);
}