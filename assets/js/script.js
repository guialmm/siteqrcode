jQuery(function () {
    jQuery(window).scroll(function () {
       if (jQuery(this).scrollTop() > 200) {
          $("#menu").addClass("mudar");
          $("#icon").addClass("n");
          $("ul li a").addClass("preto")
          $("#menu").addClass("bgDiferente");    
      } else {
       $("#menu").removeClass("mudar");
       $("#icon").removeClass("navbar-toggler-icon2");
       $("ul li a").removeClass("preto");
       $("#menu").removeClass("bgDiferente");
                                  //$(".escondeMenu").show();
                                  //$(".mostraCollapse").hide();
                              }
                          });
   });
   
   $(".nav-link").on("click", function(){
    $('.navbar-collapse').collapse('hide');
   });
