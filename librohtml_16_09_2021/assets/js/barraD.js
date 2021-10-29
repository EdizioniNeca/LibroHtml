$(document).ready(function() {

    addEvent(window, "load", dynamicLayout);
    addEvent(window, "resize", dynamicLayout);
    $(".indice").click(function() {
        $("#genera").addClass("indice-open");
    });


    $('.search_box').keyup(function() { // Al cambiamento tramite digitazione
        console.log($('.searchin ').val());
        if ($('.searchin').val() == "") {
            //alert("vuoto");
            $(".lente").css("visibility", "visible");
            $(".ics").css("visibility", "hidden");
        } else {
            //  alert("pieno");
            $(".lente").css("visibility", "hidden");
            $(".ics").css("visibility", "visible");
        }
    });

    $(".ics").click(function() {
        $('.searchin').val("");
        $('.searchin').focus();
        $(".lente").css("visibility", "visible");
        $(".ics").css("visibility", "hidden");

    });
    //CHANGE

    /* var $barra = $('.noBackground');
     var inizio = window.innerWidth;

     var dim_barra = $('.noBackground').width;

     console.log("INIZIO", inizio);
     console.log("dim_barra", dim_barra);

     $(window).resize(function() {
           fine = window.innerWidth;
           var diff = fine - 1200;
           var x;
           if (fine >= 1200 && fine <= 1520) {
               console.log("diff", diff);
               $barra.css("left", diff);
           }

           console.log("INIZIO", inizio);
           console.log("fine", fine);
       });*/
});

$(window).load(function() {

    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        console.log("mobile impost");
        mobile_imp();
    } else {
        console.log("desktop impost")
        desktop_imp();
    }

});


function desktop_imp() {
    var isScrolling;
    var $barra = $('.noBackground');

    $(".close_book").css("display", "none");
    $(".close_bar").css("display", "block");
    /* $(window).scroll(function() {

         //  alert("scroll");
         $('.noBackground').fadeIn();
     });*/
    if (self.frameElement != undefined) {

        var close_book_ext = self.frameElement.parentNode.parentElement.children[4];
        var close_book_2 = self.frameElement.parentNode.parentElement.children[3];
        var close_book;
        console.log("close_book_2", close_book_2);
        console.log("close_book_ext", close_book_ext);
        if ($(close_book_ext).attr("id") == "button_book") {
            close_book = close_book_ext;
        }
        if ($(close_book_2).attr("id") == "button_book_menu") {
            close_book = close_book_2;
        }


    }

    $(".close_bar").click(function() {
        console.log("cerca:", cerca);
        if (cerca != undefined) {
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato);
            $barra.fadeOut();
        } else {
            $barra.fadeOut();
            $barra.removeClass("open");
        }

    });

    $(".ics").click(function() {
        if (cerca != undefined) {
            var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
            location.href = url;
        }
    });
    window.onmousedown = function(e) {
        if (e.button == 2) {
            if ($("#genera").hasClass("SIDMode") == false) {
                if ($barra.hasClass("open") == false) {
                    $barra.addClass("open");
                    $barra.fadeIn();
                    $(close_book).fadeOut();
                    // $(close_book_2).fadeOut();
                } else {
                    $barra.removeClass("open");
                    $barra.fadeOut();
                    $(close_book).fadeIn();
                }
            } else {
                $(close_book).css("display", "none");
            }

        }
    }


    // Listen for scroll events
    $('.noBackground').mouseenter(function() {
        console.log("mouse in");
        clearTimeout(isScrolling); //cancel the previous timer.
        isScrolling = null;

    });
    $('.noBackground').children().mouseenter(function() {
        console.log("mouse in 2");
        clearTimeout(isScrolling); //cancel the previous timer.
        isScrolling = null;

    });
    $('.noBackground').mouseleave(function() {
        console.log("mouse out");
        isScrolling = setTimeout(function() {
            // Run the callback
            //  alert('Scrolling has stopped.');
            $('.noBackground').bind();
            $('.noBackground').fadeOut();
            $(close_book).fadeIn();
            $barra.removeClass("open");
        }, 2500);
    });


}


function mobile_imp() {
    var isScrolling;
    $(".close_book").css("display", "block");
    $(".close_bar").css("display", "none");

    var myElem = $("#genera")[0];
    var mc = new Hammer(myElem, {
        touchAction: "auto"
    });
    // create a simple instance
    // by default, it only adds horizontal recognizers
    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    mc.get("pan").set({
        direction: Hammer.DIRECTION_VERTICAL,
        treshold: 10
    });
    mc.on("panup pandown", function(ev) {
        console.log(ev.type);
        if (ev.type == "panup") {
            $('.noBackground').css("top", "1%");
            $('.fumetto').addClass("sotto");
            $('.sotto').removeClass("fumetto");
            //$('.fumetto').toggleClass().css("border-width", "0px 15px 15px");
            $('.noBackground').fadeIn();

        }
        if (ev.type == "pandown") {
            if (window.innerHeight > window.innerWidth) {
                //portrait}
                console.log("portrait");
                if (window.innerHeight <= 735) {
                    $('.noBackground').css("top", "87%");
                } else if (window.innerHeight <= 834) {
                    $('.noBackground').css("top", "93%");
                } else if (window.innerHeight <= 1024) {
                    $('.noBackground').css("top", "93%");
                }
                /*else {
                                   $('.noBackground').css("top", "85%");
                               }*/
            } else {
                //landscape
                console.log("landscape");
                $('.noBackground').css("top", "80%");
            }
            //  $('.noBackground').css("top", "87%");
            $('.noBackground').fadeIn();
            $('.sotto').addClass("fumetto");
            $('.fumetto').removeClass("sotto");
        }
    });

    $('.noBackground').click(function() {
        console.log("click in");
        clearTimeout(isScrolling); //cancel the previous timer.
        isScrolling = null;

    });
    $('.noBackground').children().click(function() {
        console.log("click in 2");
        clearTimeout(isScrolling); //cancel the previous timer.
        isScrolling = null;
    });

    $('#genera').click(function() {
        isScrolling = setTimeout(function() {
            $('.noBackground').bind();
            $('.noBackground').fadeOut();
        }, 2500);
    });

    $("#search-in").focusin(function() {
        clearTimeout(isScrolling); //cancel the previous timer.
        isScrolling = null;
    });


    $(window).scroll(function() {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            $('.noBackground').bind();
            $('.noBackground').fadeOut();
        }, 2500);
    });
}

function dynamicLayout() {
    console.log("width", window.innerWidth);
    console.log("height", window.innerHeight);
    var _originalSize = $(window).width() + $(window).height();
    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        console.log("SMARTPHONE o APPLE");
        $(".btn_switch_src").click(function() {
            $(".search_bar").css("display", "block");
            $(".bar1").css("display", "none");
            $(".close_book").css("display", "none");

        });

        $(".switch").click(function() {
            if (cerca != undefined) {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                location.href = url;
            } else {
                $(".search_bar").css("display", "none");
                $(".bar1").css("display", "block");
                $(".close_book").css("display", "block");
                $('.lente2').css("visibility", "visible");
            }
        });

        $(".ics").click(function() {
            if (cerca != undefined) {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                location.href = url;
            }
        });

        if ((navigator.userAgent.match(/Android/i))) {
            console.log("Smartphone");
            var cssId = 'phone'; // you could encode the css path itself to generate id..
            if (!document.getElementById(cssId)) {
                var link1 = document.createElement('link');
                var head = document.getElementsByTagName('head')[0];
                link1.id = cssId;
                link1.rel = 'stylesheet';
                link1.type = 'text/css';
                link1.href = 'assets/css/smartphone_bar.css';
                link1.media = 'all';
                head.appendChild(link1);
            }
            if (window.innerHeight > window.innerWidth) {
                //portrait}
                console.log("portrait");

                $(window).resize(function() {
                    if ($(window).width() + $(window).height() != _originalSize) {
                        console.log("keyboard show up");
                        $("input#search-in").focus(function() {
                            var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
                            if (isAndroid) {
                                document.write('<meta name="viewport" content="width=device-width,height=' + window.innerHeight + ', initial-scale=1.0">');
                            }
                            $(document.body).addClass('when-keyboard-showing');

                        });
                        $("input#search-in").blur(function() {
                            $(document.body).removeClass('when-keyboard-showing');

                        });

                        $("input#search-in").css("width", "200px");
                        $("input#search-in").css("left", "-15%"); +
                        $(".noBackground").css("z-index", "999999");
                        $(".noBackground").css("top", "70%");
                        $(".noBackground").css("width", "100%");
                        $(".src_ok").css("display", "none");
                        $(".back").css("width", "101px");
                        $(".back").css("left", "-59px");
                        $(".ics").css("left", "150px");

                        $(".ics").css("visibility", "visible");


                        if (cerca != undefined) {
                            $(".switch").css("left", "300px");
                            $(".switch").css("display", "block");
                            $(".src_back").css("left", "190px");
                            $(".src_next").css("left", "240px");
                            $(".src_ok").css("display", "block");
                        }
                    }
                });


                if (window.innerWidth <= 360) {
                    console.log("GALAXY S8");
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "125px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "103px");
                        $(".ics").css("top", "27px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "142px");
                        $(".src_next").css("left", "190px");
                        $(".src_back").css("top", "14px");
                        $(".src_next").css("top", "14px");

                    }



                } else if (window.innerWidth <= 370) {
                    console.log("GALAXY S3");
                    $("input#search-in").attr("placeholder", "Cerca...");

                    if (cerca != undefined) {
                        $("input#search-in").css("width", "125px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "103px");
                        $(".ics").css("top", "27px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "148px");
                        $(".src_next").css("left", "196px");
                        $(".src_back").css("top", "12px");
                        $(".src_next").css("top", "12px");

                    }


                    /* $(window).resize(function() {
                         if ($(window).width() + $(window).height() != _originalSize) {
                             console.log("keyboard show up");
                             $("input#search-in").css("width", "178px");
                             $(".lente").css("visibility", "none");
                             $(".ics").css("left", "152px");
                             $(".ics").css("visibility", "visible");
                             $(".noBackground").css("z-index", "999999");
                             $(".noBackground").css("top", "70%");
                             $(".noBackground").css("width", "100%");
                             $(".src_ok").css("display", "none");
                             if (cerca != undefined) {
                                 $(".switch").css("left", "300px");
                                 $(".switch").css("display", "block");
                                 $(".src_back").css("left", "190px");
                                 $(".src_next").css("left", "240px");
                                 $(".src_ok").css("display", "block");
                             }

                         }
                     });*/
                    // console.log(".serchin", $("input#search-in").attr("placeholder"));
                    // $(".serchin").attr("placeholder", "Cerca..");

                } else if (window.innerWidth <= 385) {
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "160px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "140px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "173px");
                        $(".src_next").css("left", "222px");

                        $(".src_next").css("top", "12px");
                        $(".src_back").css("top", "12px");
                    }


                } else if (window.innerWidth <= 420) {
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "178px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "152px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "225px");
                        $(".src_next").css("left", "242px");
                    }


                } else if (window.innerWidth > 420 && window.innerWidth < 600) {
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "178px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "152px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "199px");
                        $(".src_next").css("left", "246px");
                        $(".src_ok").css("display", "block");
                        $(".src_next").css("top", "12px");
                        $(".src_back").css("top", "12px");
                    }
                } else if (window.innerWidth <= 610) {
                    console.log("Inizio Tablet , Nexus 7");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "245px");
                        $(".ics").css("left", "235px");
                        $(".ics").css("visibility", "visible");
                    }

                } else if (window.innerWidth <= 810) {
                    console.log("Nexus 10");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "245px");
                        $(".ics").css("left", "235px");
                        $(".ics").css("visibility", "visible");
                    }

                }

            } else {
                //landscape
                console.log("landscape");
                if (window.innerWidth <= 640) {

                    console.log("S3");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "250px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "250px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "383px");
                        $(".src_back").css("left", "282px");

                    }
                } else if (window.innerWidth <= 740) {
                    console.log("S8");
                    if (cerca != undefined) {
                        $(".noBackground").css("top", "80%");
                        $("input#search-in").css("width", "290px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "270px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "450px");
                        $(".src_back").css("left", "350px");

                    }

                } else if (window.innerWidth <= 960) {
                    $(".noBackground").css("top", "88%");
                    console.log("Nexus 7");
                    if (cerca != undefined) {

                        $("input#search-in").css("width", "290px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "380px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "550px");
                        $(".src_back").css("left", "450px");
                        $(".src_ok").css("position", "relative");
                        $(".src_ok").css("left", "50px");


                    }
                } else if (window.innerWidth <= 1290) {
                    console.log("Tab A");
                    $(".noBackground").css("top", "91%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "410px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "490px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "780px");
                        $(".src_back").css("left", "680px");
                        $(".src_ok").css("position", "relative");
                        $(".src_ok").css("left", "50px");
                    }
                }

            }
        }
        if (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))) {
            console.log("Apple");
            var cssId = 'iPhone'; // you could encode the css path itself to generate id..
            if (!document.getElementById(cssId)) {
                var link1 = document.createElement('link');
                var head = document.getElementsByTagName('head')[0];
                link1.id = cssId;
                link1.rel = 'stylesheet';
                link1.type = 'text/css';
                link1.href = 'assets/css/iPhone_bar.css';
                link1.media = 'all';
                head.appendChild(link1);
            }

            if (window.innerHeight > window.innerWidth) {

                console.log("portrait");
                if (window.innerWidth <= 320) {
                    console.log("iPhone 4");
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $(".ricerca").css("left", "0px");
                        $("input#search-in").css("width", "125px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "103px");
                        $(".ics").css("top", "27px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "139px");
                        $(".src_next").css("left", "177px");
                        $(".src_back").css("top", "15px");
                        $(".src_next").css("top", "15px");

                    }
                } else if (window.innerWidth <= 345) {
                    console.log("iPhone 5 & 5s");
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $(".ricerca").css("left", "0px");
                        $("input#search-in").css("width", "125px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "103px");
                        $(".ics").css("top", "27px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "139px");
                        $(".src_next").css("left", "177px");
                        $(".src_back").css("top", "15px");
                        $(".src_next").css("top", "15px");

                    }
                } else if (window.innerWidth <= 385) {
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $(".ricerca").css("left", "10px");
                        $("input#search-in").css("width", "140px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "115px");
                        $(".ics").css("top", "29px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "165px");
                        $(".src_next").css("left", "215px");
                        $(".src_back").css("top", "15px");
                        $(".src_next").css("top", "15px");

                    }
                } else if (window.innerWidth <= 425) {
                    $("input#search-in").attr("placeholder", "Cerca...");
                    if (cerca != undefined) {
                        $(".ricerca").css("left", "10px");
                        $("input#search-in").css("width", "140px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "115px");
                        $(".ics").css("top", "32px");
                        $(".ics").css("visibility", "visible");
                        $(".src_back").css("left", "169px");
                        $(".src_next").css("left", "232px");
                        $(".btn_next").css("padding", "13px 15px");
                        $(".btn_prev").css("padding", "13px 15px");
                        $(".src_back").css("top", "15px");
                        $(".src_next").css("top", "15px");

                    }
                } else if (window.innerWidth <= 780) {
                    console.log("iPad 3-4");
                    //  $(".noBackground").css("top", "88%");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");
                        $("input#search-in").css("width", "300px");
                        $("input#search-in").css("top", "-7px");
                        $("input#search-in").css("left", "72%");
                        $(".switch").css("top", "12px");
                        $(".switch").css("left", "385px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "350px");
                        $(".ics").css("top", "12px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "510px");
                        $(".src_next").css("top", "12px");
                        $(".src_back").css("left", "410px");
                        $(".src_back").css("top", "12px");

                    }
                } else if (window.innerWidth <= 845) {
                    console.log("iPad Pro 10.5");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");

                        $("input#search-in").css("width", "310px");
                        $("input#search-in").css("top", "-7px");
                        $("input#search-in").css("left", "120px");
                        $(".back").css("left", "280px");
                        $(".switch").css("top", "12px");
                        $(".switch").css("left", "385px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "405px");
                        $(".ics").css("top", "10px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "550px");
                        $(".src_next").css("top", "12px");
                        $(".src_back").css("left", "450px");
                        $(".src_back").css("top", "12px");
                    }
                } else if (window.innerWidth <= 1040) {
                    console.log("iPad Pro");
                    $(".noBackground").css("top", "94%");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");

                        $("input#search-in").css("width", "380px");
                        $("input#search-in").css("top", "-7px");
                        $("input#search-in").css("left", "180px");
                        $(".back").css("left", "425px");
                        $(".switch").css("top", "12px");
                        $(".switch").css("left", "385px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "530px");
                        $(".ics").css("top", "10px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "690px");
                        $(".src_next").css("top", "12px");
                        $(".src_back").css("left", "585px");
                        $(".src_back").css("top", "12px");

                    }
                }

            } else {
                //landscape
                console.log("landscape");
                if (window.innerWidth <= 480) {
                    console.log("Iphone 4");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "160px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "165px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "258px");
                        $(".src_back").css("left", "187px");

                    }
                } else if (window.innerWidth <= 568) {
                    console.log("Iphone 5");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "235px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "235px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "340px");
                        $(".src_back").css("left", "265px");

                    }
                } else if (window.innerWidth <= 667) {
                    console.log("Iphone 6-7-8");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "260px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "280px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "400px");
                        $(".src_back").css("left", "330px");

                    }
                } else if (window.innerWidth <= 736) {
                    console.log("Iphone 6-7-8 PLUS");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "300px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "320px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "455px");
                        $(".src_back").css("left", "365px");

                    }
                } else if (window.innerWidth <= 777) {
                    console.log("Iphone X");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "300px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "320px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "490px");
                        $(".src_back").css("left", "395px");

                    }
                } else if (window.innerWidth <= 812) {
                    console.log("Iphone X");
                    $(".noBackground").css("top", "80%");
                    if (cerca != undefined) {
                        $("input#search-in").css("width", "300px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "320px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "490px");
                        $(".src_back").css("left", "395px");

                    }
                } else if (window.innerWidth <= 1024) {
                    console.log("iPad");
                    $(".noBackground").css("top", "91%");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");

                        $(".search_bar").css("top", "-29px");
                        $(".search_bar").css("left", "0%");
                        $(".switch").css("top", "20px");
                        // $(".switch").css("left", "420px");
                        $("input#search-in").css("width", "370px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "440px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "630px");
                        $(".src_back").css("left", "540px");
                        $(".src_next").css("top", "22px");
                        $(".src_back").css("top", "22px");
                        $(".close_book").css("left", "80%");
                        $(".close_book").css("top", "6px");

                    }
                } else if (window.innerWidth <= 1115) {
                    console.log("iPad Pro 10.5");
                    $(".noBackground").css("top", "91%");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");

                        $(".search_bar").css("top", "-29px");
                        $(".search_bar").css("left", "0%");
                        $(".switch").css("top", "20px");
                        // $(".switch").css("left", "420px");
                        $("input#search-in").css("width", "370px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "410px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "680px");
                        $(".src_back").css("left", "585px");
                        $(".src_next").css("top", "22px");
                        $(".src_back").css("top", "22px");
                        $(".close_book").css("left", "80%");
                        $(".close_book").css("top", "6px");

                    }
                } else if (window.innerWidth <= 1366) {
                    console.log("iPad Pro");
                    $(".noBackground").css("top", "91%");
                    if (cerca != undefined) {
                        $(".search_bar").css("display", "block");
                        $(".bar1").css("display", "none");
                        $(".close_book").css("display", "none");

                        $(".search_bar").css("top", "-29px");
                        $(".search_bar").css("left", "0%");
                        $(".switch").css("top", "20px");
                        // $(".switch").css("left", "420px");
                        $("input#search-in").css("width", "435px");
                        $(".lente").css("visibility", "none");
                        $(".ics").css("left", "500px");
                        $(".ics").css("visibility", "visible");
                        $(".src_next").css("left", "840px");
                        $(".src_back").css("left", "745px");
                        $(".src_next").css("top", "22px");
                        $(".src_back").css("top", "22px");
                        $(".close_book").css("left", "80%");
                        $(".close_book").css("top", "6px");

                    }
                }

            }
        }
    } else {
        console.log("PC desktop");
        var cssId = 'Desktop'; // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId)) {
            var link1 = document.createElement('link');
            var head = document.getElementsByTagName('head')[0];
            link1.id = cssId;
            link1.rel = 'stylesheet';
            link1.type = 'text/css';
            link1.href = 'assets/css/barraDesk6.css';
            link1.media = 'all';
            head.appendChild(link1);
        }

        resize_bar();
        if (window.innerWidth <= 500) {
            console.log($(".exit"));
            $(".exit")[0].childNodes[1].nodeValue = "";
        }
        //   win_height();

        if (window.innerWidth <= 750) {

            $('.noBackground').css("top", "0%");
            $(".l3").css("display", "none");
            $(".cta").css("display", "block");

            if (cerca != undefined) {
                console.log("ricerca attiva");
                $(".l3").css("display", "block");
                $(".search_links").css("top", "82px");
                $(".search_links").css("left", "3%");
                $(".searchin").css("width", "210px");
                $(".searchin").css("left", "-4px");
                $(".ics").css("left", "100%");
                $(".src_ok").css("display", "none");
                $(".src_back").css("top", "-54px");
                $(".src_back").css("left", "60%");

                $(".exit").css("padding", "11px 72px");
                $(".close_bar").css("top", "26px");
                $(".close_bar").css("left", "18.5%");

                /*  a.cta.l3.close_bar {
                      top: 26px;
                      left: 18.5%;
                  }*/
                $("img.destra").css("width", "15px");
                $("img.sinistra").css("width", "15px");
                /*$(".btn_prev").css("padding", "10px 20px");
                $(".btn_next").css("padding", "10px 20px");*/

                $(".src_next").css("top", "-54px");
                $(".src_next").css("left", "210px");
                $(".close_bar").css("left", "88px");
                //  $(".btn_next").css("padding", "12px 74px");

                var pos = getParam("pos");
                var ultimo = getParam("ultimo");
                console.log("posizione", pos);
                if (pos == 0) {
                    $('.src_back').css("display", "none");
                    $(".close_bar").css("left", "102px");
                    $(".btn_next").css("padding", "12px 80px");
                    $(".btn_next").css("position", "relative");
                    $(".btn_next").css("left", "23px");
                    $(".searchin").css("width", "232px");
                    $(".ics").css("left", "60%");
                } else {
                    $('.src_back').css("display", "block");
                }
                if (pos == ultimo) {
                    $('.src_next').css("display", "none");
                } else {
                    $('.src_next').css("display", "block");
                }
                if (pos > 0) {
                    $(".searchin").css("width", "180px");
                    $(".btn_next").css("padding", "12px 49px");
                    $(".btn_prev").css("padding", "12px 49px");
                    $('.src_back').css("display", "block");
                    $('.src_back').css("left", "54.5%");
                    $('.src_next').css("left", "54.5%");
                    $('.src_next').css("display", "block");
                    $(".ics").css("left", "43%");
                    $(".close_bar").css("left", "102px");
                }
                $(".exit").css("padding", "12px 23px");



            }
            // win_height();
        } else if (window.innerWidth > 750 && window.innerWidth <= 990) {
            console.log("800x600");
            $('.noBackground').css("top", "0%");
            $(".l3").css("display", "none");
            $(".cta").css("display", "block");

            if (cerca != undefined) {
                console.log("ricerca attiva");
                $(".l3").css("display", "block");
                $(".search_links").css("top", "82px");
                $(".search_links").css("left", "3%");
                $(".searchin").css("width", "377px");
                $(".searchin").css("left", "-11px");
                $(".ics").css("left", "100%");
                $(".src_ok").css("display", "none");
                $(".src_back").css("top", "-54px");
                $(".src_back").css("left", "60%");

                $(".exit").css("padding", "11px 72px");
                $(".close_bar").css("top", "26px");
                $(".close_bar").css("left", "18.5%");

                /*  a.cta.l3.close_bar {
                      top: 26px;
                      left: 18.5%;
                  }*/
                $("img.destra").css("width", "15px");
                $("img.sinistra").css("width", "15px");
                /*$(".btn_prev").css("padding", "10px 20px");
                $(".btn_next").css("padding", "10px 20px");*/

                $(".src_next").css("top", "-54px");
                $(".src_next").css("left", "86%");

                var pos = getParam("pos");
                var ultimo = getParam("ultimo");
                console.log("posizione", pos);
                if (pos == 0) {
                    $('.src_back').css("display", "none");
                } else {
                    $('.src_back').css("display", "block");
                }
                if (pos == ultimo) {
                    $('.src_next').css("display", "none");
                } else {
                    $('.src_next').css("display", "block");
                }
                if (pos > 0) {
                    $(".searchin").css("width", "221px");
                    $('.src_back').css("display", "block");
                    $('.src_back').css("left", "49.5%");
                    $('.src_next').css("left", "50%");
                    $('.src_next').css("display", "block");
                    $(".ics").css("left", "43%");
                }
                $(".exit").css("padding", "12px 23px");
                $(".btn_next").css("padding", "12px 74px");


            }
            // win_height();

        } else if (window.innerWidth > 990 && window.innerWidth <= 1024) {
            console.log("1024x768");
            $(".exit").css("padding", "12px 23px");

            if (cerca != undefined) {
                $("#search-in").css("width", "268px");
                $("#search-in").css("left", "38%");
                $(".src_back").css("left", "645px");
                $(".src_back").css("top", "0px");
                $(".src_next").css("left", "650px");
                $(".src_next").css("top", "0px");
                $("#text_search").css("display", "none");
                $(".ics").css("left", "62%");
                $(".close_bar").css("left", "69%");
                $(".close_bar").css("top", "0%");
            }
            //   win_height();
        } else if (window.innerWidth > 1025 && window.innerWidth <= 1200) {
            console.log("1024x768");
            $(".exit").css("padding", "12px 23px");

            if (cerca != undefined) {

                $("#search-in").css("width", "100px");
                $("#search-in").css("left", "10%");
                $("#text_search").css("display", "block");
                $(".src_back").css("left", "22%");
                $(".src_next").css("left", "12%");
                $(".src_ok").css("left", "18%");
                $(".ics").css("left", "80px");

            }
            //   win_height();
        } else if (window.innerWidth > 1201) {
            if (cerca != undefined) {
                $("#search-in").css("width", "180px");
                $("#search-in").css("left", "-8%");
                $("#text_search").css("display", "block");
                $(".src_back").css("left", "20%");
                $(".src_next").css("left", "16%");
                $(".src_ok").css("left", "18%");
                $(".ics").css("left", "140px");

            }
        }


    }

}


function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function() { obj["e" + type + fn](window.event); }
        obj.attachEvent("on" + type, obj[type + fn]);
    }
}

function win_height() {
    if ((window.innerHeight <= 600) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "81%");

    } else if ((window.innerHeight <= 600) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "90%");

    } else if ((window.innerHeight > 600 && window.innerHeight <= 800) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "86%");

    } else if ((window.innerHeight > 600 && window.innerHeight <= 800) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "93%");

    } else if ((window.innerHeight > 800 && window.innerHeight <= 1000) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "88%");
    } else if ((window.innerHeight > 800 && window.innerHeight <= 1000) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "94%");
    } else if ((window.innerHeight > 1000) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "89%");
    } else if ((window.innerHeight > 1000) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "95%");
    }

}
/*
function win_height() {
    var y = 0.84; //incremento             
    var e, m;
    for (var i = 0; i <= 1080; i++) {
        e = (y * i);
        if (window.innerHeight == i) {

            if (window.innerHeight <= 1000) {

                m = (e - 36);
                $("noBackground").css("top", m + "px");
                console.log("I", i);
                console.log("E", e);
                console.log("M", m);
            }
            if (window.innerHeight <= 850) {

                m = (e - 36);
                $(".noBackground").css("top", m + "px");
                console.log("I", i);
                console.log("E", e);
                console.log("M", m);
            }
            if (window.innerHeight <= 700) {

                m = (e - 57);
                $(".noBackground").css("top", m + "px");
                console.log("I", i);
                console.log("E", e);
                console.log("M", m);
            }
            if (window.innerHeight <= 500) {
                console.log("I", i);
                console.log("E", e);
                m = (e - 90);
                $(".noBackground").css("top", m + "px");
                console.log("M", m);
            }
            if (window.innerHeight <= 300) {
                console.log("I", i);
                console.log("E", e);
                m = (e - 125);
                $(".noBackground").css("top", m + "px");
                console.log("M", m);
            }
            if (window.innerHeight <= 150) {
                console.log("I", i);
                console.log("E", e);
                m = (e - 125);
                $(".noBackground").css("top", m + "px");
                console.log("M", m);
            }
        }
    }
}*/

function resize_bar() {
    var width = window.innerWidth;
    var $barra = $('.noBackground');
    var dim_barra = $barra.css("width");
    var container = $(".titolo1 ").css("width");
    var dim = parseInt(container, 10);
    var left;

    left = 0;
    dim = dim - 10;
    margin = (width - dim) / 2;
    $barra.css("width", dim);
    $barra.css("left", left);
    $barra.css("margin", "8px " + margin + "px");

}