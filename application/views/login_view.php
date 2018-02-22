<!DOCTYPE html>
	<html lang="es">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
	</head>
	<body>
	<?php
	$username = array('name' => 'username', 'placeholder' => 'nombre de usuario');
	$password = array('name' => 'password',	'placeholder' => 'introduce tu password');
	$submit = array('name' => 'submit', 'value' => 'Iniciar sesión', 'title' => 'Iniciar sesión');
	?>
	<div class="container_12">
		<h1>Autenticación</h1>
		<div id="login">
					<?=form_open(base_url().'login/login')?>
					<label for="username">U:</label>
					<?=form_input($username)?><p><?=form_error('username')?></p>
					<label for="password">P:</label>
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
	</body>
</html>