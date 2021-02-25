
function signup(){
    var data = 
    {   
        "first_name": firstname,
        "last_name": lastname,
        "phone_no": phone_no,
        "email_id": email,
        "password": password1,
        "confrom_password":confrom_password,
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
                

            }   
            else
            {
                swal("Signup Failed", success.message, "error");
            }  
        }
    }
    ajaxCallFunction(keyobj);
}

