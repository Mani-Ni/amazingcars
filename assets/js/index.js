var hostname;
var s3url;
var car_rental;
var driver_rental;
var cardriver_rental;
// var car_hour;

$("document").ready(function(){
  localStorage.removeItem('pic_select');
  localStorage.removeItem('drop_select');
  var ispage = 3; //ipage 1.inventory-list 2.vehicle-details
  localStorage.setItem("pagelocation",ispage);
  console.log(localStorage.getItem('pagelocation'));
  sessionStorage.setItem('car_rental','1');

    // Configuration Host and s3url
 
    var keyobj1 = 
  {
      'url':'../config/config.json',
      'type': 'GET',
      'crossDomain': true,
      'ajaxData': '',
      'dataType': 'json',
      'callback': function (success) 
          {
              s3url = success.s3url;
              hostname = success.apiurl;   
              localStorage.setItem("s3url", s3url);
              localStorage.setItem("url", hostname);
              load();
              getlocation();
              getAllDriverLocation();
          }
  }
  ajaxCallFunction(keyobj1);
 
  // if(localStorage.getItem('isLoggedIn')==1)
  // {
  //     document.getElementById("login").style.display="none";
  //     document.getElementById("signup").style.display="none";
  //     document.getElementById("user_profile").style.display="inline-flex";
  //     // document.getElementById("user_name").innerHTML = userDetails.first_name;
  // }
  // else
  // {
  //     document.getElementById("logout").style.display="none"
  //     document.getElementById("user_profile").style.display="none"
  // }
  // ========= RENTAL CAR HOURS Vs ROUND TRIP  =====
  // document.getElementById('roundedcheck').checked = true;  
  // document.getElementById('hrscheck').checked = false; 

  // roundedtripsearch(); 

  // ========= RENTAL DRIVER HOURS Vs ROUND TRIP  ======
  // document.getElementById('roundedcheck_Driver').checked = true;  
  // document.getElementById('hrscheck_Driver').checked = false;

  // roundedtripsearchDriver(); 

  // ========= RENTAL CAR AND DRIVER HOURS Vs ROUND TRIP  ======
  // document.getElementById('roundedcheck_cardriver').checked = true;  
  // document.getElementById('hrscheck_cardriver').checked = false;

  // roundedtripsearchCardriver(); 

 
  document.getElementById('hrs_based').style.display = "none";
  document.getElementById("hrs_based_driver").style.display = "none";
  document.getElementById("hrs_based_cardriver").style.display = "none";

  document.getElementById('roundedtrip').style.display = "inline-flex";
  document.getElementById("roundedtrip_driver").style.display = "inline-flex";
  document.getElementById("roundedtrip_cardriver").style.display = "inline-flex";
  
});
function swaping(type)
{
  if(type == '1') {
    var loc1 = localStorage.getItem("pic_select");
    var loc2 = localStorage.getItem("drop_select");
    $('#pick_select')[0].selectize.setValue(loc2);
    $('#drop_select')[0].selectize.setValue(loc1);
    localStorage.setItem("pic_select",loc2);
    localStorage.setItem("drop_select",loc1);
  }
  else if(type == '2'){
    var loc1 = localStorage.getItem("pick_select_cardriver");
    var loc2 = localStorage.getItem("drop_select_cardriver");
    $('#pick_select_cardriver')[0].selectize.setValue(loc2);
    $('#drop_select_cardriver')[0].selectize.setValue(loc1);
    localStorage.setItem("pick_select_cardriver",value);
    localStorage.setItem("drop_select_cardriver",value);
  }
  else if(type == '3'){
    var loc1 = localStorage.getItem("pick_select_driver");
    var loc2 = localStorage.getItem("drop_select_driver");
    $('#pick_select_driver')[0].selectize.setValue(loc2);
    $('#drop_select_driver')[0].selectize.setValue(loc1);
    localStorage.setItem("pick_select_driver",value);
    localStorage.setItem("drop_select_driver",value);
  }
}



      //  ======  RENTAL CAR ROUNDTRIP vs HOUR BASED ======
function rentalCar(type){  
  sessionStorage.setItem('car_rental',type);
  //var value = $('input[name=radiogroup1]:checked').val();
  //alert("Hii"+value);
  $("#rounbased_design").removeClass("trip_style");
  $("#hourly_design").removeClass("trip_style");
  if (type == "1") {
    document.getElementById('roundedcheck').checked = true;
    document.getElementById("roundedtrip").style.display = "inline-flex";
    $("#rounbased_design").addClass("trip_style");
    document.getElementById("hrs_based").style.display = "none";             
  }
  else if ( type == "2") {  
    
    document.getElementById('hrscheck').checked = true;
    document.getElementById("hrs_based").style.display = "inline-flex"; 
    $("#hourly_design").addClass("trip_style");
    document.getElementById("roundedtrip").style.display = "none";
  }
//   $("input[name=radiogroup1]").on('change', function() {     
    
 
//     if ($(this).attr('value') == "1") {
//       document.getElementById("roundedtrip").style.display = "inline-flex";
//       document.getElementById("hrs_based").style.display = "none";             
//     }
//     else if ($(this).attr('value') == "2") {   
//       document.getElementById("roundedtrip").style.display = "none"; 
//       document.getElementById("hrs_based").style.display = "inline-flex";  
//     }
// });

 }


  //  ======  RENTAL DRIVER ROUNDTRIP vs HOUR BASED ======
  function rentalDriver(type){
    sessionStorage.setItem('driver_rental',type);
    //driver_rental = type;

  $("#rounDriverbased_design").removeClass("trip_style");
  $("#hrsDriverbased_design").removeClass("trip_style");
    rounDriverbased_design
    if(type == "1"){
      document.getElementById('roundedcheck_Driver').checked = true;
      document.getElementById("roundedtrip_driver").style.display = "inline-flex";
      $("#rounDriverbased_design").addClass("trip_style");
      document.getElementById("hrs_based_driver").style.display = "none"; 
    }else if (type == "2"){
      document.getElementById('hrscheck_Driver').checked = true;
      document.getElementById("roundedtrip_driver").style.display = "none";
      $("#hrsDriverbased_design").addClass("trip_style");
      document.getElementById("hrs_based_driver").style.display = "inline-flex";
    }

  }

   //  ======  RENTAL CAR&DRIVER ROUNDTRIP vs HOUR BASED ======
   function rentalCardriver(type){
    sessionStorage.setItem('cardriver_rental',type);

    $("#rounCarDriverbased_design").removeClass("trip_style");
    $("#hrsCarDriverbased_design").removeClass("trip_style");
    if(type == "1"){
      document.getElementById('roundedcheck_cardriver').checked = true;
      document.getElementById("roundedtrip_cardriver").style.display = "inline-flex";
      $("#rounCarDriverbased_design").addClass("trip_style");
      document.getElementById("hrs_based_cardriver").style.display = "none"; 
    }else if (type == "2"){
      document.getElementById('hrscheck_cardriver').checked = true;
      document.getElementById("hrs_based_cardriver").style.display = "inline-flex"; 
      $("#hrsCarDriverbased_design").addClass("trip_style");
      document.getElementById("roundedtrip_cardriver").style.display = "none";
    }

  }




function load(){                                              
  // set the URL to local storage 
  hostname = '';
if(localStorage.getItem('url')=== undefined || localStorage.getItem('url')=== null) {
	hostname = '';
} else {
    hostname = localStorage.getItem('url');
}
// get User ID 
var user_id = sessionStorage.getItem('sessionid');
//get role
var user_role=sessionStorage.getItem('sessionrole');
// s3Url 
s3Url = '';
    if(localStorage.getItem('s3url')=== undefined || localStorage.getItem('s3url')=== null) {
        s3Url = '';
    } else {
        s3Url = localStorage.getItem('s3url');
    }
}


    
    
  //  Popup 
  
     

     
  

$('[data-search]').on('keyup', function() {
	var searchVal = $(this).val();
	var filterItems = $('[data-filter-item]');

	if ( searchVal != '' ) {
		filterItems.addClass('hidden');
		$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
	} else {
		filterItems.removeClass('hidden');
	}
});

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




// // ========= RENTAL CAR HOURS Vs ROUND TRIP  ======
// function roundedtripsearch()
// {
//   var check1=document.getElementById('roundedcheck');
//   if(check1.checked == true){
//     document.getElementById('hrscheck').checked = false;
//     document.getElementById('roundedtrip').style.display = "inline-flex";
//     document.getElementById("hrs_based").style.display = "none";
//   }
// }

// function hrsbasedsearch()
// {
//   var check=document.getElementById('hrscheck');
//   if(check.checked == true)
//   { 
//     document.getElementById('roundedcheck').checked = false;
//     document.getElementById("hrs_based").style.display = "inline-flex";
//     document.getElementById('roundedtrip').style.display = "none";
//   } else {
//     document.getElementById("hrs_based").style.display = "none";
//   }
// }


// // ========= RENTAL DRIVER HOURS Vs ROUND TRIP  ======

// function roundedtripsearchDriver()
// {
//   var check1=document.getElementById('roundedcheck_Driver');
//   if(check1.checked == true){
//     document.getElementById('hrscheck_Driver').checked = false;
//     document.getElementById('roundedtrip_driver').style.display = "inline-flex";
//     document.getElementById("hrs_based_driver").style.display = "none";
//   }
// }

// function hrsbasedsearchDriver()
// {
//   var check=document.getElementById('hrscheck_Driver');
 
//   if(check.checked == true)
//   { 
//     document.getElementById('roundedcheck_Driver').checked = false;
//     document.getElementById("hrs_based_driver").style.display = "inline-flex";
//     document.getElementById('roundedtrip_driver').style.display = "none";
//   } else {
//     document.getElementById("hrs_based_driver").style.display = "none";
//   }
// }


// // ========= RENTAL CAR AND DRIVER HOURS Vs ROUND TRIP  ======
//   function roundedtripsearchCardriver()
//   {
//     var check1=document.getElementById('roundedcheck_cardriver');
//     if(check1.checked == true){
//       document.getElementById('hrscheck_cardriver').checked = false;
//       document.getElementById('roundedtrip_cardriver').style.display = "inline-flex";
//       document.getElementById("hrs_based_cardriver").style.display = "none";
//     }
//   }

//   function hrsbasedsearchCardriver()
//   {
//     var check=document.getElementById('hrscheck_cardriver');
//     if(check.checked == true)
//     { 
//       document.getElementById('roundedcheck_cardriver').checked = false;
//       document.getElementById("hrs_based_cardriver").style.display = "inline-flex";
//       document.getElementById('roundedtrip_cardriver').style.display = "none";
//     } else {
//       document.getElementById("hrs_based_cardriver").style.display = "none";
//     }
//   }




function getlocation()
{
      var keyobj = {
        'url':hostname+'/getAllLocations',
        'type': 'POST',
        'crossDomain': true,
        'dataType': 'json',
        'callback': function (success) 
        {
          var status = success.status;

          // =============== RENTAL CAR FETCH DATAS ===========
          var select = document.getElementById("pick_select");
          var select1 = document.getElementById("drop_select");
          var select2 = document.getElementById("hrs_pick_select");

            // =============== RENTAL CAR & DRIVER FETCH DATAS ===========
            var cardriver_select = document.getElementById("pick_select_cardriver");
            var cardriver_select1 = document.getElementById("drop_select_cardriver");
            var cardriver_select2 = document.getElementById("hrs_pick_select_cardriver");

          if(status == "success")
          {
            var Location = success.Location;
             for(var i=0; i< Location.length; i++)
             {             
               // =============== RENTAL CAR FETCH DATAS ===========   
                var option = document.createElement("option");
                option.text = Location[i];
                option.value = Location[i];
                select.add(option);

                var option1 = document.createElement("option");
                option1.text = Location[i];
                option1.value = Location[i];
                select1.add(option1);

                var option2 = document.createElement("option");
                option2.text = Location[i];
                option2.value = Location[i];
                select2.add(option2);

                // =============== RENTAL CAR & DRIVER FETCH DATAS ===========
                var option = document.createElement("option");
                option.text = Location[i];
                option.value = Location[i];
                cardriver_select.add(option);

                var option1 = document.createElement("option");
                option1.text = Location[i];
                option1.value = Location[i];
                cardriver_select1.add(option1);

                var option2 = document.createElement("option");
                option2.text = Location[i];
                option2.value = Location[i];
                cardriver_select2.add(option2);

             }

                // =============== RENTAL CAR FETCH DATAS ===========
             $('#pick_select').selectize({
              onChange: function(value) {
                // alert($('#pick_select option:selected').text());
                  localStorage.setItem("pic_select",value);
                  // alert(value);
              }
              });
              $('#drop_select').selectize({
                onChange: function(value) {
                  // alert($('#pick_select option:selected').text());
                    localStorage.setItem("drop_select",value);
              }
              });
              $('#hrs_pick_select').selectize({
                onChange: function(value) {
                  // alert($('#pick_select option:selected').text());
                    localStorage.setItem("hrs_pic_select",value);
                }
              });

                   // =============== RENTAL CAR AND DRIVER FETCH DATAS ===========
             $('#pick_select_cardriver').selectize({
              onChange: function(value) {
                // alert($('#pick_select option:selected').text());
                  localStorage.setItem("pick_select_cardriver",value);
                  // alert(value);
              }
              });
              $('#drop_select_cardriver').selectize({
                onChange: function(value) {
                  // alert($('#pick_select option:selected').text());
                    localStorage.setItem("drop_select_cardriver",value);
              }
              });
              $('#hrs_pick_select_cardriver').selectize({
                onChange: function(value) {
                  // alert($('#pick_select option:selected').text());
                    localStorage.setItem("hrs_pick_select_cardriver",value);
                }
              });
            
          }   
          else
          {
              // Swal.fire({
              //     type: 'error',
              //     title: 'Error',
              //     text: success.msg,
              //   })
          }  
      }
}

ajaxCallFunction(keyobj);
}



function getAllDriverLocation()
{
    var keyobj = {
      'url':hostname+'/getAllDriverLocation',
      'type': 'POST',
      'crossDomain': true,
      'dataType': 'json',
      'callback': function (success) 
      {
        var status = success.status;

        // =============== RENTAL DRIVER FETCH DATAS ===========
        var driver_select = document.getElementById("pick_select_driver");
        var driver_select1 = document.getElementById("drop_select_driver");
        var driver_select2 = document.getElementById("hrs_pick_select_driver");

        if(status == "success")
        {
          var Location = success.Location;
           for(var i=0; i< Location.length; i++)
           {             

              // =============== RENTAL DRIVER FETCH DATAS ===========
              var option = document.createElement("option");
              option.text = Location[i];
              option.value = Location[i];
              driver_select.add(option);

              var option1 = document.createElement("option");
              option1.text = Location[i];
              option1.value = Location[i];
              driver_select1.add(option1);

              var option2 = document.createElement("option");
              option2.text = Location[i];
              option2.value = Location[i];
              driver_select2.add(option2);

           }
                 // =============== RENTAL DRIVER FETCH DATAS ===========
           $('#pick_select_driver').selectize({
            onChange: function(value) {
              // alert($('#pick_select option:selected').text());
                localStorage.setItem("pick_select_driver",value);
                // alert(value);
            }
            });
            $('#drop_select_driver').selectize({
              onChange: function(value) {
                // alert($('#pick_select option:selected').text());
                  localStorage.setItem("drop_select_driver",value);
            }
            });
            $('#hrs_pick_select_driver').selectize({
              onChange: function(value) {
                // alert($('#pick_select option:selected').text());
                  localStorage.setItem("hrs_pic_select_driver",value);
              }
            });

          
        }   
        else
        {
            // Swal.fire({
            //     type: 'error',
            //     title: 'Error',
            //     text: success.msg,
            //   })
        }  
    }
}

ajaxCallFunction(keyobj);
}







              //==================== **  SEARCH BUTTONS   ** =====================


      //  ===== RENTAL CARS SEARCH BUTTON
 
 function search()
 {
    // ROUND TRIP
    var sel_pickloc = localStorage.getItem('pic_select');
    pickup_date = new Date(document.getElementById("pickup_date").value);
    var pick_date1 = pickup_date.getFullYear()+'-'+("0" + (pickup_date.getMonth() + 1)).slice(-2)+'-'+pickup_date.getDate();
    var pickup_time=document.getElementById("pic_time1").value;
    pickup_time = pickup_time+':00';

    var sel_droploc = localStorage.getItem('drop_select');
    drop_date = new Date(document.getElementById("dropoff_date").value);
    var drop_date1 = drop_date.getFullYear()+'-'+("0" + (drop_date.getMonth() + 1)).slice(-2)+'-'+drop_date.getDate();
    var drop_time=document.getElementById("drop_time1").value;
    drop_time = drop_time+':00';

    var my_pickupdate = pick_date1+' '+pickup_time;
    var my_dropdate = drop_date1+' '+drop_time;
    var mypickup_date = new Date(my_pickupdate).getTime();
    var mydrop_date = new Date(my_dropdate).getTime();
    var difference = mydrop_date - mypickup_date;
    var seconds =  Math.floor(difference/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);

    // HOURS BASED
    var hrs_sel_pickloc = localStorage.getItem('hrs_pic_select');
    var hrs_pick_date = new Date(document.getElementById("hrs_pickup_date").value);
    var hrs_pick_date1 = hrs_pick_date.getFullYear()+'-'+("0" + (hrs_pick_date.getMonth() + 1)).slice(-2)+'-'+hrs_pick_date.getDate();

    var hrs_pickup_time1 = document.getElementById("hrs_pic_time1").value;
    hrs_pickup_time1 = hrs_pickup_time1+':00';
    var hrs_drop_time1 = document.getElementById("hrs_drop_time1").value;
    hrs_drop_time1 = hrs_drop_time1+':00';

    var my_pickupdatehours = hrs_pick_date1+' '+hrs_pickup_time1;
    var my_dropdatehours = hrs_pick_date1+' '+hrs_drop_time1;  
    var mypickup_time = new Date(my_pickupdatehours).getTime();
    var mydrop_time = new Date(my_dropdatehours).getTime();
    var difference = mydrop_time - mypickup_time;

    var seconds =  Math.floor(difference/1000);
    var minutes = Math.floor(seconds/60);
    var hrshours = Math.floor(minutes/60);
    alert(hrshours);
    var data;
    car_rental = sessionStorage.getItem('car_rental');
    if(car_rental == '1') {
      data = 
      {
          "pickup_location" : sel_pickloc,
          "pickup_date" : pick_date1,
          "pickup_time" : pickup_time,
          "drop_location" : sel_droploc,
          "drop_date" : drop_date1,
          "drop_time" : drop_time,
          "hours" : hours,
          "hourly_based" : "0",
          "typeof_product" : "1"
      };
    } else if(car_rental == '2') {
      data =
        {
          "pickup_location" : hrs_sel_pickloc,
          "pickup_date" : hrs_pick_date1,
          "pickup_time" : hrs_pickup_time1+':00',
          "drop_time" : hrs_drop_time1+':00',
          "hours" : hrshours,
          "hourly_based" : "1",
          "typeof_product" : "1"
        }
    }
    localStorage.setItem('location_details',JSON.stringify(data));
    sessionStorage.setItem('type','1');
    console.log(localStorage.getItem('location_details'));
    location.href = '/inventory-list.html';
}



//  ===== RENTAL DRIVER SEARCH BUTTON

function searchDriver() {
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
  else {
    requestDriver();
  }
}

function requestDriver(){
   // ROUND TRIP
   var driv_picuplocation = localStorage.getItem('pick_select_driver');   //pickup
   dri_pickup_date = new Date(document.getElementById("pickup_date_driver").value);
   var driv_pick_date_var = dri_pickup_date.getFullYear()+'-'+("0" + (dri_pickup_date.getMonth() + 1)).slice(-2)+'-'+dri_pickup_date.getDate();
   var driv_round_pictime =document.getElementById("dri_round_pictime").value;
   driv_round_pictime = driv_round_pictime + ':00'
   var rentaldri_pickup_adres =document.getElementById("rentaldri_pickup_adres").value;  //address

   var driv_sel_droploc = localStorage.getItem('drop_select_driver'); //dropoff
   driv_drop_date = new Date(document.getElementById("dropoff_date_driver").value);
   var driv_drop_date_var = driv_drop_date.getFullYear()+'-'+("0" + (driv_drop_date.getMonth() + 1)).slice(-2)+'-'+driv_drop_date.getDate();
   var driv_round_droptime=document.getElementById("dri_round_droptime").value;
   driv_round_droptime = driv_round_droptime + ':00'
   var rentaldri_dropoff_adres =document.getElementById("rentaldri_dropoff_adres").value;  //address

   var my_pickupdate = driv_pick_date_var+' '+driv_round_pictime;
   var my_dropdate = driv_drop_date_var+' '+driv_round_droptime;
   var mypickup_date = new Date(my_pickupdate).getTime();
   var mydrop_date = new Date(my_dropdate).getTime();
   var difference = mydrop_date - mypickup_date;

   var seconds =  Math.floor(difference/1000);
   var minutes = Math.floor(seconds/60);
   var hours = Math.floor(minutes/60);

   // HOURS BASED
   var dri_hrs_sel_pickloc = localStorage.getItem('hrs_pick_select_driver');
   var dri_hrs_pick_date = new Date(document.getElementById("hrs_pickup_date_driver").value);
   var dri_hrs_pick_datevar = dri_hrs_pick_date.getFullYear()+'-'+("0" + (dri_hrs_pick_date.getMonth() + 1)).slice(-2)+'-'+dri_hrs_pick_date.getDate();

   var dir_hrs_pickup_time = document.getElementById("dir_hrs_picup_time").value;
   dir_hrs_pickup_time = dir_hrs_pickup_time + ':00'
   var dir_hrs_drop_time = document.getElementById("dir_hrs_drop_time").value;
   dir_hrs_drop_time = dir_hrs_drop_time + ':00'

   var rentaldri_pickup_hrs_adres =document.getElementById("rentaldri_pickup_hrs_adres").value;  //address
   var rentaldri_dropoff_hrs_adres =document.getElementById("rentaldri_dropoff_hrs_adres").value;

   var my_pickupdatehours = dri_hrs_pick_datevar+' '+dri_hrs_pick_datevar;
   var my_dropdatehours = dir_hrs_drop_time+' '+dir_hrs_pickup_time;  
   var dri_mypickup_time = new Date(my_pickupdatehours).getTime();
   var dri_mydrop_time = new Date(my_dropdatehours).getTime();
   var difference = dri_mydrop_time - dri_mypickup_time;

   var seconds =  Math.floor(difference/1000);
   var minutes = Math.floor(seconds/60);
   var hrs_hours = Math.floor(minutes/60);

   var userData = JSON.parse(localStorage.getItem('userData'));
   driver_rental = sessionStorage.getItem('driver_rental');
   var data;
   if(driver_rental == '1') {
     data = 
     {
        //  "pickup_location" : driv_picuplocation,
        //  "pickup_date" : driv_pick_date_var,
        //  "pickup_time" : driv_round_pictime,
        //  "drop_location" : driv_sel_droploc,
        //  "drop_date" : driv_drop_date_var,
        //  "drop_time" : driv_round_droptime,
        //  "hours" : hours,
        //  "hourly_based" : "0",

         "user_id" : userData._id,
         "user_name" : userData.first_name +' '+ userData.last_name,
         "contact_no" : userData.contact_no,
         "pickup_location" : driv_picuplocation,
         "pickup_address" : rentaldri_pickup_adres,
         "pickup_date" : driv_pick_date_var,
         "pickup_time" : driv_round_pictime,
         "drop_location" : driv_sel_droploc,
         "drop_address" : rentaldri_dropoff_adres,
         "drop_date" :  driv_drop_date_var,
         "drop_time" : driv_round_droptime,
         "hours" : hours,
         "trip_type":"Single",
         "typeof_product":"2",
         "hourly_based" : "0",
     };
   } else if(driver_rental == '2') {
     data =
       {
        "user_id" : userData._id,
        "user_name" : userData.first_name + userData.last_name,
        "contact_no" : userData.contact_no,
         "pickup_location" : dri_hrs_sel_pickloc,

         "pickup_address" : rentaldri_pickup_hrs_adres,
         "drop_address" : rentaldri_dropoff_hrs_adres,
        //  "duration" : duration,
         "pickup_date" : dri_hrs_pick_datevar,
         "pickup_time" : dir_hrs_pickup_time,
         "drop_time" : dir_hrs_drop_time,
         "hours" : hrs_hours,
         "trip_type":"Single",
         "typeof_product":"2",
         "hourly_based" : "1"
       }
   }
   console.log("---->",data);
  //  localStorage.setItem('location_details1',JSON.stringify(data));
  //  console.log(localStorage.getItem('location_details1'));
   getDrivers(data);   
}

function getDrivers(data)
{
    var keyobj2 = {
      'url':hostname+'/userDriverBooking',
      'type': 'POST',
      'ajaxData': JSON.stringify(data),
      'crossDomain': true,
      'dataType': 'json',
      'callback': function (success) 
      {
        var status = success.status;
        if(status == 'success') {
            // Swal.fire({
            //   type: 'success',
            //   title: 'Status',
            //   text: success.msg,
            // });
            // location.href = '/profile.html';
        }
        Swal.fire({
          title: 'Booking Status',
          text: success.msg,
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            location.href='profile.html'
          }
        })
      }
    }
    ajaxCallFunction(keyobj2);
  }



//  ===== RENTAL CAR & DRIVER SEARCH BUTTON

function searchCarDriver() {
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
  else {
    requestCarDriver();
  }
}

function requestCarDriver(){
   // ROUND TRIP
   var cardriv_picuplocation = localStorage.getItem('pick_select_cardriver');   //pickup
   cardri_pickup_date = new Date(document.getElementById("pickup_date_cardriver").value);
   var cardriv_pick_date_var = cardri_pickup_date.getFullYear()+'-'+("0" + (cardri_pickup_date.getMonth() + 1)).slice(-2)+'-'+cardri_pickup_date.getDate();
   var cardriv_round_pictime =document.getElementById("cardri_round_pic_time").value;
   cardriv_round_pictime = cardriv_round_pictime + ':00';
   var cardriv_sel_droploc = localStorage.getItem('drop_select_cardriver'); //dropoff
   cardriv_drop_date = new Date(document.getElementById("dropoff_date_cardriver").value);
   var cardriv_drop_date_var = cardriv_drop_date.getFullYear()+'-'+("0" + (cardriv_drop_date.getMonth() + 1)).slice(-2)+'-'+cardriv_drop_date.getDate();
   var cardriv_round_droptime=document.getElementById("cardri_round_drop_time").value;
   cardriv_round_droptime = cardriv_round_droptime + ':00'

   var my_pickupdate = cardriv_pick_date_var+' '+cardriv_round_pictime;
   var my_dropdate = cardriv_drop_date_var+' '+cardriv_round_droptime;

   var mypickup_date = new Date(my_pickupdate).getTime();
   var mydrop_date = new Date(my_dropdate).getTime();

   var difference = mydrop_date - mypickup_date;

   var seconds =  Math.floor(difference/1000);
   var minutes = Math.floor(seconds/60);
   var carsDriverhours = Math.floor(minutes/60);
   // HOURS BASED
   var cardri_hrs_sel_pickloc = localStorage.getItem('hrs_pick_select_cardriver');
   var cardri_hrs_pick_date = new Date(document.getElementById("hrs_pickup_driver_cardriver").value);
   var cardri_hrs_pick_datevar = cardri_hrs_pick_date.getFullYear()+'-'+("0" + (cardri_hrs_pick_date.getMonth() + 1)).slice(-2)+'-'+cardri_hrs_pick_date.getDate();

   var cardir_hrs_pickup_time = document.getElementById("car_driver_hrs_pic_time").value;
   cardir_hrs_pickup_time = cardir_hrs_pickup_time + ':00'
   var cardir_hrs_drop_time = document.getElementById("car_driver_hrs_drop_time").value;
   cardir_hrs_drop_time = cardir_hrs_drop_time + ':00'
   var my_pickupdatehours = cardri_hrs_pick_datevar+' '+cardir_hrs_pickup_time;
   var my_dropdatehours = cardri_hrs_pick_datevar+' '+cardir_hrs_drop_time;  
   var dri_mypickup_time = new Date(my_pickupdatehours).getTime();
   var dri_mydrop_time = new Date(my_dropdatehours).getTime();
   var difference = dri_mydrop_time - dri_mypickup_time;

   var seconds =  Math.floor(difference/1000);
   var minutes = Math.floor(seconds/60);
   var carsDriverhrshours = Math.floor(minutes/60);

   var userData = JSON.parse(localStorage.getItem('userData'));
   cardriver_rental = sessionStorage.getItem('cardriver_rental');
   var data;
   if(cardriver_rental == '1') {
     data = 
     {
        //  "pickup_location" : driv_picuplocation,
        //  "pickup_date" : driv_pick_date_var,
        //  "pickup_time" : driv_round_pictime,
        //  "drop_location" : driv_sel_droploc,
        //  "drop_date" : driv_drop_date_var,
        //  "drop_time" : driv_round_droptime,
        //  "hours" : hours,
        //  "hourly_based" : "0",

         "user_id" : userData._id,
         "user_name" : userData.first_name +' '+ userData.last_name,
         "contact_no" : userData.contact_no,
         "pickup_location" : cardriv_picuplocation,
         "pickup_date" : cardriv_pick_date_var,
         "pickup_time" : cardriv_round_pictime,
         "drop_location" : cardriv_sel_droploc,
         "drop_date" :  cardriv_drop_date_var,
         "drop_time" : cardriv_round_droptime,
         "hours" : carsDriverhours,
         "trip_type":"Single",
         "typeof_product":"3",
         "hourly_based" : "0",
     };
     
   } else if(cardriver_rental == '2') {
     data =
       {
        "user_id" : userData._id,
        "user_name" : userData.first_name + userData.last_name,
        "contact_no" : userData.contact_no,
         "pickup_location" : cardri_hrs_sel_pickloc,
        //  "duration" : duration,
         "pickup_date" : cardri_hrs_pick_datevar,
         "pickup_time" : cardir_hrs_pickup_time,
         "drop_time" : cardir_hrs_drop_time,
         "hours" : carsDriverhrshours,
         "hourly_based" : "1",
         "typeof_product" : "3"
       }
   }
   localStorage.setItem('location_details',JSON.stringify(data));
   sessionStorage.setItem('type','3');
   location.href = '/inventory-list.html';
}

function getCarDrivers(data)
{
    var keyobj2 = {
      'url':hostname+'/userSearchCarandDriver',
      'type': 'POST',
      'ajaxData': JSON.stringify(data),
      'crossDomain': true,
      'dataType': 'json',
      'callback': function (success) 
      {
        var status = success.status;
        if(status == 'success') {
            Swal.fire({
              type: 'success',
              title: 'Status',
              text: success.msg,
            });
        }
        location.href = '/profile.html';
      }
    }
    ajaxCallFunction(keyobj2);
  }



// ============== ========================= **   Datepicker  ** ========================= ===========

          // CAR DATEPICKER
          
$(function () {
    $('#pickup_date').datepicker({
        uiLibrary: 'bootstrap4',
        iconsLibrary: "fontawesome",
        modal: false,
        footer: false, 
        // format: "ddd, mmm d, yyyy h:MM TT",
        format: "mmm d, yyyy",   
        // disableDates:  function (date) {
        //     const currentDate = new Date();
        //     return date <= currentDate ? false : true;
        // }
        disableDates:  function (date) {
            // allow for today
                const currentDate = new Date().setHours(0,0,0,0);
                
                return date.setHours(0,0,0,0) >= currentDate ? true : false;

            }
           
        });
        $('#hrs_pickup_date').datepicker({
          uiLibrary: 'bootstrap4',
          iconsLibrary: "fontawesome",
          modal: false,
          footer: false, 
          // format: "ddd, mmm d, yyyy h:MM TT",
          format: "mmm d, yyyy",   
          // disableDates:  function (date) {
          //     const currentDate = new Date();
          //     return date <= currentDate ? false : true;
          // }
          disableDates:  function (date) {
              // allow for today
                  const currentDate = new Date().setHours(0,0,0,0);
                  return date.setHours(0,0,0,0) >= currentDate ? true : false;
              }
          });

        $('#dropoff_date').datepicker({
            uiLibrary: 'bootstrap4',
            iconsLibrary: "fontawesome",
            modal: false,
            footer: false, 
            // format: "ddd, mmm d, yyyy h:MM TT",
            format: "mmm d, yyyy",   
            // disableDates: S function (date) {
            //     const currentDate = new Date();
            //     return date <= currentDate ? false : true;
            // }
            disableDates:  function (date) {
                // allow for today
                    var start_date = document.getElementById("pickup_date").value;
                    var date1 = new Date(start_date);
                    const currentDate = date1.setHours(0,0,0,0);
                    return date.setHours(0,0,0,0) >= currentDate ? true : false;
                }
            });


            // DRIVER DATEPICKER

    $('#pickup_date_driver').datepicker({
      uiLibrary: 'bootstrap4',
          iconsLibrary: "fontawesome",
          modal: false,
          footer: false, 
          // format: "ddd, mmm d, yyyy h:MM TT",
          format: "mmm d, yyyy",   
          // disableDates:  function (date) {
          //     const currentDate = new Date();
          //     return date <= currentDate ? false : true;
          // }
          disableDates:  function (date) {
              // allow for today
              const currentDate = new Date().setHours(0,0,0,0);
              return date.setHours(0,0,0,0) >= currentDate ? true : false;
              }
  });


        $('#dropoff_date_driver').datepicker({
          uiLibrary: 'bootstrap4',
              iconsLibrary: "fontawesome",
              modal: false,
              footer: false, 
              // format: "ddd, mmm d, yyyy h:MM TT",
              format: "mmm d, yyyy",   
              // disableDates:  function (date) {
              //     const currentDate = new Date();
              //     return date <= currentDate ? false : true;
              // }
              disableDates:  function (date) {
                // allow for today
                    var start_date = document.getElementById("pickup_date_driver").value;
                    var date1 = new Date(start_date);
                    const currentDate = date1.setHours(0,0,0,0);
                    return date.setHours(0,0,0,0) >= currentDate ? true : false;
                }
      });

      $('#hrs_pickup_date_driver').datepicker({
        uiLibrary: 'bootstrap4',
            iconsLibrary: "fontawesome",
            modal: false,
            footer: false, 
            // format: "ddd, mmm d, yyyy h:MM TT",
            format: "mmm d, yyyy",   
            // disableDates:  function (date) {
            //     const currentDate = new Date();
            //     return date <= currentDate ? false : true;
            // }
            disableDates:  function (date) {
                // allow for today
                const currentDate = new Date().setHours(0,0,0,0);
                return date.setHours(0,0,0,0) >= currentDate ? true : false;
                }
    });


        // CAR AND DRIVER DATEPICKER


    $('#pickup_date_cardriver').datepicker({
      uiLibrary: 'bootstrap4',
          iconsLibrary: "fontawesome",
          modal: false,
          footer: false, 
          // format: "ddd, mmm d, yyyy h:MM TT",
          format: "mmm d, yyyy",   
          // disableDates:  function (date) {
          //     const currentDate = new Date();
          //     return date <= currentDate ? false : true;
          // }
          disableDates:  function (date) {
              // allow for today
              const currentDate = new Date().setHours(0,0,0,0);
              return date.setHours(0,0,0,0) >= currentDate ? true : false;
              }
  });


        $('#dropoff_date_cardriver').datepicker({
          uiLibrary: 'bootstrap4',
              iconsLibrary: "fontawesome",
              modal: false,
              footer: false, 
              // format: "ddd, mmm d, yyyy h:MM TT",
              format: "mmm d, yyyy",   
              // disableDates:  function (date) {
              //     const currentDate = new Date();
              //     return date <= currentDate ? false : true;
              // }
              disableDates:  function (date) {
                // allow for today
                    var start_date = document.getElementById("pickup_date_cardriver").value;
                    var date1 = new Date(start_date);
                    const currentDate = date1.setHours(0,0,0,0);
                    return date.setHours(0,0,0,0) >= currentDate ? true : false;
                }
      });

      $('#hrs_pickup_driver_cardriver').datepicker({
        uiLibrary: 'bootstrap4',
            iconsLibrary: "fontawesome",
            modal: false,
            footer: false, 
            // format: "ddd, mmm d, yyyy h:MM TT",
            format: "mmm d, yyyy",   
            // disableDates:  function (date) {
            //     const currentDate = new Date();
            //     return date <= currentDate ? false : true;
            // }
            disableDates:  function (date) {
                // allow for today
                const currentDate = new Date().setHours(0,0,0,0);
                return date.setHours(0,0,0,0) >= currentDate ? true : false;
                }
    });

  });

             //= ==============================  ====== = End DATEPICKER     ================= ============ ======


            //  ===============   **    TIMEPICKER VALIDATION    **    ============

// RENTAL CAR

$('#dropoff_date').change(function() {     //ROUND
  $('#drop_time1').val('00');
  var pickup_time = Number($('#pic_time1').val());
  pickup_date = document.getElementById("pickup_date").value;
  drop_date = document.getElementById("dropoff_date").value;
  if(pickup_date == drop_date) {
     for(var i = 0; i <= pickup_time;  i++) {
      $('option[id="car_drop_' + i + '"]').attr('disabled','disabled');
     }
   } else {
    for(var i = 0; i <= 23;  i++) {
      $('option[id="car_drop_' + i + '"]').removeAttr('disabled');
     }
   }
});
      
$('#hrs_pic_time1').change(function() {    //HOURLY
  $('#hrs_drop_time1').val('00');
  for(var i = 0; i <= 23;  i++) {
    $('option[id="car_hrs_drop_' + i + '"]').removeAttr('disabled');
   }
  var pickup_time = Number($('#hrs_pic_time1').val());
  for(var i = 0; i <= pickup_time;  i++) {
    $('option[id="car_hrs_drop_' + i + '"]').attr('disabled','disabled');
  }
});



// RENTAL DRIVER

$('#dropoff_date_driver').change(function() {     //ROUND
  $('#dri_round_droptime').val('00');
  var pickup_time = Number($('#dri_round_pictime').val());

  pickup_date = document.getElementById("pickup_date_driver").value;
  dropoff_date = document.getElementById("dropoff_date_driver").value;
  if(pickup_date == dropoff_date) {
     for(var i = 0; i <= pickup_time;  i++) {
      $('option[id="driver_drop_' + i + '"]').attr('disabled','disabled');
     }
   } else {
    for(var i = 0; i <= 23;  i++) {
      $('option[id="driver_drop_' + i + '"]').removeAttr('disabled');
     }
   }
});
      
$('#dir_hrs_picup_time').change(function() {    //HOURLY
  $('#dir_hrs_drop_time').val('00');
  for(var i = 0; i <= 23;  i++) {
    $('option[id="driver_hrs_drop_' + i + '"]').removeAttr('disabled');
   }
  var pickup_time = Number($('#dir_hrs_picup_time').val());
  for(var i = 0; i <= pickup_time;  i++) {
    $('option[id="driver_hrs_drop_' + i + '"]').attr('disabled','disabled');
  }
});


// RENTAL CAR AND DRIVER

$('#dropoff_date_cardriver').change(function() {     //ROUND
  $('#cardri_round_drop_time').val('00');
  var pickup_time = Number($('#cardri_round_pic_time').val());

  pickup_date = document.getElementById("pickup_date_cardriver").value;
  dropoff_date = document.getElementById("dropoff_date_cardriver").value;
  if(pickup_date == dropoff_date) {
     for(var i = 0; i <= pickup_time;  i++) {
      $('option[id="cardriv_drop_' + i + '"]').attr('disabled','disabled');
     }
   } else {
    for(var i = 0; i <= 23;  i++) {
      $('option[id="cardriv_drop_' + i + '"]').removeAttr('disabled');
     }
   }
});
      
$('#car_driver_hrs_pic_time').change(function() {    //HOURLY
  $('#car_driver_hrs_drop_time').val('00');
  for(var i = 0; i <= 23;  i++) {
    $('option[id="cardriv_hrs_drop_' + i + '"]').removeAttr('disabled');
   }
  var pickup_time = Number($('#dir_hrs_picup_time').val());
  for(var i = 0; i <= pickup_time;  i++) {
    $('option[id="cardriv_hrs_drop_' + i + '"]').attr('disabled','disabled');
  }
});



//  ===============   **  END  TIMEPICKER VALIDATION    **    ============

 
// function setDate(){
//         var start_date = document.getElementById("pickup_date").value;
//         var date1 = new Date(start_date);

    
//     $('#dropoff_date').datepicker({
//         uiLibrary: 'bootstrap4',
//         minDate: date1
//     });

// }


      // ========== LOCATION -->   ** =========  **  SEARCH BUTTON RESTRICTION    **   ===========

                 // =================RENTAL CARS=======
$(document).on('change keyup', '.required1', function(e){
    let Disabled = true;
     $(".required1").each(function() {
       let value = this.value
       if ((value)&&(value.trim() !=''))
           {
             Disabled = false
           }else{
             Disabled = true
             return false
           }
     });
    
    if(Disabled){
         $('.toggle-disabled1').prop("disabled", true);
       }else{
         $('.toggle-disabled1').prop("disabled", false);
       }
       // alert("check");
  })

                 // HOURLY
  $(document).on('change keyup', '.required11', function(e){
    let Disabled = true;
     $(".required11").each(function() {
       let value = this.value;
       if ((value)&&(value.trim() != ''))
           {
             Disabled = false
           }else{
             Disabled = true
             return false
           }
     });
    
    if(Disabled){
         $('.toggle-disabled11').prop("disabled", true);
       }else{
         $('.toggle-disabled11').prop("disabled", false);
       }
  })





// ====================== RENTAL DRIVERS =============
  $(document).on('change keyup', '.required2', function(e){
    let Disabled = true;
     $(".required2").each(function() {
       let value = this.value
       if ((value)&&(value.trim() !=''))
           {
             Disabled = false
           }else{
             Disabled = true
             return false
           }
     });
    
    if(Disabled){
         $('.toggle-disabled2').prop("disabled", true);
       }else{
         $('.toggle-disabled2').prop("disabled", false);
       }
  })

      // HOURLY
      $(document).on('change keyup', '.required22', function(e){
      let Disabled = true;
        $(".required22").each(function() {
          let value = this.value;
          if ((value)&&(value.trim() != ''))
              {
                Disabled = false
              }else{
                Disabled = true
                return false
              }
        });
      
      if(Disabled){
            $('.toggle-disabled22').prop("disabled", true);
          }else{
            $('.toggle-disabled22').prop("disabled", false);
          }
    })

  // // ====================== RENTAL CAR AND DRIVERS =============
  $(document).on('change keyup', '.required3', function(e){
    let Disabled = true;
     $(".required3").each(function() {
       let value = this.value;
       if ((value)&&(value.trim() != ''))
           {
             Disabled = false
           }else{
             Disabled = true
             return false
           }
     });
    
    if(Disabled){
         $('.toggle-disabled3').prop("disabled", true);
       }else{
         $('.toggle-disabled3').prop("disabled", false);
       }
  })

      // HOURLY
      $(document).on('change keyup', '.required33', function(e){
      let Disabled = true;
        $(".required33").each(function() {
          let value = this.value;
          if ((value)&&(value.trim() != ''))
              {
                Disabled = false
              }else{
                Disabled = true
                return false
              }
        });
      
      if(Disabled){
            $('.toggle-disabled33').prop("disabled", true);
          }else{
            $('.toggle-disabled33').prop("disabled", false);
          }
    })







       // RENTAL CAR TRIP CHOOSEN   //
       
  $('.rentalcar_trip').click(function() {
    $('.trip_style').removeClass('trip_style');
    $(this).addClass('trip_style').find('input').prop('checked', true)    
  });

 

