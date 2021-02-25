var booking_info;
var load_car;

$(document).ready(function()
{
    var userDetails1 =JSON.parse(localStorage.getItem('userData'));
    var name=userDetails1.first_name +' '+ userDetails1.last_name;
    if(localStorage.getItem('isLoggedIn')==1)
    {
    // alert("if");
    document.getElementById("login").style.display='none';
    document.getElementById("signup").style.display='none';
    document.getElementById("user_profile").style.display="inline-flex";
    document.getElementById("user_name").innerHTML = userDetails1.first_name;
    }


    

    loadBookingInfo();
});

function logout()
{
   if(localStorage.getItem('isLoggedIn') == 1)
   {
       localStorage.clear();
       location.href = '/index.html';
   }
}
   //  ===  Carname,model,image,price =====
function loadBookingInfo(){
var booking_id = localStorage.getItem('booking_id');
    var data = 
    {
        "id":booking_id,
    }; 
    var keyobj = {
        'url':hostname+'/getBookingDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
            var status = success.status;
            if(status == "success")
            {
                booking_info = success.booking;
               if(booking_info.is_rating == 1){
                document.getElementById("btn_cancel1").style.display="none"; 
               }
                if(booking_info.is_booking == 2)   //is_booking == 2 --> Rejected
                {
                    $('#reject_reason').append('<div class="col-md-4 m-b-20"><h5 style="margin: 0px 0px 15px 0px;">Reason For Rejection :</h5></div><div class="col-md-8" style="margin-top: 4px;"><h6>'+booking_info.reject_reason+'</h6></div>');
                    $('#btn_cancel').append('');
                }else if(booking_info.is_booking == 5)   //is_booking == 2 --> Cancel
                {
                    $('#reject_reason').append('<div class="row"> <div class="col-md-4"> <p class="h7">Reason For Cancellation <span style="margin:0em 3em;">:</span></p> </div> <div class="col-md-8"> '+booking_info.cancel_reason+' </div> </div>');
                    $('#btn_cancel').append('');
                }else if(booking_info.is_booking == 6){
                    $('#btn_cancel1').append('<button class="btn btn-primary btn-sm" style="font-weight:600;">Rate </button>');
                }
                else{
                    $('#btn_cancel').append('<button class="btn btn-primary btn-sm" style="font-weight:600;">Cancel Booking </button>');
                }

                $('#carbrand_can').html(booking_info.car_brand);
                // document.getElementById('carbrand_can').innerHTML = booking_info.car_brand;
                $('#carmodel_can').html(booking_info.car_model);
                $('#carprice_can').html(booking_info.price);
                var car_image = ' <img class="img-fluid" src='+s3Url+''+booking_info.car_image[0] +' alt="foto"/>'
                $('#carimg_can').html(car_image);       
                // alert(booking_info.car_brand);

                if(booking_info.typeof_product != 2){
                carDetails(booking_info.product_id);
                getProviderInfo(booking_info.sp_user_id);
                 }   


                //  =========== ** DRIVER DETAILS ** =========
              
                $('#driver_name').html(booking_info.dri_fname +' '+booking_info.dri_lname);
                $('#driver_num').html(booking_info.dri_contact_no);
              
                
                $('#pic_dri_round_loc').html(booking_info.pickup_location);  // DRIVER DETAILS  --> ROund trip -->  hourly based--0  --> LOCATION
                $('#pic_dri_round_date').html(booking_info.pickup_date);
                $('#pic_dri_round_time').html(booking_info.pickup_time);

                $('#drop_dri_round_loc').html(booking_info.drop_location);
                $('#drop_dri_round_date').html(booking_info.drop_date);
                $('#drop_dri_round_time').html(booking_info.drop_time);

                $('#pic_dri_round_address').html(booking_info.pickup_address);   // DRIVER DETAILS   --> Round Trip -->  hourly based--0   --> ADDRESS
                $('#drop_dri_round_address').html(booking_info.drop_address);


                $('#pic_dri_hour_loc').html(booking_info.pickup_location);  //  DRIVER DETAILS  -> hourly based -->  hourly based--1  -->LOCATION
                $('#pic_dri_hour_date').html(booking_info.pickup_date);

                $('#pic_dri_hour_time').html(booking_info.pickup_time);
                $('#drop_dri_hour_time').html(booking_info.pickup_time);

                $('#pic_dri_hour_address').html(booking_info.pickup_address);   // DRIVER DETAILS    --> Round Trip -->   hourly based--0  --> ADDRESS
                $('#drop_dri_hour_address').html(booking_info.drop_address);
                
                //===== Price List =====//
                
        
                document.getElementById("veh_det_total_amo"). innerHTML += booking_info.price;
        
                document.getElementById("Refund_amount"). innerHTML += booking_info.refund_amount;

                //====== DRIVER DETAILS HOURLY BASED = 0 or 1 SHOWING DETAILS  ====
                if(booking_info.hourly_based == '0') {
                    $(".dri_round_datas").css("display", "flex");
                    $(".dri_hour_datas").css("display", "none");
                } else if(booking_info.hourly_based == '1') {     
                    $(".dri_round_datas").css("display", "none");
                    $(".dri_hour_datas").css("display", "flex");
                }}

             
                //====== TYPE OF PRODUCT BASED SHOWING DETAILS  typeof_product==== 1-- car, 2-->driver, 3-->car and driver >
                if(booking_info.typeof_product == '1') {
                    $("#car_details").css("display", "block");
                    $("#driver_details").css("display", "none");
                } else if(booking_info.typeof_product == '2') {
                    $("#car_details").css("display", "none");
                    $("#driver_details").css("display", "block");
                    $("#provider_details").css("display", "none");
                } else if(booking_info.typeof_product == '3') {
                    $("#car_details").css("display", "block");
                    $("#driver_details").css("display", "block");

                }
                 //========== DRIVER INTIMATION MESSAGE BEFORE THE THEE DRIVER ASSIGN
                if(booking_info.is_booking == 3){       // is_booking == 3 ==> waiting
                    $("#dri_intimation").css("display", "block");
                    $("#dri_assign_details").css("display", "none");
                }else  {  
                    $("#dri_intimation").css("display", "none");
                    $("#dri_assign_details").css("display", "block");
                }



                console.log(success);
            } 
        }
    
    ajaxCallFunction(keyobj);
}

// =========  Car specifications  =========
      
    function carDetails(product_id)
    {
      var data = {
       "product_id" : product_id 
      }
      console.log(data);
      var keyobj = {
      'url':hostname+'/getProductDetails',
      'type': 'POST',
      'crossDomain': true,
      'ajaxData': JSON.stringify(data),
      'dataType': 'json',
      'callback': function (success) 
      {
      var status = success.status;
      if(status == "success")
      {
        load_car = success.user[0];
        console.log(load_car,"12456543");
        $('#carseats_can').html(load_car.car_seat_capacity);
        $('#carair_can').html(load_car.car_conditioner_type);
        $('#cargear_can').html(load_car.car_transmission_type);
        $('#carversion_can').html(load_car.car_version);
        $('#carairbag_can').html(load_car.car_airbags);
        $('#carcolor_can').html(load_car.car_color);
        $('#carbody_can').html(load_car.car_body_type);
        $('#carfuel_can').html(load_car.car_fuel_type);
        document.getElementById("veh_det_perkm"). innerHTML += load_car.per_km;
        document.getElementById("veh_det_addkm"). innerHTML += load_car.extra_km;
        document.getElementById("veh_det_perhr"). innerHTML += load_car.per_hrs;
        document.getElementById("veh_det_addhr"). innerHTML += load_car.extra_hrs;
    }      
    else{
        Swal.fire({
         text: success.msg
        });
    }
  }
}
ajaxCallFunction(keyobj); 
}


    //  ========= Provider details  =======

    function getProviderInfo(id)
    {  
      var data = {
        "user_id" : id 
       }
      var keyobj = {
        'url':hostname+'/getSPCompanyDetails',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
        var status = success.status;
        if(status == "success")
        {
            var provider_info = success.user;
            var sp_details = provider_info.sp_details[0];
            var address = sp_details.address1 + sp_details.address2;
            //alert(address);
            $('#procompany_can').html(sp_details.com_name); 
            $('#proaddress_can').html(address);  
            $('#procity_can').html(sp_details.city); 
            $('#prostate_can').html(sp_details.state); 
            $('#proemail_can').html(provider_info.email); 
        }
    }
    }
    ajaxCallFunction(keyobj);
    
    }
function reason(id){
    var cancel_reason = $('#reason').val();
       if(id == cancel_reason) {
            document.getElementById("textbar").style.display = "unset";
    }else{
        document.getElementById("textbar").style.display = "none";
    }
}

function cancelBooking(){
    var cancel_reason = $('#reason').val();
    if(cancel_reason == "")
    {
        var reason = document.getElementById("res_text").value;
        cancel_reason = reason;
    }
    if(cancel_reason == "")
    {
        Swal.fire({
         type: 'error',
         text: "Please Fill Reason"
        });
    }
    else
    {
        var data = {
            "id": booking_info._id,
            "sp_user_id": booking_info.sp_user_id,
            "is_booking" : "5",
            "cancel_reason": cancel_reason
           }
          var keyobj = {
            'url':hostname+'/spAcceptOrRejectBooking',
            'type': 'POST',
            'crossDomain': true,
            'ajaxData': JSON.stringify(data),
            'dataType': 'json',
            'callback': function (success) 
            {
            var status = success.status;
            if(status == "success")
            {
                Swal.fire({
                    title: 'Booking Status',
                    text: success.msg,
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    console.log(result);
                    if (result.value) {
                      location.href='profile.html'
                    }
                });
            }
        }
        }
        ajaxCallFunction(keyobj);
    }
}

        //**   ========== RATE US STAR FONT CLASS FUNCTIONS    ==============*/ 

  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    
  });
  // function responseMessage(msg) {
//   $('.success-box').fadeIn(200);  
//   $('.success-box div.text-message').html("<span>" + msg + "</span>");
// }
         
  function rateUs(){
    // var bid_id = document.getElementById("stars").value;
    var rate_comments = document.getElementById("rate_comments").value;
     
      var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    //   var msg = "";
    //   if (ratingValue > 1) {
    //       msg = "Thanks! You rated this " + ratingValue + " stars.";
    //   }
    //   else {
    //       msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
    //   }
      console.log(ratingValue);
      var data = {
        "product_id" : booking_info.product_id,
        "booking_id": booking_info._id,
        "ratingObj": {
        "rating" : ratingValue,
        "feedback" : rate_comments
	    }
       }
      var keyobj = {
        'url':hostname+'/productRatingProcess',
        'type': 'POST',
        'crossDomain': true,
        'ajaxData': JSON.stringify(data),
        'dataType': 'json',
        'callback': function (success) 
        {
        var status = success.status;
        if(status == "success")
        {
            Swal.fire({
                type: 'success',
                text: success.msg
               });

            modal1.style.display = "none";
            document.getElementById("btn_cancel1").style.display="none"; 
        }
    }
    }
    ajaxCallFunction(keyobj);

  }









       

          // **=======    POPUP CLOSED   ========**

   // Get the modal
   var modal = document.getElementById("myModal");
   var modal1 = document.getElementById("myModal1")
   // Get the button that opens the modal
   var btn1 = document.getElementById("btn_cancel1");
   var btn = document.getElementById("btn_cancel");

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close1")[0];
   var span1 = document.getElementsByClassName("close2")[0];
   // When the user clicks the button, open the modal 
   btn.onclick = function() {
     modal.style.display = "block";
     reason("");
   }
   btn1.onclick = function() {
     modal1.style.display = "block";
   }

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() {
     modal.style.display = "none";
   }
   span1.onclick = function() {
     modal1.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
     if (event.target == modal) {
       modal.style.display = "block";
     }
   }

   window.onclick = function(event) {
     if (event.target == modal1) {
       modal1.style.display = "block";
     }
   }

