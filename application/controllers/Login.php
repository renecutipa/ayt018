<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
		$this->load->model('login_model');
		$this->load->library(array('session','form_validation'));
		$this->load->helper(array('url','form'));
		$this->load->database('default');
    }
	
	public function index()
	{	
		$this->load->view('fondo');
		$this->load->view('Footer');
		switch ($this->session->userdata('tipo')) {
			case '0':
				redirect(base_url().'dashboard');
				break;
			case '1':
				redirect(base_url().'www');
				break;	
			default:		
				$this->load->view('login_view');
				break;		
		}

	}

	public function login()
	{
		$this->form_validation->set_rules('username', 'username', 'required|trim|min_length[2]|max_length[150]|xss_clean');
        $this->form_validation->set_rules('password', 'password', 'required|trim|min_length[5]|max_length[150]|xss_clean');
     
		if($this->form_validation->run() == FALSE)
		{
			$this->index();
		}else{
			$username = $this->input->post('username');
			$password = sha1($this->input->post('password'));
			$check_user = $this->login_model->login_user($username,$password);
			if($check_user == TRUE)
			{
				$data = array(
	               'is_logued_in' 	=> 		TRUE,
	               'id_usuario' 	=> 		$check_user->id,
	               'tipo'			=>		$check_user->tipo,
	               'username' 		=> 		$check_user->username
           		);		
				$this->session->set_userdata($data);
				$this->index();
			}
		}
	}
	
	public function token()
	{
		$this->load->view('fondo');
		$token = md5(uniqid(rand(),true));
		$this->session->set_userdata('token',$token);
		return $token;
	}
	
	public function logout()
	{
		$this->load->view('Footer');
		$this->load->view('fondo');
		$this->session->sess_destroy();
		$this->load->view('login_view');

	}
}