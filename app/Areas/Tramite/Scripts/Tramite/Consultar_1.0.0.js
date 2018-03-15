$(document).ready(function () {
    //loadPartial();
    loadPage();
    //loadGrids();
    GenerarAnio();
});
function GenerarAnio() {
    var min_year = parseInt(2017);
    var max_year = parseInt(new Date().getFullYear());

    for (var i = max_year; min_year <= i ; i--) {

        $("#ddlConiEjercicio").append(

            $("<option></option>")
                .attr("value", i)
                .text(i)

        );
    }
}


$(document).keypress(function (e) {
    var keyCode = e.which;
    var control = $(e.target).attr("id");
    var type = $(e.target).attr("type");

    if (type == 'button') return true;

});

function loadPage() {
    $(this).loadPage({
        datePicker: ['', ''], 
        numeric: [
            { name: 'txtConNumRegistro', type: 'int' },
          
        ],
        mandatory: ['txtConNumRegistro', 'ddlConiEjercicio', 'txtCaptchaCodeText'],
        focus: 'txtConNumRegistro'
    });

    $('#btnBuscarTramite').bind("click", EstadoTramite_Buscar);
    $('#GeneralEstado').hide();

    $(".accordion-content").hide();

    $(function () {
        $("#accordion").accordion();       
    });
    //$(".accordion").accordion("option", {
    //    collapsible: false,
    //    active: true
    //});
};

$(".accordion-titulo").click(function () {

    var contenido = $(this).next(".accordion-content");

    if (contenido.css("display") == "none") { //open		
        contenido.slideDown(250);
        $(this).addClass("open");
    }
    else { //close		
        contenido.slideUp(250);
        $(this).removeClass("open");
    }
});

function EstadoTramite_Buscar()
{
   
    if ($('#txtConNumRegistro').val()==''){
        $('#GeneralEstado').hide();
        $("#txtConNumRegistro").focus();
        alert("Ingrese el número de registro");
    }
    else {
        $('#GeneralEstado').show();
        $(this).searchData({
            colSearch: [
                {col: 'NUM_TRAM_DOCUMENTARIO', name: 'txtConNumRegistro', type: 'string' },
                {col: 'iEjercicio', name: 'ddlConiEjercicio', type: 'int' }
            ],
            method: $("#UrlBuscarGeneralTramite").val(),
            success: function (resultado) {

                if (resultado.TDMaeDocumento != null) {
                    if (resultado) {
                        $("#lblConNUM_TRAM_DOCUMENTARIO").html(resultado.TDMaeDocumento.NUM_TRAM_DOCUMENTARIO);
                        $("#lblConNRO_DOCUMENTO_EXTERNO").html(resultado.TDMaeDocumento.NRO_DOCUMENTO_EXTERNO);
                        $("#lblConFECHA_RECEPCION").html(resultado.TDMaeDocumento.FECHA_RECEPCION);
                        $("#lblConASUNTO").html(resultado.TDMaeDocumento.ASUNTO);
                        $("#lblConESTADO_GENERAL").html(resultado.TDMaeDocumento.ESTADO_GENERAL);
                        $("#lblConRAZON_SOCIAL").html(resultado.TDMaeDocumento.RAZON_SOCIAL);


                        /*Lista de asociados*/
                        ListaDocAsociado = []
                        for (var i = 0; i < resultado.ListaTDMaeAnexo.length; i++) {
                            //ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].Nro);
                            ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].NUM_DOCUMENTO_ANEXO);
                            ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].VFECHA);
                            ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].PERSONA);
                            ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].NUMERO_DOCUMENTO);
                            ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].CONTENIDO);
                            //ListaDocAsociado.push(resultado.ListaTDMaeAnexo[i].CLASE_DOCUMENTO);                                        
                        }

                        column = [];
                        column.push('ADJUNTO NRO');
                        column.push('FECHA INGRESO');
                        column.push('NOMBRE O RAZÓN SOCIAL');
                        column.push('DOCUMENTO');
                        column.push('ASUNTO');
                        llenarDocAsociado(column, ListaDocAsociado);


                        /*Lista del detalle*/
                        ListaDetalleDocumento = [];
                        for (var i = 0; i < resultado.ListaTDMovDocumento.length; i++) {
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].idRow);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].FECHA_DERIVACION);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].DEPENDENCIA_DESTINO);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].ESTADO);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].OBSERVACIONES);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].avance);
                            ListaDetalleDocumento.push(resultado.ListaTDMovDocumento[i].id);
                        }

                        var title = 'Detalle';
                        column = [];
                        column.push('NRO');
                        column.push('FECHA DERIVACIÓN');
                        column.push('AREA DESTINO');
                        column.push('ESTADO');
                        column.push('DOCUMENTO');
                        column.push('Nº DOCUMENTO');
                        column.push('PDF');
                        llenarDetalleDocumento(title, column, ListaDetalleDocumento);

                        /*Lista del detalle de la DJ*/
                        //console.log("QQQ " + resultado.ListaTDMaeDJDocumento.length);
                        if (resultado.ListaTDMaeDJDocumento != null) {
                            ListaDocumentoDJ = [];

                            for (var i = 0; i < resultado.ListaTDMaeDJDocumento.length; i++) {
                                //ListaDocumentoDJ.push(i+1);
                                ListaDocumentoDJ.push(resultado.ListaTDMaeDJDocumento[i].NRO_DJ);
                                ListaDocumentoDJ.push(resultado.ListaTDMaeDJDocumento[i].TIPO_FICHA);
                                ListaDocumentoDJ.push(resultado.ListaTDMaeDJDocumento[i].NRO_FICHA);
                                ListaDocumentoDJ.push(resultado.ListaTDMaeDJDocumento[i].ESTADO);
                            }

                            var title = 'Detalle';
                            column = [];
                            column.push('DECLARACIÓN JURADA Nª');
                            column.push('TIPO DE FICHA');
                            column.push('Nª DE FICHA DE CSE');
                            column.push('ESTADO');
                            llenarDocumentoDJ(column, ListaDocumentoDJ);
                        } else {
                            $('#DeclaracionJurada').html("<h4>Buscando Declaraciones Juradas, de continuar este mensaje escriba al correo: <strong><em>info@cippuno.org.pe</em></strong> </h4>");
                        }
                        

                    }
                }
                else {
                   // alert("Ingrese el número de registro valido");
                    //$('#GeneralEstado').hide();
                    $('#GeneralEstado').html("<h4>Vuelva a intentarlo, o en todo caso comuniquese con el área de soporte escribiendo al correo: <strong><em>info@cippuno.org.pe</em></strong> </h4>");
                }
            }
        });
        $('#txtConNumRegistro').val("");
    }
}

function llenarDocAsociado(LeftColumGraph1, LeftListGraph1) {

    $('#LeftColumGraph1').html('');
    for (var i = 0; i < LeftColumGraph1.length; i++) {
        if (i == 0) {
            $('#LeftColumGraph1').append('<th width="14%"><center>' + LeftColumGraph1[i] + '</center></th>');
        }
        if (i == 1) {
            $('#LeftColumGraph1').append('<th width="12%"><center>' + LeftColumGraph1[i] + '</center></th>');
        }
        if (i == 2) {
            $('#LeftColumGraph1').append('<th width="26%"><center>' + LeftColumGraph1[i] + '</center></th>');
        }
        if (i == 3) {
            $('#LeftColumGraph1').append('<th width="20%"><center>' + LeftColumGraph1[i] + '</center></th>');
        }
        if (i == 4) {
            $('#LeftColumGraph1').append('<th width="40%"><center>' + LeftColumGraph1[i] + '</center></th>');
        }
    }

    //Lista de Valores
    $('#LeftListGraph1').html('');
    for (var i = 0; i < LeftListGraph1.length; i++) {

        if (i % LeftColumGraph1.length == 0) {
            $('#LeftListGraph1').append('<tr>');
        }
        $('#LeftListGraph1').append('<td class="center gridText"><center>' + LeftListGraph1[i] + '</center></td>');
        if (i % LeftColumGraph1.length == 0) {
            $('#LeftListGraph1').append('</tr>');
        }
    }
}

function llenarDetalleDocumento(LeftTitleGraph, LeftColumGraph, LeftListGraph) {

    //titulo
    $('#LeftTitleGraph').html('');
    $('#LeftTitleGraph').html(LeftTitleGraph);

    //columnas
    $('#LeftColumGraph').html('');
    for (var i = 0; i < LeftColumGraph.length; i++) {
        if (i == 0)
        {
            $('#LeftColumGraph').append('<th width="4%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 1) {
            $('#LeftColumGraph').append('<th width="12%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 2) {
            $('#LeftColumGraph').append('<th width="25%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 3) {
            $('#LeftColumGraph').append('<th width="10%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 4) {
            $('#LeftColumGraph').append('<th width="10%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 5) {
            $('#LeftColumGraph').append('<th width="10%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
        if (i == 6) {
            $('#LeftColumGraph').append('<th width="2%"><center>' + LeftColumGraph[i] + '</center></th>');
        }
    }

    

    //Lista de Valores
    $('#LeftListGraph').html('');
    for (var i = 0; i < LeftListGraph.length; i++) {

        if (i % LeftColumGraph.length == 0) {
            $('#LeftListGraph').append('<tr>');
        }
        if (i % LeftColumGraph.length == 6) {
            //var uno =  "";
            var pdf = ".pdf";

            var ruta = LeftListGraph[i] + pdf;

            if (LeftListGraph[i] != 0)
            {
                //-->PRUEBA
                //$('#LeftListGraph').append('<td class="center"><center><a href="http://192.168.65.159/institucional/aplicativos/oad/sitradocV2/archivos/adjuntos/otros/' + ruta + '"  target="_blank"><img src="../Sis_EstadoTramite/Content/midis/Img/Pdf16.png" alt="" /></a></center></td>');
                //-->PRODUCCION
                $('#LeftListGraph').append('<td class="center"><center><a href="http://192.168.65.30/institucional/aplicativos/oad/sitradocV2/archivos/adjuntos/otros/' + ruta + '"  target="_blank"><img src="../Sis_EstadoTramite/Content/midis/Img/Pdf16.png" alt="" /></a></center></td>');
            } 
            
        }
        else {
            $('#LeftListGraph').append('<td class="center gridText"><center>' + LeftListGraph[i] + '</center></td>');
        }
        if (i % LeftColumGraph.length == 0) {
            $('#LeftListGraph').append('</tr>');
        }
    }
    
}


function llenarDocumentoDJ(LeftColumGraph2, LeftListGraph2) {

    //titulo
    //$('#LeftTitleGraph').html('');
    //$('#LeftTitleGraph').html(LeftTitleGraph);

    //columnas
    $('#LeftColumGraph2').html('');
    for (var i = 0; i < LeftColumGraph2.length; i++) {
        if (i == 0) {
            $('#LeftColumGraph2').append('<th width="20%"><center>' + LeftColumGraph2[i] + '</center></th>');
        }
        if (i == 1) {
            $('#LeftColumGraph2').append('<th width="30%"><center>' + LeftColumGraph2[i] + '</center></th>');
        }
        if (i == 2) {
            $('#LeftColumGraph2').append('<th width="30%"><center>' + LeftColumGraph2[i] + '</center></th>');
        }
        if (i == 3) {
            $('#LeftColumGraph2').append('<th width="40%"><center>' + LeftColumGraph2[i] + '</center></th>');
        }
        //if (i == 4) {
        //    $('#LeftColumGraph2').append('<th width="20%"><center>' + LeftColumGraph2[i] + '</center></th>');
        //}
    }

    //Lista de Valores
    $('#LeftListGraph2').html('');
    for (var i = 0; i < LeftListGraph2.length; i++) {

        if (i % LeftColumGraph2.length == 0) {
            $('#LeftListGraph2').append('<tr>');
        }
        if (i % LeftColumGraph2.length == 3) {
            $('#LeftListGraph2').append('<td class="center"><center><a href="http://www.midis.gob.pe/padron/" target="_blank">' + LeftListGraph2[i] + '</a></center></td>');
        }
        else {
            $('#LeftListGraph2').append('<td class="center gridText"><center>' + LeftListGraph2[i] + '</center></td>');
        }

        if (i % LeftColumGraph2.length == 0) {
            $('#LeftListGraph2').append('</tr>');
        }
    }
}