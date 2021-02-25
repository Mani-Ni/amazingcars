var cart_details= [];
var user_loc_details = [];
var licence_front_name;
var licence_back_name;
var profile_name;
var islic_front_status;
var islic_back_status;
var company_document;
var company_document1;
var company_document3;
var licence_front_value;
var licence_back_value;
var profile_value;

$("document").ready(function(){

    showHideBlock('show_profile-tab');

    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var name=userDetails.first_name +' '+ userDetails.last_name;
    if(localStorage.getItem('isLoggedIn')==1)
    {
    // alert("if");
    document.getElementById("login").style.display='none';
    document.getElementById("signup").style.display='none'; 
    document.getElementById("user_profile").style.display="inline-flex";
    document.getElementById("user_name").innerHTML = userDetails.first_name;
    }
    document.getElementById("email").innerHTML = userDetails.email;
    document.getElementById("p_email").innerHTML = userDetails.email;
    document.getElementById("contact_no").innerHTML = userDetails.contact_no;
    document.getElementById("p_contact_no").innerHTML = userDetails.contact_no;
    document.getElementById("profile_name").innerHTML = name;
    document.getElementById("p_name").innerHTML = name;
    document.getElementById("name").innerHTML = name;
    document.getElementById("email_id").innerHTML = userDetails.email;
    document.getElementById("mobil_no").innerHTML = userDetails.contact_no;
    mybooking();
    show_profile();

    
});

function logout()
{
   if(localStorage.getItem('isLoggedIn') == 1)
   {
       localStorage.clear();
       location.href = '/index.html';
   }
}

function show_profile()
{
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id=userDetails._id;
    var data = 
    {
        "user_id":user_id,
    };
        
    console.log(data);
    var keyobj = {
        'url':hostname+'/getUserDetails',
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
                console.log(success);
                user_loc_details = success.user[0]; 
                console.log(user_loc_details);
                var gen=document.getElementById('gender');
                var user_dob=document.getElementById('dob');

                var date = new Date(user_loc_details.dob);                    
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var today = date.getFullYear()+"-"+(month)+"-"+(day) ;

                var loc_details_update = document.getElementById('loc_details');

                $('#date1').append(today);
                $('#p_gender').append(user_loc_details.gender);
                $('#p_loc-details').append('<div class="col-lg-4 col-sm-6" style="display: contents;"> <span>Address 1</span> <label class="form_control_12" id="p_address1">'+user_loc_details.address_line1+'</label> <span>Address 2</span> <label class="form_control_12" id="p_address2">'+user_loc_details.address_line2+'</label> <div class="row"> <div class="col-sm-6"> <span>City</span> <label class="form_control_12" id="p_city"> '+user_loc_details.city+' </label> </div> <div class="col-sm-6"> <span>State</span> <label class="form_control_12" id="p_state"> '+user_loc_details.state+' </label> </div> </div> </div>');
                if(user_loc_details.address_line1!=null || user_loc_details.address_line2!=null || user_loc_details.city !=null || user_loc_details.state !=null)
                loc_details_update.innerHTML +='<div class="col-lg-4 col-sm-6" style="display: contents;"> <span>Address 1</span> <input class="form_control_1" id="address1" type="text" value="'+user_loc_details.address_line1+'"/> <br> <span>Address 2</span> <input class="form_control_1" id="address2" type="text" value="'+user_loc_details.address_line2+'"/> </div> <br> <div class="row"> <div class="col-sm-6"> <span>City</span> <input class="form_control_1" id="city" type="text" value="'+user_loc_details.city+'"/> </div> <div class="col-sm-6"> <span>State</span> <input class="form_control_1" id="state" type="text" value="'+user_loc_details.state+'"/> </div> </div>';
                else{
                loc_details_update.innerHTML +='<div class="col-lg-4 col-sm-6" style="display: contents;"> <span>Address 1</span> <input class="form_control_1" id="address1" type="text" value=""/> <br> <span>Address 2</span> <input class="form_control_1" id="address2" type="text" value=""/> </div> <br> <div class="row"> <div class="col-sm-6"> <span>City</span> <input class="form_control_1" id="city" type="text" value=""/> </div> <div class="col-sm-6"> <span>State</span> <input class="form_control_1" id="state" type="text" value=""/> </div> </div>';
                }
                if(user_loc_details.gender!=null){
                gen.value=user_loc_details.gender;
                }
                if(user_loc_details.dob!=null)
                {
                    user_dob.innerHTML +='<input class="form_control_1 m-minus-2"  type="date" id="date1"  value="'+today+'"/>';
                }
                else{
                    user_dob.innerHTML +='<input class="form_control_1 m-minus-2"  type="date" id="date1"  value=""/>';
                }
                $('#imagePreview').css('background-image', 'url('+s3Url+''+user_loc_details.profile_pic +')');
                $('#imagePreview1').css('background-image', 'url('+s3Url+''+user_loc_details.profile_pic +')');
                $('#imagePreview2').css('background-image', 'url('+s3Url+''+user_loc_details.license_proof_front_url +')');
                $('#imagePreview3').css('background-image', 'url('+s3Url+''+user_loc_details.license_proof_back_url +')');
                profile_value = user_loc_details.profile_pic;
                licence_front_value = user_loc_details.license_proof_front_url;                
                licence_back_value = user_loc_details.license_proof_back_url;

                if(user_loc_details.license_proof_front_url == null || user_loc_details.license_proof_front_url == "")
                {
                    islic_front_status = 0;
                    licence_front_name = "";
                }
                else
                {
                    licence_front_name = user_loc_details.license_proof_front_url;
                    if(user_loc_details.isaccept_license_proof_front == 0)
                    {
                        islic_front_status = 0;
                    }
                    if(user_loc_details.isaccept_license_proof_front == 1)
                    {
                        islic_front_status = 1;
                    }
                }

                if(user_loc_details.license_proof_back_url == null || user_loc_details.license_proof_back_url == "")
                {
                    islic_back_status = 0;
                    licence_back_name = "";
                }
                else
                {
                    licence_back_name = user_loc_details.license_proof_back_url;
                    if(user_loc_details.isaccept_license_proof_back == 0)
                    {
                        islic_back_status = 0;
                    }
                    if(user_loc_details.isaccept_license_proof_back == 1)
                    {
                        islic_back_status = 1;
                    }
                }
                
            }   
            // else
            // {
            //     Swal.fire({
            //         type: 'error',
            //         title: 'Error',
            //         text: success.msg,
            //       })
            // }  
        }
    }
    ajaxCallFunction(keyobj);
}

/* Profile */
$("#imageUpload1").change(function() {
    company_document1 = document.getElementById("imageUpload1");
    var company_documentname1 = new Date().getTime()+'.'+company_document1.files[0].name.split(".").pop();
    readURL1(company_document1);
    profile_name = company_documentname1;
    profile_value = profile_name;
    console.log(company_document1.files[0]);
});

function readURL1(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview1').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview1').hide();
            $('#imagePreview1').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* Licence Front */
$("#imageUpload2").change(function() {
    company_document = document.getElementById("imageUpload2");
    var company_documentname = new Date().getTime()+'.'+company_document.files[0].name.split(".").pop();
    readURL2(company_document);
    islic_front_status = 0;
    licence_front_name = company_documentname;
    licence_front_value = licence_front_name;
    console.log(company_document.files[0]);
});

function readURL2(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview2').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview2').hide();
            $('#imagePreview2').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* Licence Back */
$("#imageUpload3").change(function() {
    company_document3 = document.getElementById("imageUpload3");
    var company_documentname3 = new Date().getTime()+'.'+company_document3.files[0].name.split(".").pop();
    readURL3(company_document3);
    islic_back_status = 0;
    licence_back_name = company_documentname3;
    licence_back_value = licence_back_name;
    console.log(company_document3.files[0]);
});

function readURL3(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview3').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview3').hide();
            $('#imagePreview3').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function upload_file(val)
{
    const formData =new FormData();

    if(profile_value == user_loc_details.profile_pic)
    {
        formData.append('image',profile_value);   
    }
    else
    {
        formData.append('image',company_document1.files[0],profile_name);
    }
    if(licence_front_value == user_loc_details.license_proof_front_url)
    {
        formData.append('image',licence_front_value);   
    }
    else
    {
        formData.append('image',company_document.files[0],licence_front_name);
    }
    if(licence_back_value == user_loc_details.license_proof_back_url)
    {
        formData.append('image',licence_back_value);   
    }
    else
    {
        formData.append('image',company_document3.files[0],licence_back_name);  
    }

    var keyobj = {
        'url':'http://192.168.0.112:3000/upload',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': formData,
        'dataType': 'json',
        'callback': function (success) 
        {
            
        }
    }
    ajaxCallFunction1(keyobj);
}

function update_profile(){
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var username = userDetails.contact_no;
    var password = userDetails.password;
    var dob=document.getElementById("date1").value;
    var gender=document.getElementById("gender").value;
    var address1=document.getElementById("address1").value;
    var address2=document.getElementById("address2").value;
    var city=document.getElementById("city").value;
    var state=document.getElementById("state").value;
    var password1 = md5(password);
    var user_id=userDetails._id;
    //alert(password1);
    if(licence_front_name !== null && profile_name !== null && licence_back_name !== null)
    {
     
        upload_file();
    }
   
    var data = 
    {
        "user_id":user_id,
        "updateObj": {
        "gender":gender,
        "dob":dob,
        "address_line1":address1,
        "address_line2":address2,
        "city":city,
        "state":state,
        "profile_pic":profile_name,
        "license_proof_front_url": licence_front_name,
        "isaccept_license_proof_front": islic_front_status,
        "license_proof_back_url": licence_back_name,
        "isaccept_license_proof_back": islic_back_status,
        "is_complete": "1"
        }
    };
        
    console.log(data);
    var keyobj = {
        'url':hostname+'/updateUser',
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
                Swal.fire({
                    text: success.msg,
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    console.log(result);
                    if (result.value) {
                        location.href = '/profile.html';
                    }
                  })
            }   
            // else
            // {
            //     Swal.fire({
            //         type: 'error',
            //         title: 'Error',
            //         text: success.msg,
            //       })
            // }  
        }
    }
    ajaxCallFunction(keyobj);
}

function cartInfo()
{
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id=userDetails._id;
    var data ={
        "user_id" : user_id,
    }
    var keyobj = {
        'url':hostname+'/userFetchCardDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            var user_data=[];
            $('#unfini_booking').empty();
            if(status == "success")
            {
                cart_details = success.allProducts; 
                console.log(cart_details);
                var unfinsh_booking = [];
                for(var i = 0; i < cart_details.length; i++)
                {
                    if(cart_details[i].hourly_based == 0){
                        var trip_type = "Rounded"
                        unfinsh_booking [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cart_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+cart_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class="col-md-6">'+cart_details[i].car_model+'</h5><div class="col-md-6">'+trip_type+'</div</div> </div> <div class="col-md-6"> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cart_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-6"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cart_details[i].pickup_location+'</div> <div id="pickup_date">'+cart_details[i].pickup_date+'</div> <div id="pickup_time">'+cart_details[i].pickup_time+'</div> </div> <div class="col-md-6"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+cart_details[i].drop_location+'</div> <div id="drop_date">'+cart_details[i].drop_date+' <div> <div id="drop_time">'+cart_details[i].drop_time+'</div> </div> </div> </div> </div> <div class="row" style="margin: 0px 0px -3em 11em;"> <div class="col-md-5"> <br> <br> <br> </div> <div class="col-md-7" style="display: inline-flex;"> <div> <button class="btn btn-danger" style="float: right; padding: 5px;font-size: 13px;font-weight: 500; margin: 7px 7px 0px 0px;" onclick="remove_cart(\''+cart_details[i]._id+'\');">Remove</button> </div> <div> <button class="btn btn-primary" style="float: right; padding: 5px;font-size: 13px;font-weight: 500; margin:7px 7px 0px 0px;" onclick="bookcar(\''+cart_details[i]._id+'\');">View Details</button> </div> </div> </div> </div> </div> </div> </div>';
                    }
                    else if(cart_details[i].hourly_based == 1){
                        var trip_type = "Hourly"
                        unfinsh_booking [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cart_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+cart_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class="col-md-6">'+cart_details[i].car_model+'</h5><div class="col-md-6">'+trip_type+'</div</div> </div> <div class="col-md-6"> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cart_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-6"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cart_details[i].pickup_location+'</div> <div id="pickup_date">'+cart_details[i].pickup_date+'</div> <div id="pickup_time">'+cart_details[i].pickup_time+'</div> </div> <div class="col-md-6"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+cart_details[i].drop_location+'</div> <div id="drop_date">'+cart_details[i].drop_date+' <div> <div id="drop_time">'+cart_details[i].hrs_drop_time   +     '</div> </div> </div> </div> </div> <div class="row" style="margin: 0px 0px -3em 11em;"> <div class="col-md-5"> <br> <br> <br> </div> <div class="col-md-7" style="display: inline-flex;"> <div> <button class="btn btn-danger" style="float: right; padding: 5px;font-size: 13px;font-weight: 500; margin: 7px 7px 0px 0px;" onclick="remove_cart(\''+cart_details[i]._id+'\');">Remove</button> </div> <div> <button class="btn btn-primary" style="float: right; padding: 5px;font-size: 13px;font-weight: 500; margin:7px 7px 0px 0px;" onclick="bookcar(\''+cart_details[i]._id+'\');">View Details</button> </div> </div> </div> </div> </div> </div> </div>';
                    }
                    // $('#unfini_booking').append('<div class="row card" id=""> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-8"> <span><h4>'+cart_details[i].car_brand+'</h4></span><span><h5>'+cart_details[i].car_model+'</h5></span> </div> <div class="col-md-4"> <button class="btn" style="float: right;font-weight: bold;">Rs.'+cart_details[i].price+'.00</button> </div> </div><hr> <div class="row"> <div class="col-md-4"> <div><img style="max-width: 260px;" src="'+s3Url+''+cart_details[i].car_image[0]+'"></div> </div> <div class="col-md-4"> <div id="pro_company"><h5><strong>Pickup Location</strong></h5></div> <div id="pro_address">'+cart_details[i].pickup_location+'</div> <div id="pickup_date">'+cart_details[i].pickup_date+'</div> <div id="pickup_time">'+cart_details[i].pickup_time+'</div> </div> <div class="col-md-4"> <div id="pro_company"><h5><strong>Dropoff Location</strong></h5></div> <div id="pro_address1">'+cart_details[i].drop_location+'</div> <div id="drop_date">'+cart_details[i].drop_date+'</div> <div id="drop_time">'+cart_details[i].drop_time+'</div> </div> </div> <div class="row"> <div class="col-md-7"></div> <div class="col-md-5" style="display: inline-flex;"> <div style="margin: 0px 40px 0px 53px;"> <button class="btn btn-danger" style="padding: 6px;" onclick="remove_cart(\''+cart_details[i]._id+'\');">Remove</button> </div> <div> <button class="btn btn-success" style="padding: 6px;" onclick="bookcar(\''+cart_details[i].product_id+'\');">Book Now</button> </div> </div> </div> </div> </div><br>');
                   
                }         
                $('#unfini_booking').append(unfinsh_booking);
            }   
            else
            {
               $('#unfini_booking').append('<span>'+success.msg+'</span>');
            } 
        }
    }
    ajaxCallFunction(keyobj);

}
function mybooking()
{
    bookingInfo();
}

function remove_cart(id)
{
    var data ={
        "id" : id
    }

    var keyobj = {
        'url':hostname+'/userRemoveCardDetails',
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
                cartInfo();
            }    
            // else
            // {
            //     Swal.fire({
            //         type: 'error',
            //         title: 'Error',
            //         text: success.msg,
            //       })
            // }  
        }
    }
    ajaxCallFunction(keyobj);
}
function bookcar(id)
{
    console.log(id);
    sessionStorage.setItem("cart_booking","1");
    var data ={
        "cart_id" : id,
    }
    var keyobj = {
        'url':hostname+'/getUserCartDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            if(status == 'success') {
                cartDetails = success.records;
                console.log("Car Details",cartDetails);
                localStorage.setItem("cart_info",JSON.stringify(cartDetails));
                location.href="/confirmation.html"
            }
        }
    }
    ajaxCallFunction(keyobj);

}

function driverBookingInfo(){
    var userDetails = JSON.parse(localStorage.getItem('userData'));
    var user_id = userDetails._id;
    var data = {
        "user_id":user_id,
        "type":"1"
    }
    var keyobj = {
        'url':hostname+'/userFetchDriverStatus',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) {
            var status = success.status;
            console.log(status);
            if(status == "success")
            {
                console.log(success);
                driver_details = success.allProducts;     
                var status;
                var status_class;   
                var driver_status = [];
                for(var i = 0; i < driver_details.length; i++)
                {
                        if(driver_details[i].is_booking == '1')
                        {
                            status = 'Upcoming';
                            status_class = 'green';
                            if(driver_details[i].hourly_based == '0'){
                                driver_status [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+driver_details[i].pickup_location+'</div><div>'+driver_details[i].pickup_address+'</div> <div id="pickup_date">'+driver_details[i].pickup_date+'</div> <div id="pickup_time">'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+driver_details[i].drop_location+'</div><div>'+driver_details[i].drop_address+'</div> <div id="drop_date">'+driver_details[i].drop_date+' <div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                            }else if(driver_details[i].hourly_based == '1'){
                                driver_status [i]= '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div>'+driver_details[i].pickup_date+'</div> <div>'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+driver_details[i].drop_address+'</div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>'; 
                            }
                        }
                        else if(driver_details[i].is_booking == '3'){
                            status = 'Waiting For Approval';
                            status_class = 'orange';
                         if(driver_details[i].hourly_based == '0'){
                             driver_status[i] = ' <div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4 class="h-0">Please be patience. <br>Driver will be assign soon. . . </h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div id="pickup_date">'+driver_details[i].pickup_date+'</div> <div id="pickup_time">'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+driver_details[i].drop_location+'</div> <div>'+driver_details[i].drop_address+'</div> <div id="drop_date">'+driver_details[i].drop_date+' <div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                         } else if(driver_details[i].hourly_based == '1'){
                             driver_status[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4 class="h-0">Please be patience.<br> Driver will be assign soon. . . </h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div>'+driver_details[i].pickup_date+'</div> <div>'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+driver_details[i].drop_address+'</div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                         }                       
                    }
                }
                $('#accepted').append(driver_status);
            }   
            else
            {
                $('#accepted').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}

function driverBookCompleteInfo(){
    var userDetails = JSON.parse(localStorage.getItem('userData'));
    var user_id = userDetails._id;
    var data = {
        "user_id":user_id,
        "type":"3"
    }
    var keyobj = {
        'url':hostname+'/userFetchDriverStatus',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) {
            var status = success.status;
            console.log(status);
            if(status == "success")
            {
                console.log(success);
                $('#completed').empty();
                driver_details = success.allProducts;     
                var status;
                var status_class;   
                var driver_status = [];
                for(var i = 0; i < driver_details.length; i++)
                { 
                    status = 'Complete';
                    status_class = 'green';
                    if(driver_details[i].hourly_based == '0'){
                        driver_status[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+driver_details[i].pickup_location+'</div><div>'+driver_details[i].pickup_address+'</div> <div id="pickup_date">'+driver_details[i].pickup_date+'</div> <div id="pickup_time">'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+driver_details[i].drop_location+'</div><div>'+driver_details[i].drop_address+'</div> <div id="drop_date">'+driver_details[i].drop_date+' <div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                    }else if(driver_details[i].hourly_based == '1'){
                        driver_status[i]= '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div>'+driver_details[i].pickup_date+'</div> <div>'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+driver_details[i].drop_address+'</div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>'; 
                    }
                }
                $('#completed').append(driver_status);
            }   
            else
            {
                $('#completed').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}

function driverBookCancelInfo(){
    var userDetails = JSON.parse(localStorage.getItem('userData'));
    var user_id = userDetails._id;
    var data = {
        "user_id":user_id,
        "type":"2"
    }
    var keyobj = {
        'url':hostname+'/userFetchDriverStatus',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) {
            var status = success.status;
            console.log(status);
            $('#cancel').empty();
            if(status == "success")
            {
                
                console.log(success);
                driver_details = success.allProducts;     
                var status;
                var status_class;   
                var driver_status = [];
                for(var i = 0; i < driver_details.length; i++)
                { 
                    if(driver_details[i].dri_fname == undefined)
                    {
                        status = 'Unassigned';
                        status_class = 'red';
                        if(driver_details[i].hourly_based == '0'){
                            driver_status[i] = ' <div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>"Reject/Cancel Responses."</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div id="pickup_date">'+driver_details[i].pickup_date+'</div> <div id="pickup_time">'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+driver_details[i].drop_location+'</div> <div>'+driver_details[i].drop_address+'</div> <div id="drop_date">'+driver_details[i].drop_date+' <div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        } else if(driver_details[i].hourly_based == '1'){
                            driver_status[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>"Reject/Cancel Responses."</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div>'+driver_details[i].pickup_date+'</div> <div>'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+driver_details[i].drop_address+'</div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        }
                    }
                    else {
                        status = 'Assigned';
                        status_class = 'green';
                        if(driver_details[i].hourly_based == '0'){
                            driver_status [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+driver_details[i].pickup_location+'</div><div>'+driver_details[i].pickup_address+'</div> <div id="pickup_date">'+driver_details[i].pickup_date+'</div> <div id="pickup_time">'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+driver_details[i].drop_location+'</div><div>'+driver_details[i].drop_address+'</div> <div id="drop_date">'+driver_details[i].drop_date+' <div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        }else if(driver_details[i].hourly_based == '1'){
                            driver_status [i]= '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+driver_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+driver_details[i].dri_fname+''+driver_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+driver_details[i].pickup_location+'</div> <div>'+driver_details[i].pickup_address+'</div> <div>'+driver_details[i].pickup_date+'</div> <div>'+driver_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+driver_details[i].drop_address+'</div> <div id="drop_time">'+driver_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewDriverBookings(\''+driver_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>'; 
                        }
                    }
                }
                $('#cancel').append(driver_status);
            }   
            else
            {
                $('#cancel').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}


function bookingInfo()
{
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id=userDetails._id;
    var data ={
        "user_id" : user_id,
    }
    var keyobj = {
        'url':hostname+'/userFetchBookingDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            
            $('#liveup_booking').empty();
            if(status == "success")
            {
                console.log(success);
                booking_details = success.allProducts;     
                var status;
                var status_class;   
                var w_driver;
                var live_upcoming = [];
                for(var i = 0; i < booking_details.length; i++)
                {

                    if(booking_details[i].typeof_product != '2')
                    {
                        if(booking_details[i].is_booking == 3)
                        {
                            status = 'Waiting For Approval';
                            status_class = 'orange';
                            status_class1 = 'orange1';
                        }
                        if(booking_details[i].is_booking == 4)
                        {
                            status = 'Live';
                            status_class = 'blue';
                            status_class1 = 'blue1';
                        }
                        if(booking_details[i].is_booking == 1)
                        {
                            status = 'Upcoming';
                            status_class = 'green';
                            status_class1 = 'green1';
                        }
                        if(booking_details[i].typeof_product == 1){
                            w_driver="without Driver";
                            status_class1 = 'green1';
                        }
                        else if(booking_details[i].typeof_product == 3){
                            w_driver = "with_driver";
                            status_class1 = 'green1';
                        }
                        if(booking_details[i].hourly_based == 0){
                            var trip_type = "Rounded";
                            live_upcoming [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div class="row"> <h4 class="col-md-6">'+booking_details[i].car_brand+'</h4> <div> <span class="'+status_class1+'" style="float:right;margin-bottom: 5px;">'+w_driver+'</span> </div> </div> <div class="row" style="margin-top:2px;"> <h5 class="col-md-6">'+booking_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+booking_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> <div id="pickup_time">'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+booking_details[i].drop_location+'</div> <div id="drop_date">'+booking_details[i].drop_date+' <div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        }else if(booking_details[i].hourly_based == 1 ){
                            var trip_type = "Hourly";
                            live_upcoming [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div class="row"> <h4 class="col-md-6">'+booking_details[i].car_brand+'</h4> <div> <span class="'+status_class1+'" style="float:right;margin-bottom: 5px;">'+w_driver+'</span> </div> </div> <div class="row" style="margin-top:2px;"> <h5 class="col-md-6">'+booking_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+booking_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Timing</strong> </div> <div id="pickup_time">Pickup Time :'+booking_details[i].pickup_time+'</div> <div id="drop_time"> Drop Time :'+booking_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        }
                        // if(booking_details[i].hourly_based == 0){
                        //     var trip_type = "Rounded";
                        //     live_upcoming [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6" > <div><h4>'+booking_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class = "col-md-6">'+booking_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div></div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right; margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+booking_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> <div id="pickup_time">'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+booking_details[i].drop_location+'</div> <div id="drop_date">'+booking_details[i].drop_date+' <div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div><br><br><br></div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;" >View Details</button> </div> </div> </div> </div> </div> </div>';
                        // }else if(booking_details[i].hourly_based == 1 ){
                        //     var trip_type = "Hourly";
                        //     live_upcoming [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+booking_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class="col-md-6">'+booking_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+booking_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Timing</strong> </div> <div id="pickup_time">Pickup Time :'+booking_details[i].pickup_time+'</div> <div id="drop_time"> Drop Time :'+booking_details[i].hrs_drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                        // }

                        // $('#liveup_booking').append('<div class="row card" style="flex-direction:inherit;cursor:pointer;"> <div onclick="viewBookings(\''+booking_details[i]._id+'\')" class="card-body" style="padding: 20px;"> <div><span class="'+status_class+'">'+status+'</span> </div> <div class="row"> <div class="col-md-8"> <span><h4>'+booking_details[i].car_brand+'</h4></span><span><h5>'+booking_details[i].car_model+'</h5></span> </div> <div class="col-md-4"> <button class="btn" style="float: right;font-weight: bold;">Rs.'+booking_details[i].price+'.00</button> </div> </div> <hr> <div class="row"> <div class="col-md-4"> <div><img style="max-width: 260px;" src="'+s3Url+''+booking_details[i].car_image[0]+'"></div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Pickup Location:</strong></h5></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> <div id="pickup_time">'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Dropoff Location</strong></h5></div> <div id="pro_address1">'+booking_details[i].drop_location+'</div> <div id="drop_date">'+booking_details[i].drop_date+'</div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> </div> </div></div><br>');
                        
                    }
                }
                $('#liveup_booking').append(live_upcoming);
            }   
            else
            {
                $('#liveup_booking').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}

function viewDriverBookings(id){
    localStorage.setItem('booking_id',id);
    location.href='/driverdetails.html';
   }
function viewBookings(id){
 localStorage.setItem('booking_id',id);
 location.href='/cancelbooking.html';
}
function driverInfo(){
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id=userDetails._id;
    var data ={
        "user_id" : user_id,
    }
    var keyobj = {
        'url':hostname+'/userFetchBookingDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            
            $('#driver_booking').empty();
            if(status == "success")
            {
                console.log(success);
                booking_details = success.allProducts;     
                var status;
                var status_class;   
                var driver_status = [];
                for(var i = 0; i < booking_details.length; i++)
                {
                    if(booking_details[i].typeof_product == '2')
                    {
                        if(booking_details[i].is_booking == '1')
                        {
                            status = 'Upcoming';
                            status_class = 'green';
                            if(booking_details[i].hourly_based == '0'){
                                driver_status [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+booking_details[i].dri_fname+''+booking_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div><div>'+booking_details[i].pickup_address+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> <div id="pickup_time">'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+booking_details[i].drop_location+'</div><div>'+booking_details[i].drop_address+'</div> <div id="drop_date">'+booking_details[i].drop_date+' <div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                            }else if(booking_details[i].hourly_based == '1'){
                                driver_status [i]= '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+booking_details[i].dri_photo+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+booking_details[i].dri_fname+''+booking_details[i].dri_lname+'</h4></div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+booking_details[i].pickup_location+'</div> <div>'+booking_details[i].pickup_address+'</div> <div>'+booking_details[i].pickup_date+'</div> <div>'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+booking_details[i].drop_address+'</div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>'; 
                            }
                        }
                        else if(booking_details[i].is_booking == '3'){
                            status = 'Waiting For Approval';
                            status_class = 'orange';
                         if(booking_details[i].hourly_based == '0'){
                             driver_status [i] = ' <div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>"Driver Name"</h4></div> <div>Driver Email</div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+booking_details[i].pickup_location+'</div> <div>'+booking_details[i].pickup_address+'</div> <div id="pickup_date">'+booking_details[i].pickup_date+'</div> <div id="pickup_time">'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+booking_details[i].drop_location+'</div> <div>'+booking_details[i].drop_address+'</div> <div id="drop_date">'+booking_details[i].drop_date+' <div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                         } else if(booking_details[i].hourly_based == '1'){
                             driver_status [i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="assets/images/taxi-driver.jpg"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>"Driver Name"</h4></div> <div>Driver Email</div> </div> <div class="col-md-6"> <div> <span class="'+status_class+'" style="float:right;margin-bottom: 5px;">'+status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div> <strong>Pickup Location:</strong></div> <div>'+booking_details[i].pickup_location+'</div> <div>'+booking_details[i].pickup_address+'</div> <div>'+booking_details[i].pickup_date+'</div> <div>'+booking_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+booking_details[i].drop_address+'</div> <div id="drop_time">'+booking_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+booking_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                         }
                        } 
                       
                    }
                }
                $('#driver_booking').append(driver_status);
            }   
            else
            {
                $('#driver_booking').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}
function bookCancelInfo()
{
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id=userDetails._id;
    var data ={
        "user_id" : user_id,
        "type" : 3,
    }
    $('#cancel_booking').empty();
    var keyobj = {
        'url':hostname+'/userCancelBooking',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            $('#cancel_booking').empty();
            if(status == "success")
            {
                cancel_details = success.allProducts;    
                console.log(cancel_details);
                // console.log(); 
                var can_status;
                var status_color;    
                var w_driver;            
                var cancel_booking = [];
                for(var i = 0; i < cancel_details.length; i++)
                {
                    if(cancel_details[i].is_booking == 2)
                    {
                        can_status = 'Rejected';
                        status_color = 'red';
                    }
                    if(cancel_details[i].is_booking == 5)
                    {
                        can_status = 'Cancelled';
                        status_color = 'orange';
                    }

                    if(cancel_details[i].typeof_product != 2 ){
                        if(cancel_details[i].typeof_product == 1){
                            w_driver="without Driver"
                        }
                        else if(cancel_details[i].typeof_product == 3){
                            w_driver = "with_driver";
                        }
                    // $('#cancel_booking').append('<div class="row card" style="flex-direction:inherit;cursor:pointer;"> <div onclick="viewBookings(\''+cancel_details[i]._id+'\')" class="card-body" style="padding: 20px;"> <div><span class="'+status_color+'">'+can_status+'</span> </div> <div class="row"> <div class="col-md-8"> <span><h4>'+cancel_details[i].car_brand+'</h4></span><span><h5>'+cancel_details[i].car_model+'</h5></span> </div> <div class="col-md-4"> <button class="btn" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> <hr> <div class="row"> <div class="col-md-4"> <div><img style="max-width: 260px;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"></div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Pickup Location</strong></h5></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Dropoff Location</strong></h5></div> <div id="pro_address1">'+cancel_details[i].drop_location+'</div> <div id="drop_date">'+cancel_details[i].drop_date+'</div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> </div> </div></div><br>');
                    if(cancel_details[i].hourly_based == 0){
                    var trip_type = "Rounded";
                    cancel_booking[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6" > <div><h4>'+cancel_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"><h5 class = "col-md-6">'+cancel_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div> </div> <div class="col-md-6"> <div> <span class="'+status_color+'" style="float:right; margin-bottom: 5px;">'+can_status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+cancel_details[i].drop_location+'</div> <div id="drop_date">'+cancel_details[i].drop_date+' <div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div><br><br><br></div> <button onclick="viewBookings(\''+cancel_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;" >View Details</button> </div> </div> </div> </div> </div> </div>';    
                    } else if(cancel_details[i].hourly_based == 1){
                    var trip_type = "Hourly";
                    cancel_booking[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+cancel_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class = "col-md-6">'+cancel_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div> </div> </div> <div class="col-md-6"> <div> <span class="'+status_color+'" style="float:right;margin-bottom: 5px;">'+can_status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+cancel_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>'; 
                    }
                }
            }
                $('#cancel_booking').append(cancel_booking);
            }   
            else
            {
                $('#cancel_booking').append('<span>'+success.msg+'</span>');
               
            }  
        }
    }
    ajaxCallFunction(keyobj);
}

function bookCompleteInfo()
{
    var userDetails =JSON.parse(localStorage.getItem('userData'));
    var user_id = userDetails._id;
    var data = {
        "user_id" : user_id,
        "type" : 3,
    }
    var keyobj = {
        'url':hostname+'/getCompletedBooking',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            // $('#completed_booking').empty();
            if(status == "success")
            {
                cancel_details = success.allProducts;    
                console.log(cancel_details);
                // console.log(); 
                var can_status;
                var status_color;
                $('#completed_booking').empty();
                var completed_booking = [];
                for(var i = 0; i < cancel_details.length; i++)
                {
                    if(cancel_details[i].is_booking == 6)
                    {
                        can_status = 'Completed';
                        status_color = 'green';
                    }
                    if(cancel_details[i].hourly_based == 0){
                        var trip_type = "Rounded"
                        completed_booking[i] = '<div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6" > <div><h4>'+cancel_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class = "col-md-6">'+cancel_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div></div> </div> <div class="col-md-6"> <div> <span class="'+status_color+'" style="float:right; margin-bottom: 5px;">'+can_status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="pro_address1">'+cancel_details[i].drop_location+'</div> <div id="drop_date">'+cancel_details[i].drop_date+' <div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> </div> </div> <div class="col-md-2"> <div><br><br><br></div> <button onclick="viewBookings(\''+cancel_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;" >View Details</button> </div> </div> </div> </div> </div> </div>';
                    }else if(cancel_details[i].hourly_based == 1){
                        var trip_type = "Hourly"
                        completed_booking[i] = ' <div class="row card profile_tabs_card profile_tabs_card_hover" style="flex-direction:inherit ;margin: 11px 0px 0px 0px;"> <div class="card-body" style="padding: 20px;"> <div class="row"> <div class="col-md-4"> <img style="width: 16em;height: 11em;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"> </div> <div class="col-md-8"> <div class="row" style="border-bottom:1px solid #bababa;margin-bottom: 7px;font-size: 12px;"> <div class="col-md-6"> <div> <h4>'+cancel_details[i].car_brand+'</h4></div> <div class="row" style="margin-top:2px;"> <h5 class = "col-md-6">'+cancel_details[i].car_model+'</h5> <div class="col-md-6">Type : '+trip_type+'</div></div> </div> <div class="col-md-6"> <div> <span class="'+status_color+'" style="float:right;margin-bottom: 5px;">'+can_status+'</span> </div> <div style="font-size: 20px;"> <button class="" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> </div> <div class="row" style="font-size: 13px;"> <div class="col-md-5"> <div id="pro_company"> <strong>Pickup Location:</strong></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-5"> <div id="pro_company"> <strong>Dropoff Location</strong> </div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> <div class="col-md-2"> <div> <br> <br> <br> </div> <button onclick="viewBookings(\''+cancel_details[i]._id+'\')" class="btn btn-primary btn-sm" style=" float:right;padding: 5px;font-size: 13px;font-weight: 500;">View Details</button> </div> </div> </div> </div> </div> </div>';
                    }
                    console.log("run",)
                    // $('#completed_booking').append('<div class="row card" style="flex-direction:inherit;inherit;cursor:pointer;"> <div class="card-body" style="padding: 20px;"> <div><span class="'+status_color+'">'+can_status+'</span> </div> <div class="row"> <div class="col-md-8"> <span><h4>'+cancel_details[i].car_brand+'</h4></span><span><h5>'+cancel_details[i].car_model+'</h5></span> </div> <div class="col-md-4"> <button class="btn" style="float: right;font-weight: bold;">Rs.'+cancel_details[i].price+'.00</button> </div> </div> <hr> <div class="row"> <div class="col-md-4"> <div><img style="max-width: 260px;" src="'+s3Url+''+cancel_details[i].car_image[0]+'"></div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Pickup Location</strong></h5></div> <div id="pro_address">'+cancel_details[i].pickup_location+'</div> <div id="pickup_date">'+cancel_details[i].pickup_date+'</div> <div id="pickup_time">'+cancel_details[i].pickup_time+'</div> </div> <div class="col-md-4"> <div id="pro_company"> <h5><strong>Dropoff Location</strong></h5></div> <div id="pro_address1">'+cancel_details[i].drop_location+'</div> <div id="drop_date">'+cancel_details[i].drop_date+'</div> <div id="drop_time">'+cancel_details[i].drop_time+'</div> </div> </div> </div></div><br>');
                    
                }
                $('#completed_booking').append(completed_booking);
            }   
            else
            {
               $('#completed_booking').append('<span>'+success.msg+'</span>');
            }  
        }
    }
    ajaxCallFunction(keyobj);
}


//    SIDE TAB ACTIVE CLASS AND REMOVE

$('#myTab0 li a').click(function(){
    $('#myTab0 li a.side_menu_2').removeClass('side_menu_2');
    $(this).addClass('side_menu_2');
});