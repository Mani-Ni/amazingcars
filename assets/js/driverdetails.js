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
    
                    //  =========== ** DRIVER DETAILS ** =========
                  if(booking_info.dri_fname) {
                        $('#driver_name').html(booking_info.dri_fname +' '+booking_info.dri_lname);
                        $('#driver_num').html(booking_info.dri_contact_no);
                        $("#dri_intimation").css("display", "none");
                        $("#dri_assign_details").css("display", "block");
                  } else {
                        $("#dri_intimation").css("display", "block");
                        $("#dri_assign_details").css("display", "none");
                  }
                  
                    
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
                    
                    //====== DRIVER DETAILS HOURLY BASED = 0 or 1 SHOWING DETAILS  ====
                    if(booking_info.hourly_based == '0') {
                        $(".dri_round_datas").css("display", "flex");
                        $(".dri_hour_datas").css("display", "none");
                    } else if(booking_info.hourly_based == '1') {     
                        $(".dri_round_datas").css("display", "none");
                        $(".dri_hour_datas").css("display", "flex");
                    }}
    
                 
                     //========== DRIVER INTIMATION MESSAGE BEFORE THE THEE DRIVER ASSIGN
                    if(booking_info.is_booking == 3){       // is_booking == 3 ==> waiting
                        $("#dri_intimation").css("display", "block");
                        $("#dri_assign_details").css("display", "none");
                    } 
    
    
    
                    console.log(success);
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