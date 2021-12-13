var $body = $("body");
var $barra_menu = $('.noBackground');
var $back = $(".back");
var $searchin = $('#search-in');

var $lente = $(".lente");

$(document).ready(function() {

    barra = getParam("menu");
    blockId = getParam("id");
    titoli = getParam("tit");
    numeroDiBlocco = getParam("blocco");
    affermazione = getParam("aff");
    cerca = getParam("search");
    pos = getParam("pos");
    segn = getParam("segnale");
    ultimo = getParam("ultimo");
    tipoEs = getParam("es");
    barra_op = getParam("barra")
    if (tipoEs != undefined) {
        tipoEs = tipoEs.toUpperCase();
    }

    vis_menu();
    nascondiMenu();

    $(window).keydown(function(event) { //ogni volta che viene pemuto invio se la barra di ricerca non è vuota inizia la ricerca, se la ricerca è vuota non fa nulla
        var scrivi = document.getElementById("search-in");
        if (event.keyCode == 13) {
            if (scrivi.value == undefined || scrivi.value == "" || scrivi.value == " ") {
                event.preventDefault();
                return false;
            } else {
                new_ricerca();
                // ricerca();
                return;

            }
            //Se corrisponde al tasto invio 
        }
    });


    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        console.log("mobile impost");
        mobile_imp();
        opacita_barra(barra_op);
        addEvent(window, "load", mediaquery_js(tipoEs));
        addEvent(window, "resize", mediaquery_js(tipoEs));

        win_height()

    } else {
        console.log("desktop impost")
        desktop_imp();
    }



    $(".barra_enter ").mouseover(function() {
        $(".barra_enter ").css("opacity", "1");
    });
    $(".barra_enter ").mouseout(function() {
        $(".barra_enter ").css("opacity", "0.5");
    });
    $(".barra_enter ").focusout(function() {
        $(".barra_enter ").css("opacity", "0.5");

    });
    $(".barra_enter ").focusin(function() {
        $(".barra_enter ").css("opacity", "1");
    });

    $('.barra_enter').bind('keypress', function(e) {
        $(".barra_enter ").focusin();
        $(".src_lens").addClass("src_go");
        $(".src_go").click(function() {
            console.log("cerca esci: ", cerca);
            if (cerca != undefined) {
                if (tipoEs != undefined) {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                } else {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                }

            } else {
                if (tipoEs != undefined) {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                } else {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                }
            }
            location.href = url;
        });


        console.log("scrivi_cerca: ", $(".scrivi_cerca").val());
        console.log("scrivi_cerca lunghezza: ", $(".scrivi_cerca").val().length);
        if ($(".scrivi_cerca").val().length > 2) {
            $(".svg-grey-filter").attr("src", "assets/images/ico/close.svg");
            $(".svg-grey-filter").css({
                "width": "15px"
            });
        } else {
            $(".svg-grey-filter").attr("src", "assets/images/ico/Bt_lente.svg");
            $(".svg-grey-filter").css({
                "width": ""
            });
        }
    });

    document.querySelector(".dots-btn").addEventListener("click", () => {
        document.querySelector(".container-book").classList.toggle("change");
        document.querySelector(".dots-btn").classList.toggle("dots-open");
    });

});

$(window).load(function() {

    if (barra == 1) {
        vis_menu(1);
    }
    if (barra == 0 || barra == undefined) {
        vis_menu(0);
    }

    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        console.log("mobile impost");
        mobile_imp();
        mediaquery_js();
    } else {
        console.log("desktop impost")
        desktop_imp();
    }

    //Inizio script riguardante la ricerca delle parole	 
    if (cerca != undefined) {
        "use strict";
        ricerca_attiva = true;
        var estratto = cerca;
        var trovato = true;
        var cont = 0;
        var re = new RegExp(cerca, 'gi');
        var targetHtml = $('#genera').html();

        /*TENERE FUORI AL RENDER della pagina le IMMAGINI */

        if (re.test(targetHtml)) {
            var matches = targetHtml.match(re);
            var no = (matches.length == 1) ? 'corrispondenza' : 'corrispondenze';
            var finds = (matches.length == 1) ? 'trovata' : 'trovate';
            var quante = matches.length;

            //trovare le parole cecate nel testo e sottolinearle tenendo conto di non prendere elementi interni ai tag html se descrittivi es. alt='ricerca'
            $("#genera").find('*').contents().filter(function() {
                if (this.nodeType === 3) {

                    if ((this != undefined) && (this.textContent.trim() != "") && (this.textContent.trim() != " ")) {

                        //  console.log("$THIS", $(this).text());

                        var target = $(this).text();
                        if (re.test(target)) {
                            var matches = target.match(re);
                            var no = (matches.length == 1) ? 'corrispondenza' : 'corrispondenze';
                            var finds = (matches.length == 1) ? 'trovata' : 'trovate';
                            // var quante = matches.length;                          

                            for (var i = 0; i < $(this).length; i++) {
                                var parent = $(this)[i].parentElement;
                                target = $(parent).html();
                                if (parent != null) {
                                    $(parent).html(target.replace(re, '<span class="highlight">' + matches[0] + '</span>'));
                                    cont++;
                                }

                            }
                            if (trovato == true) {

                                //bloccare context menu del mouse
                                $(document).bind("contextmenu", function(e) {
                                    return false;
                                });

                                setTimeout(() => {
                                    $(".noBackground").css("display", "flex");
                                    $(".noBackground").addClass("open");
                                    $("#search-in").val(cerca);
                                    $("#search-in").focusin();
                                    $(".svg-grey-filter").css("display", "none")
                                    $(".ics").css("visibility", "visible");
                                }, 800);


                                $ics.click(function() {
                                    $searchin.val("");
                                    $searchin.focus();
                                    $lente.css("visibility", "visible");
                                    $ics.css("visibility", "hidden");
                                    $ics.css("left", "90%");
                                    if (tipoEs != undefined) {
                                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                                    } else {
                                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                                    }
                                    location.href = url;
                                });

                                if (cont == 1) {

                                    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
                                        var testo = document.getElementsByClassName("trovato");
                                        setTimeout(() => {
                                            $(testo).val(pos + "/" + ultimo);
                                            if (pos == ultimo) {
                                                var solo = document.getElementsByClassName("src_next");
                                                $(solo).attr("style", "visibility:hidden");
                                            }
                                            if (pos == "1") {
                                                $(".btn_prev").attr("style", "visibility:hidden");
                                            }
                                        }, 1000);

                                    } else {
                                        setTimeout(() => {
                                            var testo = document.getElementsByClassName("text-area");
                                            $(testo).text("trovato un risultato");
                                            if (pos == ultimo) {
                                                var solo = document.getElementsByClassName("src_next");
                                                $(solo).attr("style", "visibility:hidden");
                                            }
                                            if (pos == "1") {
                                                $(".btn_prev").attr("style", "visibility:hidden");
                                            }
                                        }, 1000);

                                    }



                                } else {

                                    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
                                        var testo = document.getElementsByClassName("trovato");

                                        setTimeout(() => {
                                            $(testo).val(pos + "/" + ultimo);
                                            // $(testo).text(cont + " trovati");
                                            if (pos == ultimo) {
                                                var solo = document.getElementsByClassName("src_next");
                                                $(solo).attr("style", "visibility:hidden");
                                            }
                                            if (pos == "1") {
                                                $(".btn_prev").attr("style", "visibility:hidden");
                                            }
                                        }, 1000);
                                    } else {
                                        setTimeout(() => {
                                            var testo = document.getElementsByClassName("text-area");
                                            $(testo).text(" trovati " + cont + " risultati");
                                            if (pos == ultimo) {
                                                var solo = document.getElementsByClassName("src_next");
                                                $(solo).attr("style", "visibility:hidden");
                                            }
                                            if (pos == "1") {
                                                $(".btn_prev").attr("style", "visibility:hidden");
                                            }
                                        }, 1000);

                                    }
                                }
                                if (cont >= 1) {
                                    var area = document.getElementsByClassName("box");
                                    $(area).removeAttr("style");
                                }

                            }

                        }


                    }
                }
            });

        }

        $(".highlight").css("background", "yellow");

        if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i)))) {
            console.log("BARRA MOBILE");
            barra_ricerca_mobile();
        } else {
            console.log("BARRA DESKTOP");
            barra_ricerca_desktop();


        }
    } else {

        //alert("salva variabile back");
        //tasto di previous che appare se link cliccato or ricerca andata avanti; 
        /*if(ricerca attiva e pos>1 oppure link !=undefined*/

    }


    setTimeout(() => {

        $(".dots-btn").click(function() {
            if (!$(".dots-btn").hasClass("dots-open")) {

                if (cerca != undefined) {
                    tipoEsercitazione(tipoEs);
                    if (tipoEs != undefined) {
                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                    } else {
                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                    }
                    location.href = url;
                } else {
                    $(".container-book").removeClass("change");
                    $(".dots-btn").removeClass("dots-open");
                }

            }
        });

    }, 1000);

});


function desktop_imp() {
    var isScrolling;
    var $barra = $('.noBackground');

    $(".close_book").css("display", "none");
    $(".close_bar").css("display", "block");
    $(".smartphone-bar").css("display", "none")

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
            if (tipoEs != undefined) {
                window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&es=" + tipoEs);
            } else {
                window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato);
            }
            $barra.fadeOut();
        } else {
            $barra.fadeOut();
            $barra.removeClass("open");
        }

    });

    $(".ics").click(function() {
        if (cerca != undefined) {
            if (tipoEs != undefined) {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
            } else {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
            }
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


    /*  $('.noBackground').mouseleave(function() {
          console.log("mouse out");
          isScrolling = setTimeout(function() {
              // Run the callback
              //  alert('Scrolling has stopped.');
              $('.noBackground').bind();
              $('.noBackground').fadeOut();
              $(close_book).fadeIn();
              $barra.removeClass("open");
          }, 2500);
      });*/


}


function mobile_imp() {
    var isScrolling;
    $(".close_book").css("display", "block");
    $(".close_bar").css("display", "none");
    $(".desktop-bar").css("display", "none")
    var myElem = $("#genera")[0];
    var mc = new Hammer(myElem, {
        touchAction: "auto"
    });
    // create a simple instance
    // by default, it only adds horizontal recognizers
    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    //EVENT: tap, doubletap, pan, swipe, press, pinch and rotate
    mc.get("pan").set({
        direction: Hammer.DIRECTION_VERTICAL,
        treshold: 10
    });

    mc.on("panup pandown", function(ev) {

        if (ev.type == "panup") {
            var x_inizio = 0;

            if (ev.isFinal != true) {
                endY = ev;
                var deltaY = endY.deltaY;

            }
            if (deltaY <= -10) {

                $('.noBackground').fadeIn();
                $(".desktop-bar").css("display", "none");
                $(".desktop-bar").removeClass("change");
                $(".smartphone-bar").css({
                    "display": "block",
                    "top": "2%",
                    "position": "fixed"

                });
                $(".navbar-book").css({
                    "position": "absolute",
                    "top": "4%",
                    "width": "100%",
                    "height": "100%"
                });
                $(".container-book").css("z-index", "9999");
                $(".container-book").addClass("change");

                $(".btn-bar-book").css({
                    "width": "50px",
                    "height": "50px"
                });

            }
        }
        if (ev.type == "pandown") {
            if (ev.isFinal != true) {
                endY = ev;
                var deltaY = endY.deltaY;
            }
            console.log("event-vertical: ", ev.type);
            console.log("event-vertical: ", ev);
            console.log("deltaY: ", deltaY);
            var topY = (window.innerHeight - 75);
            if (deltaY >= 10) {
                $('.noBackground').fadeIn();
                $(".desktop-bar").css("display", "none");
                $(".desktop-bar").removeClass("change");

                $(".smartphone-bar").css({
                    "display": "block",
                    "top": "89%",
                    "position": "fixed"
                });

                $(".navbar-book").css({
                    "position": "absolute",
                    "top": "4%",
                    "width": "100%",
                    "height": "100%"
                });
                $(".container-book").css("z-index", "9999");
                $(".container-book").addClass("change");

                $(".btn-bar-book").css({
                    "width": "50px",
                    "height": "50px"
                });
            }

            var width = window.innerWidth;
            var height = window.innerHeight;

            if (width < height) {

                if (height <= "500") {
                    $(".smartphone-bar").css("top", "89%");
                }
                if ((height > "500") && (height <= "640")) {
                    $(".smartphone-bar").css("top", "89%");
                }
                if ((height > "640") && (height <= "812")) {
                    $(".smartphone-bar").css("top", "90%");
                }
                if ((height > "812") && (height <= "960")) {
                    $(".smartphone-bar").css("top", "92%");
                }
                if ((height > "960") && (height <= "1024")) {
                    $(".smartphone-bar").css("top", "92%");
                }
                if ((height > "1024") && (height <= "1366")) {
                    $(".smartphone-bar").css("top", "94%");
                }
                if (height > "1366") {
                    $(".smartphone-bar").css("top", "94%");
                }

                $(document).on('focus', 'input', function() {
                    clearTimeout(isScrolling);
                    setTimeout(function() {
                        $('.noBackground').fadeIn();
                        $('.smartphone-bar').css('position', 'fixed');
                        $(".smartphone-bar").css("top", "80%");

                        $(".smartphone-bar").focusin();
                        $(".smartphone-bar").focus();
                    }, 0);
                });
                $(document).on('blur', 'input', function() {
                    setTimeout(function() {
                        $('.smartphone-bar').css('position', 'fixed');
                    }, 800);
                });

            }

        }

    });
    mc.on("panleft panright", function(ev) {
        console.log("event-horizontal: ", ev.type);
    });

    mc.on("tap press", function(ev) {
        console.log("tap press: ", ev);
    });

    $(".smartphone-bar").find('*').contents().click(function() {
        $("#search-in-smart").focusin();
        $("#search-in-smart").focus();
    })

    $("#search-in-smart").css({
        "display": "none",
        "color": "white",
        "width": "12.3rem",
        "padding": "12px 10px 12px 16px",
        "border-radius": "5px",
        "font-size": "14px",
        "outline": "none",
        "z-index": "99999"
    });

    $("#genera").css("z-index", "88888");
    $(".wrap-src-smart").css({
        "width": "0px",
        "top": "-2px",
    });
    $(".nav-src-smart").css({
        "left": "-28px",
        "position": "relative",
        "top": "-8px"
    });

    $(".nav-menu-link-book:nth-child(2)").css({
        "left": "6.8rem",
        "width": "20rem",
    });

    $(".pls-smart").css("z-index", "9999");

    $(".form-src-smart").css("width", "15rem");

    if (cerca != undefined) {
        $(".ico-src-smart").addClass("next-src-icon");
        $(".next-src-icon").attr("src", "assets/images/ico/icon_search_next.svg")
        $('.noBackground').fadeIn();
        $('.noBackground').focus();
        $(".desktop-bar").css("display", "none");
        $(".desktop-bar").removeClass("change");


        //$(".navbar-book-smart").css("display", "none");

        $(".smartphone-bar").css({
            "display": "block",
            "top": "2%",
            "position": "fixed"

        });
        $(".navbar-book").css({
            "position": "absolute",
            "top": "4%",
            "width": "100%",
            "height": "100%"
        });
        $(".container-book").css("z-index", "9999");
        $(".container-book").addClass("change");

        $(".src-btn-smart").removeClass("open-src");
        $(".src-btn-smart").addClass("start-src");

        $("#search-in-smart").addClass("trovato");
        /*$(".trovato").css({
            "background": "rgb(52 178 102)",
            "color": "rgb(255 255 255)"
        })*/
        $(".trovato").prop('disabled', true);


        $(".start-src").css("z-index", "99999");
        $("#idx_button3").fadeOut();
        $(".smartphone-bar").css({
            "width": "72%",
            "transform": "translateX(-5rem)",
            "transition": "all 1s 1s ",
        });
        $(".smartphone-bar").find('*').css("opacity", "1");
        $(".exit-btn-smart").css({
            "transform": "translateX(7.5rem)",
            "transition": "transform 1s linear 1s"
        });
        $(".src-btn-smart").css({
            "transform": "translateX(7rem)",
            "transition": "transform 1s linear 1s"
        });

        $(".nav-src-smart").css({
            "left": "10rem",
            "position": "relative",
            "top": "0px"

        });
        //  $("#search-in-smart").fadeIn();

        $(".nav-menu-link-book:nth-child(2)").css({
            "left": "-2.7rem",
            "width": "0rem"
        });
        $(".wrapper-search-book.wrap-src").css({
            "width": "0px"
        });

        $(".nav-src-smart").fadeIn()
            /*   $(".wrap-src-smart").css({
                   "width": "150px",
                   "transition": "all 1s linear 1s",
               });*/

        $(".scrivi_cerca_smart").focusin();
        $(".scrivi_cerca_smart").focus();

        $(".start-src").click(function() {
            nextsearch();
        });

        $(".exit-btn-smart").addClass("exit_src");
        $(".exit_src").click(function() {
            if (tipoEs != undefined) {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
            } else {
                var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
            }
            location.href = url;
        });

    } else {
        $(".src-btn-smart").click(function() {

            $(".src-btn-smart").addClass("open-src");
            $(".open-src").css("z-index", "99999");

            $(".smartphone-bar").css({
                "width": "72%",
                "transform": "translateX(-5rem)",
                "transition": "all 1s 1s ",
            });
            $(".smartphone-bar").find('*').css("opacity", "1");
            $(".exit-btn-smart").css({
                "transform": "translateX(7.5rem)",
                "transition": "transform 1s linear 1s"
            });
            $(".src-btn-smart").css({
                "transform": "translateX(7rem)",
                "transition": "transform 1s linear 1s"
            });

            //$(".pls-smart").css("left", "-1.4rem");


            setTimeout(() => {
                $("#idx_button3").fadeOut();
            }, 800);

            // $("#search-in-smart").fadeIn();

            $(".nav-menu-link-book:nth-child(2)").css({
                "left": "-2.7rem",
                "width": "0rem"
            });
            $(".wrapper-search-book.wrap-src").css({
                "width": "0px"
            });

            $(".nav-src-smart").fadeIn()
            $(".wrap-src-smart").css({
                "width": "150px",
                "transition": "all 1s linear 1s",
            });

            $(".scrivi_cerca_smart").focusin();
            $(".scrivi_cerca_smart").focus();

            $("#genera").css("z-index", "88888");

            $(".src-btn-smart").css("z-index", "99999");

        });

        $(".src-btn-smart").click(function(event) {
            //alert("click");
            //console.log($("#search-in-smart").val());

            if ($("#search-in-smart").val() == undefined || $("#search-in-smart").val() == "" || $("#search-in-smart").val() == " ") {
                event.preventDefault();
                return false;

            } else {
                new_ricerca();
                // ricerca();
                return;

            }
        });

    }



    $(window).scroll(function() {
        clearTimeout(isScrolling);
        if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i)))) {
            $(".smartphone-bar").css("z-index", "999999");
            $("#genera").css("z-index", "888888");
        }

        isScrolling = setTimeout(function() {
            $('.noBackground').bind();

            $('.noBackground').fadeOut();
        }, 3800);

    });

    $(".smartphone-bar").focusout(function() {
        isScrolling = setTimeout(function() {
            $('.noBackground').bind();
            $('.noBackground').fadeOut();
        }, 2500);
    });
    $(".smartphone-bar").find('*').contents().focusin(function() {
        clearTimeout(isScrolling);
    });
    $(".smartphone-bar").find('*').contents().focus(function() {
        clearTimeout(isScrolling);
    });

    $(document).on('keyup', function(event) {
        clearTimeout(isScrolling);
        if (event.keyCode == 13) {
            if ($("#search-in-smart").val() == undefined || $("#search-in-smart").val() == "" || $("#search-in-smart").val() == " ") {
                event.preventDefault();
                return false;
            } else {
                new_ricerca();
                // ricerca();
                return;
            }
        }
    });


}

function dynamicLayout() {
    console.log("width", window.innerWidth);
    console.log("height", window.innerHeight);
    var width = window.innerWidth;
    var height = window.innerHeight;
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
                if (tipoEs != undefined) {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                } else {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                }
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
                if (tipoEs != undefined) {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                } else {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                }
                location.href = url;
            }
        });



        /*if ((navigator.userAgent.match(/Android/i))) {
            console.log("Smartphone");
            var cssId = 'phone'; // you could encode the css path itself to generate id..
          /*  if (!document.getElementById(cssId)) {
                var link1 = document.createElement('link');
                var head = document.getElementsByTagName('head')[0];
                link1.id = cssId;
                link1.rel = 'stylesheet';
                link1.type = 'text/css';
                link1.href = 'assets/css/smartphone_bar.css';
                link1.media = 'all';
                head.appendChild(link1);
            }*/

    } else {
        console.log("PC desktop");
        var cssId = 'Desktop'; // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId)) {
            var link1 = document.createElement('link');
            var head = document.getElementsByTagName('head')[0];
            link1.id = cssId;
            link1.rel = 'stylesheet';
            link1.type = 'text/css';
            link1.href = 'assets/css/barraDesk.css';
            link1.media = 'all';
            head.appendChild(link1);
        }

        resize_bar();
        if (window.innerWidth <= 500) {
            console.log($(".exit"));
            $(".exit")[0].childNodes[1].nodeValue = "";
        }

        console.log("ricerca dimensioni: ", cerca);

        if (cerca != undefined) {
            $(".barra_enter ").focusin();
            if (width >= 1200) {
                $(".nav-menu-book").css({
                    "width": "90rem",
                    "top": "-90px",
                    "left": "30px",
                    "z-index": "1"
                });
                $(".btn-group").css({
                    "position": "relative",
                    "vertical-align": "middle",
                    "left": "-45px"
                });
                $(".nav-menu-link-book:nth-child(2)").css({
                    "left": "19rem",
                    "width": "20rem"
                });
                $(".src_ok").css({
                    "top": "8px",
                    "left": "65.5rem",
                    "position": "absolute"
                });
                $(".btn_prev").css({
                    "position": "absolute",
                    "left": "0px"
                });
                $(".nav-menu-link-book:nth-child(3)").css({
                    "left": "62rem"
                });

                $(".nav-menu-link-book:nth-child(5)").css({
                    "left": "82rem"
                });
                $(".src_lens").css("left", "378px");
                $(".src_ok").fadeIn();
                $(".btn-group").fadeIn();
                $(".trovati").fadeIn();
                $(".nav-menu-book").fadeIn();
                $(".nav-menu-link-book:nth-child(1)").fadeIn();
            }
            if ((width > 1024) && (width < 1200)) {
                $(".src_ok").fadeIn();
                $(".trovati").fadeIn();
                $(".nav-menu-book").fadeIn();
                $(".nav-menu-book").css("width", "");
                $(".nav-menu-link-book:nth-child(1)").css({
                    "display": "none"
                });
                $(".nav-menu-link-book:nth-child(2)").css({
                    "left": "2rem",
                    "width": "20rem"
                });
                $(".wrapper-search-book").css({
                    "width": "300px"
                });
                $(".src_ok").css({
                    "top": "8px",
                    "left": "38rem",
                    "position": "absolute"
                });
                $(".btn_prev").css({
                    "position": "absolute",
                    "left": "0px"
                });
                $(".nav-menu-link-book:nth-child(3)").css({
                    "left": "34rem"
                });

                $(".nav-menu-link-book:nth-child(5)").css({
                    "left": "55rem"
                });


            }
            if ((width >= 992) && (width <= 1024)) {
                $(".src_ok").fadeIn();
                $(".trovati").fadeIn();
                $(".nav-menu-book").fadeIn();
                $(".nav-menu-book").css("width", "");
                $(".nav-menu-link-book:nth-child(1)").css({
                    "display": "none"
                });
                $(".nav-menu-link-book:nth-child(2)").css({
                    "left": "2rem",
                    "width": "20rem"
                });
                $(".wrapper-search-book").css({
                    "width": "300px"
                });
                $(".src_ok").css({
                    "top": "18px",
                    "left": "42rem",
                    "position": "absolute"
                });
                $(".btn_prev").css({
                    "position": "absolute",
                    "left": "0px"
                });
                $(".nav-menu-link-book:nth-child(3)").css({
                    "left": "34rem"
                });

                $(".nav-menu-link-book:nth-child(5)").css({
                    "left": "55rem"
                });


            }

        } else {

            if (width < 768) {
                console.log("<768");
                $(".nav-menu-book").css("width", "42rem");
                $(".wrapper-search-book.wrap-src").css({
                    "width": "210px"
                });

                $(".nav-menu-link-book:nth-child(1)").css({
                    "width": "45%"
                });

                $(".wrapper-search-book span").css({
                    "left": "175px"
                });
                $(".svg-grey-filter").css({
                    "width": "18px"
                });
            } else {
                $(".nav-menu-book").css("width", "");
                $(".wrapper-search-book.wrap-src").css({
                    "width": ""
                });

                $(".nav-menu-link-book:nth-child(1)").css({
                    "width": ""
                });

                $(".wrapper-search-book span").css({
                    "left": ""
                });
                $(".svg-grey-filter").css({
                    "width": ""
                });

                $("span.src_lens").css({
                    "left": "380px"
                });
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
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });

    } else if ((window.innerHeight <= 600) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "90%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });

    } else if ((window.innerHeight > 600 && window.innerHeight <= 800) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "86%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });

    } else if ((window.innerHeight > 600 && window.innerHeight <= 800) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "93%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });

    } else if ((window.innerHeight > 800 && window.innerHeight <= 1000) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "88%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });
    } else if ((window.innerHeight > 800 && window.innerHeight <= 1000) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "94%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);


        });
    } else if ((window.innerHeight > 1000) && (window.innerWidth <= 800)) {
        $(".noBackground").css("top", "89%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });
    } else if ((window.innerHeight > 1000) && (window.innerWidth > 800)) {
        $(".noBackground").css("top", "95%");
        $(".src-btn-smart").click(function() {
            setTimeout(() => {
                $("#search-in-smart").focusin();
                $("#search-in-smart").focus();
            }, 2000);

        });
    }

}

function resize_bar() {
    var width = window.innerWidth;
    var $barra = $('.barra_enter');
    var dim_barra = $barra.css("width");
    var container = $(".titolo1 ").css("width");
    var dim = parseInt(container, 10);
    var left;

    $barra.css("width", "100%");
    $barra.css("margin", "0");
    $barra.css("opacity", "0.5");


    // $barra.css("transition", "all 10s ease-out");

    /*  left = 0;
      dim = dim - 10;
      margin = (width - dim) / 2;
      $barra.css("width", dim);
      $barra.css("left", left);
      $barra.css("margin", "8px " + margin + "px");*/

}

function barra_ricerca_desktop() {
    $barra_menu.css("display", "flex");
    $searchin.focus();
    $searchin.val(cerca);
    $('.l3').css("display", "block");
    $('.l3').css("top", "20px");
    $('.l3').css("left", "15%");
    $searchin.css("width", "100%");
    $('.cerca').css("top", "20px");
    $('.lente').css("visibility", "hidden");
    $ics.css("visibility", "visible");
    $ics.css("left", "90%");
    $('.search_links ').css("top", "-20px");
    $('.search_links ').css("left", "-5%");
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
    $ics.click(function() {
        $searchin.val("");
        $searchin.focus();
        $lente.css("visibility", "visible");
        $ics.css("visibility", "hidden");
        $ics.css("left", "90%");
        if (tipoEs != undefined) {
            var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
        } else {
            var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
        }
        location.href = url;
    });
}

function barra_ricerca_mobile() {
    $barra_menu.css("display", "flex");
    $searchin.focus();
    $searchin.val(cerca);
    $(".search_bar").css("display", "block");
    $(".bar1").css("display", "none");
    $(".close_book").css("display", "none");
    $(".src_back ").css("display", "block");
    $(".src_next ").css("display", "block");
    $(".src_ok ").css("display", "block");
    $('.lente').css("visibility", "hidden");
    $(".exit").css("display", "none");
    $ics.css("visibility", "visible");
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
    $ics.click(function() {
        $searchin.val("");
        $searchin.focus();
        $lente.css("visibility", "visible");
        $ics.css("visibility", "hidden");
        $ics.css("left", "90%");
        if (tipoEs != undefined) {
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&es=" + tipoEs + "&menu=1");
        } else {
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1");
        }


    });
    $back.click(function() {
        $searchin.val("");
        $searchin.focus();
        $lente.css("visibility", "visible");
        $ics.css("visibility", "hidden");
        $ics.css("left", "90%");
        if (tipoEs != undefined) {
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&es=" + tipoEs + "&menu=yes");
        } else {
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1");
        }
    });



    // $(".close_bar").css("display", "none");

}




//INIZIO FUNZIONI DI VISUALIZZAZIONE E USABILITY DELLA BARRA MENU

function vis_menu(barra) {

    $(document).on("keyup", function(e) {
        var code = e.keyCode || e.which;
        console.log("codice:", code);
        switch (code) {
            case 27: //Tasto ESC
                if (cerca != undefined) {
                    if (tipoEs != undefined) {
                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1&es=" + tipoEs;
                    } else {
                        var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                    }
                    location.href = url;
                } else if ($(".container-book").hasClass("change")) {
                    $(".container-book").removeClass("change");
                    $(".dots-btn").removeClass("dots-open");
                    $(".svg-grey-filter").attr("src", "assets/images/ico/Bt_lente.svg");
                    $(".svg-grey-filter").css({
                        "width": ""
                    });
                    $(".scrivi_cerca").val("");
                } else {
                    uscitaLibro();
                }
                break;
            case 40:
                avanti();
                break;
            case 38:
                indietro();
                break;
            case 39:
                if (cerca != undefined) {
                    nextsearch();
                } else {
                    $(".noBackground").fadeIn();
                }
                break;
            case 37:
                if (cerca != undefined) {
                    backsearch();
                } else {
                    $(".noBackground").fadeIn();
                }
                break;
                /* case 17:
                     window.location.assign("index.html");
                     break;*/

        }
    });
    setTimeout(function() {
        if (barra == 1) {
            $(".noBackground").css("display", "flex");
            $(".noBackground").addClass("open");
            $(".container-book ").addClass("change");
            $(".dots-btn ").addClass("dots-open");
        }
    }, 1000);

}


function indietro() {

    var offset = window.pageYOffset;
    offset -= 1000;
    $('html, body').animate({ scrollTop: offset }, 1000);
    allBlocks.loadPrevius();
    return false;

}

function avanti() {
    var offset = window.pageYOffset;
    offset += 1000;
    $('html, body').animate({ scrollTop: offset }, 1000);
    allBlocks.loadNext();
    return false;
}


var ricerca_attiva = false;

function new_ricerca() {
    var input = $("#search-in").val();
    if ((input == undefined) || (input == "") || (input == " ")) {
        var input = $("#search-in-smart").val();
        input = input.toLowerCase();
        console.log("input: ", input);
    }
    console.log("input cerca: ", input);

    var container = sezioni["sezioni"];
    var contenuti, matches, no, finds;
    var re = new RegExp(input, 'gi');
    console.log("re", re);
    //console.log("re2", re2);
    var cont = 0;
    var array_trovate = [];
    var arr_id = []
    var tutti = new Array();
    var contenuti2, id_cont, id, id_pars, tutti_pars;

    for (var i = 0; i < container.length; i++) {

        contenuti = container[i].contenuti;
        id_cont = container[i].id;

        $(contenuti).find('*').contents().filter(function() {
            if (this.nodeType === 3) {

                if ((this != undefined) && (this.textContent.trim() != "") && (this.textContent.trim() != " ")) {
                    contenuti2 = this.textContent;
                    matches = contenuti2.match(re);
                    cont++;
                    eccolo = contenuti2.search(input);

                    if (eccolo > -1) {
                        trovato = true;
                        ricerca_attiva = true;
                        if ($.inArray(id_cont, tutti) < 0) {
                            tutti = tutti.concat(id_cont);
                            eccolo = -1;
                            cont++;
                        }
                    }
                }
            }
        });
        if ((matches != null) || (matches != undefined)) {
            no = (matches.length == 1) ? 'corrispondenza' : 'corrispondenze';
            finds = (matches.length == 1) ? 'trovata' : 'trovate';
            array_trovate.push(container[i]);
        }
        if (cont > 0) {
            trovato = true;
            ricerca_attiva = true;
        }
        if (listato == "AB" || listato == "") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
        } else if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
        }
    }
    console.log("tutti[0]", tutti[0]);
    if (tutti[0] != undefined) {

        for (var j = 0; j < tutti.length; j++) {

            if (blockId == tutti[j]) {
                id = blockId;
                window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 1 + "&ultimo=" + parseInt(tutti.length - 1) + "&es=" + tipoEs);
                return;
            } else {
                if (id == undefined) {
                    id_pars = parseInt(blockId);
                    tutti_pars = parseInt(tutti[j]);

                    if (tutti_pars > id_pars) {
                        id = tutti[j];
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 1 + "&ultimo=" + parseInt(tutti.length - 1) + "&es=" + tipoEs);
                        return;
                    } else {

                        if (j == tutti.length - 1) {

                            id = tutti[0];
                            window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 1 + "&ultimo=" + parseInt(tutti.length - 1) + "&es=" + tipoEs);
                            return;
                        }
                    }
                }
            }
        }
    }
    if (array_trovate.length == 0) {
        nontrovato();
    }

}


function nontrovato() {
    $(".src_ok").css("display", "block");
    $(".src_ok").css("left", "6%");
    $("#text_search").text("non è presente in questo libro!");
    $(".cerca").css("top", "10px");
    var input = $("#search-in-smart").val();
    alert(input + " non è presente in questo libro.");
    $("#search-in-smart").val("");
    $("#search-in-smart").focus();
    $("#search-in-smart").focusin();
}


function nextsearch(cerca) {
    var container = sezioni["sezioni"];
    var cerca = getParam("search");
    var array = getParam("array");
    var pos = getParam("pos");
    trovato = false;
    var eccolo = 0;
    cont = -1;
    var tutti = new Array();
    var contenuti, id_cont, contenitore, contenitore2, id_pars, tutti_pars;
    if (cerca == "" || cerca == undefined) {
        alert("Inserire parola nella barra di ricerca!");
        return;
    } else {
        for (var i = 0; i < container.length; i++) {
            contenuti = container[i].contenuti;
            id_cont = container[i].id;
            //solo testo non img alt=ricerca
            $(contenuti).find('*').contents().filter(function() {
                if (this.nodeType === 3) {
                    if ((this != undefined) && (this.textContent.trim() != "") && (this.textContent.trim() != " ")) {
                        contenuti2 = this.textContent;
                        // id_cont = container[i].id;
                        eccolo = contenuti2.search(cerca);

                        if (eccolo > -1) {

                            trovato = true;
                            ricerca_attiva = true;
                            if ($.inArray(id_cont, tutti) < 0) {
                                tutti = tutti.concat(id_cont);
                                eccolo = -1;
                                cont++;
                            }

                        }

                    }
                }
            });
        }
        for (var j = 0; j < tutti.length; j++) {
            if (tutti[0]) {

                if (listato == "AB" || listato == "") {
                    var link1 = document.getElementsByClassName("menuAB");
                    var link2 = document.getElementsByClassName("libroAB");
                } else if (listato == "AM") {
                    var link1 = document.getElementsByClassName("menuAM");
                    var link2 = document.getElementsByClassName("libroAM");
                }
                $(link1).removeAttr("href");

                id_pars = parseInt(blockId);
                tutti_pars = parseInt(tutti[j]);
                if (tutti_pars > id_pars) {
                    id = tutti[j];
                    pos++;
                    window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont + "&es=" + tipoEs);
                    return;
                } else {

                    if (j == tutti.length - 1) {
                        id = tutti[0];
                        pos++;
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont + "&es=" + tipoEs);
                        return;
                    }
                }


            }
        }
    }
}

function backsearch(cerca) {
    var container = sezioni["sezioni"];
    var cerca = getParam("search");
    var array = getParam("array");
    var pos = getParam("pos");
    var ultimo = getParam("ultimo");
    trovato = false;
    var eccolo = 0;
    cont = -1;
    var contenitore, contenitore2;
    var tutti = new Array();
    if (cerca == "" || cerca == undefined) {
        alert("Inserire parola nella barra di ricerca!");
        return;
    } else {
        for (var i = 0; i < container.length; i++) {
            var contenuti = container[i].contenuti;
            var id_cont = container[i].id;
            $(contenuti).find('*').contents().filter(function() {
                if (this.nodeType === 3) {
                    if ((this != undefined) && (this.textContent.trim() != "") && (this.textContent.trim() != " ")) {
                        contenuti2 = this.textContent;
                        // id_cont = container[i].id;
                        eccolo = contenuti2.search(cerca);

                        if (eccolo > -1) {
                            trovato = true;
                            ricerca_attiva = true;
                            if ($.inArray(id_cont, tutti) < 0) {
                                tutti = tutti.concat(id_cont);
                                eccolo = -1;
                                cont++;
                            }
                        }

                    }
                }
            });
            if (listato == "AB" || listato == "") {
                var link1 = document.getElementsByClassName("menuAB");
                var link2 = document.getElementsByClassName("libroAB");
            } else if (listato == "AM") {
                var link1 = document.getElementsByClassName("menuAM");
                var link2 = document.getElementsByClassName("libroAM");
            }
            $(link1).removeAttr("href");
            for (var j = 0; j < tutti.length; j++) {



                id_pars = parseInt(blockId);
                tutti_pars = parseInt(tutti[j]);
                if (tutti_pars == id_pars) {

                    if (j > 0) {
                        id = tutti[j - 1];
                        $(".src_next").css("display", "block");
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont + "&es=" + tipoEs);
                        return;
                    } else {
                        $(".src_next").css("display", "block");
                        $(".src_back ").css("display", "none");
                    }

                }

            }


        }
    }
}

function tastiera() {
    var scrivi = document.getElementById("search-in");
    $(scrivi).focus();
}



function nascondiMenu() {
    /*funzione che non fa vedere la barra del menu e disabilita il click sulle barre laterali*/
    $("#idx_button2").click(function(e) {

        $(".barra_enter").css("display", "none");
        $(".margin").css("display", "none");

        $("#marginSX").click(function(e) {
            e.preventDefault;
        });
        $("#marginDX").click(function(e) {
            e.preventDefault;
        });
    });
    $("#idx_button3").click(function(e) {

        $(".barra_enter").css("display", "none");
        $(".margin").css("display", "none");

        $("#marginSX").click(function(e) {
            e.preventDefault;
        });
        $("#marginDX").click(function(e) {
            e.preventDefault;
        });
    });

}

(function($) {
    $(window).on("load", function() {
        /*Sull' indice la barra non serve quindi non viene visualizzata*/
        if ($("#genera").hasClass("SIDMode")) {
            $(".barra_enter").css("display", "none");
            $(".margin").css("display", "none");
        }

    });
})(jQuery);


function tipoEsercitazione(tipoEs) {
    console.log("tipoEs: ", tipoEs);

    if ((tipoEs == undefined) || (tipoEs == "UNDEFINED") || (tipoEs == "")) {
        tipoEs = "NORMALE";
    }
    //Normale=verde, Difficile=viola
    if (tipoEs == "NORMALE") {
        $(".dots-btn").css("background", "hsl(144deg 55% 45%)");
        $(".nav-menu-book").css("background", "rgb(77, 203, 127)");
        $(".btn-bar-book").css("background", "hsl(144deg 55% 45%)");

        $(".smartphone-bar").css("background", "rgb(77, 203, 127)");

        $(".src-btn-smart").click(function() {
            $("button.btn.btn-secondary.btn-bar-book:active").animate({
                "box-shadow": "hsl(144deg 55% 40%) 0px 3px"
            });
        });

        $("#search-in-smart").css({
            "background": "rgb(52 178 102)",
            "border": "2px solid hsl(144deg 55% 40%)",
            "box-shadow": "hsl(144deg 55% 30%) 0px 1px 10px"
        })


    }
    if (tipoEs == "DIFFICILE") {
        $(".dots-btn").css("background", "hsl(261deg 57% 57%)");
        $(".nav-menu-book").css("background", "hsl(261deg 57% 63%)");
        $(".btn-bar-book").css("background", "hsl(261deg 57% 57%)");

        $(".smartphone-bar").css("background", "hsl(261deg 57% 63%)");

        $(".src-btn-smart").click(function() {
            $("button.btn.btn-secondary.btn-bar-book:active").animate({
                "box-shadow": "hsl(261deg 57% 40%)"
            });
        });

        $("#search-in-smart").css({
            "background": "hsl(261deg 57% 65%)",
            "border": "2px solid hsl(261deg 57% 65%)",
            "box-shadow": "#9c27b0 0px 1px 10px"
        })
    }


}


function mediaquery_js(tipoEs) {
    var width = window.innerWidth;
    var height = window.innerHeight;

    tipoEsercitazione(tipoEs);

    $("#search-in-smart").attr("placeholder", "Cerca..");
    console.log("mediaquery width: ", width);
    console.log("mediaquery height: ", height);


    var width_bar = $(".indice-smart").css("width");
    var width_search = $("#search-in-smart").css("width");

    width_bar = width_bar.split("px");
    width_bar = width_bar[0];
    width_bar = parseInt(width_bar * 3) + 10;

    var dim_btn = $(".exit-btn-smart").css("width");

    dim_btn = dim_btn.split("px");
    dim_btn = dim_btn[0];
    dim_btn = parseInt(dim_btn);

    if (width < height) {
        //portrait

        if (cerca != undefined) {
            $(".scrivi_cerca_smart").css("display", "block");
        }

        if (width <= "320") {

            $(".smartphone-bar").css({
                "width": "162px",
                "left": "80px"
            });

            console.log("<= 320px");
            if (cerca != undefined) {
                setTimeout(() => {
                    $(".nav-src-smart").css("top", "-7px");
                    //    console.log("width_bar indice-smart: ", width_bar);
                    $(".smartphone-bar").css({
                        "width": "230px",
                        "left": "100px",
                        "transition": "all 2s",
                        "opacity": "1"
                    });
                    $(".exit-btn-smart").css({
                        "transform": "translateX(54px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".src-btn-smart").css({
                        "transform": "translateX(53px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $("#search-in-smart").css({
                        "width": "102px",
                        "padding": "12px 10px 9px 16px",
                        "transition": "width 2s",
                    });
                }, 1000);


            } else {

                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");

                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").focusin();
                    $("#search-in-smart").focus();
                    //  $(".btn-group-smart").css("left", "10px");
                    //alert("width_bar: " + width_bar);
                    //  $("#search-in-smart").css("display", "none");
                    $(".nav-src-smart").css("left", "-29px");

                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "230px",
                            "left": "100px",
                            "transition": "all 2s",
                            "opacity": "1"

                        });


                        $(".open-src").css({
                            "transform": "translateX(54px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(55px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {

                            $("#search-in-smart").css({
                                "width": "108px",
                                "transition": "width 2s",
                            });
                        }, 1000);

                    }, 1000);




                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });

                            $(".open-src").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });
                            $(".indice-smart").fadeIn();
                        }, 1000);

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(-10px)",
                                "width": "162px",
                                "transition": "all 3s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 1000);

                        volta++;

                    } else {
                        e.preventDefault();
                    }


                });
            }
        }
        if ((width > "320") && (width <= "375")) {
            console.log("<= 375");
            if (cerca != undefined) {

                setTimeout(() => {
                    $(".nav-src-smart").css("top", "-7px");
                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").css({
                        "width": "108px",
                        "transform": "translateX(-2px)",
                        "transition": "all 2s",
                    });
                    $(".src-btn-smart").css({
                        "transform": "translateX(54px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(55px)",
                        "transition": "transform 1s linear 1s"
                    });
                    setTimeout(() => {
                        $(".smartphone-bar").css({
                            "width": "230px",
                            "left": "140px",
                            "transform": "translateX(-74px)",
                            "transition": "all 3s",
                            "opacity": "1"
                        });
                    }, 1000);
                }, 1200);

            } else {

                var volta = 1;

                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");
                    $("#search-in-smart").fadeIn();

                    $("#search-in-smart").focus();
                    $("#search-in-smart").focusin();

                    // clearTimeout(isScrolling);
                    //  $(".btn-group-smart").css("left", "10px");
                    //alert("width_bar: " + width_bar);
                    //  $("#search-in-smart").css("display", "none");
                    $(".nav-src-smart").css("left", "-29px");

                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "230px",
                            "left": "110px",
                            "transition": "all 2s",
                            "opacity": "1"

                        });


                        $(".open-src").css({
                            "transform": "translateX(54px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(55px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {

                            $("#search-in-smart").css({
                                "width": parseInt((width_bar / 2) + 25) + "px",
                                "transition": "width 2s",
                            });
                        }, 1000);

                    }, 1000);




                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });

                            $(".open-src").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });
                            $(".indice-smart").fadeIn();
                        }, 1000);

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(0px)",
                                "width": "162px",
                                "transition": "all 3s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 1000);



                    } else {
                        e.preventDefault();
                    }


                });
            }
        }
        if ((width > "375") && (width <= "551")) {
            console.log("<= 551px");

            console.log("width_bar indice-smart: ", width_bar);
            $(".smartphone-bar").css("width", "166px");
            $(".smartphone-bar").css("left", "123px");
            if (cerca != undefined) {
                setTimeout(() => {
                    $(".nav-src-smart").css("top", "-7px");

                    $("#search-in-smart").css({
                        "width": "108px",
                        "transform": "translateX(-2px)",
                        "transition": "all 2s",
                    });
                    $(".src-btn-smart").css({
                        "transform": "translateX(55px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(55px)",
                        "transition": "transform 1s linear 1s"
                    });
                    setTimeout(() => {
                        $(".smartphone-bar").css({
                            "width": "230px",
                            "left": "140px",
                            "transition": "all 3s",
                            "opacity": "1"
                        });
                    }, 1000);
                }, 1000);



            } else {

                console.log("width_bar open", width_bar);

                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");
                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").focusin();
                    $("#search-in-smart").focus();

                    $(".nav-src-smart").css("left", "-29px");

                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "230px",
                            "left": "140px",
                            "transition": "all 2s",
                            "opacity": "1"

                        });

                        $(".open-src").css({
                            "transform": "translateX(55px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(55px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {

                            $("#search-in-smart").css({
                                "width": "108px",
                                "transition": "width 2s",
                            });
                        }, 2000);

                    }, 1000);

                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });

                            $(".open-src").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });
                            $(".indice-smart").fadeIn();
                        }, 1000);

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(0px)",
                                "width": "162px",
                                "transition": "all 3s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 1000);

                    } else {
                        e.preventDefault();
                    }

                });
            }
        }
        if ((width > "551") && (width <= "640")) {
            console.log("<= 640px");
            $(".smartphone-bar").css({
                "width": "166px",
                "left": "216px"

            });
            if (cerca != undefined) {
                setTimeout(() => {
                    $(".nav-src-smart").css("top", "-7px");

                    $("#search-in-smart").css({
                        "width": "108px",
                        "transform": "translateX(-2px)",
                        "transition": "all 2s",
                    });
                    $(".src-btn-smart").css({
                        "transform": "translateX(55px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(55px)",
                        "transition": "transform 1s linear 1s"
                    });
                    setTimeout(() => {
                        $(".smartphone-bar").css({
                            "width": "230px",
                            "left": "207px",
                            "transition": "all 3s",
                            "opacity": "1"
                        });
                    }, 1000);
                }, 1000);



            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");

                    $(".nav-src-smart").css("left", "-29px");
                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").focusin();
                    $("#search-in-smart").focus();
                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "250px",
                            "left": "207px",
                            "transition": "all 2s",
                            "opacity": "1"
                        });

                        $(".open-src").css({
                            "transform": "translateX(66px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(66px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {

                            $("#search-in-smart").css({
                                "width": "132px",
                                "transition": "width 2s",
                            });
                        }, 2000);

                    }, 1000);

                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });

                            $(".open-src").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });
                            $(".indice-smart").fadeIn();
                        }, 1000);

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(0px)",
                                "width": "162px",
                                "transition": "all 3s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 1000);

                    } else {
                        e.preventDefault();
                    }

                });
            }
        }
        if ((width > "640") && (width <= "991")) {
            console.log("<= 991px");

            var left_bar = parseInt((width - width_bar) / 2);
            var dim_btn = $(".exit-btn-smart").css("width");

            dim_btn = dim_btn.split("px");
            dim_btn = dim_btn[0];
            dim_btn = parseInt(dim_btn);

            $(".smartphone-bar").css({
                "width": "166px",
                "left": "302px"
            });
            // alert("pippo:" + $(".smartphone-bar").css("left"));
            if (cerca != undefined) {
                setTimeout(() => {
                    $(".smartphone-bar").css({
                        "width": "166px",
                        "left": "302px"
                    });
                    $(".nav-src-smart").css("top", "-7px");

                    $("#search-in-smart").css({
                        "width": "168px",
                        "transform": "translateX(-2px)",
                        "transition": "all 2s",
                    });
                    $(".src-btn-smart").css({
                        "transform": "translateX(85px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(85px)",
                        "transition": "transform 1s linear 1s"
                    });
                    setTimeout(() => {
                        $(".smartphone-bar").css({
                            "width": "290px",
                            "left": "300px",
                            "transition": "all 2s",
                            "opacity": "1"
                        });
                    }, 1000);
                }, 1000);


            } else {

                console.log("width_bar open", width_bar);

                $(".src-btn-smart").click(function() {

                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");
                    $(".nav-src-smart").css("left", "-29px");

                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").focusin();
                    $("#search-in-smart").focus();
                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "290px",
                            "left": "302px",
                            "transition": "all 2s",
                            "opacity": "1"

                        });

                        $(".open-src").css({
                            "transform": "translateX(85px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(85px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {

                            $("#search-in-smart").css({
                                "width": "170px",
                                "transition": "width 2s",
                            });
                        }, 1000);

                    }, 1000);

                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });

                            $(".open-src").css({
                                "left": "-26px",
                                "transform": "translateX(25px)",
                                "transition": "transform 1s linear 1s"
                            });
                            $(".indice-smart").fadeIn();
                        }, 1000);

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(0px)",
                                "width": "166px",
                                "transition": "all 3s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 1000);

                    } else {
                        e.preventDefault();
                    }

                });
            }

        }
        if ((width > "991") && (width <= "1200")) {
            console.log("<= 1200px");
            var left_bar = parseInt((width - width_bar) / 2);

            var dim_btn = $(".exit-btn-smart").css("width");

            dim_btn = dim_btn.split("px");
            dim_btn = dim_btn[0];
            dim_btn = parseInt(dim_btn);

            $(".smartphone-bar").css({
                "width": "166px",
                "left": "430px"

            });
            if (cerca != undefined) {
                setTimeout(() => {
                    $(".nav-src-smart").css("top", "-7px");
                    $("#search-in-smart").fadeIn();
                    $("#search-in-smart").css({
                        "width": "273px",
                        "transform": "translateX(-2px)",
                        "transition": "all 2s",
                    });
                }, 1000);




                setTimeout(() => {
                    $(".src-btn-smart").css({
                        "transform": "translateX(134px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(136px)",
                        "transition": "transform 1s linear 1s"
                    });
                    $(".smartphone-bar").css({
                        "width": "405px",
                        "left": "365px",
                        "transition": "all 3s",
                        "opacity": "1"
                    });
                }, 1000);



            } else {

                console.log("width_bar open", width_bar);

                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").addClass("apri_barra");
                    $(".smartphone-bar").removeClass("chiudi_barra");


                    $(".nav-src-smart").css("left", "-29px");

                    setTimeout(() => {
                        $(".apri_barra").css({
                            "width": "405px",
                            "left": "365px",
                            "transition": "all 2s",
                            "opacity": "1"

                        });

                        $(".open-src").css({
                            "transform": "translateX(133px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".exit-btn-smart").css({
                            "transform": "translateX(137px)",
                            "transition": "transform 1s linear 1s"
                        });

                        setTimeout(() => {
                            $(".exit-btn-smart").css({
                                "left": "0px"
                            });
                            $(".open-src").css({
                                "left": "0px",
                            });
                        }, 1000);

                        setTimeout(() => {
                            $("#search-in-smart").fadeIn();
                            $("#search-in-smart").focusin();
                            $("#search-in-smart").focus();
                            $("#search-in-smart").css({
                                "width": "273px",
                                "transition": "width 2s",
                            });
                        }, 1000);

                    }, 1000);

                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {

                        $(".smartphone-bar").removeClass("apri_barra");
                        $(".smartphone-bar").addClass("chiudi_barra");

                        $(".noBackground").css({
                            "opacity": "0"
                        });
                        $("#search-in-smart").fadeOut();


                        $(".exit-btn-smart").css({
                            "left": "-26px",
                            "transform": "translateX(25px)",
                            "transition": "transform 1s linear 1s"
                        });

                        $(".open-src").css({
                            "left": "-26px",
                            "transform": "translateX(25px)",
                            "transition": "transform 1s linear 1s"
                        });
                        $(".indice-smart").fadeIn();

                        setTimeout(() => {
                            $(".chiudi_barra").css({
                                "transform": "translateX(0px)",
                                "width": "166px",
                                "left": "430px",
                                "transition": "all 5s",
                                "opacity": "0.5"
                            });

                            $(".indice-smart").css("transform", "translateX(0px)");

                        }, 500);

                    } else {
                        e.preventDefault();
                    }

                });
            }
        }
    } else {
        //alert("programma funzionante solo in modalità portrait");

        if (width <= "500") {
            console.log("<= 500");
            $(".smartphone-bar").css("width", width_bar + "px");
            $(".smartphone-bar").css("left", width_bar + "px");


            if (cerca != undefined) {
                $(".smartphone-bar").css("left", width_bar - dim_btn + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", width_bar - dim_btn + "px");
                    // $(".btn-group-smart").css("left", "10px");
                    $("#search-in-smart").css({
                        "width": parseInt(width_bar + dim_btn - 7) + "px",
                        "transition": "width 2s",
                    });
                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar - dim_btn) + "px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar - dim_btn + 5) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "transition": "width 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
        if ((width > "500") && (width <= "640")) {
            console.log("<= 640");
            $(".smartphone-bar").css("width", width_bar + "px");
            $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn) + "px");
            if (cerca != undefined) {
                $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn - 15) + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", parseInt(width_bar - dim_btn + 15) + "px");
                    // $(".btn-group-smart").css("left", "10px");
                    $("#search-in-smart").css({
                        "width": parseInt(width_bar + (dim_btn * 3)) + "px",
                        "transition": "width 2s",
                    });
                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar + 3) + "px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar + 8) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "transition": "width 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
        if ((width > "640") && (width <= "812")) {
            console.log("<= 812");
            $(".smartphone-bar").css("width", width_bar + "px");
            $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 2 + 15) + "px");
            if (cerca != undefined) {
                $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 2 - 15) + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", parseInt(width_bar - dim_btn + 25) + "px");
                    // $(".btn-group-smart").css("left", "10px");
                    $("#search-in-smart").css({
                        "width": parseInt(width_bar + (dim_btn * 4) + 10) + "px",
                        "transition": "width 2s",
                    });
                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn - 20) + "px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn - 15) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "left": parseInt(width_bar + dim_btn * 2 - 15),
                            "transition": "all 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
        if ((width > "812") && (width <= "960")) {
            console.log("<= 960");
            $(".smartphone-bar").css("width", width_bar + "px");
            $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 5 + 20) + "px");
            if (cerca != undefined) {
                $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 4 - 15) + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn / 2) + "px");
                    // $(".btn-group-smart").css("left", "10px");
                    $("#search-in-smart").css({
                        "max-width": "1000px",
                        "width": parseInt(width_bar * 3 + dim_btn - 5) + "px",
                        "transition": "width 2s",
                    });
                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn * 2 + 8) + "px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn * 2 + 15) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "left": parseInt(width_bar + dim_btn * 2 - 15),
                            "transition": "all 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
        if ((width > "960") && (width <= "1024")) {
            console.log("<= 1024");
            $(".smartphone-bar").css("width", width_bar + "px");
            $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 5 + 20) + "px");
            if (cerca != undefined) {
                $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 4 - 15) + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {

                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn / 2) + "px");
                    // $(".btn-group-smart").css("left", "10px");

                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn * 3 - 20) + "px)",
                        "transition": "transform 1s linear 1s"
                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar + dim_btn * 3 - 15) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                    $("#search-in-smart").css({
                        "max-width": "1000px",
                        "width": parseInt(width_bar * 4 - dim_btn - 20) + "px",
                        "transition": "width 2s",
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "left": parseInt(width_bar + dim_btn * 2 - 15),
                            "transition": "all 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
        if ((width > "1024") && (width <= "1366")) {
            console.log("<= 1366");
            $(".smartphone-bar").css("width", parseInt(width_bar) + "px");
            $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 8 + 20) + "px");

            if (cerca != undefined) {
                $(".smartphone-bar").css("left", parseInt(width_bar * 3 + dim_btn * 2) + "px");
                $(".smartphone-bar").css({
                    "width": parseInt(width_bar * 2) + "px",
                    "transition": "width 2s",
                });

                $("#search-in-smart").css({
                    "width": parseInt(width_bar + (dim_btn / 2)) + "px",
                    "transition": "width 2s",
                });

                $(".exit-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 15) + "px)",
                    "transition": "transform 1s linear 1s"
                });

                $(".src-btn-smart").css({
                    "transform": "translateX(" + parseInt(width_bar - dim_btn - 20) + "px)",
                    "transition": "transform 1s linear 1s"
                });

            } else {
                console.log("width_bar open", width_bar);
                $(".src-btn-smart").click(function() {
                    $(".smartphone-bar").css("left", parseInt(width_bar + dim_btn * 3) + "px");
                    $(".smartphone-bar").css("width", parseInt(width_bar * 5) + "px");
                    // $(".btn-group-smart").css("left", "10px");                    

                    $(".nav-src-smart").css("left", "-3.7rem");
                    $(".open-src").css({
                        "transform": "translateX(" + parseInt(width_bar * 2 + 15) + "px)",
                        "transition": "transform 1s linear 1s"


                    });

                    $(".exit-btn-smart").css({
                        "transform": "translateX(" + parseInt(width_bar * 2 + 20) + "px)",
                        "transition": "transform 1s linear 1s"
                    });
                    $("#search-in-smart").css({
                        "max-width": "1000px",
                        "width": parseInt(width_bar * 4 + dim_btn - 20) + "px",
                        "transition": "width 2s",
                    });
                });

                $(".exit-btn-smart").click(function(e) {
                    var display_indice = $(".indice-smart").css("display");

                    if (display_indice != "block") {
                        $(".btn-group-smart").css("left", "");
                        $("#search-in-smart").css({
                            "width": "",
                            "transition": "width 2s",
                        });

                        $(".smartphone-bar").css({
                            "width": width_bar + "px",
                            "left": parseInt(width_bar * 3 + dim_btn * 2) + "px",
                            "transition": "all 2s",
                        });
                    } else {
                        e.preventDefault();
                    }
                });
            }
        }
    }
}

function opacita_barra(barra_op) {
    console.log("barra_op: ", barra_op);
    if (barra_op == 0) {
        $(".smartphone-bar").css("opacity", "0");
    }
    if (barra_op == 0.5) {
        $(".smartphone-bar").css("opacity", "0.5");
    }
    if (barra_op == 1) {
        $(".smartphone-bar").css("opacity", "1");
    }
    if (barra_op == undefined) {
        $(".smartphone-bar").css("opacity", "0.5");
    }
}