$(document).ready(function(){
    var offset = $(".navbar").offset().top;
    var padding_top_body = $(".sph-top-body-container").css('padding-top');
    var navbar_height = $(".navbar").height();
    $(document).scroll(function(){
        var scrollTop = $(document).scrollTop();
        console.log(scrollTop);
        if(scrollTop > offset){
            $(".navbar").css("position", "fixed");
            $(".navbar").css("animation","smoothScroll 1s forwards");
            $(".navbar").css("-webkit-transform","translate3d(0, 0, 0)");
            $(".navbar").css("z-index", "9");
            $(".navbar").css("width", "100%");
            $(".sph-top-body-container").css("top", offset+navbar_height);
            $(".sph-top-body-container").css("animation","smoothScroll 1s forwards");
        }
        else {
            $(".navbar").css("position", "static");
        }
        
    });
});