<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width" />
    <title>Acceso a la Información Pública</title>

    <link href="/tool1/bundles/Style/bootstrap?v=vPI-uZ1aDpOb0s_L5pCp_UuzJECOcHoaTD66rL1qMaE1" rel="stylesheet"/>

    <script src="/tool1/bundles/Scripts/bootstrap?v=kwxfHCE7WcESLgrbB5relvxJ-QlGBq7XzgdPp3tgtI01"></script>

    <script> var URL ="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/"; </script>
</head>
<body style="height:180px;">
    <div id="ribbon" style="height:50px; background-color:white; border-bottom:5px solid #B9138F;">
			<span class="ribbon-window-title"></span>
	</div>

	<div class="content">
		

<input id="UrlIngresarForm" name="UrlIngresarForm" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/IngresarFormulario" />
<input id="UrlListarDepa" name="UrlListarDepa" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/ListaDepartamento" />
<input id="UrlListarDist" name="UrlListarDist" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/ListaDistrito" />
<input id="UrlListarTipoDoc" name="UrlListarTipoDoc" type="hidden" value="./tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/ListaTipoDoc" />
<input id="UrlBuscarDni" name="UrlBuscarDni" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/BuscarDni" />
<input id="UrlListarFormasEntrega" name="UrlListarFormasEntrega" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/Transparencia/ListarFormasEntrega" />
<input id="UrlCaptcha" name="UrlCaptcha" type="hidden" value="/tool1/(S(puwhbbi4ebuyr2dzo1b2kpeg))/GetCaptchaImage/GetCaptchaImage" />

<center>
    <h4 style="color:#0080FF;font-size:20px">FORMULARIO - SOLICITUD DE ACCESO A LA INFORMACIÓN PÚBLICA</h4>
</center>

<center>
    <br/>
    <div style="color:#0080FF" class="container">
        <div class="container-fluid">
            <div style="margin-left: -25px;">
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Tipo de Documento: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: right" >
                        <select style="color:#0080FF" class="form-control" id="ddlTipoDoc">
                            <option value="00">Seleccione una opción</option>
                            <option value="1">DNI</option>
                            <option value="2">LE</option>
                            <option value="3">CARNET DE EXTRANJERIA</option>
                            <option value="4">BREVETE</option>
                            <option value="5">FOTOCHECK</option>
                            <option value="6">OTROS</option>
                            <option value="7">LIBRETA MILITAR</option>
                            <option value="8">RUC</option>
                            <option value="9">PASAPORTE</option></select>
                        </select>
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                        <label style="color:#0080FF" class="labelDerechos" for="des_apellido_paterno">Nº: (*)</label>
                    </div>
                    <div  class="col-sm-3" style="text-align: left;">
                        <input  id="txtNumDoc" type="text" class="form-control" placeholder="Ingrese Nro de Doc." onkeypress="return numero(event);" maxlength="11">
                    </div>
                </div>
                <div style="height:10px">
                </div>

                <div class="row">

                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Apellido Paterno (*)</label>
                    </div>

                    <div  class="col-sm-3" style="text-align: right; color:#0080FF">
                        <input  id="txtApePaterno" type="text" class="form-control" placeholder="Ingrese Ape. Paterno"  onkeypress="return alphanumerico(event);" />
                    </div>

                    <div class="col-sm-3" style="text-align: right;">
                        <label style="color:#0080FF"class="labelDerechos" for="des_apellido_paterno">Apellido Materno: (*)</label>
                    </div>

                    <div class="col-sm-3" style="text-align: right;">
                        <input id="txtApeMaterno" type="text" class="form-control" placeholder="Ingrese Ape. Materno" onkeypress="return alphanumerico(event);" />
                    </div>

                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label style="color:#0080FF" class="labelDerechos" for="des_apellido_paterno">Nombres: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                        <input id="txtNombres" type="text" class="form-control" placeholder="Ingrese Nombre" onkeypress="return alphanumerico(event);" />
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                    </div>
                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Información a Solicitar (*)</label>
                    </div>
                    <div class="col-sm-9" style="text-align: right;">
                        <textarea class="form-control" rows="6" id="txtInformacion" onkeypress="return alphanumerico(event);"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4" style="text-align: right;">
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                    </div>
                    <div class="col-sm-3" style="text-align: right;color:#0080FF;">
                        <label>Contador de Caracteres:</label>
                    </div>
                    <div class="col-sm-1" style="text-align: left;">
                        <p id="contadorTaComentario">0/1000</p>
                    </div>
                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Correo Electrónico: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                        <input id="txtCorreo" type="text" class="form-control" placeholder="Ingrese Correo">
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Número de Teléfono: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <input id="txtTelefono" type="text" class="form-control" placeholder="Ingrese Número Tel." onkeypress="return numero(event);" maxlength="9">
                    </div>
                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Domicilio: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Av./Calle./Jr/Psj: (*)</label>
                        <input id="txtDireccion" type="text" class="form-control" placeholder="Ingrese su Dirección" onkeypress="return alphanumerico(event);" maxlength="150">
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Nº/Dpto./Int: (*)</label>
                        <input id="txtNroDepa" type="text" class="form-control" placeholder="Ingrese Nro. Dpto o Int." onkeypress="return alphanumerico(event);" maxlength="50">
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Urbanización: (*)</label>
                        <input id="txtUrbanizacion" type="text" class="form-control" placeholder="Ingrese la Urbanización" onkeypress="return alphanumerico(event);" maxlength="50">
                    </div>
                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Departamento: (*)</label>
                        <select style="color:#0080FF" id="ddlDepa" class="form-control">
                            <option value="00">SELECCIONAR</option>
                            <option value="01">AMAZONAS</option>
                            <option value="02">ANCASH</option>
                            <option value="03">APURIMAC</option>
                            <option value="04">AREQUIPA</option>
                            <option value="05">AYACUCHO</option>
                            <option value="06">CAJAMARCA</option>
                            <option value="07">CALLAO</option>
                            <option value="08">CUSCO</option>
                            <option value="09">HUANCAVELICA</option>
                            <option value="10">HUANUCO</option>
                            <option value="11">ICA</option>
                            <option value="12">JUNIN</option>
                            <option value="13">LA LIBERTAD</option>
                            <option value="14">LAMBAYEQUE</option>
                            <option value="15">LIMA</option>
                            <option value="16">LORETO</option>
                            <option value="17">MADRE DE DIOS</option>
                            <option value="18">MOQUEGUA</option>
                            <option value="19">PASCO</option>
                            <option value="20">PIURA</option>
                            <option value="21">PUNO</option>
                            <option value="22">SAN MARTIN</option>
                            <option value="23">TACNA</option>
                            <option value="24">TUMBES</option>
                            <option value="25">UCAYALI</option>
                        </select>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Provincia: (*)</label>
                        <select style="color:#0080FF" id="ddlProv" class="form-control">
                            <option>SELECCIONAR</option>
                        </select>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <label class="labelDerechos" for="des_apellido_paterno">Distrito: (*)</label>
                        <select style="color:#0080FF" id="ddlDist" class="form-control">
                            <option>SELECCIONAR</option>
                        </select>
                    </div>
                </div>
                <div style="height:10px">
                </div>
                <div class="row">
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Forma de Entrega: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <select class="form-control" id="ddlFormaEnt">
                            <option value="00">Seleccione una opción</option>
                        </select>
                    </div>
                    <div class="col-sm-3" style="text-align: right;">
                        <label class="labelDerechos" for="des_apellido_paterno">Código Captcha: (*)</label>
                    </div>
                    <div class="col-sm-3" style="text-align: left;">
                        <img id="imgCaptcha" />
                        <input class="form-control" type="text" placeholder="Ingrese Captcha" id="txtCaptcha" />
                    </div>
                </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-sm-3" style="text-align: left; color: #6495ed;">
                        <label style="color:red; margin-left:15px;" class="labelDerechos" for="des_apellido_paterno">(*) Datos Obligatorios</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-2" style="text-align: center;">
                        <button type="button" id="btnRegistrarForm" class="btn btn-primary">
                        Enviar</button>
                    </div>
                    <div class="col-sm-2" style="text-align: center;">
                        <button type="button" class="btn btn-primary" id="btnLimpiar">Limpiar</button>
                    </div>
                </div>
            </div>
    </div>
</center>

	</div>
</body>
</html>
