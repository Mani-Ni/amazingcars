var car_carousal = [];
var sp_user_id;
var isLoggedIn;
var branch_id;
var location_details;

// accordian collapse and accordian
$(document).ready(function() {

    var ispage = 2; //ipage 1.inventory-list 2.vehicle-details
    localStorage.setItem("pagelocation",ispage);
    console.log(localStorage.getItem('pagelocation'));

  $('.collapse.in').prev('.panel-heading').addClass('active');
  $('#accordion, #bs-collapse')
    .on('show.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').addClass('active');
    })
    .on('hide.bs.collapse', function(a) {
      $(a.target).prev('.panel-heading').removeClass('active');
    });
    
    var ispage = 2; //ipage 1.inventory-list 2.vehicle-details
    localStorage.setItem("pagelocation",ispage);

   
 
    carView();

 
    getBranchInfo();

//     if(localStorage.getItem('isLoggedIn')==1)
// {
//     document.getElementById("login").style.display="none";
//     document.getElementById("signup").style.display="none";
//     document.getElementById("user_profile").style.display="inline-flex";
//     document.getElementById("user_name").innerHTML = userDetails.first_name;
// }
// else
// {
//     document.getElementById("logout").style.display="none"
//     document.getElementById("user_profile").style.display="none"
// }
  });

function carView()
  {
    var location_details1 = localStorage.getItem('location_details');
    location_details = JSON.parse(location_details1);
    console.log(location_details);
            //  LOCATIONS
    if(location_details.hourly_based == 0)
    {
    document.getElementById('hourly_trip').style.display="none";
    document.getElementById('rounded_trip').style.display="flex"
    $("#veh_det_picup_loc").html(location_details.pickup_location);
    $("#veh_det_picup_date").html(location_details.pickup_date);
    $("#veh_det_picup_time").html(location_details.pickup_time);
    $("#veh_det_dropoff_loc").html(location_details.drop_location);
    $("#veh_det_dropoff_date").html(location_details.drop_date);
    $("#veh_det_dropoff_time").html(location_details.drop_time);
    }
    else if(location_details.hourly_based == 1){
    document.getElementById('hourly_trip').style.display="flex";
    document.getElementById('rounded_trip').style.display="none";
    $('#hrs_det_picup_loc').html (location_details.pickup_location);
    $('#hrs_det_duration').html (location_details.hours);
    var kms=location_details.duration * 10;
    $('#hrs_det_kms').html(kms);
    $('#hrs_det_picup_date').html(location_details.pickup_date);
    $('#hrs_det_picup_time').html(location_details.pickup_time);
    }

    // $("#sample").attr('html',);
    // $("#sample").attr('value',);
    // $("#sample").val();
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
        car_carousal = success.user[0];  
        console.log(car_carousal);
        sp_user_id = car_carousal.sp_user_id;
        getProviderInfo();
        // var car_det_image = document.getElementById('slide_main');
        // var car_det_image1 = document.getElementById('slide_thumb');

        // var car_det_image = document.getElementsByClassName('js-slider-for');
        // var car_det_image1 = document.getElementsByClassName('js-slider-nav');

        var car_det_image = document.getElementById('slider');
        
        var car_name = document.getElementById('car_name');
        var car_det_image2 = document.getElementById('vehicle_details');
        var car_specs = document.getElementById('specs');
        var veh_overview = document.getElementById('vehicle_overview');
        
        if(location_details.hourly_based == 0)
        var price =car_carousal.per_hrs * location_details.hours;
        else
        var price =car_carousal.per_hrs * location_details.hours;
        document.getElementById("veh_det_perkm"). innerHTML += car_carousal.per_km;
        document.getElementById("veh_det_addkm"). innerHTML += car_carousal.extra_km;
        document.getElementById("veh_det_perhr"). innerHTML += car_carousal.per_hrs;
        document.getElementById("veh_det_addhr"). innerHTML += car_carousal.extra_hrs;

        document.getElementById("veh_det_total_amo"). innerHTML += price;

        document.getElementById("Refund_amount"). innerHTML += car_carousal.refund_deposite;

      for(var i = 0; i < car_carousal.car_images.length; i++)
        {   
          $("#slider_new").append('<li><img class="item-slick" src="'+s3Url+''+car_carousal.car_images[i]+'" alt="Slider Image"></li>');
          $("#slider_nav").append('<li><img class="item-slick" src="'+s3Url+''+car_carousal.car_images[i]+'" alt="Slider Thumbnail"></li>');
        }
        $('#carousel').flexslider({
          animation: "slide",
          controlNav: false,
          directionNav : true,
          animationLoop: false,
          slideshow: false,
          itemWidth: 210,
          itemMargin: 5,
          asNavFor: '#slider'
        });
       
        $('#slider').flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          sync: "#carousel",
          keyboard: true,
          multipleKeyboard: true
        });

        car_name.innerHTML +='<div class="ui-subtitle" style="padding-top: 0.57em;">'+car_carousal.car_brand+'</div> <div><h1 class="ui-title text-uppercase" style="font-size: 1.85em;padding-left:0.5em;">'+car_carousal.car_model+'</h1></div>';
        car_det_image2.innerHTML +=' <div class="" > <ul class="list-unstyled list-inline" style="display:inline-flex;margin:0px 0px 5px 0px;"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>'+car_carousal.car_seat_capacity+' Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>'+car_carousal.car_conditioner_type+'</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>'+car_carousal.car_transmission_type+'</span> </li> </ul> </div>';
        // car_specs.innerHTML +='<div> <ul class="b-goods-f__list list-unstyled" style="display:grid;"> <li><span class="b-goods-f__list-title"style="display: inline-flex;" >Version :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_version+'</span></li><br> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Air Bags :</span><span class="b-goods-f__list-info">'+car_carousal.car_airbags+'</span></li><br> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Body Color :</span><span class="b-goods-f__list-info">'+car_carousal.car_color+'</span></li><br> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Body Type :</span><span class="b-goods-f__list-info">'+car_carousal.car_body_type+'</span></li><br> <li><span class="b-goods-f__list-title"style="display: inline-flex;">Fuel Type :</span><span class="b-goods-f__list-info">'+car_carousal.car_fuel_type+'</span></li> </ul> </div>';
        car_specs.innerHTML +='<div class="row"> <div class="col-md-4"> <div><span>Version:</span><span>'+car_carousal.car_version+'</span></div> <div><span>Air bags:</span><span>'+car_carousal.car_airbags+'</span></div> </div> <div class="col-md-4"> <div><span>Body type:</span><span>'+car_carousal.car_body_type+'</span></div> <div><span>Fuel type:</span><span>'+car_carousal.car_fuel_type+'</span></div> </div> <div class="col-md-4"> <div><span>Body color:</span><span>'+car_carousal.car_color+'</span></div> </div> </div>';
        veh_overview.innerHTML +='<h5 class="h7">Basic benifits</h5> <ul class="row list list-mark-2"> <div class="col-md-3"> <li><span class="b-goods-f__list-title" style="display: inline-flex;">USB Compabtibility :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_usb_compatability+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Bluetooth Compabtibility :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_bluetooth_compatability+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">CD Player :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_cdplayers+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Speakers :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_speakers+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">MP3 Playback :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_mp3_playback+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Doors :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_doors+'<span></li> <li><span class="b-goods-f__list-title"style="display: inline-flex;">Cylinders :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_cylinders+'</span></li> </div> <div class="col-md-3"> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Max Power :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_maxpower+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Max Torque :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_maxtorque+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Mileage :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_mileage+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Duel Clutch :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_duel_clutch+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Front Break :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_front_break+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Rear Break :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_rear_break+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Per Cylinders :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_per_cylinders+'</span></li> </div> <div class="col-md-3"> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Valve :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_value_confiq+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Fuel System :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_fuel_system+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Engine Type :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_engine_type+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">No of Gears :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_nofgears+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Width :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_width+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Height :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_height+'</span></li> </div> <div class="col-md-3"> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Displacement :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_displacement+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Length :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_length+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Fuel Tank Capacity :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_fuel_tank_capacity+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">No of Seating Rows :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_numberof_seatingrows+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">WheelBase :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_wheelbase+'</span></li> <li><span class="b-goods-f__list-title" style="display: inline-flex;">Fuel Warning :</span><span class="b-goods-f__list-info setCarListMargin">'+car_carousal.car_fuel_warning+'</span></li> </div> </ul>';
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

function loginClick()
{
var isClick = 1;
localStorage.setItem("login",isClick);
location.href = "/login.html";
}
function signupClick()
{
var isClick = 2;
localStorage.setItem("login",isClick);
location.href = "/login.html";
}


function getProviderInfo()
{  
var data = {
"user_id" : sp_user_id 
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
 
  var pro_info = success.user;
  var full_name = pro_info.first_name + pro_info.last_name;
  localStorage.setItem('sp_details',JSON.stringify(pro_info));
  var sp_address = pro_info.sp_details[0].address1+""+ pro_info.sp_details[0].address2;
  localStorage.setItem("pro_address",sp_address);
  // document.getElementById('pro_name').innerHTML = pro_info.first_name + pro_info.last_name;
  // document.getElementById('pro_email').innerHTML = pro_info.email;
  // document.getElementById('pro_number').innerHTML = pro_info.contact_no;
  // document.getElementById('pro_company').innerHTML = pro_info.sp_details[0].com_name;
  // document.getElementById('pro_address').innerHTML = pro_info.sp_details[0].address1 +" " + pro_info.sp_details[0].address2+" " + pro_info.sp_details[0].city;
  // document.getElementById('pro_city').innerHTML = pro_info.sp_details[0].city;

}
}
}
ajaxCallFunction(keyobj);

}
//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".login_close").on("click", function(){
$(".popup-overlay, .popup-content").removeClass("active");
});

function booknow_check(){

var isLogIn = localStorage.getItem('isLoggedIn');

if(isLogIn == null || isLogIn == undefined)
{
// isLoggedIn = false;
Swal.fire({
  
  text: 'Login or Signup to Continue!',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.value) {
    var islog = 0;
    localStorage.setItem("loginData", islog);
    $(".popup-overlay, .popup-content").addClass("active");
    var isClick = 1;
    localStorage.setItem("login",isClick);
    location.href ='/login.html';
  }
})
}
else{
var userData = JSON.parse(localStorage.getItem('userData'));
console.log(userData);
console.log(car_carousal);
var price;
if(location_details.hourly_based == 0)
{
  price = car_carousal.per_hrs * location_details.hours + car_carousal.refund_deposite;
var data = {
  "user_id" : userData._id,
  "product_id" : car_carousal._id,
  "pickup_location" : location_details.pickup_location,
  "pickup_date" : location_details.pickup_date,
  "pickup_time" : location_details.pickup_time,
  "drop_location" : location_details.drop_location,
  "drop_date" : location_details.drop_date,
  "drop_time" : location_details.drop_time,
  "car_image" : car_carousal.car_images[0],
  "car_brand": car_carousal.car_brand,
  "car_model": car_carousal.car_model,
  "price" : price,
  "hours" : location_details.hours,
  "hourly_based" : "0",
  "typeof_product" : location_details.typeof_product
 }
}
else if(location_details.hourly_based == 1)
{
  price = car_carousal.per_hrs * location_details.hours + car_carousal.refund_deposite;
  var data = {
    "user_id" : userData._id,
    "product_id" : car_carousal._id,
    "pickup_location" : location_details.pickup_location,
    "pickup_date" : location_details.pickup_date,
    "pickup_time" : location_details.pickup_time,
    // "drop_location" : location_details.drop_location,
    // "drop_date" : location_details.drop_date,
    "drop_time" : location_details.drop_time,
    "car_image" : car_carousal.car_images[0],
    "car_brand": car_carousal.car_brand,
    "car_model": car_carousal.car_model,
    "price" : price,
    "hours" : location_details.hours,
    "hourly_based" : "1",
    "typeof_product" : location_details.typeof_product
   }
}
localStorage.setItem('price',price);
console.log(data)

var keyobj = {
'url':hostname+'/userAddCard',
'type': 'POST',
'crossDomain': true,
'ajaxData': JSON.stringify(data),
'dataType': 'json',
'callback': function (success) 
{
var status = success.status;
if(status == "success")
{
console.log("success---->",success.data);
//localStorage.setItem('cart_info',JSON.stringify(success.data));
//var pro_info = success.user;
sessionStorage.setItem("cart_booking","2")
location.href='/confirmation.html';

}
else
{
Swal.fire({
  title: 'User Status',
  text: success.msg,
  type: 'warning',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'OK'
});
}
}
}
ajaxCallFunction(keyobj);

}

}

function getBranchInfo()
{  
var data = {
"branch_id": localStorage.getItem('branch_id')
}
var keyobj = {
'url':hostname+'/getbranchDetails',
'type': 'POST',
'crossDomain': true,
'ajaxData': JSON.stringify(data),
'dataType': 'json',
'callback': function (success) 
{
var status = success.status;
if(status == "success")
{
  var branch_info = success.user;
  localStorage.setItem("branch_details",JSON.stringify(branch_info));
  console.log("Branch ---> ",branch_info);
  var address = branch_info.address_line1+' '+branch_info.address_line2;
  
  document.getElementById('branch_addr').innerHTML = address;
  document.getElementById('branch_city').innerHTML = branch_info.city;
  // document.getElementById('branch_mobile').innerHTML = branch_info.contact_no;
  
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

