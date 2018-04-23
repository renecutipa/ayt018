<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 
 */
class Subir extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->library(array('session'));
		$this->load->helper(array('url'));
	}
	
	public function subir()
	{	
		
		$this->load->view('dashboard_view');
		$this->load->view('tramite1');	
		//	$this->load->view('subir');	
	}
	
}