$(document).ready(function () {
    sect = sezioni["sezioni"];
    $("#preview").val(JSON.stringify(sect, null, 2));
});


$("#go").click(function () {
    var arg_blk, blocco, listato, affermazione, pubblicazione, pagina, tipo_sez, indice, segnale, nascosto, contenuti;
    var data = [];
    arg_blk = $("#arg_blk").val();
    blocco = $("#blocco").val();
    listato = $("#listato").val();
    affermazione = $("#affermazione").val();
    pubblicazione = $("#pubblicazione").val();
    pagina = $("#pagina").val();
    tipo_sez = $("#tipo_sez").val();
    indice = $("#indice").val();
    segnale = $("#segnale").val();
    nascosto = $("#nascosto").val();
    contenuti = $("#contenuti").val();

    var newSection = {
        "id": getLastID(sect),
        "arg_blk": arg_blk,
        "blocco": blocco,
        "listato": listato,
        "affermazione": affermazione,
        "pubblicazione": pubblicazione,
        "pagina": pagina,
        "tipo_sez": tipo_sez,
        "indice": indice,
        "segnale": segnale,
        "nascosto": nascosto,
        "contenuti": contenuti
    }

    sect.push(newSection);

    $("#preview").val(JSON.stringify(sect, null, 2));

    $("input").val("");

});

function getLastID(xsezioni) {
    var len = xsezioni.length;
    var lastid = parseInt(xsezioni[len - 1].id);
    return lastid++;
}
