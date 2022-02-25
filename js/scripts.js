/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/

var key = "";
var v1 = "Y29tdW5pY2FjaW9uZXNAZ2VveWFjaGFxLm9yZy5wZQ==";
var v2 = "Z2VveWFjaGFxLmNvbXVuaWNhY2lvbmVzQGdtYWlsLmNvbQ==";
(function ($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function () {
        var preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function () {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 500);
        }
        hidePreloader();
    });


    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
            $("#imgLogo").css("width", "128px");
            $("#imgLogo").css("height", "76px");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
            $("#imgLogo").css("width", "277px");
            $("#imgLogo").css("height", "165px");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            console.log($anchor)
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function (event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });


    /* Card Slider - Swiper */
    var cardSlider = new Swiper('.card-slider', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            }
        }
    });


    /* Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.filters-button-group').on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    /* Counter - CountTo */
    var a = 0;
    $(window).scroll(function () {
        if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    },
                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                                //alert('finished');
                            }
                        });
                });
                a = 1;
            }
        }
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function () {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
        var name = $("#lname").val();
        var phone = $("#lphone").val();
        var email = $("#lemail").val();
        var select = $("#lselect").val();
        var terms = $("#lterms").val();

        $.ajax({
            type: "POST",
            url: "php/callmeform-process.php",
            data: "name=" + name + "&phone=" + phone + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
    }

    function lformSuccess() {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Contact Form */
    /*$("#contactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            //cformError();
            //csubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            //csubmitForm();
        }
    });*/

    /*function csubmitForm() {
        // initiate variables with form content
        var name = $("#cname").val();
        var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
    }
*/
    /* function cformSuccess() {
         $("#contactForm")[0].reset();
         csubmitMSG(true, "Message Submitted!");
         $("input").removeClass('notEmpty'); // resets the field label after submission
         $("textarea").removeClass('notEmpty'); // resets the field label after submission
     }
 
     function cformError() {
         $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
             $(this).removeClass();
         });
     }
 
     function csubmitMSG(valid, msg) {
         if (valid) {
             var msgClasses = "h3 text-center tada animated";
         } else {
             var msgClasses = "h3 text-center";
         }
         $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
     }*/




    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

    function validateForm() {

    }

    $("#btnSendMessage").click(function (event) {

       if ($("#cname").val() == "") {
            var msgClasses = "h3 text-center";
            $("#cmsgSubmit").removeClass().addClass(msgClasses).text("Ingrese el nombre");
            setTimeout(function () {
                $("#cmsgSubmit").addClass("h3 text-center tada animated").text("");
            }, 3000);

        } else {
            if ($("#cemail").val() == "") {
                var msgClasses = "h3 text-center";
                $("#cmsgSubmit").removeClass().addClass(msgClasses).text("Ingrese el correo");
                setTimeout(function () {
                    $("#cmsgSubmit").addClass("h3 text-center tada animated").text("");
                }, 3000);
                

            } else {
                if ($("#cmessage").val() == "") {
                    var msgClasses = "h3 text-center";
                    $("#cmsgSubmit").removeClass().addClass(msgClasses).text("Ingrese el mensaje");
                    setTimeout(function () {
                        $("#cmsgSubmit").addClass("h3 text-center tada animated").text("");
                    }, 3000);

                } else {
                    var nombre = $("#cname").val();
                    var email = $("#cemail").val();
                    var mensaje = $("#cmessage").val();
                    $("#btnSendMessage").prop("disable", true);
                    event.preventDefault();
                    Email.send({
                        SecureToken : "89c667d1-447d-4003-94e8-d25227b3435b",
                        To : atob(CryptoJS.AES.decrypt(v1,key).toString(CryptoJS.enc.Utf8)),
                        From : atob(CryptoJS.AES.decrypt(v2,key).toString(CryptoJS.enc.Utf8)),
                        Subject : 'Mensaje - Página  Web',
                        Body : '<center><div style="width: 90%; margin: 20px;"><div style="height: 150px; width: 100%; background-color: #1d120c; margin-bottom: 30px;" > </div><div> <h1 style="color: #1ba77a; text-align: center;">GEOYACHAQ - CORREO</h1> <p style="text-align: center; font-size: 30px; margin-bottom: 5px;">'+nombre+'</p><p style="text-align: center; margin-top: 5px;">ha enviado un mensaje:</p><p style="text-align: center; font-size: 20px;">'+mensaje+'</p><p>Responde a: '+email+'</p><div style="height: 100px; width: 100%; background-color: #1d120c; margin-top: 30px;" > </div></div></div></center>'
                    }).then(
                        message => {
                            if (message == "OK") {
                                var msgClasses = "h3 text-center";
                                $("#cmsgSubmit").removeClass().addClass(msgClasses).text("Se envio el mensaje corectamente");
                                $("#cmsgSubmit").css("color", "#14bf98")
                                setTimeout(function () {
                                    $("#cmsgSubmit").addClass("h3 text-center tada animated").text("");
                                    $("#cname").val("");
                                    $("#cemail").val("");
                                    $("#cmessage").val("");
                                    $("#btnSendMessage").prop("disable", false);
                                }, 3000);
                            } else {
                                $("#btnSendMessage").prop("disable", false);
                            }
                        }
                    );
                }

            }
        }

    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    $(document).ready(function() {
        if (isMobile.any()) {
            $("#n_wsp").attr("href", "https://api.whatsapp.com/send?phone=51993096763&text=%C2%A1Hola!%20%F0%9F%A4%A9%F0%9F%92%9A%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20proyecto.")
        }
    });

    window.onload = function(){

        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < 8; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        } 

        key = result1;

        v1 = CryptoJS.AES.encrypt(v1,key);
        v2 = CryptoJS.AES.encrypt(v2,key);
    }


})(jQuery);