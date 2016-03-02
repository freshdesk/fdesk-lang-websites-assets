function fixedBoxSize() {
    var boxHeight = $('.resourcesBox').width();
    $('.resourcesBox').css('height', boxHeight);
    //var imgHeight = $('.resource_image').height(); 
    //var conHeight = boxHeight - imgHeight;
    //$('.resource_content').css('height',conHeight);
}

function popupMiddleScreen() {
    var popupHeight = $('.popup').height();
}

function frmValidation() {
    $('.formField').removeClass('fieldError').children('span').remove();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var company = $('#company').val();
    //var pdfUrl = $('input[type=submit]').attr('data-pdf');

    if (firstname == "") {
        $('#firstname').parent().append('<span>First name is required</span>').addClass('fieldError');
        //return false;
    }
    if (lastname == "") {
        $('#lastname').parent().append('<span>Last name is required</span>').addClass('fieldError');
        //return false;
    }
    if (phone == "") {
        $('#phone').parent().append('<span>Phone number is required</span>').addClass('fieldError');
        //return false;
    }
    if (phone != "") {
        if (isNaN(phone) || phone.indexOf(" ") != -1) {
            $('#phone').parent().append('<span>Please enter a valid phone number</span>').addClass('fieldError');
            //return false; 
        }
    }
    if (email == "") {
        $('#email').parent().append('<span>Email is required</span>').addClass('fieldError');
        //return false;
    }
    if (email != "") {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            $('#email').parent().append('<span>Please enter a vaild email</span>').addClass('fieldError');
            //return false;
        }
    }
    if (company == "") {
        $('#company').parent().append('<span>Please tell us where you work</span>').addClass('fieldError');
        //return false;
    }

    var errorCount = 0;
    $('.formField').each(function () {
        if ($(this).find("span").length) {
            errorCount += 1;
        };
    });

    if (errorCount == 0) {

        $('.success').css('display', 'block');
        $('.formField').children('input').val('');
        var timer = setInterval(function () {
            $(".success span").each(function () {
                var newValue = parseInt($(this).text(), 10) - 1;
                $(this).text(newValue);
                if (newValue == 0) {
                    clearInterval(timer);
                    //window.location.href = pdfUrl;
                    $('.success').hide();
                    $(this).text('5');
                }
            });
        }, 1000); 
        //return false;
        setTimeout(function(){ $("#downloadform").submit(); }, 5000);
    }
}

$(function () {

    var windowSize = window.screen.width;
    $('.formField:first-child input').focus().parent().addClass('fieldActive');
    fixedBoxSize();
    $(window).resize(function () {
        fixedBoxSize()
    });

    $('.formField input').focus(function () {
        $('.formField').removeClass('fieldActive, fieldError');
        $(this).parent().addClass('fieldActive');
    });

    $('.formField input').blur(function () {
        $('.formField').removeClass('fieldActive');
    });

    // Popup Video

    $('#videos .resourcesBox a, #presentations .resourcesBox a').click(function (e) {
        $('.popupBg, .popup').show();
        var videoUrl = $(this).attr('data-url');
        var thisTitle = $(this).children('.resource_content').text();
        $('.popupHd h3').text(thisTitle);
        $('.popup iframe').attr('src', videoUrl);
        $('body').addClass('stopScroll');
        e.preventDefault();
    });

    $('.popupClose, .popupBg').click(function (e) {
        $('.popupBg, .popup').hide();
        $('.popup iframe').attr('src', '');
        $('body').removeClass('stopScroll');
        e.preventDefault();
    });

    // Scroll function

    var lastId,
        topMenu = $(".leftNav"),

        topMenuHeight = 64,

        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    var mobileTop;

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        if (windowSize < 768) {

            $('.mobileNav span').click();
            if (($('.mobileNav').offset() || {
                    "top": NaN
                }).top < 191) {
                mobileTop = topMenuHeight + 190;

            } else {
                mobileTop = topMenuHeight + 1;
            }
        } else {
            mobileTop = topMenuHeight + 8;
        }

        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - mobileTop;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();

    });

    // Bind to scroll
    $(window).scroll(function () {

        if ($('#newResources').length) {

            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight + 84;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if (($(this).offset() || {
                        "top": NaN
                    }).top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href=#" + id + "]").parent().addClass("active");
            }

            if (!$('.leftNav').children().hasClass('active')) {
                $('.leftNav li:first-child').addClass('active')
            }
        }
    });

    $('.mobileNav span').click(function () {
        $('.leftNav').slideToggle();
    });

    $(window).scroll(function () {
        if ($('#newResources').length) {
            var addTop = 0;
            var window_top = $(document).scrollTop();
            if (windowSize < 768) {
                addTop = 2;
            } else {
                addTop = 72;
            }

            var div_top = ($('.leftCol').offset() || {
                "top": NaN
            }).top - addTop;
            if (window_top >= div_top) {
                $('.navContainer').addClass('stickyNav');
                $('#whitepapers').addClass('fixSpace');
            } else {
                $('.navContainer').removeClass('stickyNav');
                $('#whitepapers').removeClass('fixSpace');
            }

            $('.leftNav li').each(function () {
                if ($(this).hasClass('active')) {
                    var txt = $(this).text();
                    $('.navContainer').children('span').text(txt);
                }
            });
        };
    });


    $(document).keyup(function (e) {
        if ($('.popup').css('display') == "block") {
            if (e.keyCode == 27) $('.popupClose').click(); // esc
        };
    });

});
