var car_details;
var car_price;
var pro_info1;
var sp_user_id;
var payment_method;
var refund_amount;
var base_fare;

  $(document).ready(function() {

    var cart_booking = sessionStorage.getItem("cart_booking");
    if(cart_booking == 1) {
      loadCarDetails2();
    } else {
      loadCarDetails1();
    }
    // $('#term_chk').attr('checked','checked');
    $('#term_chk').prop('checked', true);
  });
 

  //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".login_close").on("click", function(){
  $(".popup-overlay, .popup-content").removeClass("active");
});


function loadCarDetails1()
{
  var location_details1 = localStorage.getItem('location_details');
  var location_details = JSON.parse(location_details1);
  var price = localStorage.getItem('price');
  car_price = JSON.parse(price);

  
      console.log(location_details);
        // ======    POPUP PAYMENT MODE PRICE ========
      $('#price_offline').html(car_price);
      $('#price_online').html(car_price);
      // ======  END POPUP PAYMENT MODE PRICE ========
if(location_details.hourly_based == 0){
  document.getElementById('pickup_loc').innerHTML = location_details.pickup_location;
  document.getElementById('pickup_date').innerHTML = location_details.pickup_date;
  document.getElementById('pickup_time').innerHTML = location_details.pickup_time;
  document.getElementById('dropoff_loc').innerHTML = location_details.drop_location;
  document.getElementById('dropoff_date').innerHTML = location_details.drop_date;
  document.getElementById('dropoff_time').innerHTML = location_details.drop_time;
}
else if(location_details.hourly_based == 1){
  document.getElementById('pickup_loc').innerHTML = location_details.pickup_location;
  document.getElementById('pickup_date').innerHTML = location_details.pickup_date;
  document.getElementById('pickup_time').innerHTML = location_details.pickup_time;
  document.getElementById('dropoff_time').innerHTML = location_details.drop_time;
}
     

      var data = {
        "product_id" : localStorage.getItem('product_id')
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
         // console.log(success);
           car_details = success.user[0];  
           console.log(success);
           sp_user_id = car_details.sp_user_id;
         //  getProviderInfo();
           var car_shows = document.getElementById('car_list1');
           var fare_shows = document.getElementById('fare_details');
           base_fare = car_details.per_hrs * location_details.hours
           var total_price = car_price;
           refund_amount = car_details.refund_deposite;
        //    car_shows.innerHTML +='<div class="b-goods-f col-12 b-goods-f_row"> <div class="b-goods-f__media"><img class="b-goods-f__img img-scale" src="'+s3Url+''+car_details.car_images[0]+'" alt="foto"><span class="b-goods-f__media-inner"><span class="b-goods-f__favorite"><i class="ic far fa-star"></i></span><span class="b-goods-f__label bg-primary">NEW</span></span> </div><div class="b-goods-f__main"> <div class="b-goods-f__descrip"> <div class="b-goods-f__title">'+car_details.car_brand+' <h5>'+car_details.car_model+'</h5></div><div class="row"> <li style="margin-left: 8px;list-style: none;display: flex;">  </li></div><div class="col-sm-12" style="margin: 15px 0px 15px 18px;letter-spacing: -1px;"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li><li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li><li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li></div></ul> </div><ul class="b-goods-f__list list-unstyled"> <li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Version :</span><span class="b-goods-f__list-info setCarListMargin">'+car_details.car_version+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Air Bags :</span><span class="b-goods-f__list-info">'+car_details.car_airbags+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Body Color :</span><span class="b-goods-f__list-info">White</span></li><li class="b-goods-f__list-item b-goods-f__list-item_row"><span class="b-goods-f__list-title">Body Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Fuel Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li></ul> </div><div class="b-goods-f__sidebar"> <a class="b-goods-f__bnr" href="#"></a><span class="b-goods-f__price-group"><span class="b-goods-f__price"><span class="b-goods-f__price_col">msrp:&nbsp;</span><span class="b-goods-f__price-numb">$45,800</span></span> </span> <a onclick="carView(\''+car_details._id+'\');" class="b-goods-f__bnr"><span class="b-goods-f__compare">More Details<i class="ic fas fa-columns"></i></span></a> </div></div></div>';
           car_shows.innerHTML+='<div class="b-goods-f col-12 b-goods-f_row" style="padding-bottom:0px;margin-bottom:0px;"> <div class="row"> <div class="col-md-6"> <div class="row"> <div class="b-goods-f__title_1">'+car_details.car_brand+' <h5>'+car_details.car_model+'</h5> </div> </div> <div class="row"> <div class="b-goods-f__media"><img class="b-goods-f__img img-scale" src="'+s3Url+''+car_details.car_images[0]+'" alt="foto"> </div> </div> </div> <div class="col-md-6"> <div class="b-goods-f__main" style="margin-top: 50px;"> <div > <ul class="confirm_ul" > <li><span >Version :</span><span class="b-goods-f__list-info setCarListMargin">'+car_details.car_version+'</span></li> <li><span >Air Bags :</span><span class="b-goods-f__list-info">'+car_details.car_airbags+'</span></li> <li><span >Body Color :</span><span class="b-goods-f__list-info">'+car_details.car_color+'</span></li> <li><span >Body Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li> <li><span >Fuel Type :</span><span class="b-goods-f__list-info">'+car_details.car_fuel_type+'</span></li> </ul> </div> </div> <div class="col-sm-12" style="margin:5px 0px 0px 30px;letter-spacing: -1px;"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li> </div> </ul> </div> </div> </div> </div>';
           fare_shows.innerHTML +='<div class="col-md-8"> <div class="row"> <div class="col-md-6"> <div><span>Per kilometer:</span><span>Rs.'+car_details.per_km+'.00 per/km </span></div> <br> <div><span>Additional kilometer:</span><span>Rs.'+car_details.extra_km+'.00 per/km </span></div> </div> <div class="col-md-6"> <div><span>Per hour:</span><span>Rs.'+car_details.per_hrs+'.00 per/km </span></div> <br> <div><span>Additional hours:</span><span>Rs.'+car_details.extra_hrs+'.00 per/km </span></div> <br> </div> </div> </div> <div class="col-md-4"> <div class="row"><span>Base Fare</span><span style="margin:0em 2em 0em 7em;">:</span><span><b>Rs.'+base_fare+'.00</b></span></div> <div class="row"><span>Refundable Amount </span><span style="margin:0em 2em;">:</span><span><b>Rs.'+car_details.refund_deposite+'.00</b></span></div> <div class="row"><span>Total Amount </span><span style="margin:0em 2em 0em 5.3em;">:</span><span><b>Rs.'+total_price+'.00</b></span></div> </div>';
          }
       else
       {
           Swal.fire({
            type: 'error',
            text: success.msg,
          })
       }   
       
   }
}
ajaxCallFunction(keyobj);  
}

function loadCarDetails2()
{
  var location_details = JSON.parse(localStorage.getItem('cart_info'));
  console.log("---",location_details);
  // var location_details = JSON.parse(location_details1);
  //var price = localStorage.getItem('price');
  car_price = location_details.price;
        
        // ======    POPUP PAYMENT MODE PRICE ========
      $('#price_offline').html(car_price);
      $('#price_online').html(car_price);
      // ======  END POPUP PAYMENT MODE PRICE ========

      document.getElementById('pickup_loc').innerHTML = location_details.pickup_location;
      document.getElementById('pickup_date').innerHTML = location_details.pickup_date;
      document.getElementById('pickup_time').innerHTML = location_details.pickup_time;
      document.getElementById('dropoff_loc').innerHTML = location_details.drop_location;
      document.getElementById('dropoff_date').innerHTML = location_details.drop_date;
      document.getElementById('dropoff_time').innerHTML = location_details.drop_time;

      var data = {
        "product_id" : location_details.product_id
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
         // console.log(success);
           car_details = success.user[0];  
           console.log(success);
           sp_user_id = car_details.sp_user_id;
         //  getProviderInfo();
           var car_shows = document.getElementById('car_list1');
           var fare_shows = document.getElementById('fare_details');
           base_fare = car_details.per_hrs * location_details.hours
           var total_price = car_price;
           refund_amount = car_details.refund_deposite
        //    car_shows.innerHTML +='<div class="b-goods-f col-12 b-goods-f_row"> <div class="b-goods-f__media"><img class="b-goods-f__img img-scale" src="'+s3Url+''+car_details.car_images[0]+'" alt="foto"><span class="b-goods-f__media-inner"><span class="b-goods-f__favorite"><i class="ic far fa-star"></i></span><span class="b-goods-f__label bg-primary">NEW</span></span> </div><div class="b-goods-f__main"> <div class="b-goods-f__descrip"> <div class="b-goods-f__title">'+car_details.car_brand+' <h5>'+car_details.car_model+'</h5></div><div class="row"> <li style="margin-left: 8px;list-style: none;display: flex;">  </li></div><div class="col-sm-12" style="margin: 15px 0px 15px 18px;letter-spacing: -1px;"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li><li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li><li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li></div></ul> </div><ul class="b-goods-f__list list-unstyled"> <li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Version :</span><span class="b-goods-f__list-info setCarListMargin">'+car_details.car_version+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Air Bags :</span><span class="b-goods-f__list-info">'+car_details.car_airbags+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Body Color :</span><span class="b-goods-f__list-info">White</span></li><li class="b-goods-f__list-item b-goods-f__list-item_row"><span class="b-goods-f__list-title">Body Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li><li class="b-goods-f__list-item"><span class="b-goods-f__list-title">Fuel Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li></ul> </div><div class="b-goods-f__sidebar"> <a class="b-goods-f__bnr" href="#"></a><span class="b-goods-f__price-group"><span class="b-goods-f__price"><span class="b-goods-f__price_col">msrp:&nbsp;</span><span class="b-goods-f__price-numb">$45,800</span></span> </span> <a onclick="carView(\''+car_details._id+'\');" class="b-goods-f__bnr"><span class="b-goods-f__compare">More Details<i class="ic fas fa-columns"></i></span></a> </div></div></div>';
           car_shows.innerHTML+='<div class="b-goods-f col-12 b-goods-f_row" style="padding-bottom:0px;margin-bottom:0px;"> <div class="row"> <div class="col-md-6"> <div class="row"> <div class="b-goods-f__title_1">'+car_details.car_brand+' <h5>'+car_details.car_model+'</h5> </div> </div> <div class="row"> <div class="b-goods-f__media"><img class="b-goods-f__img img-scale" src="'+s3Url+''+car_details.car_images[0]+'" alt="foto"> </div> </div> </div> <div class="col-md-6"> <div class="b-goods-f__main" style="margin-top: 50px;"> <div > <ul class="confirm_ul" > <li><span >Version :</span><span class="b-goods-f__list-info setCarListMargin">'+car_details.car_version+'</span></li> <li><span >Air Bags :</span><span class="b-goods-f__list-info">'+car_details.car_airbags+'</span></li> <li><span >Body Color :</span><span class="b-goods-f__list-info">'+car_details.car_color+'</span></li> <li><span >Body Type :</span><span class="b-goods-f__list-info">'+car_details.car_body_type+'</span></li> <li><span >Fuel Type :</span><span class="b-goods-f__list-info">'+car_details.car_fuel_type+'</span></li> </ul> </div> </div> <div class="col-sm-12" style="margin:5px 0px 0px 30px;letter-spacing: -1px;"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:20px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li> </div> </ul> </div> </div> </div> </div>';
           fare_shows.innerHTML +='<div class="col-md-8"> <div class="row"> <div class="col-md-6"> <div><span>Per kilometer:</span><span>Rs.'+car_details.per_km+'.00 per/km </span></div> <br> <div><span>Additional kilometer:</span><span>Rs.'+car_details.extra_km+'.00 per/km </span></div> </div> <div class="col-md-6"> <div><span>Per hour:</span><span>Rs.'+car_details.per_hrs+'.00 per/km </span></div> <br> <div><span>Additional hours:</span><span>Rs.'+car_details.extra_hrs+'.00 per/km </span></div> <br> </div> </div> </div> <div class="col-md-4"> <div class="row"><span>Base Fare</span><span style="margin:0em 2em 0em 7em;">:</span><span><b>Rs.'+base_fare+'.00</b></span></div> <div class="row"><span>Refundable Amount </span><span style="margin:0em 2em;">:</span><span><b>Rs.'+car_details.refund_deposite+'.00</b></span></div> <div class="row"><span>Total Amount </span><span style="margin:0em 2em 0em 5.3em;">:</span><span><b>Rs.'+total_price+'.00</b></span></div> </div>';
          }
       else
       {
           Swal.fire({
            type: 'error',
            text: success.msg,
          })
       }   
       
   }
}
ajaxCallFunction(keyobj);  
}

function payment()
{
  var userData = JSON.parse(localStorage.getItem('userData'));
  var location_details;
  var cart_booking = sessionStorage.getItem("cart_booking");
  if(cart_booking == 1) {
    location_details = JSON.parse(localStorage.getItem('cart_info'));
  } else {
    location_details = JSON.parse(localStorage.getItem('location_details'));
  }
  var sp_data = JSON.parse(localStorage.getItem('sp_details'));
  var branch_info = JSON.parse(localStorage.getItem('branch_details'));
  console.log("user",userData);
  console.log("sp",sp_data);
  console.log("branch",branch_info);
  var method;
  if(payment_method == 'online') {
    method = 'Online';
  }
  if(payment_method == 'offline') {
    method = 'Offline';
  }
  var myPickupDate = new Date(location_details.pickup_date);
  var pickup_date = myPickupDate.getFullYear()+'-'+(myPickupDate.getMonth()+1)+'-'+myPickupDate.getDate()
  var myDropDate = new Date(location_details.drop_date);
  var drop_date = myDropDate.getFullYear()+'-'+(myDropDate.getMonth()+1)+'-'+myDropDate.getDate();
  var duration = location_details.duration;
  if(location_details.hourly_based == 0)
  {
    var data = {
    
      "user_id" : userData._id,
      "user_name" : userData.first_name+' '+userData.last_name,
      "contact_no" : userData.contact_no,
      "sp_user_id": sp_data._id,
      "sp_user_name": sp_data.first_name+' '+sp_data.last_name,
      "sp_com_name": sp_data.sp_details[0].com_name,
      "product_id" : localStorage.getItem('product_id'),
      "pickup_location" : location_details.pickup_location,
      "pickup_address": branch_info.address_line1+' '+branch_info.address_line2,
      "pickup_date" : pickup_date,
      "pickup_time" : location_details.pickup_time,
      "drop_location" : location_details.drop_location,
      "drop_address": branch_info.address_line1+' '+branch_info.address_line2,
      "drop_date" : drop_date,
      "drop_time" : location_details.drop_time,
      "hourly_based" : "0",
      "car_image" : car_details.car_images[0],
      "car_brand": car_details.car_brand,
      "car_model": car_details.car_model,
      "car_regno": car_details.car_regsitration,
      "price" : car_price,
      "is_booking" : "3",
      "is_complete" : "0",
      "base_fare" : base_fare,
      "refund_amount" : refund_amount,
      "payment_method": method,
      "typeof_product":location_details.typeof_product
    }
  }
  else if(location_details.hourly_based == 1)
  {
    var data = {
      
      "user_id" : userData._id,
      "user_name" : userData.first_name+' '+userData.last_name,
      "contact_no" : userData.contact_no,
      "sp_user_id": sp_data._id,
      "sp_user_name": sp_data.first_name+' '+sp_data.last_name,
      "sp_com_name": sp_data.sp_details[0].com_name,
      "product_id" : localStorage.getItem('product_id'),
      "pickup_location" : location_details.pickup_location,
      "pickup_address": branch_info.address_line1+' '+branch_info.address_line2,
      "pickup_date" : pickup_date,
      "pickup_time" : location_details.pickup_time,
      "drop_time" : location_details.drop_time,
      "hours" : location_details.hours,
      "hourly_based" : "1",
      "car_image" : car_details.car_images[0],
      "car_brand": car_details.car_brand,
      "car_model": car_details.car_model,
      "car_regno": car_details.car_regsitration,
      "price" : car_price,
      "is_booking" : "3",
      "is_complete" : "0",
      "base_fare" : base_fare,
      "refund_amount" : refund_amount,
      "payment_method": method,
      "typeof_product":location_details.typeof_product
    }
  }

 
   console.log("data",data);
    var keyobj = {
    'url':hostname+'/userBookProcess',
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
        title: 'Booking Completed',
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
      })
    }
    else
    {
      Swal.fire({
        type: 'error',
        text: success.msg,
      })
    }   
    
  }
  }
  ajaxCallFunction(keyobj); 
}


$('.radio').change(function(){
  var value = $( this ).val();
  var price = localStorage.getItem('price');
  car_price = JSON.parse(price);
  if(value == 'online')
  {
    $("#offline_payment").empty();
    payment_method = value;
  }
   else if(value== 'offline')
  {
    $("#offline_payment").empty();
    payment_method = value;
    var sp_name = JSON.parse(localStorage.getItem("sp_details"));
    var full_name = sp_name.first_name + sp_name.last_name;
    var sp_address = localStorage.getItem("pro_address");
    var userData = JSON.parse(localStorage.getItem('userData'));
    var name=userData.first_name +' '+ userData.last_name;
    var off_payment=document.getElementById("offline_payment");
    var show_payment=document.getElementById("show-pay");
   // var sp_name = pro_info.first_name+''+pro_info.last_name;
    off_payment.innerHTML +='<div style="padding:1em 0em 1em 2em;"> <span>Customer Name<span style="margin: 0em 2em 0em 6em;">:</span></span> <label>'+name+'</label> <br> <span>Service Provider<span style="margin: 0em 2em 0em 6.27em;">:</span></span> <label>'+full_name+'</label> <br> <span>Service Provider Address<span style="margin: 0em 2em;">:</span></span> <label>'+sp_address+'</label> <br> <span>Car Brand<span style="margin: 0em 2em 0em 9.22em;">:</span></span> <label>'+car_details.car_brand+'</label> <br> <span>Car Model<span style="margin: 0em 2em 0em 9.14em;;">:</span></span> <label>'+car_details.car_model+'</label> <br> <span>Price <span style="margin: 0em 2em 0em 11.53em;;">:</span></span> <label>RS.'+car_price+'.00</label> <br> <div style="float: right;padding: 3% 10% 3% 3%;"> <button class="btn btn-primary btn-sm" onclick="payment()">PAY NOW</button> </div> </div>';
    show_payment.innerHTML="";
    $(".close1").click(function(){
      $("#offline").prop("checked", false);
      off_payment.innerHTML="";
      show_payment.innerHTML ='<div style="padding:3% 0% 12% 10%;"><span>Please select your Payment method...</span><div>';
    });
  }
});

      // ACCEPT OR NOT IN TERMS AND CONDITION
$("#myBtn").click(function(){
  if($('#conf_terms_cond').find('input[type=checkbox]:checked').length == 0)
  {
    Swal.fire({
        type: 'error',
        text: "Please accept Terms and Condtions",
  })
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  }else{

  }
});

    //** =====   PAYMENT POPUP   ===== */ 

     // Get the modal
     var modal = document.getElementById("myModal");

     // Get the button that opens the modal
     var btn = document.getElementById("myBtn");
 
     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close1")[0];
     
     // When the user clicks the button, open the modal 
     btn.onclick = function() {
       modal.style.display = "block";
     }
 
     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
       modal.style.display = "none";
     }
 
     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
       if (event.target == modal) {
         modal.style.display = "block";
       }
     }
