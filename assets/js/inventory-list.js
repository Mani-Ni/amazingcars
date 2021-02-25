var car_details;
var search_type;

$(document).ready(function(){
  var userDetails =JSON.parse(localStorage.getItem('userData'));
        var ispage = 1; //ipage 1.inventory-list 2.vehicle-details
        localStorage.setItem("pagelocation",ispage);
        console.log(localStorage.getItem('pagelocation'));

        document.getElementById('roundedcheck').checked = true;  
        document.getElementById('hrscheck').checked = false;  
        roundedtripsearch(); 
        search_type = sessionStorage.getItem('type');
        loadSearchDetails();
        if(search_type == '1') {
          loadCarDetails(); 
        } else {
          getCarDrivers();
        }
        
      //======= Location close button ========

        $('#close_location').on('click', function(e) { 
          document.getElementById("change_loc_opt").style.display = 'none';
        });
     
          // ================== Filter and Reset =================
      $("#select").click(function(){
        var values= [];
        $(".car > option").each(function(){
            values.push($(this).attr('value'));
        });
        $('.car').val(values);
      });
      
      $("#reset").click(function(){
          $('.selectpicker').val([]);
          $('.filter-option-inner-inner').text('Select'); 
          $('#filter1').prop('title', 'your new title');
          });
        
          // FILTER CAR MODEL AND VERSION
      document.getElementById('model_hide_show').style.display="none";
      document.getElementById('version_hide_show').style.display="none";
      
      // Add minus icon for collapse element which is open by default
      $(".filter_cont.in").each(function(){
        $(this).siblings(".panel-heading").find(".glyphicon").addClass("rotate");
      });
      
      // Toggle up down arrow icon on show hide of collapse element
      $(".collapse").on('hidden.bs.collapse', function(){
        $(this).parent().find(".glyphicon").addClass("rotate");
      }).on('show.bs.collapse', function(){
        $(this).parent().find(".glyphicon").removeClass("rotate");
      });

      // if(localStorage.getItem('isLoggedIn') == 1)
      // {
      //     document.getElementById("login").style.display="none";
      //     document.getElementById("signup").style.display="none";
      //     document.getElementById("user_profile").style.display="inline-flex";
      //   //  document.getElementById("user_name").innerHTML = userDetails.first_name;
      // }
      // else
      // {
      //     document.getElementById("logout").style.display="none"
      //     document.getElementById("user_profile").style.display="none"
      // }
      brandNameCheck();
  });

  function loadSearchDetails()
  {
      var location_details1 = localStorage.getItem('location_details');
      var location_details = JSON.parse(location_details1);

    if(location_details.hourly_based == 0)
    {
      document.getElementById('hourly_trip').style.display="none";
      document.getElementById('rounded_trip').style.display="flex"
    console.log(location_details);
        document.getElementById('pickup_loc').innerHTML = location_details.pickup_location;
        document.getElementById('pickup_date1').innerHTML = location_details.pickup_date;
        document.getElementById('pickup_time').innerHTML = location_details.pickup_time;
        document.getElementById('dropoff_loc').innerHTML = location_details.drop_location;
        document.getElementById('dropoff_date1').innerHTML = location_details.drop_date;
        document.getElementById('dropoff_time').innerHTML = location_details.drop_time;
    }
    else if(location_details.hourly_based == 1){
      // alert(location_details.hours);
        document.getElementById('hourly_trip').style.display="flex";
        document.getElementById('rounded_trip').style.display="none";
        document.getElementById('hrs_pickup_loc').innerHTML = location_details.pickup_location;
        document.getElementById('hrs_duration').innerHTML = location_details.hours;
        var kms=location_details.duration * 10;
        // document.getElementById('hrs_kms').innerHTML = kms;
        document.getElementById('hrs_pickup_date1').innerHTML = location_details.pickup_date;
        document.getElementById('hrs_pickup_time').innerHTML = location_details.pickup_time;

    }
  }

               
   // ** FILTER TYPE

   function onchangefilter(){
    var location_details1 = localStorage.getItem('location_details');
    var location_details = JSON.parse(location_details1);

    var brandname = [];
    var car_model =[];
    var car_version = [];
    var no_ofairbags = [];
    var body_type = [];
    var t_type = [];
    var f_type = [];
    $("input:checkbox[name=brandname]:checked").each(function(){
      var car_brand = $(this).val();
      brandname.push(car_brand);
    });
    $("input:checkbox[name=car_model]:checked").each(function(){
      var carModel = $(this).val();
      car_model.push(carModel);
    });
    $("input:checkbox[name=car_version]:checked").each(function(){
      var carVersion = $(this).val();
      car_version.push(carVersion);
    });
  $("input:checkbox[name=no_ofairbags]:checked").each(function(){
    no_ofairbags.push($(this).val());
  });
  
  $("input:checkbox[name=body_type]:checked").each(function(){
    body_type.push($(this).val());
  });
  
  $("input:checkbox[name=t_type]:checked").each(function(){
    t_type.push($(this).val());
  });
  $("input:checkbox[name=f_type]:checked").each(function(){
    f_type.push($(this).val());
  });
  data = 
  {
      "pickup_location" : location_details.pickup_location,
	    "type": "1",
	    "car_brand" : brandname,
	    "car_model": car_model,
	    "car_version": car_version,
	    "car_airbags" : no_ofairbags,
	    "car_transmission_type": t_type,
	    "car_body_type" : body_type,
      "car_fuel_type" : f_type,
      "typeof_product" : location_details.typeof_product,
  };
  var keyobj = {
    'url':hostname+'/fetchCarDetailsWithFilters',
    'type': 'POST',
    'crossDomain': true,
    'ajaxData': JSON.stringify(data),
    'dataType': 'json',
    'callback': function (success) 
    {
      var status = success.status;
      $('#car_list').empty();
      if(status == "success")
      {
            car_details = success.productDetails; 
            console.log(car_details);
            var car_shows = document.getElementById('car_list');
            var res = [];
            for(var i = 0; i < car_details.length; i++)
            {           
              if(location_details.hourly_based == 0){ 
              var price = car_details[i].per_hrs * location_details.hours;
              }
              else{
                var price = car_details[i].per_hrs * location_details.hours;
              }
               
              $('#car_list').append('  <div class="b-goods-f col-12 b-goods-f_row -expanded" style="margin-bottom:20px;"> <div> <div class="b-goods-f__media"> <img class="b-goods-f__img img-scale" style="height:150px;" src="'+s3Url+''+car_details[i].car_images[0]+'" alt="foto"> <span class="b-goods-f__media-inner" style="width:3em;"> <span class="b-goods-f__favorite"><i class="ic far fa-star"></i></span> </span> </div> <div class="b-goods-f__main"> <div class="b-goods-f__descrip"> <div class="b-goods-f__title" style="margin-bottom: 10px !important;padding-bottom:0px;display:inline-flex;"><span>'+car_details[i].car_brand+','+car_details[i].car_model+'</span><span><li style="margin-left: 8px;list-style: none;display: flex;"> <fieldset class="rating" id="view_rating'+i+'" style="font-size: 7px;"> </fieldset></li></span> </div> <div style="border-bottom: 1px solid #ddd;"> <ul class="b-goods-f__list list-unstyled"> <li class="b-goods-f__list-item feature_car" style="font-weight:none !important;"> <span class="b-goods-f__list-title">Version :</span> <span class="b-goods-f__list-info setCarListMargin">'+car_details[i].car_version+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Air Bags :</span> <span class="b-goods-f__list-info">'+car_details[i].car_airbags+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Color :</span> <span class="b-goods-f__list-info">'+car_details[i].car_color+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_body_type+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Fuel Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_fuel_type+'</span> </li> </ul> </div> <div class="col-sm-12"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li> </div> </ul> </div> </div> <div class="b-goods-f__sidebar"> <a class="b-goods-f__bnr" href="#"></a><span class="b-goods-f__price-group"><span class="b-goods-f__price"><span class="b-goods-f__price_col">&nbsp;</span> <span class="viewdeal_price">Rs.'+price+'.00</span></span> </span><span class="b-goods-f__compare viewdeal_btn" onclick="carView(\''+car_details[i]._id+'\',\''+car_details[i].branch_id+'\');">View Details</span> </div> </div> </div> <div class="row hidden_view" id="hidden_text'+i+'" style="margin-top: 1.2em;border-top: 1px solid #bababa;"> <div class="col-md-12"> <div class="row" style="margin-left:0px;margin-top: 0.5em"> <h7 class="h7">Inclusion<span>:</span></h7> </div> <div class="row" style="padding-top:0.5em;margin-bottom:1em;"> <div class="col-md-4">Driver Allowance</div> <div class="col-md-4">Toll Tax and State Tax: As applicable</div> <div class="col-md-4">Cancellation charges</div> </div> </div> </div> <div class="row" style="margin-top:1em;"> <button id="toggle" class="expand-button list_button" onclick="demo('+i+');">View More</button> </div> </div>');
              for(var  j = 0; j < car_details[i].rating; j++)
              {
                 $("#view_rating"+i).append('<input type="radio" id="star'+j+'" name="rating" value="1"/><label class = "full" for="star1" title="1 star"></label><input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="0.5 stars"></label>')
              }
            }
      } else{
        var car_shows = document.getElementById('car_list');
        car_shows.innerHTML +='<span>'+success.msg+'</span>';
      }  
    }
}
ajaxCallFunction(keyobj);

}



   function filter(type){
    var data;
    var brandname = [];
    var car_model =[];
    var car_version = [];
  
    // var yourArray = [];
    // var no_ofairbags = [];
    // var body_type = [];
    // var t_type = [];
    // var f_type = [];

    if(type == '1') {
      $("input:checkbox[name=brandname]:checked").each(function(){
        document.getElementById('model_hide_show').style.display="block";
        var car_brand = $(this).val();
        brandname.push(car_brand);
        brandNamePush(brandname);
      });
      var checkedNum = $('input:checkbox[name=brandname]:checked').length;
      if(!checkedNum){
        $('#carmodel_chk').empty();
      document.getElementById('model_hide_show').style.display="none";
      document.getElementById('version_hide_show').style.display="none";
      }
    }

  if(type == '2') {
    $("input:checkbox[name=car_model]:checked").each(function(){
      document.getElementById('version_hide_show').style.display="block";
      var carModel = $(this).val();
      car_model.push(carModel);
      brandModelPush(car_model);
    });
    var checkedNum = $('input:checkbox[name=car_model]:checked').length;
    if(!checkedNum){
      $('#carversion_chk').empty();
    document.getElementById('version_hide_show').style.display="none";
    }
  }

 if(type == '3') {
    $("input:checkbox[name=car_version]:checked").each(function(){
      var carVersion = $(this).val();
      car_version.push(carVersion);
    });
  }
 
       
        
    // alert(JSON.stringify(data));

 

}

function chkDemo(data) {
  alert(">>>>>"+data)
}




    //**   BRAND NAME FILTER */

    function brandNameCheck(){
      var keyobj = {
        'url':hostname+'/getAllCarBrand',
        'type': 'POST',
        'crossDomain': true,
        'dataType': 'json',
        'callback': function (success) 
        {
          var status = success.status;
          
          if(status == "success")
          {
            var carbrand = success.allUsers;
            for(var i=0; i<carbrand.length; i++){
              $('#brandname_chk').append('<div class="checkbox"><label><input type="checkbox" id="carbarnd_'+i+'" name="brandname" value="'+carbrand[i].car_brand_name+'" rel="category-one"/> '+carbrand[i].car_brand_name+' </label></div>');
            }
            console.log("99999",success)
          }  
        }
    }
    ajaxCallFunction(keyobj);
    
    }

    //**  BRAND MODEL */

    function brandNamePush(brandname){
      var data={
        "car_brand_name" : brandname,
        "type" : 1
      }
      console.log(data);
      var keyobj = {
        'url':hostname+'/getCarArrayModelDetails',
        'type': 'POST',
        'ajaxData': JSON.stringify(data),
        'crossDomain': true,
        'dataType': 'json',
        'callback': function (success) 
        {
          var carmodel = [];
          var status = success.status;
          $('#carmodel_chk').empty();
          if(status == 'success') {
            carmodel = success.allUsers;
            for(var i=0; i < carmodel.length; i++){
              $('#carmodel_chk').append('<div class="checkbox"><label><input type="checkbox" id="carbarnd_'+i+'" name="car_model" value="'+carmodel[i].car_Model_name+'" rel="category-one"/> '+carmodel[i].car_Model_name+' </label></div>');
            }
          }
        }
    }
    ajaxCallFunction(keyobj);
    }

    //**  CAR VERSION   */
    function brandModelPush(car_model){
      var data={
        "car_Model_name" : car_model,
        "type" : 2
      }
      console.log(data);
      var keyobj = {
        'url':hostname+'/getCarArrayModelDetails',
        'type': 'POST',
        'ajaxData': JSON.stringify(data),
        'crossDomain': true,
        'dataType': 'json',
        'callback': function (success) 
        {
          var carversion = [];
          var status = success.status;
          $('#carversion_chk').empty();
          if(status == 'success') {
            carversion = success.allUsers;
            for(var i=0; i < carversion.length; i++){
              $('#carversion_chk').append('<div class="checkbox"><label><input type="checkbox" id="carbarnd_'+i+'" name="car_version" value="'+carversion[i].car_Version_name+'" rel="category-one"/> '+carversion[i].car_Version_name+' </label></div>');
            }
          }
        }
    }
    ajaxCallFunction(keyobj);
    }



 
function getCarDrivers()
{
  
    var userData = JSON.parse(localStorage.getItem('userData'));
    var location_details1 = localStorage.getItem('location_details');
    var location_details = JSON.parse(location_details1);

    if(location_details.hourly_based == 0){
      data={
        "user_id" : userData._id,
        "user_name" : userData.first_name +' '+ userData.last_name,
        "contact_no" : userData.contact_no,
        "pickup_location" : location_details.pickup_location,
        "pickup_date" : location_details.pickup_date,
        "pickup_time" : location_details.pickup_time,
        "drop_location" : location_details.drop_location,
        "drop_date" :  location_details.drop_date,
        "drop_time" : location_details.drop_time,
        "hours" : location_details.hours,
        "trip_type":"Single",
        "typeof_product":"3",
        "hourly_based" : "0",
      }
    }
    else if(location_details.hourly_based == 1){
      data = {
        "user_id" : userData._id,
        "user_name" : userData.first_name +' '+ userData.last_name,
        "contact_no" : userData.contact_no,
         "pickup_location" : location_details.pickup_location,
        //  "duration" : duration,
         "pickup_date" : location_details.pickup_date,
         "pickup_time" : location_details.pickup_time,
         "drop_time" : location_details.hrs_drop_time,
         "hours" : location_details.hours,
         "hourly_based" : "1",
         "typeof_product" : "3"
      }
    }
    var keyobj2 = {
      'url':hostname+'/userSearchCarandDriver',
      'type': 'POST',
      'ajaxData': JSON.stringify(data),
      'crossDomain': true,
      'dataType': 'json',
      'callback': function (success) 
      {
        var status = success.status;
        $('#car_list').empty();
        if(status == "success")
        {
            car_details = success.user; 
            console.log(car_details);
            var car_shows = document.getElementById('car_list');
            var res = [];
            for(var i = 0; i < car_details.length; i++)
            {           
              if(location_details.hourly_based == 0){ 
              var price = car_details[i].per_hrs * location_details.hours;
              }
              else{
                var price = car_details[i].per_hrs * location_details.hours;
              }
             
              $('#car_list').append('<div class="b-goods-f col-12 b-goods-f_row -expanded" style="margin-bottom:20px;"> <div> <div class="b-goods-f__media"> <img class="b-goods-f__img img-scale" style="height:150px;" src="'+s3Url+''+car_details[i].car_images[0]+'" alt="foto"> <span class="b-goods-f__media-inner" style="width:3em;"> <span class="b-goods-f__favorite"><i class="ic far fa-star"></i></span> </span> </div> <div class="b-goods-f__main"> <div class="b-goods-f__descrip"> <div class="b-goods-f__title" style="margin-bottom: 10px !important;padding-bottom:0px;display:inline-flex;"><span>'+car_details[i].car_brand+','+car_details[i].car_model+'</span><span><li style="margin-left: 8px;list-style: none;display: flex;"> <fieldset class="rating" id="view_rating'+i+'" style="font-size: 7px;"> </fieldset></li></span> </div> <div style="border-bottom: 1px solid #ddd;"> <ul class="b-goods-f__list list-unstyled"> <li class="b-goods-f__list-item feature_car" style="font-weight:none !important;"> <span class="b-goods-f__list-title">Version :</span> <span class="b-goods-f__list-info setCarListMargin">'+car_details[i].car_version+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Air Bags :</span> <span class="b-goods-f__list-info">'+car_details[i].car_airbags+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Color :</span> <span class="b-goods-f__list-info">'+car_details[i].car_color+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_body_type+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Fuel Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_fuel_type+'</span> </li> </ul> </div> <div class="col-sm-12"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li> </div> </ul> </div> </div> <div class="b-goods-f__sidebar"> <a class="b-goods-f__bnr" href="#"></a><span class="b-goods-f__price-group"><span class="b-goods-f__price"><span class="b-goods-f__price_col">&nbsp;</span> <span class="viewdeal_price">Rs.'+price+'.00</span></span> </span><span class="b-goods-f__compare viewdeal_btn" onclick="carView(\''+car_details[i]._id+'\',\''+car_details[i].branch_id+'\');">View Details</span> </div> </div> </div> <div class="row hidden_view" id="hidden_text'+i+'" style="margin-top: 1.2em;border-top: 1px solid #bababa;"> <div class="col-md-12"> <div class="row" style="margin-left:0px;margin-top: 0.5em"> <h7 class="h7">Inclusion<span>:</span></h7> </div> <div class="row" style="padding-top:0.5em;margin-bottom:1em;"> <div class="col-md-4">Driver Allowance</div> <div class="col-md-4">Toll Tax and State Tax: As applicable</div> <div class="col-md-4">Cancellation charges</div> </div> </div> </div> <div class="row" style="margin-top:1em;"> <button id="toggle" class="expand-button list_button" onclick="demo('+i+');">View More</button> </div> </div>');
              for(var  j = 0; j < car_details[i].rating; j++)
              {
                 $("#view_rating"+i).append('<input type="radio" id="star'+j+'" name="rating" value="1"/><label class = "full" for="star1" title="1 star"></label><input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="0.5 stars"></label>')
              }
            }

        }
        else
        {
          var car_shows = document.getElementById('car_list');
          car_shows.innerHTML +='<span>'+success.msg+'</span>';
        }  
        }
    }
    ajaxCallFunction(keyobj2);
  }

function hrsbasedsearch()
{
  document.getElementById('roundedcheck').checked = false;  
  document.getElementById('hrscheck').checked = true;
  var check=document.getElementById('hrscheck');
  if(check.checked == true)
  { 
    document.getElementById('roundedcheck').checked = false;
    document.getElementById("hrs_based").style.display = "inline-flex";
    document.getElementById('roundedtrip').style.display = "none";
  } else {
    document.getElementById("hrs_based").style.display = "none";
  }
}
function roundedtripsearch()
{
  document.getElementById('roundedcheck').checked = true;  
  document.getElementById('hrscheck').checked = false;
  var check1=document.getElementById('roundedcheck');
  if(check1.checked == true){
    document.getElementById('hrscheck').checked = false;
    document.getElementById('roundedtrip').style.display = "inline-flex";
    document.getElementById("hrs_based").style.display = "none";
  }
}

//  Load car details in json
function loadCarDetails()
{
  car_details = [];
  var userData = JSON.parse(localStorage.getItem('userData'));
  var location_details1 = localStorage.getItem('location_details');
  var location_details = JSON.parse(location_details1);

  if(location_details.hourly_based == 0){
    data={
      // "user_id" : userData._id,
      // "user_name" : userData.first_name +' '+ userData.last_name,
      // "contact_no" : userData.contact_no,
      "pickup_location" : location_details.pickup_location,
      "pickup_date" : location_details.pickup_date,
      "pickup_time" : location_details.pickup_time,
      "drop_location" : location_details.drop_location,
      "drop_date" :  location_details.drop_date,
      "drop_time" : location_details.drop_time,
      "hours" : location_details.hours,
      "typeof_product":"1",
      "hourly_based" : "0",
    }
  }
  else if(location_details.hourly_based == 1){
    data = {
      // "user_id" : userData._id,
      // "user_name" : userData.first_name +' '+ userData.last_name,
      // "contact_no" : userData.contact_no,
       "pickup_location" : location_details.pickup_location,
      //  "duration" : duration,
       "pickup_date" : location_details.pickup_date,
       "pickup_time" : location_details.pickup_time,
       "drop_time" : location_details.hrs_drop_time,
       "hours" : location_details.hours,
       "hourly_based" : "1",
       "typeof_product" : "1"
    }
  }
  var keyobj = {
    'url':hostname+'/UserSearchCars',
    'type': 'POST',
    'crossDomain': true,
    'ajaxData': JSON.stringify(data),
    'dataType': 'json',
    'callback': function (success) 
    {
        var status = success.status;
        $('#car_list').empty();
        if(status == "success")
        {
            car_details = success.user; 
            console.log(car_details);
            var car_shows = document.getElementById('car_list');
            var res = [];
            for(var i = 0; i < car_details.length; i++)
            {           
              if(location_details.hourly_based == 0){ 
              var price = car_details[i].per_hrs * location_details.hours;
              }
              else{
                var price = car_details[i].per_hrs * location_details.hours;
              }

              
                $('#car_list').append(' <div class="b-goods-f col-12 b-goods-f_row -expanded" style="margin-bottom:20px;"> <div> <div class="b-goods-f__media"> <img class="b-goods-f__img img-scale" style="height:150px;" src="'+s3Url+''+car_details[i].car_images[0]+'" alt="foto"> <span class="b-goods-f__media-inner" style="width:3em;"> <span class="b-goods-f__favorite"><i class="ic far fa-star"></i></span> </span> </div> <div class="b-goods-f__main"> <div class="b-goods-f__descrip"> <div class="b-goods-f__title" style="margin-bottom: 10px !important;padding-bottom:0px;display:inline-flex;"><span>'+car_details[i].car_brand+','+car_details[i].car_model+'</span><span><li style="margin-left: 8px;list-style: none;display: flex;"> <fieldset class="rating" id="view_rating'+i+'" style="font-size: 7px;"> </fieldset></li></span> </div> <div style="border-bottom: 1px solid #ddd;"> <ul class="b-goods-f__list list-unstyled"> <li class="b-goods-f__list-item feature_car" style="font-weight:none !important;"> <span class="b-goods-f__list-title">Version :</span> <span class="b-goods-f__list-info setCarListMargin">'+car_details[i].car_version+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Air Bags :</span> <span class="b-goods-f__list-info">'+car_details[i].car_airbags+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Color :</span> <span class="b-goods-f__list-info">'+car_details[i].car_color+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Body Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_body_type+'</span> </li> <li class="b-goods-f__list-item feature_car"> <span class="b-goods-f__list-title">Fuel Type :</span> <span class="b-goods-f__list-info">'+car_details[i].car_fuel_type+'</span> </li> </ul> </div> <div class="col-sm-12"> <ul class="list-unstyled list-inline details_icon"> <div class="row"> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/seat.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Adult passengers"> &nbsp;<span>5 Seats</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/freezer.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Air</span> </li> <li style="margin-right:13px"> <img src="./assets/media/content/car_details_icon/gear.svg" style="width:13px;display:inline-block" data-toggle="tooltip" title="" data-original-title="Doors"> &nbsp;<span>Automatic</span> </li> </div> </ul> </div> </div> <div class="b-goods-f__sidebar"> <a class="b-goods-f__bnr" href="#"></a><span class="b-goods-f__price-group"><span class="b-goods-f__price"><span class="b-goods-f__price_col">&nbsp;</span> <span class="viewdeal_price">Rs.'+price+'.00</span></span> </span><span class="b-goods-f__compare viewdeal_btn" onclick="carView(\''+car_details[i]._id+'\',\''+car_details[i].branch_id+'\');">View Details</span> </div> </div> </div> <div class="row hidden_view" id="hidden_text'+i+'" style="margin-top: 1.2em;border-top: 1px solid #bababa;"> <div class="col-md-12"> <div class="row" style="margin-left:0px;margin-top: 0.5em"> <h7 class="h7">Inclusion<span>:</span></h7> </div> <div class="row" style="padding-top:0.5em;margin-bottom:1em;"> <div class="col-md-4">Driver Allowance</div> <div class="col-md-4">Toll Tax and State Tax: As applicable</div> <div class="col-md-4">Cancellation charges</div> </div> </div> </div> <div class="row" style="margin-top:1em;"> <button id="toggle'+i+'" class="expand-button list_button" onclick="demo('+i+');">View More</button> </div> </div>');
            for(var  j = 0; j < car_details[i].rating; j++)
              {
                 $("#view_rating"+i).append('<input type="radio" id="star'+j+'" name="rating" value="1"/><label class = "full" for="star1" title="1 star"></label><input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="0.5 stars"></label>')
              }
            }

            // car_shows.innerHTML = res;
        }
        else
        {
          $('#car_list').append('<div class="b-goods-f col-12 b-goods-f_row b-goods-f_row_custom" style="margin-bottom:0px;"> <div class="b-goods-f__media"> <span>'+success.msg+'</span></div></div>');
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

function carView(id,branch_id)
{
  localStorage.setItem('product_id',id);
  localStorage.setItem('branch_id',branch_id);
  location.href ='/vehicle-details.html';
  }




    // $("#show").click(function(){filter
    //     var brandname = [];
    //     var car_model = [];
    //     var car_version = [];
    //     var color = [];
    //     var no_airbags = [];
    //     var body_type = [];
    //     var trans = [];
    //     var seat_capacity = [];
    //     var fuel = [];

    //     $.each($("#brandname option:selected"), function(){          

    //       brandname.push($(this).val());
    //     });
    //     $.each($("#car_model option:selected"), function(){            
    //     car_model.push($(this).val());
    //     });
    //     $.each($("#version option:selected"), function(){            
    //       car_version.push($(this).val());
    //     });
    //     $.each($("#color option:selected"), function(){            
    //       color.push($(this).val());
    //     });
    //     $.each($("#air_bags option:selected"), function(){            
    //       no_airbags.push($(this).val());
    //     });
    //     $.each($("#body_type option:selected"), function(){            
    //         body_type.push($(this).val());
    //     });
    //     $.each($("#trans_type option:selected"), function(){            
    //       trans.push($(this).val());
    //     });
    //     $.each($("#seat_capacity option:selected"), function(){            
    //       seat_capacity.push($(this).val());
    //     });
    //     $.each($("#fuel option:selected"), function(){            
    //       fuel.push($(this).val());
    //     });
    //     alert("BrandName:["+brandname+"],Car Model:["+car_model+"],Version:["+car_version+"],Color:["+color+"],No_of_Bags:["+no_airbags+"],Body Type:["+body_type+"],Transmission Type:["+trans+"],Seat Capacity:["+seat_capacity+"],Fuel Type:["+fuel+"]");
    //     var data = 
    // {
    //     // "cartype": cartype,
    //     // "color": color,
    //     // "transmission" : trans,
    //     // "fuel" : fuel,
    // };
    // var keyobj = {
    //     'url':hostname+'',
    //     'type': 'POST',
    //     'crossDomain': true,
    //     'ajaxData': data,
    //     'dataType': 'json',
    //     'callback': function (success) 
    //     {
    //         var status = success.status;
    //         var user_data=[];
    //         if(status == "success")
    //         {
    //             window.location = "#";

    //         }   
            
    //     }
    // }
    // ajaxCallFunction(keyobj);

    // });

        //  change location show's option
    function showLocationChange() {
      document.getElementById('change_loc_opt').style.display = "block";
       getlocation();
   }
  

    // RENTAL CAR TRIP CHOOSEN   //
       
  $('.rentalcar_trip').click(function() {
    $('.trip_style').removeClass('trip_style');
    $(this).addClass('trip_style').find('input').prop('checked', true)    
  });




  function getlocation()
  { 
    // var select = '';
    // var select1 = '';
    // var select2 = '';
    // document.getElementById("pick_select").value = '';
    // document.getElementById("drop_select").value = '';
    // document.getElementById("hrs_pick_select").value = '';
  
      var keyobj = {
        'url':hostname+'/getAllLocations',
        'type': 'POST',
        'crossDomain': true,
        'dataType': 'json',
        'callback': function (success) 
        {
          var status = success.status;
          var select = document.getElementById("ch_pick_select");
          var select1 = document.getElementById("drop_select");
          var select2 = document.getElementById("hrs_pick_select");
          if(status == "success")
          {
            // alert(status);
            var Location = success.Location;
             for(var i=0; i< Location.length; i++)
             {                
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
             }
             $('#ch_pick_select').selectize({
              onChange: function(value) {
                // alert($('#pick_select option:selected').text());
                  localStorage.setItem("pic_select",value);
                  alert(value);
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
          }   
          else
          {
            
              
          }  
      }
}

ajaxCallFunction(keyobj);
}





                 // Datepicker
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

  $('#datepicker3').datepicker({
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
  $('#datepicker4').datepicker({
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
                  var start_date = document.getElementById("datepicker3").value;
                  var date1 = new Date(start_date);
                  const currentDate = date1.setHours(0,0,0,0);
                  return date.setHours(0,0,0,0) >= currentDate ? true : false;
              }
  });
  $('#datepicker5').datepicker({
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
  $('#datepicker6').datepicker({
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
                  var start_date = document.getElementById("datepicker5").value;
                  var date1 = new Date(start_date);
                  const currentDate = date1.setHours(0,0,0,0);
                  return date.setHours(0,0,0,0) >= currentDate ? true : false;
              }
  });

});


    // =================RENTAL CARS=======
    $(document).on('change keyup', '.required', function(e){
      let Disabled = true;
       $(".required").each(function() {
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
           $('.toggle-disabled').prop("disabled", true);
         }else{
           $('.toggle-disabled').prop("disabled", false);
         }
    })
