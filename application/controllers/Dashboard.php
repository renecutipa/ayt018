<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 
 */
class Dashboard extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->library(array('session'));
		$this->load->helper(array('url'));
	}
	
	public function index()
	{
		
		if ($this->session->userdata('tipo') != 0 || $this->session->userdata('tipo') == ""){
			echo "FALSE";
		}else{
			$this->load->view('dashboard_view');
			$this->load->view('welcome_home');
			$this->load->view('fondo2');
		}
		
	}
}