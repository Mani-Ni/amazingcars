  
function ajaxCallFunction(keyobj) {
	var ajaxType = keyobj.type;
    var ajaxData = keyobj.ajaxData;
    //ajaxData['jwtToken'] = document.cookie.replace("jwttoken=","")
	try {
		return $.ajax({
			type: ajaxType,
            url: keyobj.url,
			data: ajaxData,
            contentType: "application/json",
			success: function(response){
				try
				{
					keyobj.callback(response,keyobj);
				} catch (e){
					console.log(e);
				}
			},
			error: function(error){
				console.log("failure---> error from ajax" + error);
				var res =JSON.stringify({ status: 0,message :"error from ajax"});
				keyobj.callback(res);
			},
            complete: function(data) {
                         
             if(sessionStorage.getItem('sessionid') != null ){
                stop(); 
                intiTimeout(1200000);
                      
            }
            }
		});
	} catch (e) {
		console.log(e)
	}
}

var myTimeOut;
function intiTimeout(t){

    myTimeOut = setInterval(function (){ 
        swal({
            title: "Your Session has been expired",
            text: "",
             type: "warning",
             showCancelButton: false,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "Ok",
             //cancelButtonText: "No, cancel plx!",
             closeOnConfirm: false,
             closeOnCancel: false
             },
     function(isConfirm){
         if(isConfirm){
             stop(); 
             logout();
             swal.close();
              
          } 
     },

     ); }, t);
}

function stop() { 
    clearInterval(myTimeOut); 
} 

function ajaxCallFunction1(keyobj) {
    var ajaxType = keyobj.type;
    var ajaxData = keyobj.ajaxData;
    try {
        return $.ajax({
            type: ajaxType,
            url: keyobj.url,
            data: ajaxData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {

            },
            success: function(response){
                try
                {
                    keyobj.callback(response,keyobj);
                } catch (e){
                    console.log(e);
                }
            },
            error: function(error){
                console.log("failure---> error from ajax" + error);
                var res =JSON.stringify({ status: 0,message :"error from ajax"});
                keyobj.callback(res);
            }
        });
    } catch (e) {
        console.log(e)
    }
}
function ajaxCallFunction2(keyobj) {
    var ajaxType = keyobj.type;
    var ajaxData = keyobj.ajaxData;
    try {
        return $.ajax({
            type: ajaxType,
            url: keyobj.url,
            data: ajaxData,
           // xhrFields: { withCredentials: true },
            cache: false,
            dataType: keyobj.dataType,
            beforeSend: function() {

            },
            success: function(response){
                try
                {
                    keyobj.callback(response,keyobj);
                } catch (e){
                    console.log(e);
                }
            },
            error: function(error){
                console.log("failure---> error from ajax" + error);
                var res =JSON.stringify({ status: 0,message :"error from ajax"});
                keyobj.callback(res);
            }
        });
    } catch (e) {
        console.log(e)
    }
}
// set the URL to local storage 
var hostname = '';
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
var s3Url = '';
    if(localStorage.getItem('s3url')=== undefined || localStorage.getItem('s3url')=== null) {
        s3Url = '';
    } else {
        s3Url = localStorage.getItem('s3url');
    }
// Validate functions 

function selectboxValidation(user_type) {
	if (user_type == 0) {
		return 0;
	}
}

function emailValidation(email) {
    //var mailformat =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var mailformat =/\b[a-zA-Z0-9\u00C0-\u017F._%+-]+@[a-zA-Z0-9\u00C0-\u017F.-]+\.[a-zA-Z]{2,}\b/;
    //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
	if (email == '') {
		return 0;
	} else {
		if(email.match(mailformat)){
			return 1;
		}
		else{
			return -1;
		}
	}
	
}
function passwordValidation(password) {
	if (password == '') {
		return 0;
	} else {
		if (password.length < 8 || password.length > 15) {
			return 1;
		} else {
			return -1;
		}
	}
}

function onlyalphabetValidation(e) {

	var regex = new RegExp("^[a-zA-Z \b]+$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);   
    var keystobepassedout="ArrowLeftArrowRightDeleteBackspaceTab";
    if(keystobepassedout.indexOf(e.key)!=-1)
    {
      return true;
    }
    if (!regex.test(key)) {
    	e.preventDefault();
        return false;
    }
}
 
function addressValidation(e) {

    var regex = new RegExp("^[a-zA-Z0-9\s\,\''\-\/ ]*$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);   
    var keystobepassedout="ArrowLeftArrowRightDeleteBackspaceTab";
    if(keystobepassedout.indexOf(e.key)!=-1)
    {
      return true;
    }
    if (!regex.test(key)) {
        e.preventDefault();
        return false;
    }
}
function onlyalphaNumaricValidation(e) {

	var regex = new RegExp("^[a-zA-Z0-9 \b]+$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);   
    var keystobepassedout="ArrowLeftArrowRightDeleteBackspaceTab";
    if(keystobepassedout.indexOf(e.key)!=-1)
    {
      return true;
    }
    if (!regex.test(key)) {
    	e.preventDefault();
        return false;
    }
}
function websiteValidation(website) {

    var websiteformat =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	if (website == '') {
		return 0;
	} else {
		if(website.match(websiteformat)){
			return 1;
		}
		else{
			return -1;
		}
	}

	// var regex = new RegExp("/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi");
    // var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);   
    // var keystobepassedout="ArrowLeftArrowRightDeleteBackspaceTab";
    // if(keystobepassedout.indexOf(e.key)!=-1)
    // {
    //   return true;
    // }
    // if (!regex.test(key)) {
    // 	e.preventDefault();
    //     return false;
    // }
}
function onlynumberValidation(evt) {

         var charCode = (evt.which) ? evt.which : event.keyCode;

         if (charCode > 31 && (charCode < 48 || charCode > 57)){
         	return false;
         }
            

         return true;
}
function checkboxValidation(checkbox) {
	if (checkbox == false) {
		return 0;
	} else {
		return 1;
	}
}

function adminNotification(){
	   

}


$("document").ready(function(){
    
	// if(sessionStorage.getItem("sessionid") == 'null' || sessionStorage.getItem("sessionid") == ''){
	// 	window.location.replace("../../index.html");
		
    // }
    
   // $("#topnav").load("header1.html");
    
    //$("#footer").load("../footer.html");
    // if(localStorage.getItem('page') != "tracking"){
    //     clearTimeout(interval);
    // }
    // var keyobj1 = 
    // {
    //     'url':'../../config/config.json',
    //     'type': 'GET',
    //     'crossDomain': true,
    //     'ajaxData': '',
    //     'dataType': 'json',
    //     'callback': function (success) 
    //         {
    //             hosturl = success.s3url;               
    //             localStorage.setItem("s3url", hosturl);
    //         }
    // }
    // ajaxCallFunction(keyobj1);
   var type= sessionStorage.getItem("sessiontype");
   getNotification(type);
   if(type == "0" || type == "1" || type == "2" || type == "3"){
    //console.log(localStorage.getItem('page'))
    if(localStorage.getItem('page') != "dashboard" && localStorage.getItem('page') != "reports" && localStorage.getItem('page') != "tracking" && localStorage.getItem('page') != "payments"){
        $('.table').DataTable({
            "aaSorting": [],
            "deferRender": true,
            
        });

             $.fn.dataTable.ext.errMode = 'none';
      
    }
 

   }


   //  $('.table').on( 'error.dt', function ( e, settings, techNote, message ) {
   // // console.log( 'An error has been reported by DataTables: ', message );
   //  } ) ;
    
   
}); 


    


function getNotification(type){
    //console.log("hiii"+type);
    switch(parseInt(type)){
        case 0:
        var keyobj = {
            'url':hostname+'/adminNotification',
            'type': 'get',
            'ajaxData': '',
            'dataType': 'json',
            'callback': function (success) {
                var status = success.status;
                if(status == 'success')
                {
                    var data =success.data;
                    var company_name = [];
                    var first_name = [];
                    var last_name = [];
                    var user_id = [];
                    var i;
                    var length;
                    var totalnotification = data.notifications.length;
                    if ( totalnotification <= 3 ) {
                        length = totalnotification;
                    } else {
                        length = 3;
                    }
                    $("#notificationcount").html(totalnotification);
                     $("#notification").empty();
                    for ( i=0; i< totalnotification; i++ ) {
                        user_id[i] = data.notifications[i].user_id;
                        company_name[i] = data.notifications[i].company_name;
                        first_name[i] = data.notifications[i].first_name;
                        last_name[i] = data.notifications[i].last_name;
                        $("#notification").append('<a href="#" class="user-list-item" onclick="setTempUserId('+user_id[i]+');"><div  id="'+user_id[i]+'"class="icon bg-info"><i class="mdi mdi-account"></i></div><div class="user-desc"><span class="name">'+first_name[i]+' '+last_name[i]+'</span><span class="time">'+company_name[i]+'</span></div></a>');
                        // $("#notificationinfo").append('<div class="inbox-item"><div class="inbox-item-img"><img src="../assets/media/users/user1.png" class="img-circle" alt=""></div><p class="inbox-item-author">'+first_name[i]+last_name[i]+'</p><p class="inbox-item-text">'+company_name[i]+'</p></div>');
                    }
    
                }
                else{
                     $("#notification").empty();
                    swal(success.message);
                }
            }
        }
        ajaxCallFunction(keyobj);
        break;
        default:
        if(type == "1" || type == "2" || type == "3"){
        var keyobj = {
            'url':hostname+'/getNotification',
            'type': 'post',
            'ajaxData': {"notify_user_id":user_id},
            'dataType': 'json',
            'callback': function (success) {
                var status = success.status;
                if(status == 'success')
                {
                    var data =success.data;
                    var message = [];
                    var date = [];
                
                    var page_id = [];
                    var page_ref_id = [];
                    var i;
                    var length;
                    var totalnotification = data.length;
                    $("#notification").empty();
                    $("#notificationcount").html(totalnotification);
                    for ( i=0; i< totalnotification; i++ ) {
                        page_id[i] = data[i].notification_id;
                        message[i] = data[i].message;
                        page_ref_id[i] = data[i].page_id;
                        date[i] = moment(data[i].created_at).format('DD-MM-YYYY');
                        $("#notification").append('<a href="#" class="user-list-item" onclick="viewNotification(\''+page_id[i]+'\','+'\''+message[i]+'\','+'\''+page_ref_id[i]+'\');"><div  id="'+page_id[i]+'"class="icon bg-info"><i class="mdi mdi-account"></i></div><div class="user-desc"><span class="name">'+message[i]+'</span><span class="time">'+date[i]+'</span></div></a>');
                        // $("#notificationinfo").append('<div class="inbox-item"><div class="inbox-item-img"><img src="../assets/media/users/user1.png" class="img-circle" alt=""></div><p class="inbox-item-author">'+first_name[i]+last_name[i]+'</p><p class="inbox-item-text">'+company_name[i]+'</p></div>');
                    }
    
                }
                else{
                     $("#notification").empty();
                    $("#notificationcount").html(0);
                    // swal(success.message);
                }
            }
        }
        ajaxCallFunction(keyobj);
        (function poll() {
        interval =setTimeout(function() {
            $.ajax({
              url: hostname+'/getNotification',
              headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
              },
              type: "POST",
              data:  {"notify_user_id":user_id},
              success: function(success) {

                  if(success.status == 'success')
                {
                    var data =success.data;
                    var message = [];
                    var date = [];
                
                    var page_id = [];
                    var page_ref_id = [];
                    var i;
                    var length;
                    var totalnotification = data.length;
                    $("#notification").empty();
                    $("#notificationcount").html(totalnotification);
                    for ( i=0; i< totalnotification; i++ ) {
                        page_id[i] = data[i].notification_id;
                        message[i] = data[i].message;
                        page_ref_id[i] = data[i].page_id;
                        date[i] = moment(data[i].created_at).format('DD-MM-YYYY');
                        $("#notification").append('<a href="#" class="user-list-item" onclick="viewNotification(\''+page_id[i]+'\','+'\''+message[i]+'\','+'\''+page_ref_id[i]+'\');"><div  id="'+page_id[i]+'"class="icon bg-info"><i class="mdi mdi-account"></i></div><div class="user-desc"><span class="name">'+message[i]+'</span><span class="time">'+date[i]+'</span></div></a>');
                        // $("#notificationinfo").append('<div class="inbox-item"><div class="inbox-item-img"><img src="../assets/media/users/user1.png" class="img-circle" alt=""></div><p class="inbox-item-author">'+first_name[i]+last_name[i]+'</p><p class="inbox-item-text">'+company_name[i]+'</p></div>');
                    }
    
                }
                else{
                     $("#notification").empty();
                    $("#notificationcount").html(0);
                    // swal(success.message);
                }

              },
              dataType: "json",
              complete: poll,
              timeout: 2000
            })
        }, 30000);
    })();
    }
       
    }
}

function viewNotification(id,message,page_ref_id){
    var keyobj = {
        'url':hostname+'/notificationStatusChange',
        'type': 'post',
        'ajaxData': {"notification_id":id},
        'dataType': 'json',
        'callback': function (success) {
            var status = success.status;
            if(status == 'success')
            {
                swal({
                    title: "Notification",
                    text: message,
                    //type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok",
                    //cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {

                        // sessionStorage.removeItem('panel');
                        // sessionStorage.removeItem('tag');

                        var type= sessionStorage.getItem("sessiontype");
                        swal.close();

                if(sessionStorage.getItem("sessiontype") == '1'){

                        if(page_ref_id == 'TRANSACPT')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_openbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'SENDAWACK')   {

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_awardbids');
                         sessionStorage.setItem("tag",'awarded');

                    } else if(page_ref_id == 'SENDDRIVER'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_pogenbids');
                         sessionStorage.setItem("tag",'pogenerated');

                    } else if(page_ref_id == 'SENDQUOTE')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_openbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'TRUCKACRJINV'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_invoicebids');
                         sessionStorage.setItem("tag",'invoice');

                    }  else if(page_ref_id == 'TRANSRJT'){

                        $('#divContainer').load("bookingsnew.html");
                        sessionStorage.setItem("panel",'tab_openbids');
                        sessionStorage.setItem("tag",'openbids');

                   } 

                    else if(page_ref_id == 'RENTACPT')
                    {
                         $('#divContainer').load("rentbookings.html");
                         sessionStorage.setItem("panel",'tab_openbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'RENTSENDAWACK')   {

                         $('#divContainer').load("rentbookings.html");
                         sessionStorage.setItem("panel",'tab_awardbids');
                         sessionStorage.setItem("tag",'awarded');

                    } else if(page_ref_id == 'RENTSENDDRIVER'){

                         $('#divContainer').load("rentbookings.html");
                         sessionStorage.setItem("panel",'tab_pogenbids');
                         sessionStorage.setItem("tag",'pogenerated');

                    } else if(page_ref_id == 'RENTSENDQUOTE')
                    {
                         $('#divContainer').load("rentbookings.html");
                         sessionStorage.setItem("panel",'tab_openbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'TRUCKRENTACRJINV'){

                         $('#divContainer').load("rentbookings.html");
                         sessionStorage.setItem("panel",'tab_invoicebids');
                         sessionStorage.setItem("tag",'invoice');

                    }  else if(page_ref_id == 'RENTRJT'){

                        $('#divContainer').load("rentbookings.html");
                        sessionStorage.setItem("panel",'tab_openbids');
                        sessionStorage.setItem("tag",'openbids');

                   } 
            } else if(sessionStorage.getItem("sessiontype") == '2'){

                  if(page_ref_id == 'TRANSNEW')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_newbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'AW')   {

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_awardack');
                         sessionStorage.setItem("tag",'inprogress');

                    } else if(page_ref_id == 'PO'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_po');
                         sessionStorage.setItem("tag",'pogenerated');

                    } else if(page_ref_id == 'DO')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_do');
                         sessionStorage.setItem("tag",'dogenerated');

                    } else if(page_ref_id == 'ACRJINV'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_invoice');
                         sessionStorage.setItem("tag",'invoice');

                    }
            } else if(sessionStorage.getItem("sessiontype") == '3'){

                        if(page_ref_id == 'RENTNEW')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_newbids');
                         sessionStorage.setItem("tag",'openbids');

                    } else if(page_ref_id == 'RENTAW')   {

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_ack');
                         sessionStorage.setItem("tag",'inprogress');

                    } else if(page_ref_id == 'RENTPO'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_po');
                         sessionStorage.setItem("tag",'pogenerated');

                    } else if(page_ref_id == 'RENTDO')
                    {
                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_do');
                         sessionStorage.setItem("tag",'dogenerated');

                    } else if(page_ref_id == 'RENTACRJINV'){

                         $('#divContainer').load("bookingsnew.html");
                         sessionStorage.setItem("panel",'tab_invoice');
                         sessionStorage.setItem("tag",'invoice');

                    }
                }
                        
                        
                        
                    //swal("Deleted!", "Your imaginary file has been deleted.", "success");

                    } 
                });
                //swal("Notification", message);
            }

            else{
                
            }
        }
    }
    ajaxCallFunction(keyobj);
}

function setTempUserId(user_id){

    localStorage.setItem("tmp_user_id", user_id);
    loadPage('document_verify');
    //window.location.replace("document_verify.html");
}

// This Function is used to Translate purpose
function googleTranslateElementInit() 
{
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'ar', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true, autoDisplay: false }, 'google_translate_element');
    $('.goog-te-menu-value').on('DOMSubtreeModified', 'span', function()
    {
        language = $(".goog-te-menu-value span").html();
        if (language == "Arabic")
        {
            $('body').css('direction', 'rtl');
            $('#chartContainer').css('direction', 'ltr');
            $('p').css('direction', 'ltr');
            $('div').css('direction', 'ltr');
        }
        else 
        {
            $('body').css('direction', 'ltr');
        };
    });
};

$(document).keypress(function(e) { 
    if (e.keyCode == 27) { 
        //$("#popdiv").fadeOut(500);
        //or
        window.close();
    } 


});

$(".toggle-password").hover(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
}); 
 // if(window.google){
 //        //initMap();
 //        } else{
 //            $.ajax('https://maps.googleapis.com/maps/api/js?key=AIzaSyBa6mNrfx2rsr-S_7b5Asji6DW4E1aJVd8&signed_in=false&callback=initMap', {
 //            crossDomain: true,
 //            dataType: 'script'
 //            });
 //        }
//Pick the Address From The Map





