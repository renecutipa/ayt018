<!DOCTYPE html>
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		

	<div class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0" style="background: url(https://www.xtrafondos.com/wallpapers/textura-madera-en-negro-2802.jpg);center;background-attachment:fixed;background-size: cover;">
  	<h2 style="color:#f2f2f2 ;" align="center">COLEGIO DE INGENIEROS DEL PERU- PUNO&nbsp <small>TRÁMITE DOCUMENTARIO</small></h2>
	</div>
	</head>
	<!-- -->
	<body>
	<?php
	$username = array('name' => 'username', 'placeholder' => 'Nombre de usuario','class'=>'btn btn-default');
	$password = array('name' => 'password',	'placeholder' => 'Introduce tu password','class'=>'btn btn-default');
	$submit = array('name' => 'submit', 'value' => 'Iniciar sesión', 'title' => 'Iniciar sesión','class'=>'btn btn-danger');
	?>
	<!--contenedor vacio-->
	<table>
	<td>	
	<div align="center" style="margin-left:250px;width:350px;height:200px;border-style:none;border-color:none;">
	<img src="http://www.cip.org.pe/wp-content/uploads/2018/01/2.png"> </div>
	</td>
	<td>

	<div class="container" align="right" style="margin-top:80px;margin-left:50px;width:370px;height:200px;border-style:solid;background:#000;opacity:0.6;border-color:gray;">
		<div id="cabecera">
				
		<h1 style="color:white;" align="center">Autenticación</h1>
		<div id="login">
					<?=form_open(base_url().'login/login')?>

					<label style="color:gray;font-family: Verdana" for="username">USUARIO:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
					<?=form_input($username)?><p><?=form_error('username')?></p>

					<label style="color:gray;font-family: Verdana" for="password">CONTRASEÑA:</label>
					<?=form_password($password)?><p><?=form_error('password')?></p>

					<!--?=form_hidden('token',$token)?-->
					<?=form_submit($submit)?>	
					<?=form_close()?>
					<?php 
					if($this->session->flashdata('usuario_incorrecto'))
					{
					?>
					<p><?=$this->session->flashdata('usuario_incorrecto')?></p>
					<?php
					}
					?>
		</div>
	</div>
	</div>
	</td>
</table>
	</body>
</html>