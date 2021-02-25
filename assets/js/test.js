//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".login_open").on("click", function(){
    $(".popup-overlay, .popup-content").addClass("active");
  });
  
  //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
  $(".login_close").on("click", function(){
    $(".popup-overlay, .popup-content").removeClass("active");
  });
  

  $(document).ready(function() {
    Swal.fire({
      type: 'error',
      title: '',
      text: 'Something went wrong!',
    })
  });
  