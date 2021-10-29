/*
I manuali per lavorare hanno bisogno di diversi parametri passati nella url con "=" e di seguito il valore corrispondente separati da &, se nessun parametro viene passato di default si carica la Index, qui di seguito andimoa a spiegarli:

1)mod:(modalità di visualizzazione), se vuoi entrare nella modalità aula carica in fondo alla index il css dell'aula, altrimenti se vuoto carica normalmente il libro
2)lis: se non viene inserito questo parametro di default prende AB se no carica tutti i file inerenti ai diversi listati, al momento sono presenti solo AB, AM, CDE, quando verranno 		aggiunti altri listati chiedere a Max di aggiungerli nell'engine alla funzione tipo_listato(lis);
3)menu: se non inserita la barra del menu non viene visualizzata, se viene inserito menu=1 (il menu è aperto alla visualizzazione della pagina) altrimenti con menu=0(menu è 				nascosto).
4)id: carica il libro per ID 
5)tit:deve sempre essere presente e determina se visualizzare la pagina con i titoli o senza titoli in testa
6)blocco: carica il libro per blocco, se oltre a blocco inserisco anche (aff) il libro carica dall'affermazione corrispondente presente in quel blocco
7)search:è la paroila ricercata, indica che la ricerca è attiva e vengono sottolineate tutte le occorrenze della parola cercata se presente, altrimenti spunta un messaggio di parola 			non trovata.
8)pos: è un parametro per la gestione delle parole successive della ricerca, se schiacci next-search il parametro di pos viene incrementato ogni volta
9)segnale: oltre che per blocco e per id è possibile caricare la pagina per numero di segnale.

*/
var $body = $("body");
var $barra_menu = $('.noBackground');
var $back = $(".back");
var $searchin = $('.searchin');
var $ics = $('.ics');
var $lente = $(".lente");


//FINE PARAMETRIZZAZIONE E CARICAMENTO

$(document).ready(function() {
    $body.css("display", "none");
    $barra_menu.css("display", "none");
    loadImg();
    listato = getParam("lis");
    if (listato == "AB") {
        tipo_listato("AB");
    }
    if (listato == "AM") {
        tipo_listato("AM");
    }
    if (listato == "CDE") {
        tipo_listato("CDE");
    }
    if (listato == "aulaAB") {
        tipo_listato("aulaAB");
    }
    if (listato == "aulaAM") {
        tipo_listato("aulaAM");
    }
    if (listato == "aulaCDE") {
        tipo_listato("aulaCDE");
    }
    if (listato == undefined || listato == "") {
        tipo_listato("AB");
    }
    barra = getParam("menu");
    blockId = getParam("id");
    titoli = getParam("tit");
    numeroDiBlocco = getParam("blocco");
    affermazione = getParam("aff");
    cerca = getParam("search");
    pos = getParam("pos");
    segn = getParam("segnale");
    ultimo = getParam("ultimo");
    vis_menu();
    gesture();
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
    }); //event= Event {isTrusted: true, type: "DOMContentLoaded", target: document, currentTarget: document, eventPhase: 2, …}--> carica gli elementi del DOM
    $(document).bind("contextmenu", function(e) {
        return false;
    });
    $(document).bind('selectstart dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    dynamicLayout();
    addEvent(window, "load", dynamicLayout);
    addEvent(window, "resize", dynamicLayout);
    $("#uscita").click(function() {
        uscitaLibro();
    });



});

$(window).load(function() {
    allBlocks = new Blocks(sezioni);
    var firstblock = "";
    if (barra == 1) {
        vis_menu(1);
    }
    if (barra == 0 || barra == undefined) {
        vis_menu(0);
    }
    if (blockId) {
        if (listato == undefined || listato == "AB") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link1).removeAttr("href");
        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link1).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAB") {
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAM") {
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaCDE") {
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link1).removeAttr("href");
        }
        firstblock = allBlocks.getBlockById(blockId); //Block {id: "0001", arg_blk: "A01", blocco: "", listato: "NQM2016.1", affermazione: "", …}	
    }
    if (numeroDiBlocco) {
        if (listato == undefined || listato == "AB") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link1).removeAttr("href");

        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link1).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAB") {
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAM") {
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaCDE") {
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link1).removeAttr("href");
        }

        firstblock = allBlocks.getblockbyblocco(numeroDiBlocco);
    }
    if (segn) {
        if (listato == undefined || listato == "AB") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link1).removeAttr("href");
        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link1).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAB") {
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaAM") {
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            $(link1).removeAttr("href");
        }
        if (listato == "aulaCDE") {
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link1).removeAttr("href");
        }
        firstblock = allBlocks.getBlockbySegnale(segn);
    }
    if (!blockId && !numeroDiBlocco && !segn) {
        if (listato == undefined || listato == "AB") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link2).removeAttr("href");
        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link2).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link2).removeAttr("href");
        }
        if (listato == "aulaAB") {
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            $(link2).removeAttr("href");
        }
        if (listato == "aulaAM") {
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            $(link2).removeAttr("href");
        }
        if (listato == "aulaCDE") {
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link2).removeAttr("href");
        }
        setTimeout(function() {
            $("#genera").addClass("SIDMode");
            $("#genera").html("");
            indexBuilder();
        }, 100);
    }

    $body.fadeIn("slow", "linear");
    chiudiLoader();
    lastblock = firstblock; //settato ultimo blocco come primo
    firstblock.isLast = true; //this.index dà la pos dell'indice in base alla selezione .index(elem, selezione),.isLast(ultimo elemento della selezione(index
    lastblockid = lastblock.id; //voglio id ultimo blocco(sezione)
    allBlocks.loadPage(lastblock.id); //plugin jQuery per caricare dinamicamente le pagine puoi scegliere quale file caricare, effetto di dissolvenza e durata
    margini(blockId);

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
                                $(parent).html(target.replace(re, '<span class="highlight">' + matches[0] + '</span>'));
                                cont++;
                            }


                            if (trovato == true) {
                                //bloccare context menu del mouse
                                $(document).bind("contextmenu", function(e) {
                                    return false;
                                });

                                $(".noBackground").css("display", "flex");
                                $(".noBackground").addClass("open");
                                $(".searchin").val(cerca);
                                $(".searchin").focusin();
                                $(".ics").css("visibility", "visible");

                                $ics.click(function() {
                                    $searchin.val("");
                                    $searchin.focus();
                                    $lente.css("visibility", "visible");
                                    $ics.css("visibility", "hidden");
                                    $ics.css("left", "90%");
                                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                                    location.href = url;
                                });

                                if (cont == 1) {

                                    var testo = document.getElementsByClassName("text-area");
                                    $(testo).text("trovata un'occorrenza");
                                    if (pos == ultimo) {
                                        var solo = document.getElementsByClassName("next-search");
                                        $(solo).attr("style", "visibility:hidden");
                                    }

                                } else {

                                    var testo = document.getElementsByClassName("text-area");
                                    $(testo).text(" trovate " + cont + " occorrenze");
                                    if (pos == ultimo) {
                                        var solo = document.getElementsByClassName("next-search");
                                        $(solo).attr("style", "visibility:hidden");
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
    /* All' apertura della modale blocca lo scroll di pagina */
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
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
            var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
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
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=yes");

        });
        $back.click(function() {
            $searchin.val("");
            $searchin.focus();
            $lente.css("visibility", "visible");
            $ics.css("visibility", "hidden");
            $ics.css("left", "90%");
            window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1");
        });


        // $(".close_bar").css("display", "none");

    }




    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    $(".img-responsive").click(function(e) {
        disableScroll();
        preventDefaultForScrollKeys(e);
    });
    $('body').on('click', '.in', function(e) {
        enableScroll();
    });

    $("#uscita").click(function() {
        uscitaLibro();
    });

});



//Ottenere parametri dall'uri tramite get quindi visibili 
function getParam(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];

        }

    }
}


//INIZIO PARAMETRIZZAZIONE E CARICAMENTO

function tipo_listato(lis) {
    switch (lis) {
        case ("AB"):

            var tag = document.createElement('script');
            tag.src = "AB/js/sezioniAB.js";
            tag.addClass = "sezioni";
            tag.type = 'text/javascript';

            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            var link3 = document.getElementsByClassName("navAB");
            var link4 = document.getElementsByClassName("next-img");
            var link5 = document.getElementsByClassName("prev-img");
            $(link1).attr("href", "AB/css/menuAB.css");
            $(link2).attr("href", "AB/css/libroAB.css");
            $(link3).attr("href", "assets/css/navAB.css");
            $(link4).attr("src", "assets/images/nextAB.svg");
            $(link5).attr("src", "assets/images/prevAB.svg");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale AB 2019");


            break;
        case ("AM"):
            var tag = document.createElement('script');
            tag.src = "AM/js/sezioniAM.js";
            tag.type = 'text/javascript';
            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            var link3 = document.getElementsByClassName("navAM");
            var link4 = document.getElementsByClassName("next-img");
            var link5 = document.getElementsByClassName("prev-img");
            //assets/images/next.svg
            $(link1).attr("href", "AM/css/menuAM.css");
            $(link2).attr("href", "AM/css/libroAM.css");
            $(link3).attr("href", "assets/css/navAM.css");
            $(link4).attr("src", "assets/images/nextAM.svg");
            $(link5).attr("src", "assets/images/prevAM.svg");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale AM 2019");

            break;
        case ("CDE"):
            var tag = document.createElement('script');
            tag.src = "CDE/js/sezioniCDE.js";
            tag.type = 'text/javascript';
            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link1).attr("href", "CDE/css/menuCDE.css");
            $(link2).attr("href", "CDE/css/libroCDE.css");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale CDE 2019");


            break;
        case ("aulaAB"):

            var tag = document.createElement('script');
            tag.src = "AB/js/sezioniAB.js";
            tag.type = 'text/javascript';
            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            var link3 = document.getElementsByClassName("navAB");
            $(link1).attr("href", "AB/css/menuaulaAB.css");
            $(link2).attr("href", "AB/css/libroaulaAB.css");
            $(link3).attr("href", "assets/css/navAB.css");
            var menuAB = document.getElementsByClassName("menuAB");
            var libroAB = document.getElementsByClassName("libroAB");
            $(libroAB).removeAttr("href");
            $(menuAB).removeAttr("href");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale AB 2019");

            break;
        case ("aulaAM"):

            var tag = document.createElement('script');
            tag.src = "AM/js/sezioniAM.js";
            tag.type = 'text/javascript';
            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            var link3 = document.getElementsByClassName("navAM");
            $(link1).attr("href", "AM/css/menuaulaAM.css");
            $(link2).attr("href", "AM/css/libroaulaAM.css");
            $(link3).attr("href", "assets/css/navAM.css");
            var menuAM = document.getElementsByClassName("menuAM");
            var libroAM = document.getElementsByClassName("libroAM");
            $(libroAM).removeAttr("href");
            $(menuAM).removeAttr("href");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale AM 2019");

            break;
        case ("aulaCDE"):

            var tag = document.createElement('script');
            tag.src = "CDE/js/sezioniCDE.js";
            tag.type = 'text/javascript';
            document.getElementsByClassName('sezioni')[0].appendChild(tag);
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link1).attr("href", "CDE/css/menuaulaCDE.css");
            $(link2).attr("href", "CDE/css/libroaulaCDE.css");

            var menuCDE = document.getElementsByClassName("menuCDE");
            var libroCDE = document.getElementsByClassName("libroCDE");
            $(libroCDE).removeAttr("href");
            $(menuCDE).removeAttr("href");
            var pubblicaz = document.getElementsByClassName("pubblicazione");
            $(pubblicaz).text("Manuale CDE 2019");

            break;
    }
}



//Spezzare la stringa per inserire classi etc o qualisasi cosa in una string
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }


function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block =
    /*#__PURE__*/
    function() {
        "use strict";

        function Block(blocco) {
            "use strict";

            //debugger;
            this.id = blocco["id"];
            this.arg_blk = blocco["arg_blk"];
            this.blocco = blocco["blocco"];
            this.listato = blocco["listato"];
            this.affermazione = blocco["affermazione"];
            this.pubblicazione = blocco["pubblicazione"];
            this.pag = blocco["pag"];
            this.titolo = blocco["titolo"];
            this.tipo_sez = blocco["tipo_sez"];
            this.contenuti = blocco["contenuti"].splice(8, 0, " id = " + this.id);
            this.indice = blocco["indice"];
            this.segnale = blocco["segnale"];
            this.nascosto = blocco["nascosto"];
            this.isLast = false; //blocco: {id: "0871", arg_blk: "L03", blocco: "28008, 28009, 28010, 28011", listato: "NQM2016.1", revisione: "false", …}
        } //Setta il blocco come ultimo
        _createClass(Block, [{
            key: "isLastBlock",
            set: function set(tf) {
                    this.isLast = tf;
                    return this.isLast;
                } //T/F se è un titolo o no

        }, {
            key: "isTitle",
            get: function get() {
                    return this.tipo_sez == "T" ? true : false;
                } // T/F se ha il campo titolo diverso da ""

        }, {
            key: "hasTitle",
            get: function get() {
                    return this.title != "" ? true : false;
                } //T/F se è presente nel dom

        }, {
            key: "isInDom",
            get: function get() {
                if ($("#" + this.id).length) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            key: "setId",
            get: function get() {
                var newContent = this.contenuti;
                return newContent.splice(8, 0, " id = '" + this.id + "' ");
            }
        }, {
            key: "newid",
            get: function get() {
                var newID = this.id;
                return newID;
            }
        }]);

        return Block;
    }(); //Gestisce i blocchi


var Blocks =
    /*#__PURE__*/
    function() {
        function Blocks(sezioni) {
            "use strict";
            this.sezioni = sezioni["sezioni"];
            this.blocchi = [];
            for (var i = 0; i < this.sezioni.length; i++) {
                this.blocchi.push(new Block(this.sezioni[i]));
            }
        } //Ritorna la grandezza dei blocchi(numero)

        _createClass(Blocks, [{
            key: "getBlockById",
            //Ritorna il blocco corrispondente all'id fornito	
            value: function getBlockById(id) {
                for (var i = 0; i < this.blocchi.length; i++) {
                    if (this.blocchi[i]["id"] == id) {
                        return new Block(this.blocchi[i]);
                    }
                }
            }
        }, {
            key: "getblockbyblocco",
            value: function getblockbyblocco(numeroDiBlocco, affermazione) {
                for (var i = 0; i < this.blocchi.length; i++) {
                    var blocco = this.blocchi[i]["blocco"].split(",", [1]);
                    var aff = this.blocchi[i]["affermazione"].split(",");
                    for (var j = 0; j < aff.length; j++) {
                        if (blocco == numeroDiBlocco) {
                            if (aff[j] == getParam("aff")) {
                                return new Block(this.blocchi[i]);
                            }

                            if (getParam("aff") == undefined) {
                                return new Block(this.blocchi[i]);
                            }
                        }
                    }
                }
            }
        }, {
            key: "getBlockbySegnale",
            value: function getBlockbySegnale(segnale) {
                    for (var i = 0; i < this.blocchi.length; i++) {
                        var sign = this.blocchi[i]["segnale"];

                        if (sign == "") {
                            sign = sign.next;
                        } else {
                            if (sign != undefined) {
                                if (sign.length > 1) {
                                    sign = sign.split(", ");


                                    for (var j = 0; j < sign.length; j++) {
                                        if (sign[j] == segn) {
                                            return new Block(this.blocchi[i]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } //Ritorna la posizione in base all'id nell'intenro del vettore

        }, {
            key: "getPosById",
            value: function getPosById(id) {
                    var length = this.blocchi.length;
                    var rt = "";

                    for (var i = 0; i < length; i++) {
                        if (this.blocchi[i]["id"] == id) {
                            rt = i;
                        }
                    }

                    return rt;
                    console.log("gpbid:", rt);
                } //Prende il blocco dopo quello passato

        }, {
            key: "getNextBlock",
            value: function getNextBlock(currentBlock) {
                    var currentId = getParam("id");
                    var posCurrentBlock;

                    if (currentBlock == undefined) {
                        posCurrentBlock = this.getPreviusBlock(currentId);
                    } else {
                        posCurrentBlock = this.getPosById(currentBlock.id);
                    }

                    var posNextBlock = posCurrentBlock + 1;
                    return this.blocchi[posNextBlock];
                } //Prende quello precedente a quello passato

        }, {
            key: "getPreviusBlock",
            value: function getPreviusBlock(currentBlock) {
                    //debugger;  
                    var currentId = getParam("id");
                    var posPreviusBlock;
                    if (currentBlock == undefined) {
                        posCurrentBlock = this.getPosById(currentId);
                        posPreviusBlock = posCurrentBlock - 1;
                        return this.blocchi[posPreviusBlock];
                    } else {
                        posCurrentBlock = this.getPosById(currentBlock.id);
                        posPreviusBlock = posCurrentBlock - 1;
                        //console.log("POSPREVIOUSBLOCK ", posPreviusBlock);
                        return this.blocchi[posPreviusBlock];
                    }
                } //Prende il blocco tramite la posizione del vettore
        }, {
            key: "getBlockByIndex",
            value: function getBlockByIndex(index) {
                return this.blocchi[index];
            }
        }, {
            key: "resetSezioni",
            value: function resetSezioni(xs) {
                    this.sezioni = xs;
                } //Prepara i titoli nella pagina

        }, {
            key: "prepTitoli",
            value: function prepTitoli(id, retBlock) {
                    retBlock = undefined ? false : retBlock; //debugger;

                    var tmpBlock = {};
                    var avalaibleTitle = [];

                    for (var i = 0; i < allBlocks.size; i++) {
                        tmpBlock = allBlocks.getBlockByIndex(i);

                        if (tmpBlock.isTitle) {
                            avalaibleTitle.push(tmpBlock);
                        }
                    }

                    var passedBlock = allBlocks.getBlockById(id);
                    var neededTitles = [];
                    var titolo = "";

                    do {
                        for (var i = 0; i < avalaibleTitle.length; i++) {
                            if (passedBlock.titolo == avalaibleTitle[i].id) {
                                neededTitles.push(avalaibleTitle[i]);
                                passedBlock = avalaibleTitle[i];
                                titolo = passedBlock.titolo;
                            }
                        }
                    } while (titolo != "");

                    if (retBlock) {
                        return neededTitles;
                    } else {
                        var html = "";

                        for (var i = neededTitles.length - 1; i >= 0; i--) {
                            $("#genera").append(neededTitles[i].contenuti);
                            $("#" + neededTitles[i].id).addClass("titolo"); //console.log(neededTitles[i].contenuti);

                            var idstmp = neededTitles[i].id; //console.log("primo blocco: r 212 " + firstblock);
                        }
                    }
                } //riempe la pagina di blocchi fino a riempirla

        }, {
            key: "fillPage",
            value: function fillPage(neededBlocks) {
                    var titoli = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "no";
                    //debugger;
                    var html = "";
                    var counter = 0;

                    if (titoli == "yes") {
                        counter = 0;

                        while ($(document).height() <= $(window).height()) {
                            if (neededBlocks[counter] != "" && neededBlocks[counter] != undefined) {
                                //   console.log("blocco generato");
                                //console.log(neededBlocks[counter]);
                                $("#genera").append(neededBlocks[counter].contenuti);
                                if (neededBlocks[counter].tipo_sez == "T") {
                                    $("#" + neededBlocks[counter].id).addClass("titolo");
                                }
                            }

                            counter++;

                            if (counter >= neededBlocks.length) {
                                break;
                            }
                        }
                    } else if (titoli == "no") {
                        counter = 0;

                        while ($(document).height() == $(window).height()) {
                            if (neededBlocks[counter] != "") {
                                if (neededBlocks[counter].tipo_sez != "T") {
                                    $("#genera").append(neededBlocks[counter].contenuti); //console.log(neededBlocks[counter].id);
                                    //console.log(counter);

                                    counter++;
                                } else {
                                    counter++;
                                }
                            }
                        }
                    }
                } //Carica la pagina a partire dal blocco fornito

        }, {
            key: "loadPage",
            value: function loadPage(blockid) {
                    //debugger;
                    var neededBlocks = [];
                    var lastBlockID = blockid;
                    var indexOfLastBlock = this.getPosById(lastBlockID);

                    for (var i = indexOfLastBlock; i < allBlocks.size; i++) {
                        neededBlocks.push(allBlocks.blocchi[i]);
                    }

                    var html = ""; //console.log("254, loadpagecalled for eseguito, titoli: "+titoli);

                    if (titoli == "once" || titoli == "yes") {
                        if (this.getBlockById(blockid).tipo_sez == "T") {
                            this.prepTitoli(lastBlockID);
                            this.fillPage(neededBlocks, titoli);
                        } else {;
                            this.prepTitoli(lastBlockID);
                            this.fillPage(neededBlocks, titoli);
                        }
                    } else if (titoli == "no") {
                        this.fillPage(neededBlocks);
                    }
                } //carica il prossimo blocco partendo dall'ultimo

        }, {
            key: "loadNext",
            value: function loadNext() {
                    var thisBlockid = $("section").last().attr("id");
                    var undef;

                    var thisBlock = this.getBlockById(thisBlockid);
                    var nextBlock = this.getNextBlock(thisBlock);

                    $("#genera").append(nextBlock.contenuti);
                    $("section:last").css({
                        opacity: 0,
                        visibility: "visible"
                    }).animate({
                        opacity: 1
                    }, 'slow');
                } //Ottiene l'index di un blocco

        }, {
            key: "getIndex",
            value: function getIndex(block) {
                for (var i = 0; i < this.size; i++) {
                    if (block.id = this.blocchi[i].id) {
                        return i;
                    }
                }
            }
        }, {
            key: "getAlltypeBBlock",
            value: function getAlltypeBBlock(from) {
                    var startingPos = this.getIndex(from);
                    var ndBlocks = [];

                    for (var i = startingPos; i <= this.size; i++) {
                        ndBlocks.push(this.blocchi[i]);
                    }

                    return ndBlocks;
                } //Carica il blocco precedente 

        }, {
            key: "loadPrevius",
            value: function loadPrevius() {
                //Prendo il primo blocco che non è un titolo
                var thisBlockid = $("section").attr("id");
                var thisBlock = this.getBlockById(thisBlockid);
                var primoBloccoNT = {};
                var noTitleBlocks = [];
                var children = new Array();

                $("#genera section").each(function(numElem, Elem) {
                    if (!$(Elem).hasClass("titolo")) {
                        noTitleBlocks.push($(Elem)); //noTitleBlocks = vettore di selettori a tutti i blocchi senza classe titolo
                    }
                });
                primoBloccoNT = noTitleBlocks[0]; //Primo blocco non titolo della pagina

                primoBloccoNT = this.getBlockById($(primoBloccoNT).attr("id"));
                var bloccoPrecedente, titBloccoPrec, tipo, thisTipo, tipoBlocco, thistipo; //debugger;
                var bloccoprima;
                //quit = true;
                var t1, t2, t3, t4, t3inDom, b, thisTit, thisSection, T2precedente;
                var titPrec;
                var successivo = this.getNextBlock(thisBlock);
                var titoloPrecedente, T1precedente, BloccoAttuale, BloccoSuccessivo;
                if (primoBloccoNT != undefined) {
                    if (primoBloccoNT.id == "0001") {
                        primoBloccoNT = this.getBlockById($(primoBloccoNT).attr("0001"));
                        bloccoPrecedente = this.getPreviusBlock(primoBloccoNT);
                    } else {
                        bloccoPrecedente = this.getPreviusBlock(primoBloccoNT);

                    }
                }
                titBloccoPrec = this.getBlockById(bloccoPrecedente.titolo);
                tipo = bloccoPrecedente.tipo_sez + bloccoPrecedente.indice;
                thisTipo = thisBlock.tipo_sez + thisBlock.indice;
                quit = false;

                do {
                    if (bloccoPrecedente != undefined) {
                        tipoBlocco = bloccoPrecedente.tipo_sez;
                        if ($("#" + bloccoPrecedente.id).length <= 0) {
                            //Se il BP non è nel DOM
                            if (!(titBloccoPrec === undefined) && $("#" + titBloccoPrec.id).length > 0) {
                                // alert("CASO1");
                                titoloPrecedente = bloccoPrecedente.titolo;
                                T1precedente = this.getBlockById(titoloPrecedente);
                                while (T1precedente.titolo != "") {
                                    thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                    BloccoAttuale = T1precedente.titolo;
                                    thisTit = this.getBlockById(BloccoAttuale);
                                    if (thisTit.indice == "2") {
                                        T2precedente = thisTit;
                                    }
                                    T1precedente = this.getBlockById(BloccoAttuale);
                                }
                                thisBlock = this.getPreviusBlock(primoBloccoNT);

                                if (T1precedente.id != "0001") {
                                    if (thisBlock.indice == 2 || thisBlock.indice == 1) {
                                        // alert("in cima ai blocchi");
                                        if (bloccoPrecedente.tipo_sez == "I") {
                                            // alert("intro OK");
                                            if (thisBlock.id == "0001") {
                                                //primo blocco
                                                T2precedente = this.getBlockById(bloccoPrecedente.titolo);
                                                $(bloccoPrecedente.contenuti).insertAfter("#" + T2precedente.id);
                                            } else {
                                                $(bloccoPrecedente.contenuti).insertAfter("#" + titBloccoPrec.id);
                                            }
                                            quit = true;
                                        }
                                        if (bloccoPrecedente.tipo_sez == "B") {
                                            // alert("TIPO BP= B  OK");
                                            nextBlock = this.getNextBlock(bloccoPrecedente);
                                            //  alert("blocco prec è un blocco");                                          
                                            var tutto;
                                            if (nextBlock.tipo_sez == "T" && nextBlock.indice == "1") {
                                                // alert("tutto da creare QUI????  OK");
                                                //cambio di blocco, tutto da creare
                                                //cerco il primo t3 prec
                                                if (primoBloccoNT.tipo_sez == "I") {
                                                    thisBlock = primoBloccoNT;
                                                    titolo = this.getBlockById(bloccoPrecedente.titolo);
                                                    thisT1 = this.getBlockById(thisBlock.titolo);
                                                    if (thisT1.indice == "2") {
                                                        thisT1 = this.getBlockById(thisT1.titolo);
                                                    }
                                                    if (titolo.indice == "4") {
                                                        titolo = this.getBlockById(titolo.titolo);
                                                    }
                                                    if (titolo.indice == "3") {
                                                        //c è t3
                                                    }
                                                    if (titolo.indice == "2") {
                                                        //non c è t3,c'è t2
                                                    }
                                                    if (titolo.indice == "1") {
                                                        //non c è t3,non c'è t2,siamo a t1
                                                        if (titolo.isInDom) {
                                                            //creo blocchi sotto t1
                                                        } else {
                                                            //creo tutto da nuovo t1
                                                            $(titolo.contenuti).insertBefore("#" + thisT1.id);
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + titolo.id);
                                                        }
                                                    }


                                                } else {
                                                    if (primoBloccoNT.indice == "3") {
                                                        //   alert("entry t3");
                                                        t3 = this.getBlockById($("section")[2].id);
                                                        thisBlock = this.getBlockById($("section")[3].id);
                                                        bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                        if (bloccoPrecedente.id != t3.id) {
                                                            // alert("stampo blocchi sotto t3");
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                        } else {
                                                            // alert("cambio blocco,tutto da creare,da t1 nuovo");
                                                            thisT1 = this.getBlockById($("section")[0].id);
                                                            bloccoPrecedente = this.getPreviusBlock(thisT1);
                                                            titoloPrecedente = bloccoPrecedente.titolo;
                                                            T1precedente = this.getBlockById(titoloPrecedente);
                                                            while (T1precedente.titolo != "") {
                                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                BloccoAttuale = T1precedente.titolo;
                                                                thisTit = this.getBlockById(BloccoAttuale);
                                                                if (thisTit.indice == "2") {
                                                                    T2precedente = thisTit;
                                                                }
                                                                T1precedente = this.getBlockById(BloccoAttuale);
                                                            }
                                                            if (T2precedente != undefined) {
                                                                if (bloccoPrecedente.titolo != T2precedente.id) {

                                                                    t3 = bloccoPrecedente.titolo;
                                                                    t3 = this.getBlockById(t3);

                                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                                    while (t3.indice != "3") {
                                                                        t3 = t3.titolo;
                                                                        t3 = this.getBlockById(t3);
                                                                        if (t3 == undefined) {
                                                                            //  alert("primo t3");
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                                if (t3 != undefined) {
                                                                    tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                } else {
                                                                    tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                }
                                                            } else {
                                                                t3 = bloccoPrecedente.titolo;
                                                                t3 = this.getBlockById(t3);

                                                                // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                                while (t3.indice != "3") {
                                                                    t3 = t3.titolo;
                                                                    t3 = this.getBlockById(t3);
                                                                    if (t3 == undefined) {
                                                                        //  alert("primo t3");
                                                                        break;
                                                                    }
                                                                }
                                                                //          alert("NO T2");
                                                                if (t3 != undefined) {
                                                                    tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                } else {
                                                                    tutto = T1precedente.contenuti + bloccoPrecedente.contenuti;
                                                                }
                                                            }
                                                            $("#genera").prepend(tutto);
                                                        }
                                                    } else if (bloccoPrecedente.titolo != T2precedente.id) {
                                                        t3 = this.getBlockById(bloccoPrecedente.titolo);
                                                        // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                        while (t3.indice != "3") {
                                                            t3 = t3.titolo;
                                                            t3 = this.getBlockById(t3);
                                                            if (t3 == undefined) {
                                                                //  alert("primo t3");
                                                                break;
                                                            }
                                                        }
                                                        if (t3 == undefined) {
                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                        } else {
                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                        }
                                                    }
                                                    $("#genera").prepend(tutto);

                                                }

                                            } else {
                                                // alert("c è qualcosa OK");
                                                titoloPrecedente = bloccoPrecedente.titolo;
                                                T1precedente = this.getBlockById(titoloPrecedente);
                                                while (T1precedente.titolo != "") {
                                                    thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                    BloccoAttuale = T1precedente.titolo;
                                                    thisTit = this.getBlockById(BloccoAttuale);
                                                    if (thisTit.indice == "2") {
                                                        T2precedente = thisTit;
                                                    }
                                                    T1precedente = this.getBlockById(BloccoAttuale);
                                                }
                                                if ($("#" + bloccoPrecedente.titolo).length == 0) {
                                                    //       alert("T3 prec non in dom");
                                                    if (T2precedente == undefined) {
                                                        // alert("NON c è t2");
                                                        t3 = this.getBlockById(bloccoPrecedente.titolo);
                                                        $(t3.contenuti).insertAfter("#" + titBloccoPrec.id);
                                                        $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                    } else {
                                                        //alert("C'E' t2 OK");
                                                        var tutto;
                                                        thisBlock = this.getBlockById($("section")[3].id);
                                                        //RICERCA DEL T3
                                                        t3 = bloccoPrecedente.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        while (t3.indice != "3") {
                                                            t3 = t3.titolo;
                                                            t3 = this.getBlockById(t3);
                                                            if (t3 == undefined) {
                                                                // alert("primo t3");
                                                                break;
                                                            }
                                                        }
                                                        if (t3 != undefined) {
                                                            tutto = T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                        } else {
                                                            tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                        }
                                                        //           alert("inserisco tutto il nuovo");
                                                        $(tutto).insertAfter("#" + T1precedente.id);
                                                    }
                                                } else {
                                                    //alert("T3 prec in DOM");
                                                    if (T2precedente == undefined) {
                                                        //  alert("NON c è t2");
                                                        t3 = this.getBlockById($("section")[1].id);
                                                        thisBlock = this.getBlockById($("section")[2].id);
                                                        bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                        bloccoprima = this.getPreviusBlock(bloccoPrecedente);
                                                        if (bloccoPrecedente.id == t3.id) {
                                                            bloccoPrecedente = this.getPreviusBlock(t3);
                                                            //  alert("T3 già presente");

                                                            $(bloccoPrecedente.contenuti).insertBefore("#" + t3.id);
                                                        } else {
                                                            //  alert("T3 non presente");

                                                            $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                        }
                                                    } else {
                                                        //  alert("C'E' t2");
                                                        t3 = this.getBlockById($("section")[2].id);
                                                        thisBlock = this.getBlockById($("section")[3].id);
                                                        if (bloccoPrecedente.titolo == thisBlock.titolo) {
                                                            // alert("non in cima ai blocchi");
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                        } else {
                                                            //   alert("in cima ai blocchi");
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + T2precedente.id);
                                                            t3 = bloccoPrecedente.titolo;
                                                            t3 = this.getBlockById(t3);
                                                            $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        //alert("NON in cima al blocco OK");
                                        //devo inserire tutti i blocchi prima del T2
                                        thisBlock = this.getBlockById($("section")[2].id);
                                        bloccoPrecedente = this.getPreviusBlock(thisBlock);

                                        if (thisBlock.tipo_sez == "B") {
                                            //   alert("sono al blocco");
                                            //RICERCA DEL T3
                                            t3 = bloccoPrecedente.titolo;
                                            t3 = this.getBlockById(t3);
                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                            while (t3.indice != "3") {
                                                t3 = t3.titolo;
                                                t3 = this.getBlockById(t3);
                                                if (t3 == undefined) {
                                                    //  alert("primo t3");
                                                    break;
                                                }
                                            }

                                            if (t3 != undefined) {
                                                if ($("#" + t3.id).length == 0) {
                                                    //   alert("inserire T3");
                                                    $(t3.contenuti).insertBefore("#" + thisBlock.id);
                                                } else {
                                                    //    alert("T3 presente, inserire blocco");
                                                    tutto = bloccoPrecedente.contenuti;
                                                    if (t3 != undefined) {
                                                        $(tutto).insertAfter("#" + t3.id);
                                                    } else {
                                                        //  alert("t3 finiti guardo BP");

                                                        if (bloccoPrecedente.tipo_sez == "I") {
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + T1precedente.id);
                                                        }
                                                    }
                                                }
                                            } else {
                                                // alert("ricreo tutto OK");
                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                //RICERCA DEL T3
                                                t3 = thisBlock.titolo;
                                                t3 = this.getBlockById(t3);
                                                if (t3 != undefined) {
                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                    while (t3.indice != "3") {
                                                        t3 = t3.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 == undefined) {
                                                            //  alert("primo t3");
                                                            break;
                                                        }
                                                    }
                                                    if (t3 != undefined) {
                                                        if ($("#" + t3.id).length == 0) {
                                                            //alert("nuovo t3 da stampare OK");
                                                            $(t3.contenuti).insertAfter("#" + T1precedente.id);
                                                            $(thisBlock.contenuti).insertAfter("#" + t3.id);
                                                        }
                                                    } else {
                                                        bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);

                                                        if (bloccoPrecedente.tipo_sez == "I" || bloccoPrecedente.tipo_sez == "B") {
                                                            //alert("INTRO PRIMA DI T3 OK");
                                                            //caso in cui caricamento post ricerca

                                                            thisBlock = primoBloccoNT;
                                                            bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                            quit = true;
                                                        }
                                                        if (bloccoPrecedente.indice == "2") {
                                                            //caricamento blocchi dopo uscita ricerca
                                                            thisBlock = primoBloccoNT;
                                                            bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                            quit = true;
                                                        }
                                                    }
                                                } else {
                                                    // alert("caso giallo, ha T2+T3+ blocchi");
                                                    //T1 noto, T2noto, cerco T3
                                                    bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                    //RICERCA DEL T3
                                                    t3 = bloccoPrecedente.titolo;
                                                    t3 = this.getBlockById(t3);
                                                    while (t3.indice != "3") {
                                                        t3 = t3.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 == undefined) {
                                                            //   alert("primo t3");
                                                            break;
                                                        }
                                                    }

                                                    if (T2precedente != undefined) {
                                                        if (t3 != undefined) {
                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                        } else { //creo tutto il blocco precedente ma non c è t3

                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                        }

                                                    } else {
                                                        tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                    }
                                                    $("#genera").prepend(tutto);
                                                }
                                            }
                                        }
                                        if (thisBlock.tipo_sez == "I") {
                                            //   alert("sono alla INTRO OK");
                                            if (bloccoPrecedente.tipo_sez == "T") {
                                                if ($("#" + bloccoPrecedente.id).length == 0) {
                                                    // alert("c è il titolo da inserire prima di Intro OK");
                                                    $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                } else {
                                                    // alert("titolo già presente OK");
                                                    thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                    $(thisBlock.contenuti).insertAfter("#" + T1precedente.id);
                                                }
                                            }
                                            quit = true;
                                        }
                                        if (thisBlock.indice == "3") {
                                            if (thisBlock.titolo == bloccoPrecedente.titolo && bloccoPrecedente.tipo_sez != "I") {
                                                //  alert("blocco prima di t3 ma dopo T1 senza T2 OK");
                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                $(thisBlock.contenuti).insertAfter("#" + T1precedente.id);
                                            } else {
                                                //   alert("c è un t3");
                                                t3 = this.getBlockById($("section")[2].id);
                                                thisBlock = this.getBlockById($("section")[3].id);
                                                bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                if (bloccoPrecedente.id == t3.id) {
                                                    bloccoPrecedente = this.getPreviusBlock(t3);
                                                    if ($("#" + bloccoPrecedente.id).length == 0) {
                                                        //     alert("stampo blocco prima di T3 ")
                                                        $(bloccoPrecedente.contenuti).insertBefore("#" + t3.id);
                                                        t3 = bloccoPrecedente.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        while (t3.indice != "3") {
                                                            t3 = t3.titolo;
                                                            if (t3 == undefined) {
                                                                //     alert("primo t3");
                                                                break;
                                                            }
                                                            t3 = this.getBlockById(t3);
                                                        }
                                                        if (t3 != undefined) {
                                                            T2precedente = this.getBlockById(t3.titolo);
                                                            $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                        } else {
                                                            //     alert("cambio blocco");
                                                        }
                                                    } else {
                                                        //    alert("blocco prima di T3 già stampato");
                                                        quit = true;
                                                    }
                                                } else {
                                                    //   alert(" non simao ancora a T3");
                                                    $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                }
                                            }
                                        }
                                        if ((thisBlock.indice != "2") && (thisBlock.indice != "3") && (thisBlock.indice != "1")) {
                                            //alert("altri tit OK");                                            
                                            if ($("#" + T1precedente.id).length == 0) {
                                                thisT1 = this.getPreviusBlock(bloccoPrecedente);
                                                bloccoPrecedente = this.getPreviusBlock(thisT1);
                                                titoloPrecedente = bloccoPrecedente.titolo;
                                                T1precedente = this.getBlockById(titoloPrecedente);
                                                while (T1precedente.titolo != "") {
                                                    thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                    BloccoAttuale = T1precedente.titolo;
                                                    thisTit = this.getBlockById(BloccoAttuale);
                                                    if (thisTit.indice == "2") {
                                                        T2precedente = thisTit;
                                                    }
                                                    T1precedente = this.getBlockById(BloccoAttuale);
                                                }
                                                t3 = bloccoPrecedente.titolo;
                                                t3 = this.getBlockById(t3);
                                                // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                while (t3.indice != "3") {
                                                    t3 = t3.titolo;
                                                    if (t3 == undefined) {
                                                        //     alert("primo t3");
                                                        break;
                                                    }
                                                    t3 = this.getBlockById(t3);
                                                }
                                                if (T2precedente != undefined) {
                                                    //   alert("c è T2");
                                                    if (t3 != undefined) {
                                                        //  alert("c è t3");
                                                        tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                    } else {
                                                        //  alert("non c è t3");
                                                        tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                    }
                                                } else {
                                                    //  alert("non c è t2");
                                                    if (t3 != undefined) {
                                                        // alert("c è t3");
                                                        tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                    } else {
                                                        // alert("non c è t3");
                                                        tutto = T1precedente.contenuti + bloccoPrecedente.contenuti;
                                                    }
                                                }
                                                $("#genera").prepend(tutto);
                                            } else {
                                                if (bloccoPrecedente.indice == "2") {
                                                    // alert("in cima a T2, cambio tit OK");
                                                    bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                    t3 = bloccoPrecedente.titolo;
                                                    t3 = this.getBlockById(t3);
                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                    while (t3.indice != "3") {
                                                        t3 = t3.titolo;
                                                        if (t3 == undefined) {
                                                            //     alert("primo t3");
                                                            break;
                                                        }
                                                        t3 = this.getBlockById(t3);
                                                    }
                                                    if (T2precedente != undefined) {
                                                        // alert("T2 presente");
                                                        if (t3 != undefined) {
                                                            //     alert("c è anche t3");
                                                            tutto = T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                        } else {
                                                            //     alert("non c è t3");
                                                            tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                        }
                                                    }
                                                    $(tutto).insertAfter("#" + T1precedente.id);
                                                }
                                                if (bloccoPrecedente.indice == "3") {
                                                    bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                    t3 = bloccoPrecedente.titolo;
                                                    t3 = this.getBlockById(t3);
                                                    if (bloccoPrecedente.tipo_sez == "I") {
                                                        var intro = bloccoPrecedente;
                                                        titolo = this.getBlockById(bloccoPrecedente.titolo);
                                                        if (titolo.indice == "1") {
                                                            $(intro.contenuti).insertAfter("#" + T1precedente.id);
                                                            //intro di t1
                                                        }
                                                    } else {
                                                        if (t3 != undefined) {
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                if (t3 == undefined) {
                                                                    //     alert("primo t3");
                                                                    break;
                                                                }
                                                                t3 = this.getBlockById(t3);
                                                            }
                                                            if (T2precedente != undefined) {
                                                                // alert("T2 presente");
                                                                if (t3 != undefined) {
                                                                    //     alert("c è anche t3");
                                                                    tutto = T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                } else {
                                                                    //     alert("non c è t3");
                                                                    tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                }
                                                            } else {
                                                                if (t3 != undefined) {
                                                                    //     alert("c è anche t3");
                                                                    tutto = t3.contenuti + bloccoPrecedente.contenuti;
                                                                } else {
                                                                    //     alert("non c è t3");
                                                                    tutto = bloccoPrecedente.contenuti;
                                                                }
                                                            }
                                                            $(tutto).insertAfter("#" + T1precedente.id);
                                                        }
                                                    }


                                                    quit = true;
                                                    /* t3 = bloccoPrecedente.titolo;
                                                     t3 = this.getBlockById(t3);
                                                     if (t3.indice == "4") {
                                                         t4 = t3;
                                                         console.log("bloccoPrecedente", bloccoPrecedente);
                                                         console.log("thisBlock", thisBlock);
                                                         console.log("t4", t4);
                                                         //è presente un t4,devo attaccarlo sotto t3 precedente

                                                     }*/

                                                } else {
                                                    if ($("#" + bloccoPrecedente.id).length == 0) {
                                                        $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                    }
                                                    quit = true;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    //  alert("problem ci passa da qui??????");
                                    t3 = bloccoPrecedente.titolo;
                                    t3 = this.getBlockById(t3);
                                    while (t3.indice != "3") {
                                        t3 = t3.titolo;
                                        t3 = this.getBlockById(t3);
                                        if (t3 == undefined) {
                                            //            alert("primo t3");
                                            break;
                                        }
                                    }
                                    if (bloccoPrecedente.tipo_sez == "I") {
                                        thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                        $(bloccoPrecedente.contenuti).insertAfter("#" + thisBlock.id);
                                    } else {

                                        if (T2precedente != undefined) {
                                            if ($("#" + t3.id).length == 0) {
                                                // alert("inserire t3");
                                                $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                if ($("#" + bloccoPrecedente.id).length == 0) {
                                                    $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                }
                                            } else {
                                                $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                            }
                                        } else {

                                            t1 = this.getBlockById(t3.titolo);
                                            tutto = t3.contenuti + bloccoPrecedente.contenuti;
                                            $(tutto).insertAfter("#" + t1.id);
                                            /*$(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);*/
                                        }

                                    }
                                }
                                quit = true;
                            } else if (!(titBloccoPrec === undefined) && $("#" + titBloccoPrec.titolo).length > 0) {
                                //   alert("CASO 2");
                                titoloPrecedente = bloccoPrecedente.titolo;
                                T1precedente = this.getBlockById(titoloPrecedente);
                                bloccoprima = this.getPreviusBlock(bloccoPrecedente);
                                if (primoBloccoNT.id != bloccoPrecedente.titolo) {
                                    if ($("#" + titBloccoPrec.id).length == 0) {
                                        //t3 in dom
                                        // alert("c è t3");
                                        while (T1precedente.titolo != "") {
                                            thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                            BloccoAttuale = T1precedente.titolo;
                                            thisTit = this.getBlockById(BloccoAttuale);
                                            if (thisTit.indice == "2") {
                                                T2precedente = thisTit;
                                            }
                                            T1precedente = this.getBlockById(BloccoAttuale);
                                        }
                                        if (T2precedente != undefined) {
                                            //BP ha un t2
                                            //alert("c è T2");
                                            thisBlock = this.getBlockById($("section")[3].id);
                                            bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                            bloccoprima = this.getPreviusBlock(bloccoPrecedente);
                                            if ($("#" + bloccoPrecedente.id).length == 0) {
                                                //alert("B non è nel DOM");
                                                $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                quit = true;
                                            } else {
                                                //  alert("B è nel dom")
                                                bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                $(titBloccoPrec.contenuti).insertBefore("#" + primoBloccoNT.id);
                                                $(bloccoPrecedente.contenuti).insertBefore("#" + primoBloccoNT.id);
                                                quit = true;
                                            }
                                        } else {
                                            // alert("problema qui");
                                            thisBlock = this.getBlockById($("section")[2].id);
                                            bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                            bloccoprima = this.getPreviusBlock(bloccoPrecedente);
                                            if ($("#" + bloccoPrecedente.id).length == 0) {
                                                // alert("B non è nel DOM");
                                                $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                quit = true;
                                            } else {
                                                //alert("B è nel dom")
                                                bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                $(titBloccoPrec.contenuti).insertBefore("#" + primoBloccoNT.id);
                                                $(bloccoPrecedente.contenuti).insertBefore("#" + primoBloccoNT.id);
                                                quit = true;
                                            }
                                        }
                                    }

                                }
                                quit = true;

                            } else {
                                // alert("CASO 3: " + bloccoPrecedente.tipo_sez);

                                if (thisBlock.id == "0001" && T1precedente == undefined) {
                                    // alert("PROBLEMS");
                                    thisBlock = this.getBlockById($("section")[2].id);
                                    t3 = bloccoPrecedente.titolo;
                                    t3 = this.getBlockById(t3);

                                    while (t3.indice != "3") {
                                        t3 = t3.titolo;
                                        t3 = this.getBlockById(t3);
                                        if (t3 == undefined) {
                                            //            alert("primo t3");
                                            break;
                                        }
                                    }

                                    if (t3 != undefined) {
                                        if ($("#" + t3.id).length == 0) {
                                            //  alert("nuovo t3 da stampare");
                                            tutto = t3.contenuti + bloccoPrecedente.contenuti;
                                            $(tutto).insertBefore("#" + thisBlock.id);
                                        } else {
                                            //   alert("stampo blocco sotto t3")
                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                        }
                                    } else {
                                        //  alert("qui problema intro dopo id1 OK")
                                        $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                    }
                                }
                                if (bloccoPrecedente.tipo_sez == "B") {
                                    nextBlock = this.getNextBlock(bloccoPrecedente);
                                    thisT1 = nextBlock;
                                    var thisT2, thisB;
                                    thisB = this.getBlockById($("section")[1].id);

                                    if (thisB.indice == "") { //  alert("sono al blocco");
                                        bloccoPrecedente = this.getPreviusBlock(thisB);
                                        if (bloccoPrecedente.indice == "1") {
                                            // alert("tutto da creare OK");
                                            bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                            var tutto;
                                            titoloPrecedente = bloccoPrecedente.titolo;
                                            T1precedente = this.getBlockById(titoloPrecedente);
                                            while (T1precedente.titolo != "") {
                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                BloccoAttuale = T1precedente.titolo;
                                                thisTit = this.getBlockById(BloccoAttuale);
                                                if (thisTit.indice == "2") {
                                                    T2precedente = thisTit;
                                                }
                                                T1precedente = this.getBlockById(BloccoAttuale);
                                            }
                                            if (T2precedente != undefined) {
                                                if (bloccoPrecedente.titolo != T2precedente.id) {
                                                    t3 = bloccoPrecedente.titolo;
                                                    t3 = this.getBlockById(t3);
                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                    while (t3.indice != "3") {
                                                        t3 = t3.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 == undefined) {
                                                            //            alert("primo t3");
                                                            break;
                                                        }
                                                    }
                                                }
                                                tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                $("#genera").prepend(tutto);
                                            } else {
                                                //cambio di blocco, tutto da creare
                                                //cerco il primo t3 prec
                                                //       alert("blocco senza t2");
                                                t3 = this.getBlockById(bloccoPrecedente.titolo);

                                                if (t3.indice == "4") {
                                                    t4 = t3;
                                                    t3 = this.getBlockById(t4.titolo);

                                                    if (t3.indice == "1") {
                                                        //non è presente nessun titolo se non t1
                                                        t1 = t3;
                                                        tutto = t1.contenuti + bloccoPrecedente.contenuti;
                                                    }
                                                }
                                                if (t3.indice == "1") { //non è presente nessun titolo se non t1
                                                    t1 = t3;
                                                    console.log("bloccoPrecedente", bloccoPrecedente);
                                                    console.log("t3", t3);

                                                    tutto = t1.contenuti + bloccoPrecedente.contenuti;
                                                } else {

                                                    if (t3.indice != undefined) {
                                                        while (t3.indice != "3") {
                                                            t3 = t3.titolo;
                                                            t3 = this.getBlockById(t3);
                                                        }
                                                        tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                    }
                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);


                                                }
                                                $("#genera").prepend(tutto);
                                                quit = true;
                                            }

                                        }
                                        if (bloccoPrecedente.tipo_sez == "I") {
                                            //alert("caso Indice, tutto da creare OK");
                                            $(bloccoPrecedente.contenuti).insertAfter("#" + thisBlock.id);
                                        }
                                        if (bloccoPrecedente.indice == "3") {
                                            //     alert("inserire t3");
                                            t3 = bloccoPrecedente;
                                            if ($("#" + t3.id).length == 0) {
                                                //         alert("t3 non presente");
                                                $(t3.contenuti).insertAfter("#" + primoBloccoNT.id);
                                            } else {
                                                //         alert("t3 già presente");
                                            }
                                            quit = true;
                                        }
                                        if (bloccoPrecedente.indice == "4") {
                                            t4 = bloccoPrecedente;
                                            titolo = this.getBlockById(t4.titolo);
                                            $(t4.contenuti).insertAfter("#" + titolo.id);

                                            quit = true;
                                        }
                                        if (bloccoPrecedente.tipo_sez == "B") {
                                            //       alert("inserire blocco come INTRO");
                                            if (primoBloccoNT.indice == "1") {
                                                if (bloccoPrecedente.id != primoBloccoNT.id) {
                                                    if (T1precedente == undefined) {
                                                        //  alert("inserisco blocco dopo T1");

                                                        $(bloccoPrecedente.contenuti).insertAfter("#" + primoBloccoNT.id);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (thisB.indice == "2" || thisB.indice == "3" || thisB.indice == "4") {
                                        // alert("sono al T2/3 scendo di 1  OK");
                                        //se c' è stampo il blocco dopo t3, 
                                        //se no stampo dopo T2
                                        //il bp punta a prima del t2 dobbiamo puntarea a blocco
                                        thisBlock = this.getBlockById($("section")[2].id);
                                        if (thisBlock.tipo_sez == "T" && thisBlock.indice == "3") {
                                            //c è T3
                                            //        alert("c è T3");
                                            if (T2precedente != undefined) {
                                                t3 = this.getBlockById($("section")[2].id);
                                                thisBlock = this.getBlockById($("section")[3].id);
                                                bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                if (bloccoPrecedente.id == t3.id) {
                                                    //       alert("T3 già presente");
                                                    bloccoPrecedente = this.getPreviusBlock(t3);
                                                    t3 = this.getBlockById(bloccoPrecedente.titolo);
                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                    while (t3.indice != "3") {
                                                        t3 = t3.titolo;
                                                        t3 = this.getBlockById(t3);
                                                    }
                                                    if ($("#" + t3.id).length == 0) {
                                                        //             alert("inserisco nuovo t3");
                                                        $(t3.contenuti).insertAfter("#" + T2precedente.id);

                                                    } else {
                                                        //         alert("nuovo t3 già presente")
                                                    }
                                                    $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                } else {
                                                    //alert("T3 non presente");
                                                    $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                }
                                            } else {
                                                // alert("T2 già presente,t3 c è, inserisco i blocchi OK");
                                                // $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                thisBlock = this.getBlockById($("section")[3].id);
                                                bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                if (primoBloccoNT != undefined) {
                                                    if (primoBloccoNT.indice == "3") {
                                                        //  alert("this t3");
                                                        t3 = primoBloccoNT;
                                                        if (t3.id == bloccoPrecedente.id) {
                                                            //    alert("siamo in cima al t3");
                                                            bloccoPrecedente = this.getPreviusBlock(t3);
                                                            t3 = this.getBlockById(bloccoPrecedente.titolo);
                                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                t3 = this.getBlockById(t3);
                                                            }
                                                            if ($("#" + t3.id).length == 0) {
                                                                //                      alert("inserisco nuovo t3");
                                                                $(t3.contenuti).insertBefore("#" + primoBloccoNT.id);

                                                            } else {
                                                                //      alert("nuovo t3 già presente")

                                                            }
                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);

                                                        } else {
                                                            // alert("non in cima a t3, blocchi da inserire");
                                                            $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                        }
                                                    } else {
                                                        // alert("QUI CI ENTRIAMO di grazia?  OK")
                                                        thisBlock = this.getBlockById($("section")[3].id);
                                                        t3 = this.getBlockById($("section")[2].id);
                                                        bloccoPrecedente = this.getPreviusBlock(thisBlock);
                                                        if (t3.id == bloccoPrecedente.id) {
                                                            //   alert("siamo in cima al t3");
                                                            bloccoPrecedente = this.getPreviusBlock(t3);
                                                            //RICERCA DEL T3
                                                            t3 = bloccoPrecedente.titolo;
                                                            t3 = this.getBlockById(t3);
                                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 == undefined) {
                                                                    //  alert("primo t3");
                                                                    break;
                                                                }
                                                            }
                                                            if (t3 != undefined) {
                                                                if ($("#" + t3.id).length == 0) {
                                                                    //    alert("inserisco nuovo t3");
                                                                    //////////////////////////////////////////////////////////////
                                                                    if (primoBloccoNT.indice == "1") {
                                                                        //  alert("entry T1");
                                                                        thisTit = this.getPreviusBlock(thisBlock);
                                                                        if (thisTit.indice != "1") {
                                                                            $(t3.contenuti).insertBefore("#" + thisTit.id);
                                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                                        }
                                                                    } else if (primoBloccoNT.indice == "2") {
                                                                        //    alert("entry T2");
                                                                        if (t3 != undefined) {
                                                                            tutto = t3.contenuti + bloccoPrecedente.contenuti;
                                                                        } else {
                                                                            tutto = bloccoPrecedente.contenuti;
                                                                        }
                                                                        $(tutto).insertAfter("#" + primoBloccoNT.id);

                                                                    } else {
                                                                        //   alert("non entry T2");
                                                                        $(t3.contenuti).insertBefore("#" + primoBloccoNT.id);
                                                                        $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                                    }
                                                                } else {
                                                                    //   alert("nuovo t3 già presente")
                                                                }
                                                            } else {
                                                                //alert("t3 finiti OK");
                                                                if (bloccoPrecedente.tipo_sez == "I") {
                                                                    //alert(" Intro di T2 OK");
                                                                    T2precedente = this.getBlockById($("section")[1].id);
                                                                    $(bloccoPrecedente.contenuti).insertAfter("#" + T2precedente.id);
                                                                } else {
                                                                    // alert("altro non I, tutto da creare OK");
                                                                    if (primoBloccoNT.indice == "2") {
                                                                        //alert("ENTRY di T2, salgo a T1 e ricreo tutto il prec OK");
                                                                        thisT1 = this.getPreviusBlock(bloccoPrecedente);
                                                                        bloccoPrecedente = this.getPreviusBlock(thisT1);
                                                                    } else {
                                                                        bloccoPrecedente = this.getPreviusBlock(primoBloccoNT);
                                                                    }
                                                                    titoloPrecedente = bloccoPrecedente.titolo;
                                                                    T1precedente = this.getBlockById(titoloPrecedente);
                                                                    while (T1precedente.titolo != "") {
                                                                        thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                        BloccoAttuale = T1precedente.titolo;
                                                                        thisTit = this.getBlockById(BloccoAttuale);
                                                                        if (thisTit.indice == "2") {
                                                                            T2precedente = thisTit;
                                                                        }
                                                                        T1precedente = this.getBlockById(BloccoAttuale);
                                                                    }
                                                                    t3 = bloccoPrecedente.titolo;
                                                                    t3 = this.getBlockById(t3);
                                                                    if (t3 != undefined) {
                                                                        // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                                        while (t3.indice != "3") {
                                                                            t3 = t3.titolo;
                                                                            t3 = this.getBlockById(t3);
                                                                            if (t3 == undefined) {
                                                                                //           alert("primo t3");
                                                                                break;
                                                                            }
                                                                        }
                                                                        if (T2precedente != undefined) {
                                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                        } else {
                                                                            //console.log("bloccoPrecedente", bloccoPrecedente);
                                                                            /*titolo = this.getBlockById(bloccoPrecedente.titolo);*/

                                                                            tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                        }

                                                                    }
                                                                    $("#genera").prepend(tutto);
                                                                }
                                                            }

                                                        } else {
                                                            //alert("non in cima a t3, blocchi da inserire");
                                                            $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {

                                            //alert("non c è T3");
                                            bloccoPrecedente = this.getPreviusBlock(thisBlock);

                                            if (thisBlock.titolo != bloccoPrecedente.id && bloccoPrecedente.indice != "2") {
                                                //alert("altri T != T2");
                                                $(bloccoPrecedente.contenuti).insertBefore("#" + thisBlock.id);
                                                quit = true;
                                            } else {
                                                //alert("siamo in cima, si cambia blocco OK");
                                                bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                nextBlock = this.getNextBlock(bloccoPrecedente);
                                                if (nextBlock.tipo_sez == "T" && nextBlock.indice == "2") { //   alert("cambio di T2");

                                                    if (T2precedente != undefined) {
                                                        tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                        $(tutto).insertAfter("#" + T1precedente.id);
                                                    } else {
                                                        //    alert("cerco tutto e inserisco")
                                                        if (T2precedente != undefined) {
                                                            //     alert("conosco t2");
                                                            titoloPrecedente = bloccoPrecedente.titolo;
                                                            T1precedente = this.getBlockById(titoloPrecedente);
                                                            while (T1precedente.titolo != "") {
                                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                BloccoAttuale = T1precedente.titolo;
                                                                thisTit = this.getBlockById(BloccoAttuale);
                                                                if (thisTit.indice == "2") {
                                                                    T2precedente = thisTit;
                                                                }

                                                            }
                                                            T1precedente = this.getBlockById(BloccoAttuale);
                                                            tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                            $(tutto).insertAfter("#" + T1precedente.id);
                                                        } else {
                                                            //alert("non conosco t2 OK");
                                                            thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                            titoloPrecedente = bloccoPrecedente.titolo;
                                                            T2precedente = this.getBlockById(titoloPrecedente);

                                                            if (thisBlock.indice == "5") {
                                                                //cerco t1,t2,t3
                                                                titolo = this.getBlockById(thisBlock.titolo);

                                                                if (titolo.indice == "3") {
                                                                    //c'è t3
                                                                }
                                                                if (titolo.indice == "2") {
                                                                    //non c'è t3,c'è t2                                                                                                                            
                                                                    t1 = this.getBlockById(titolo.titolo);
                                                                    if ($(t1).length > 0) {
                                                                        //t1 è nel dom
                                                                        t2 = titolo;
                                                                        tutto = t2.contenuti + bloccoPrecedente.contenuti;
                                                                        $(tutto).insertAfter("#" + t1.id);
                                                                    }
                                                                }
                                                                if (titolo.indice == "1") {
                                                                    //non c'è t3,non c'è t2 siamo a t1
                                                                }
                                                                quit = true;
                                                            } else {
                                                                if (T2precedente != undefined) {
                                                                    if (T2precedente.indice != "2") {
                                                                        T2precedente = this.getBlockById(T2precedente.titolo);
                                                                    }
                                                                }
                                                                //RICERCA DEL T3
                                                                if (bloccoPrecedente.indice == "1") {
                                                                    bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                                }
                                                                t3 = bloccoPrecedente.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 != undefined) {
                                                                    // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                                    while (t3.indice != "3") {
                                                                        t3 = t3.titolo;
                                                                        t3 = this.getBlockById(t3);
                                                                        if (t3 == undefined) {
                                                                            //            alert("primo t3");
                                                                            break;
                                                                        }
                                                                    }

                                                                    if (t3 == undefined) {
                                                                        if (bloccoPrecedente.tipo_sez == "I") {
                                                                            //        alert("intro qui");
                                                                            T1precedente = primoBloccoNT;
                                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + T1precedente.id);

                                                                            quit = true;
                                                                        } else {

                                                                            if (primoBloccoNT.indice == "1") {
                                                                                //         alert("entry in T1 no t3");
                                                                                T1precedente = primoBloccoNT;
                                                                                var T1int = parseInt(T1precedente.id);
                                                                                var BPint = parseInt(bloccoPrecedente.id);

                                                                                if (parseInt(bloccoPrecedente.id) < parseInt(T1precedente.id)) {
                                                                                    //        alert("siamo in cima, si cambia blocco entry T1 no t3");
                                                                                    bloccoPrecedente = this.getPreviusBlock(primoBloccoNT);
                                                                                    titoloPrecedente = bloccoPrecedente.titolo;
                                                                                    T1precedente = this.getBlockById(titoloPrecedente);
                                                                                    while (T1precedente.titolo != "") {
                                                                                        thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                                        BloccoAttuale = T1precedente.titolo;
                                                                                        thisTit = this.getBlockById(BloccoAttuale);
                                                                                        if (thisTit.indice == "2") {
                                                                                            T2precedente = thisTit;
                                                                                        }
                                                                                        T1precedente = this.getBlockById(BloccoAttuale);
                                                                                    }
                                                                                    t3 = bloccoPrecedente.titolo;
                                                                                    t3 = this.getBlockById(t3);
                                                                                    if (t3 != undefined) {
                                                                                        while (t3.indice != "3") {
                                                                                            t3 = t3.titolo;
                                                                                            t3 = this.getBlockById(t3);
                                                                                            if (t3 == undefined) {
                                                                                                //           alert("primo t3");
                                                                                                break;
                                                                                            }
                                                                                        }
                                                                                    }


                                                                                    if (T2precedente != undefined) {
                                                                                        //     alert("C'è T2");
                                                                                        if (t3 != undefined) {
                                                                                            //         alert("C'è T3");
                                                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                                        } else {
                                                                                            //       alert("NON C'è T3");
                                                                                            tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                                        }

                                                                                    } else {
                                                                                        //    alert("NON C'è T2");
                                                                                        if (t3 != undefined) {
                                                                                            //     alert("C'è T3");
                                                                                            tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                                        } else {
                                                                                            //       alert("NON C'è T3");
                                                                                            tutto = T1precedente.contenuti + bloccoPrecedente.contenuti;
                                                                                        }
                                                                                    }
                                                                                    $("#genera").prepend(tutto);
                                                                                    quit = true;
                                                                                } else {

                                                                                    tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                                    $(tutto).insertAfter("#" + T1precedente.id);
                                                                                }
                                                                                quit = true;
                                                                            }
                                                                            if (primoBloccoNT.indice == "2") {
                                                                                //c'è tutto ricreo tutto da t1+t2+blocco
                                                                                titolo = this.getBlockById(bloccoPrecedente.titolo)
                                                                                thisBlock = primoBloccoNT;
                                                                                if (titolo.indice == "4") {
                                                                                    titolo = this.getBlockById(titolo.titolo);

                                                                                    if (titolo.indice == "1") {
                                                                                        //presente solo T1 e blocco                                                                                
                                                                                        if (thisBlock.indice == "2") {
                                                                                            t1 = this.getBlockById(thisBlock.titolo);

                                                                                            $(titolo.contenuti).insertBefore("#" + t1.id);
                                                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + titolo.id);
                                                                                        }
                                                                                    }
                                                                                    if (titolo.indice == "2") {

                                                                                        t1 = this.getBlockById(titolo.titolo);
                                                                                        if (t1.isInDom) {
                                                                                            // console.log("t1 in dom");

                                                                                            t2 = titolo;
                                                                                            tutto = t2.contenuti + bloccoPrecedente.contenuti;
                                                                                            $(t2.contenuti).insertAfter("#" + t1.id);
                                                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t2.id);
                                                                                        } else {
                                                                                            //console.log("t1 non in dom");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            } else {
                                                                                //  alert("cerco nuovo T2,sotto T1");
                                                                                if (listato == "AM") {
                                                                                    thisBlock = primoBloccoNT;
                                                                                    tutto = T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                                    $(tutto).insertBefore("#" + thisBlock.id);
                                                                                }

                                                                            }
                                                                        }
                                                                    } else {
                                                                        //  alert("t3 non undef!!!")
                                                                        if (primoBloccoNT.indice == "1") {
                                                                            titoloPrecedente = bloccoPrecedente.titolo;
                                                                            T1precedente = this.getBlockById(titoloPrecedente);
                                                                            while (T1precedente.titolo != "") {
                                                                                thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                                BloccoAttuale = T1precedente.titolo;
                                                                                thisTit = this.getBlockById(BloccoAttuale);
                                                                                if (thisTit.indice == "2") {
                                                                                    T2precedente = thisTit;
                                                                                }
                                                                                T1precedente = this.getBlockById(BloccoAttuale);
                                                                            }
                                                                            //    alert("entry in T1 sì t3");
                                                                            T1precedente = primoBloccoNT;
                                                                            tutto = T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                            $(tutto).insertAfter("#" + T1precedente.id);
                                                                        }
                                                                        if (primoBloccoNT.indice == "2") {
                                                                            thisBlock = primoBloccoNT;
                                                                            tutto = T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                            $(tutto).insertBefore("#" + thisBlock.id);
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            quit = true;
                                                        }
                                                    }
                                                } else if (nextBlock.tipo_sez == "T" && nextBlock.indice == "3") {
                                                    //alert("siamo in cima, si cambia blocco da T3 OK");
                                                    titoloPrecedente = bloccoPrecedente.titolo;
                                                    T1precedente = this.getBlockById(titoloPrecedente);
                                                    if (T1precedente != undefined) {
                                                        while (T1precedente.titolo != "") {
                                                            thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                            BloccoAttuale = T1precedente.titolo;
                                                            thisTit = this.getBlockById(BloccoAttuale);
                                                            if (thisTit.indice == "2") {
                                                                T2precedente = thisTit;
                                                            }
                                                            T1precedente = this.getBlockById(BloccoAttuale);
                                                        }
                                                        //RICERCA DEL T3
                                                        t3 = bloccoPrecedente.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 != undefined) {
                                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 == undefined) {
                                                                    //   alert("primo t3");
                                                                    break;
                                                                }
                                                            }
                                                            if (t3 != undefined) {
                                                                tutto = t3.contenuti + bloccoPrecedente.contenuti;
                                                            } else {

                                                                tutto = bloccoPrecedente.contenuti;
                                                            }
                                                            $(tutto).insertAfter("#" + T1precedente.id);
                                                        } else {
                                                            tutto = bloccoPrecedente.contenuti;
                                                            $(tutto).insertAfter("#" + T1precedente.id);
                                                        }
                                                    } else {
                                                        //alert("problema QUIzzzzzzzzzzzz OK");
                                                        bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                        titoloPrecedente = bloccoPrecedente.titolo;
                                                        T1precedente = this.getBlockById(titoloPrecedente);
                                                        while (T1precedente.titolo != "") {
                                                            thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                            BloccoAttuale = T1precedente.titolo;
                                                            thisTit = this.getBlockById(BloccoAttuale);
                                                            if (thisTit.indice == "2") {
                                                                T2precedente = thisTit;
                                                            }
                                                            T1precedente = this.getBlockById(BloccoAttuale);
                                                        }
                                                        //RICERCA DEL T3
                                                        t3 = bloccoPrecedente.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 != undefined) {
                                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 == undefined) {
                                                                    alert("primo t3");
                                                                    break;
                                                                }
                                                            }
                                                            if (t3 == undefined) {
                                                                //       alert("manca T3");
                                                                if ($("#" + T1precedente.id).length == 0) {
                                                                    if ($("#" + T2precedente.id).length == 0) {
                                                                        alert("inserire T1 e T2 prec");
                                                                        tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                    }
                                                                }
                                                            } else {
                                                                //     alert(" T3 è presente");
                                                                if (T2precedente != undefined) {
                                                                    tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                } else {
                                                                    tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                                }
                                                            }
                                                        }
                                                        $("#genera").prepend(tutto);
                                                    }
                                                } else if ((nextBlock.tipo_sez == "T" && nextBlock.indice != "3") || (nextBlock.tipo_sez == "T" && nextBlock.indice != "2")) {
                                                    // alert("altri tipi di tit non si cambia blocco! OK");
                                                    if (bloccoPrecedente.tipo_sez == "I") {
                                                        alert("Problema INTRO");
                                                    } else if (bloccoPrecedente.tipo_sez == "T") {
                                                        //alert("Problema T1,siamo in cima, tutto da creare");
                                                        bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente);
                                                        titoloPrecedente = bloccoPrecedente.titolo;
                                                        T1precedente = this.getBlockById(titoloPrecedente);
                                                        while (T1precedente.titolo != "") {
                                                            thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                            BloccoAttuale = T1precedente.titolo;
                                                            thisTit = this.getBlockById(BloccoAttuale);
                                                            if (thisTit.indice == "2") {
                                                                T2precedente = thisTit;
                                                            }
                                                            T1precedente = this.getBlockById(BloccoAttuale);
                                                        }
                                                        t3 = bloccoPrecedente.titolo;
                                                        t3 = this.getBlockById(t3);
                                                        if (t3 != undefined) {
                                                            // $(t3.contenuti).insertAfter("#" + T2precedente.id);
                                                            while (t3.indice != "3") {
                                                                t3 = t3.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 == undefined) {
                                                                    //   alert("primo t3");
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (T2precedente == undefined) {
                                                            //     alert("manca T2");
                                                            if (t3 == undefined) {
                                                                //      alert("manca T3");
                                                            } else {
                                                                //         alert(" T3 è presente");
                                                                tutto = T1precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                            }
                                                        } else {
                                                            //     alert("c'è T2");
                                                            if (t3 == undefined) {
                                                                //  alert("manca T3");
                                                                if ($("#" + T1precedente.id).length == 0) {
                                                                    if ($("#" + T2precedente.id).length == 0) {
                                                                        //   alert("inserire T1 e T2 prec");
                                                                        tutto = T1precedente.contenuti + T2precedente.contenuti + bloccoPrecedente.contenuti;
                                                                    }
                                                                }
                                                            } else {
                                                                //         alert(" T3 è presente");
                                                                tutto = T1precedente.contenuti + T2precedente.contenuti + t3.contenuti + bloccoPrecedente.contenuti;
                                                            }
                                                        }
                                                        $("#genera").prepend(tutto);

                                                    } else {
                                                        // alert("blocchi diversi da I o T OK");
                                                        thisB = this.getPreviusBlock(thisBlock);
                                                        if ($("#" + thisB.id).length == 0) {
                                                            //alert("inserisco tit diverso da 123 OK");
                                                            $(thisB.contenuti).insertBefore("#" + thisBlock.id);
                                                        } else {
                                                            //alert("inserisco blocchi sotto t diversi 123 ")
                                                            titoloPrecedente = bloccoPrecedente.titolo;
                                                            T1precedente = this.getBlockById(titoloPrecedente);
                                                            if (T1precedente != undefined) {
                                                                while (T1precedente.titolo != "") {
                                                                    thisBlock = this.getPreviusBlock(bloccoPrecedente);
                                                                    BloccoAttuale = T1precedente.titolo;
                                                                    thisTit = this.getBlockById(BloccoAttuale);
                                                                    if (thisTit.indice == "2") {
                                                                        T2precedente = thisTit;
                                                                    }
                                                                    T1precedente = this.getBlockById(BloccoAttuale);
                                                                }
                                                                //RICERCA DEL T3
                                                                t3 = bloccoPrecedente.titolo;
                                                                t3 = this.getBlockById(t3);
                                                                if (t3 != undefined) {
                                                                    while (t3.indice != "3") {
                                                                        t3 = t3.titolo;
                                                                        t3 = this.getBlockById(t3);
                                                                        if (t3 == undefined) {
                                                                            //        alert("primo t3");
                                                                            break;
                                                                        }
                                                                    }
                                                                    if ($("#" + bloccoPrecedente.id).length == 0) {
                                                                        //alert("in fondo");
                                                                        if (t3 != undefined) {
                                                                            $(bloccoPrecedente.contenuti).insertAfter("#" + t3.id);
                                                                        } else {
                                                                            if (T2precedente != undefined) {
                                                                                $(bloccoPrecedente.contenuti).insertAfter("#" + T2precedente.id);
                                                                            } else {
                                                                                $(bloccoPrecedente.contenuti).insertAfter("#" + T1precedente.id);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            quit = true;
                                        }
                                    }
                                }
                                quit = true;
                            }
                            switch (tipoBlocco) {
                                case "T":
                                    $("#" + bloccoPrecedente.id).addClass("titolo");
                                    break;
                                case "B":
                                    $("#" + bloccoPrecedente.id).addClass("block");
                                    break;
                                case "I":
                                    $("#" + bloccoPrecedente.id).addClass("intro");
                                    break;
                            }
                        } else {
                            bloccoPrecedente = this.getPreviusBlock(bloccoPrecedente); //Rieseguo il ciclo dando a BP il blocco che lo precede
                            quit = false;
                        }
                    } else {
                        quit = true;
                    }
                }
                while (quit == false);
                $body.scrollTop = $("section:first").offset().top;

                // if (listato == "AM") {

                /*  $("#genera section").each(function(numElem, Elem) {
                      if (!$(Elem).hasClass("titolo")) {
                          noTitleBlocks.push($(Elem)); //noTitleBlocks = vettore di selettori a tutti i blocchi senza classe titolo
                      }
                      /*console.log("genera section", $("#genera section"));
                      console.log("Elem", Elem);
                      console.log("noTitleBlocks", noTitleBlocks);
                  });
                  primoBloccoNT = noTitleBlocks[0]; //Primo blocco non titolo della pagina

                  primoBloccoNT = this.getBlockById($(primoBloccoNT).attr("id"));
                  var bloccoPrecedente, titBloccoPrec, tipo, thisTipo, tipoBlocco, thistipo; //debugger;
                  var bloccoprima;
                  //quit = true;
                  var t1, t2, t3, t3inDom, t2inDom, t1inDom, tutto, b, thisTit, thisSection, T2precedente;
                  var titPrec;
                  var successivo = this.getNextBlock(thisBlock);
                  var titoloPrecedente, T1precedente, BloccoAttuale, BloccoSuccessivo;
                  var quit = false;
                  do {
                      //console.log("primoBloccoNT", primoBloccoNT);
                      //T1,T2,T3,B
                      //N=nuovo,S=stesso T,V=non presente
                      //Caso T1=S, T2=N,t3=N
                      newBlock = this.getPreviusBlock(bloccoPrecedente); //primo blocco prec
                      //console.log("thisBlock", newBlock);
                      //console.log("precedente", this.getPreviusBlock(primoBloccoNT));
                      thisBlock = newBlock;
                      titPrec = this.getBlockById(thisBlock.titolo);

                      //bloccoPrecedente = this.getPreviusBlock(thisBlock);
                      if ($("#" + thisBlock.id).length <= 0) {
                          if (titPrec.indice == "3") {
                              t3 = titPrec;
                              //controllare se cambia t2
                              t2 = this.getBlockById(titPrec.titolo);
                              thisTit = this.getBlockById(primoBloccoNT.titolo);
                              //cambia t2
                              //console.log("thisTit", thisTit);
                              if (thisTit.indice == "2") {
                                  if (thisTit != t2) {
                                      t2inDom = thisTit;
                                      //controllo se cambia t1
                                      t1inDom = this.getBlockById(t2inDom.titolo);
                                      t1 = this.getBlockById(t2.titolo);

                                      if ((t1inDom.indice == "1") && (t1.indice == "1") && (t1inDom.id != t1.id)) {
                                          //cambio t1
                                          quit = true;
                                      }
                                      if ((t2inDom.indice == "2") && (t2.indice == "2") && (t2inDom.id != t2.id)) {

                                          //t1 uguale , cambio t2
                                          /* $(t2.contenuti).insertAfter("#" + t1.id);
                                           //inserisco nuovo t3 e blocco
                                           $(t3.contenuti).insertAfter("#" + t2.id)
                                           $(thisBlock.contenuti).insertAfter("#" + t3.id);

                                          tutto = t2.contenuti + t3.contenuti + thisBlock.contenuti;
                                          $(tutto).insertAfter("#" + t1.id);

                                          quit = true;
                                      }


                                      /*  if ((t3inDom.indice == "3") && (t3.indice == "3") && (t3inDom.id != t3.id)) {
                                            console.log("bloccoPrecedente", bloccoPrecedente);
                                            console.log("titPrec: ", titPrec);
                                            console.log("thisBlock", thisBlock);
                                        }
                                  } else {
                                      quit = true;
                                  }
                              } else {

                                  quit = true;
                              }

                          }
                      } else {
                          thisBlock = this.getPreviusBlock(thisBlock); //Rieseguo il ciclo dando a BP il blocco che lo precede
                          console.log("thisBlock", thisBlock);

                          //controllo se blocco precedente ha tit diverso
                          if (thisBlock.indice == "") { //è un blocco
                              // t3inDom = t3;
                              t3 = this.getBlockById(thisBlock.titolo);
                              console.log("t3", t3);
                              $(thisBlock.contenuti).insertAfter("#" + t3.id);

                              /* if ((t3.indice == "3") && (t3.id == t3inDom.id)) {
                                   //t3 già presente e uguale, isnerisco blocco dopo t3
                                   $(thisBlock.contenuti).insertAfter("#" + t3inDom.id);



                                   /*console.log("t3", t3)
                                   console.log("t3inDom", t3inDom);

                               }

                          }

                          quit = true;
                      }*/
                //controllo se blocco precedente ha tit diverso
                /*if (bloccoPrecedente.indice == "") { //è un blocco
                            t3inDom = t3;
                            t3 = this.getBlockById(bloccoPrecedente.titolo);
                            if ((t3.indice == "3") && (t3.id == t3inDom.id)) {
                                //t3 già presente e uguale, isnerisco blocco dopo t3
                                $(bloccoPrecedente.contenuti).insertAfter("#" + t3inDom.id);
                                thisBlock = bloccoPrecedente;


                                /*console.log("t3", t3)
                                console.log("t3inDom", t3inDom);

                            }

                        }

                    }
                    while (quit == false);*/






            }

        }, {
            key: "hasFather",
            value: function hasFather(block, ret) {
                if (ret != undefined && ret == "ret") {
                    if (this.getBlockById(block.titolo) != undefined) {
                        return this.getBlockById(block.titolo);
                    } else {
                        return false;
                    }
                } else {
                    if (this.getBlockById(block.titolo) != undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }, {
            key: "getBlockLevel",
            value: function getBlockLevel(block) {
                var hasFatherRes = false;
                var currBlock = block;
                var levelCounter = 0;

                do {
                    if (this.hasFather(currBlock)) {
                        levelCounter++;
                        currBlock = this.hasFather(currBlock, "res");
                        hasFatherRes = true;
                    } else {
                        hasFatherRes = false;
                    }
                } while (hasFatherRes);

                return levelCounter;
            }
        }, {
            key: "size",
            get: function get() {
                return this.blocchi.length;
            }
        }]);

        return Blocks;
    }();






$("#idx_button2").click(function() {
    if ($("#genera").hasClass("SIDMode") == false) {
        if (listato == undefined || listato == "AB") {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link1).attr("href", "AB/css/menuAB.css");
            $(link2).removeAttr("href");
        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link1).attr("href", "AM/css/menuAM.css");
            $(link2).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("libroCDE");
            $(link1).attr("href", "CDE/css/menuCDE.css");
            $(link2).removeAttr("href");
        }
        if (listato == "aulaAB") {
            var link1 = document.getElementsByClassName("menuaulaAB");
            var link2 = document.getElementsByClassName("libroaulaAB");
            $(link1).attr("href", "AB/css/menuaulaAB.css");
            $(link2).removeAttr("href");

        }
        if (listato == "aulaAM") {
            var link1 = document.getElementsByClassName("menuaulaAM");
            var link2 = document.getElementsByClassName("libroaulaAM");
            $(link1).attr("href", "AM/css/menuaulaAM.css");
            $(link2).removeAttr("href");
        }
        if (listato == "aulaCDE") {
            var link1 = document.getElementsByClassName("menuaulaCDE");
            var link2 = document.getElementsByClassName("libroaulaCDE");
            $(link1).attr("href", "AM/css/menuaulaAM.css");
            $(link2).removeAttr("href");
        }


        $("#genera").addClass("SIDMode");
        $("#genera").html("");

        setTimeout(function() {
            preventFadeBar();
            indexBuilder();
        }, 50);


    }
});


function indexBuilder() {
    var indexComponent = [];
    var indexType;
    var sectx = sezioni["sezioni"];

    $body.css("display", "none");

    if (self.frameElement != undefined) {
        var close_book_ext = self.frameElement.ownerDocument.documentElement.children[1].children.id_DivLayEse.children[0].children[3].children[1];
        $(close_book_ext).css("display", "none");
    }


    for (var i = 0; i < allBlocks.size; i++) {
        indexType = sectx[i].indice;


        switch (indexType) {

            case "1":
                //Dato che è di tipo 1 wrappo il contenuto nell'accordion
                var idxBlock = sectx[i]; //Wrap contenuto di un nuovo blocco identico
                idxBlock.contenuti = wrap(idxBlock.contenuti);
                //Dopodichè lo aggiungo al vettore dell'indice
                idxBlock.contenuti = idxBlock.contenuti.splice(8, 0, " id = " + idxBlock.id + " ");
                indexComponent.push(idxBlock);
                break;
            case "2":
                var idxBlock = sectx[i]; //Wrap contenuto di un nuovo blocco identico
                idxBlock.contenuti = wrapLevel2(idxBlock.contenuti);
                idxBlock.contenuti = idxBlock.contenuti.splice(8, 0, " id = " + idxBlock.id + " ");
                indexComponent.push(idxBlock);
                break;
            case "3":
                var idxBlock = sectx[i];
                idxBlock.contenuti = wrapLinker(idxBlock.contenuti);

                idxBlock.contenuti = idxBlock.contenuti.splice(8, 0, " id = " + idxBlock.id + " ");
                indexComponent.push(idxBlock);
                break;
        }

    }



    for (var i = 0; i < indexComponent.length; i++) {
        indexType = indexComponent[i].indice;
        frecciaAlfabeto(indexComponent[i].id);
        contenitoreAlfabeto(indexComponent[i].id, listato);
        switch (indexType) {
            case "1":
                var contenitore = indexComponent[i].contenuti;
                contenitore = contenitore.replace("<section>", "<section><div class='contenitore1'>");
                contenitore = contenitore.replace("<div class='contenitore1'>", "<div class='contenitore1'><div class='freccia1'><a href='#'  alt='freccia1' class='T1' id='T1." + indexComponent[i].id + "' type='submit' style='visibility:visible';></a></div>");
                $("#genera").append(contenitore);
                //var frecce=$("#" + indexComponent[i].id).show().append("</div>");
                break;

            case "2":

                var contenitore = indexComponent[i].contenuti;
                contenitore = contenitore.replace("<section>", "<section><div class='contenitore2'>");
                contenitore = contenitore.replace("<div class='contenitore2'>", "<div class='contenitore2'><div class='freccia2'><a href='#'  alt='freccia2' class='T2' id='T2." + indexComponent[i].id + "' type='submit' style='visibility:visible';></a></div>");
                $("#genera").append(contenitore);
                frecce2 = $("#" + indexComponent[i].id).hide();
                /*$("#genera").append(indexComponent[i].contenuti);
                frecce2=$("#" + indexComponent[i].id).hide().append("<div class='freccia2' ';><a href='#' class='T2' type='submit' >");*/
                break;

            case "3":
                var contenitore = indexComponent[i].contenuti;
                contenitore = contenitore.replace("<section>", "<section><div class='contenitore3'>");

                /*var frecce3=$("#genera").append("<img src='Intro/img/arrow_right_green.png' alt='logo' class='T3' type='submit' style='visibility:hidden';>");*/
                $("#genera").append(indexComponent[i].contenuti);
                frecce3 = $("#" + indexComponent[i].id).hide().append("<div class='freccia3' style='visibility:hidden';><a href='#' class='T3' type='submit' >");
                break;
        }


    }

    $body.fadeIn(1000);
    $barra_menu.fadeIn().stop();
    $barra_menu.hide();
    $barra_menu.css("visibility", "hidden");
    $barra_menu.css("display", "none");
    var screenWidth = $(window).width() * window.devicePixelRatio;
    var screenHeight = $(window).height() * window.devicePixelRatio;
    console.log("scr_height", screenHeight);
    console.log("scr_width", screenWidth);
    if (screenWidth >= 1920 && screenHeight >= 1200) {
        if ($("#genera").hasClass("SIDMode")) {
            $("#genera").css("margin", "125px 0px");
        }

    }

    $(".l1").click(function(e) {
        //debugger;
        //Mostra tutto se non attivo fino al prossimo accordion di livello 1 (non mostra quelli di livello 3)
        //nascondi fino al prossimo accordion di livello 1
        if ($(e.currentTarget).hasClass("active") == false) {
            $(e.currentTarget).addClass("active");
            /*Scroll di pagina per centrare il titolo*/
            var id = $(e.currentTarget).context.id;
            if (id == undefined) {
                id = 0800;
            }
            $('html,body').animate({
                scrollTop: $('#' + id).offset().top - 5
            }, 'slow');

            var cont = 0;
            var curr = e.currentTarget,
                next, stop = false;
            var toShow = [];
            var toHide = [];
            var linker, l2 = [];
            var flag = 0;
            do {
                cont++;
                next = $(curr).next()[0];
                curr = next;
                //unica condizione di uscita è trovare un l1, parto da l1 e mi porto subito a next
                //se next è l2 o linker faccio:
                if ((($(curr).hasClass("l2")) && (flag == 0)) || (flag == 2)) {

                    //se next è l2 , la prima volta entro, dalla seconda solo se sono flaggato
                    flag = 2;
                    toShow.push(curr);
                    //curr = next;
                }
                if ((($(curr).hasClass("linker")) && (flag == 0)) || (flag == 3)) {
                    //se next è un linker ,prima volta entro poi solo se sono flaggato come linker, quindi posso iterare su me stesso
                    flag = 3;
                    toShow.push(curr);
                }

                if ($(curr).hasClass("l1") || next === undefined) {
                    stop = true;
                }
                if ($(curr).hasClass(undefined) || next == undefined) {
                    stop = true;
                }
            }
            while (stop == false);
            // console.log(l2);
            //è qui che decido cosa far vedere ma facilmente grazie ai flag.
            var cont = 0;

            for (var i = 0; i < toShow.length - 1; i++) {
                if (($("#" + toShow[i].id).hasClass("l2")) && (flag == 2)) {
                    $("#" + toShow[i].id).slideDown();
                    cont++;
                } else if (flag == 3) {
                    if (id == undefined) {
                        id = 800;
                    }
                    var linker = document.getElementsByClassName("linker");

                    $("#" + toShow[i].id).slideDown();

                }
            }
            if (cont == 1) {
                next = $(curr).next()[0];
                if ($(next).hasClass("linker") || next == undefined) {
                    for (var i = 0; i < toShow.length; i++) {
                        $("#" + toShow[i].id).slideDown();
                    }
                }
            }

        } else if ($(e.currentTarget).hasClass("active")) {
            $(e.currentTarget).removeClass("active");
            var curr = e.currentTarget,
                next, stop;
            var toHide = [];

            do {
                next = $(curr).next()[0];
                if ($(next).hasClass("l1") || $(next).hasClass("l2")) {
                    if ($(next).hasClass("l2")) {
                        toHide.push(next);
                        curr = next;
                        stop = false;
                    } else {

                        stop = true;
                    }
                } else {
                    toHide.push(next);
                    curr = next;
                    stop = false;
                    if (next == undefined) {
                        toHide.push(next);
                        stop = true;
                    }
                }
            } while (stop == false);
            for (var i = 0; i < toHide.length; i++) {
                $("#" + toHide[i].id).slideUp();
            }

            if ($(toHide[toHide.length]).hasClass("active")) {
                $("#" + toHide[toHide.length].id + ".l2").trigger("click");
            }
        }
    });

    $(".l2").click(function(e) {
        //debugger;

        if ($(e.currentTarget).hasClass("active") == false) {

            $(e.currentTarget).addClass("active");
            var id = $(e.currentTarget)[0].previousElementSibling.id;
            $('html,body').animate({
                scrollTop: $('#' + id).offset().top - 5

            }, 'slow');
            // $('html,body').css("margin-top", "5px");


            var curr = e.currentTarget,
                next, stop;
            var toShow = [];
            do {
                next = $(curr).next()[0];
                if ($(next).hasClass("l1") || $(next).hasClass("l2") || next === undefined) {
                    stop = true;

                    if ($(curr).hasClass("l1") || $(curr).hasClass("l2")) {
                        redirectTo($(e.currentTarget).attr("id"));
                    }
                } else {

                    toShow.push(next);
                    curr = next;
                    stop = false;

                }
            } while (stop == false);

            for (var i = 0; i < toShow.length; i++) {

                $("#" + toShow[i].id).slideDown();

            }
        } else if ($(e.currentTarget).hasClass("active")) {

            $(e.currentTarget).removeClass("active");


            var curr = e.currentTarget,
                next, stop;
            var toHide = [];

            do {
                next = $(curr).next()[0];
                if ($(next).hasClass("l1") || $(next).hasClass("l2") || next === undefined) {

                    //toHide.push(next);

                    stop = true;
                } else {
                    toHide.push(next);
                    curr = next;
                    stop = false;
                }
            } while (stop == false);


            for (var i = 0; i < toHide.length; i++) {
                $("#" + toHide[i].id).slideUp();
            }
        }
    });

    $(".linker").click(function(e) {

        $body.css("display", "none");
        console.log($(e.currentTarget).attr("id"))
        console.log("e.currentTarget", e.currentTarget);
        redirectTo($(e.currentTarget).attr("id"));
    });


    $(".T1").click(function(e) {

        var eid = e.currentTarget.id.replace("T1.", "");

        $body.css("display", "none");

        redirectTo(eid)
    });

    $(".T2").click(function(e) {

        var eid = e.currentTarget.id.replace("T2.", "");
        console.log("iedT1:", eid);
        $body.css("display", "none");


        redirectTo(eid);
    });
    if (listato == "AM") {
        $("#0011").click(function(e) {
            var eid = e.currentTarget.id.replace("T2.", "");
            console.log("iedT1:", eid);
            redirectTo(eid);
        });
        $("#0219").click(function(e) {
            var eid = e.currentTarget.id.replace("T2.", "");
            console.log("iedT1:", eid);
            redirectTo(eid);
        });
        $("#0265").click(function(e) {
            var eid = e.currentTarget.id.replace("T2.", "");
            console.log("iedT1:", eid);
            redirectTo(eid);
        });

    }
}

function wrapSublink(xstring) {
    xstring = xstring.splice(8, 0, " class = 'sub-linker'");
    return xstring;
}

function wrapSrclink(xstring) {
    xstring = xstring.splice(8, 0, " class = 'src-linker'");
    return xstring;
}

function wrap(xstring) {

    var wrapperStart = "<button class='accordion l1'>";
    var wrapperEnd = "</button>"
    var titolo = new Array("veicoli ", "strada", "segnali", "equipaggiamento", "norme", "documenti", "incidenti", "soccorso", "sicurezza", "autoveicolo", "titolo1", "titolo2", "titolo3");
    for (var i = 0; i < titolo.length; i++) {
        xstring = xstring.replace(titolo[i], "Menu_" + titolo[i]);
    }
    return wrapperStart + xstring + wrapperEnd;
}

function wrapLevel2(xstring) {

    var wrapperStart = "<button class='accordion l2'>";
    var wrapperEnd = "</button>"

    var titolo = new Array("veicoli ", "strada ", "segnali ", "equipaggiamento ", "norme ", "documenti ", "incidenti ", "soccorso  ", "sicurezza ", "autoveicolo ", "titolo1", "titolo2", "titolo3");
    for (var i = 0; i < titolo.length; i++) {
        xstring = xstring.replace(titolo[i], "Menu_" + titolo[i]);
    }

    return wrapperStart + xstring + wrapperEnd;
}

function wrapLinker(xstring) {

    var titolo = new Array("veicoli ", "strada ", "segnali ", "equipaggiamento ", "norme ", "documenti ", "incidenti ", "soccorso ", "sicurezza ", "autoveicolo ", "titolo1", "titolo2", "titolo3");
    for (var i = 0; i < titolo.length; i++) {
        xstring = xstring.replace(titolo[i], "Menu_" + titolo[i]);
        xstring = xstring.replace("Posizione dei Menu_veicoli sulla carreggiata", "Posizione dei veicoli sulla carreggiata");
    }

    xstring = xstring.splice(8, 0, " class = 'linker'");
    return xstring;
}

//Funzioni ausiliarie per l'indice
function pushAfter(pArray, pArrayPosition, elmntToAdd) {
    var firstPiece = [],
        secondPiece = [];

    for (var i = 0; i <= pArrayPosition; i++) {
        firstPiece.push(pArray[i]);
    }

    for (var i = pArrayPosition + 1; i < pArray.length; i++) {
        secondPiece.push(pArray[i]);
    }

    firstPiece.push(elmntToAdd);

    return firstPiece.concat(secondPiece);
}

function redirectTo(sParam) {

    if (listato == "AB" || listato == undefined) {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=AB";
            location.href = url;
            // window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=AB");
        }
        if (sParam.length == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=AB";
            location.href = url;
            // window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=AB");
        }
    }
    if (listato == "AM") {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=AM";
            location.href = url;
            //window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=AM");
        }
        if (sParam.length == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=AM";
            location.href = url;
            //window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=AM");
        }
    }
    if (listato == "CDE") {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=CDE";
            location.href = url;
            //   window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=CDE");
        }
        if (sParam.length == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=CDE";
            location.href = url;
            //   window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=CDE");
        }
    }
    if (listato == "aulaAB") {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=aulaAB";
            location.href = url;
            //window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=aulaAB");
        }
        if (sParam.length == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=aulaAB";
            location.href = url;
            //window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=aulaAB");
        }
    }
    if (listato == "aulaAM") {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=aulaAM";
            location.href = url;
            //window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=aulaAM");
        }
        if (sParam == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=aulaAM";
            location.href = url;
            //window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=aulaAM");
        }
    }
    if (listato == "aulaCDE") {
        if (sParam.length == 4) {
            var url = "index.html?id=" + sParam + "&tit=yes&lis=aulaCDE";
            location.href = url;
            // window.location.assign("index.html?id=" + sParam + "&tit=yes&lis=aulaCDE");
        }
        if (sParam == 5) {
            var url = "index.html?blocco=" + sParam + "&tit=yes&lis=aulaCDE";
            location.href = url;
            //window.location.assign("index.html?blocco=" + sParam + "&tit=yes&lis=aulaCDE");
        }
    }
}

function compare(a, b) {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
}

//Eventi
//1)Check il tipo di device utilizzato
var deviDetect = new MobileDetect(window.navigator.userAgent);
var device = deviceType(deviDetect);

switch (device) {
    case "desktop":

        $(window).bind('wheel', function(e) {

            var scroll = $(window).scrollTop();
            //	console.log("scroll",scroll);

            if (scroll < 1) {

                if ($("#genera").hasClass("SIDMode") == false)
                    allBlocks.loadPrevius();

            }

            if (isScrolledIntoView($('section:last'))) {
                if ($("#genera").hasClass("SIDMode") == false)
                    allBlocks.loadNext();
            }
        });

        $(window).scroll(function() {

            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {

                if (scroll < 1) {

                    if ($("#genera").hasClass("SIDMode") == false)
                        allBlocks.loadPrevius();
                }

                if (isScrolledIntoView($('section:last'))) {
                    if ($("#genera").hasClass("SIDMode") == false)
                        allBlocks.loadNext();

                }
            }

        });

        var myElem = $("#genera")[0];
        var mc = new Hammer(myElem, {
            touchAction: "auto",
        });
        mc.get("pan").set({
            direction: Hammer.DIRECTION_VERTICAL,
            treshold: 10
        });
        mc.on("panup pandown", function(ev) {
            if (ev.type == "panup") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadNext();
                }
                var viewPosY = $("section:last").offset();
                Pancounter = 0;
                console.log(viewPosY);

            } else if (ev.type == "pandown") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadPrevius();
                }
            }
        });
        break;

    case "phone":
        console.log("Phone");
        var myElem = $("#genera")[0];
        var mc = new Hammer(myElem, {
            touchAction: "auto",
        });
        mc.get("pan").set({
            direction: Hammer.DIRECTION_VERTICAL,
            treshold: 10
        });
        mc.on("panup pandown", function(ev) {
            if (ev.type == "panup") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadNext();
                }
                var viewPosY = $("section:last").offset();
                Pancounter = 0;
            } else if (ev.type == "pandown") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadPrevius();
                }
            }
        });
        break;

    case "tablet":
        console.log("Tablet");
        var myElem = $("#genera")[0];
        var mc = new Hammer(myElem, {
            touchAction: "auto",
        });
        mc.get("pan").set({
            direction: Hammer.DIRECTION_VERTICAL,
            treshold: 10
        });
        mc.on("panup pandown", function(ev) {
            if (ev.type == "panup") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadNext();
                }
                var viewPosY = $("section:last").offset();
                Pancounter = 0;
                console.log(viewPosY);

            } else if (ev.type == "pandown") {
                if ($("#genera").hasClass("SIDMode") == false) {
                    allBlocks.loadPrevius();
                }
            }
        });
        break;
}



function deviceType(md) {
    var xRet = 'desktop';
    if (md.mobile()) {
        if (md.phone()) {
            xRet = 'phone';

        }
        if (md.tablet()) {
            xRet = 'tablet';
        }
        if (md.os() == 'WindowsPhoneOS') {
            xRet = 'phone';
        }
    }
    return xRet;
}


function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) == (elemTop <= docViewBottom));
}





//INIZIO FUNZIONI DI VISUALIZZAZIONE E USABILITY DELLA BARRA MENU

function vis_menu(barra) {

    $(document).on("keyup", function(e) {
        var code = e.keyCode || e.which;
        console.log("codice:", code);
        switch (code) {
            case 27: //Tasto ESC
                if (cerca != undefined) {
                    var url = "index.html?id=" + lastblockid + "&tit=yes&lis=" + listato + "&menu=1";
                    location.href = url;
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
                            console.log("id_cont", id_cont);

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
            console.log("matches: ", matches);
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

    if (tutti[0] != undefined) {

        for (var j = 0; j < tutti.length; j++) {

            if (blockId == tutti[j]) {
                id = blockId;
                window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 0);
                return;
            } else {
                if (id == undefined) {
                    id_pars = parseInt(blockId);
                    tutti_pars = parseInt(tutti[j]);

                    if (tutti_pars > id_pars) {
                        id = tutti[j];
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 0);
                        return;
                    } else {

                        if (j == tutti.length - 1) {

                            id = tutti[0];
                            window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + input + "&menu=1&pos=" + 0);
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
                    window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont);
                    return;
                } else {

                    if (j == tutti.length - 1) {
                        id = tutti[0];
                        pos++;
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont);
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
                        window.location.assign("index.html?id=" + id + "&lis=" + listato + "&tit=yes&search=" + cerca + "&menu=1&pos=" + pos + "&ultimo=" + cont);
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

function gesture() {
    var deviDetect = new MobileDetect(window.navigator.userAgent);
    var device = deviceType(deviDetect);
    if (device == 'tablet' || device == 'phone') {
        var myElem = $("#genera")[0];
        var mc = new Hammer(myElem, {
            touchAction: "auto",
        });
        mc.get("pan").set({
            direction: Hammer.DIRECTION_HORIZONTAL,
            treshold: 10,
            pointers: 1
        });
        mc.on("panleft panright", function(ev) {
            if (ev.deltaY >= 0 && ev.deltaY <= 30) {
                if (ev.type == "panleft") {
                    var nav = document.getElementsByClassName("dropdown");
                    $(nav).removeClass("open");
                    Pancounter = 0;
                } else if (ev.type == "panright") {
                    var nav = document.getElementsByClassName("dropdown");
                    $(nav).addClass("open");
                }
                Pancounter = 0;
            }
            return;
        });
    }
}

function chiudi() {
    vis_menu(0);
    if (ricerca_attiva == true) {
        if (listato == "AB" || listato == undefined) {
            var link1 = document.getElementsByClassName("menuAB");
            var link2 = document.getElementsByClassName("libroAB");
            $(link1).removeAttr("href");
        }
        if (listato == "AM") {
            var link1 = document.getElementsByClassName("menuAM");
            var link2 = document.getElementsByClassName("libroAM");
            $(link1).removeAttr("href");
        }
        if (listato == "CDE") {
            var link1 = document.getElementsByClassName("menuCDE");
            var link2 = document.getElementsByClassName("menuCDE");
            $(link1).removeAttr("href");
        }
        window.location.assign("index.html?id=" + lastblockid + "&tit=yes&lis=" + listato);
    }
}

function tastiera() {
    var scrivi = document.getElementById("search-in");
    $(scrivi).focus();
}

/*Attivando la funzione Sillabare abbiamo la possibilità anche con chrome di avere la sillabazione */
//sillabare();

/*Aggiunge una classe per modificare i css in modo specifico*/
function frecciaAlfabeto(indexComponent) {
    var f1 = document.getElementsByClassName("freccia1");
    var f2 = document.getElementsByClassName("freccia2");
    var f3 = document.getElementsByClassName("freccia3");
    $(f1[0]).addClass("A");
    $(f2[0]).addClass("A");
    $(f3[0]).addClass("A");
    $(f1[1]).addClass("B");
    $(f2[1]).addClass("B");
    $(f3[1]).addClass("B");
    $(f1[2]).addClass("C");
    $(f2[2]).addClass("C");
    $(f3[2]).addClass("C");
    $(f1[3]).addClass("D");
    $(f2[3]).addClass("D");
    $(f3[3]).addClass("D");
    $(f1[4]).addClass("E");
    $(f2[4]).addClass("E");
    $(f3[4]).addClass("E");
    $(f1[5]).addClass("F");
    $(f2[5]).addClass("F");
    $(f3[5]).addClass("F");
    $(f1[6]).addClass("G");
    $(f2[6]).addClass("G");
    $(f3[6]).addClass("G");
    $(f1[7]).addClass("H");
    $(f2[7]).addClass("H");
    $(f3[7]).addClass("H");
    $(f1[8]).addClass("I");
    $(f2[8]).addClass("I");
    $(f3[8]).addClass("I");
    $(f1[9]).addClass("J");
    $(f2[9]).addClass("J");
    $(f3[9]).addClass("J");
}

function contenitoreAlfabeto(indexComponent, listato) {
    var c1 = document.getElementsByClassName("contenitore1");
    var c2 = document.getElementsByClassName("contenitore2");
    var c3 = document.getElementsByClassName("contenitore3");
    /*Questa parte di codice da' i colori ai vari titoli dell' indice*/
    if ((listato == "AB") || (listato == "aulaAB") || (listato == undefined)) {
        $(c1[0]).addClass("A");
        $(c2[0]).addClass("A");
        $(c3[0]).addClass("A");
        $(c1[1]).addClass("B");
        $(c2[1]).addClass("B");
        $(c3[1]).addClass("B");
        $(c1[2]).addClass("C");
        $(c2[2]).addClass("C");
        $(c3[2]).addClass("C");
        $(c1[3]).addClass("D");
        $(c2[3]).addClass("D");
        $(c3[3]).addClass("D");
        $(c1[4]).addClass("E");
        $(c2[4]).addClass("E");
        $(c3[4]).addClass("E");
        $(c1[5]).addClass("F");
        $(c2[5]).addClass("F");
        $(c3[5]).addClass("F");
        $(c1[6]).addClass("G");
        $(c2[6]).addClass("G");
        $(c3[6]).addClass("G");
        $(c1[7]).addClass("H");
        $(c2[7]).addClass("H");
        $(c3[7]).addClass("H");
        $(c1[8]).addClass("I");
        $(c2[8]).addClass("I");
        $(c3[8]).addClass("I");
        $(c1[9]).addClass("J");
        $(c2[9]).addClass("J");
        $(c3[9]).addClass("J");
    } else if ((listato == "AM") || (listato = "aulaAM")) {
        $(c1[0]).addClass("A"); //Verde Chiaro
        $(c1[1]).addClass("B"); //Marrone
        $(c1[2]).addClass("C"); //Blue
        $(c1[3]).addClass("D"); //Giallo
        $(c1[4]).addClass("E"); //Verde scuro
        $(c1[5]).addClass("F"); //Rosso
        $(c1[6]).addClass("G"); //Blu grigio
        $(c1[7]).addClass("I"); //Arancione
        $(c1[8]).addClass("J"); //Grigio
        $(c2[0]).addClass("B");
        $(c2[1]).addClass("B");
        $(c2[2]).addClass("B");
        $(c2[3]).addClass("H");
        $(c2[4]).addClass("H");
    }
}



function margini(blockId) {
    $("#marginSX").css("display", "block");
    $("#marginDX").css("display", "block");
    console.log("id", blockId);
    var tit1 = document.getElementsByClassName("titolo1");
    var sezione = document.getElementsByTagName("section");
    var margine_destro = ($(sezione).innerWidth() - $(tit1).innerWidth()) / 2;
    var nav = document.getElementsByClassName("dropdown");
    var nav = document.getElementsByClassName("dropdown");
    var divSx = document.getElementById("marginSX");
    $(divSx).css("position", "fixed");
    $(divSx).css("width", margine_destro);
    $(divSx).css("left", "0%");
    $(divSx).css("top", "0%");
    $(divSx).css("height", "100%");
    $(divSx).click(function() {
        if ($(nav).hasClass("open") == false) {
            $(nav).addClass("open");
        } else {
            $(nav).removeClass("open");
        }
    });
    var divDx = document.getElementById("marginDX");
    $(divDx).css("position", "fixed");
    $(divDx).css("width", margine_destro);
    $(divDx).css("top", "1%");
    $(divDx).css("right", "0");
    $(divDx).css("height", "100%");
    $(divDx).click(function() {
        if ($(nav).hasClass("open") == false) {
            $(nav).addClass("open");
        } else {
            $(nav).removeClass("open");
        }
    });
}

/*Funzione di chiusura modale se clicki ovunque*/
$(function() {
    $('body').on('click', '.in', function() {
        $(".modal").modal('hide');
        $(".modal").removeClass("in");
        $(".modal").css("display", "none");
    });

});

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

function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj["e" + type + fn] = fn;
        obj[type + fn] = function() { obj["e" + type + fn](window.event); }
        obj.attachEvent("on" + type, obj[type + fn]);
    }
}


function dynamicLayout() {
    var screenWidth = $(window).width() * window.devicePixelRatio;
    var screenHeight = $(window).height() * window.devicePixelRatio;

    console.log("width", screenWidth);
    if (screenWidth <= 640) {
        $(".pubblicazione").text("AM '19");
        $("#search-in").attr('placeholder', 'Cerca...');
        $(".next-search").text("Next");
    }
    if (screenWidth > 641 && screenWidth <= 800) {
        $(".pubblicazione").text("AM '19");
        $("#search-in").attr('placeholder', 'Cerca...');
        $(".next-search").text("Next");
    }
    if (screenWidth > 800 && screenWidth <= 1600) {
        $(".pubblicazione").text("Manuale AM '19");
        $("#search-in").attr('placeholder', 'Cerca nel libro...');
        $(".next-search").text("Next");
    }
    if (screenWidth > 1281) {
        $(".btn-search").click(function() {
            $(".box").css("visibility", "visible");
        });
    }



}

function preventFadeBar() {
    $barra_menu.css("display", "none");
    $barra_menu.hide();
    $(window).scroll(function() {
        // alert("scroll");
        $barra_menu.fadeIn().stop();
        $barra_menu.css("display", "none");

    });
}

function uscitaLibro() {
    var oggetto = self.frameElement;
    var contenitore_libro;
    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        contenitore_libro = self.frameElement.parentElement.parentElement;
    } else {
        contenitore_libro = self.frameElement.parentElement;
    }
    console.log("contenitore_libro", contenitore_libro);

    if (($(contenitore_libro).attr("id") == "contenitore_libro") || ($(contenitore_libro).attr("id") == "libro_menu")) {
        var container_libro = contenitore_libro;
    }
    if (self.frameElement != null) {
        //   $(container_libro).css("display", "none");
        $(container_libro).fadeOut("slow", "linear", function() {
            $(oggetto).remove();
        });
    } else {
        console.log("Sei fuori dall'ambiente Mediaweb");
    }
}

function loadImg() {
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });
}

function chiudiLoader() {
    if ((navigator.userAgent.match(/Android/i) || (navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPad/i))))) {
        if (self.frameElement != null) {
            console.log("SELF", self);
            var loader = self.frameElement.ownerDocument.children[0].children[1].children.id_DivLayEse.childNodes[1].children[1];
            $(loader).css("display", "none");
        } else {
            console.log("Sei fuori dall'ambiente Mediaweb");
        }
    }
}