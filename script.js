var NUM = 0;
var PREV = '';
var PREV_ELEMENT = '';

$(document).ready(function() {
    Details();
    $(".element > div").click(function() {
        var next = $(this).parent().nextAll(".details-container:first");
        var width = $(this).parent().width();
        var position = $(this).parent().position();
        var screenWidth = $(window).width();
        
        if(typeof $(this).parent().attr('id') == 'undefined') {                       
            $('#active-element').removeAttr('id');
            $(this).parent().attr('id', 'active-element');           
            $(this).addClass('a');
            
            if($(next).is(":visible"))  {

            } else {
                $(PREV).slideUp(200, function() {
                    $('.details-container').each(function() {
                        if(!$(this).is(next)) {
                            $(this).hide();
                        }
                    });
                });
                $(next).slideToggle(200);
            }
            PREV = next;
        } else {
            $(this).parent().removeAttr('id');
            $(this).removeClass('a');
            $(next).slideUp(200);
            PREV_ELEMENT = '';
            PREV ='';
        }
        
        if(!$(this).is(PREV_ELEMENT)) {
            $(PREV_ELEMENT).removeClass('a');  
        }
        
        $('.arrow').remove();
        var pos = Math.ceil((Math.ceil(position.left) + width / 2 - 20) / screenWidth * 100);
        $(next).prepend("<div class='arrow' style='margin-left:" + pos +"%'></div>");
        PREV_ELEMENT = this;
    });
    
    $('#content').on('click', function (event) {
        if (!$(event.target).closest('.element > div').length) {
            if(!$(event.target).hasClass('details')) {
                $('.details-container').slideUp(200);
                $(PREV_ELEMENT).parent().removeAttr('id');
                $(PREV_ELEMENT).removeClass('a');  
                PREV_ELEMENT = '';
                PREV ='';
            }
        }
    });
});

$(window).resize(function() {
    Details();
});


function Details() {
    var width = $(document).width();
    var num = 0;
    
    if(width <= 750)
        num = 4;
    if(width > 750 && width <= 1000)
        num = 5;
    if(width > 1000 && width <= 1200)
        num = 6;
    if(width > 1200 && width <= 1400)
        num = 7;
    if(width > 1400 && width <= 1720)
        num = 8;
    if(width > 1720)
        num = 10;
    
    if(NUM !== num) {
        var last =  $(".element").length;
        $(".details-container").remove();
        $(".element").each(function(i) {
            if(i == last - 1) {
                $(this).after("<div class='details-container'><div class='details'></div></div>");
                return;
            }
            if(i % num == num - 1) {
                $(this).after("<div class='details-container'><div class='details'></div></div>");
            }
        });
        
        if(PREV_ELEMENT !== '') {
            var next = $(PREV_ELEMENT).parent().nextAll(".details-container:first");
            $(next).show();
            
            var position = $(PREV_ELEMENT).parent().position();
            var widthItem = $(PREV_ELEMENT).parent().width();
            var screenWidth = $(window).width();
            
            var pos = Math.ceil((Math.ceil(position.left) + widthItem / 2 - 20) / screenWidth * 100);
            $(next).prepend("<div class='arrow' style='margin-left:" + pos +"%'></div>");
        }
        
        NUM = num;
    }
}