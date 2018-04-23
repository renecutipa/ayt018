<html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>CIP - TD</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">
  </head>

  <body>  
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0"s>
      <h2 class="navbar-brand col-sm-3 col-md-2 mr-0" href="#"> SISTEMA DE TRÁMITE DOCUMENTARIO</h2>
      
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="<?=base_url().'login/logout'?>">Salir</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav justify-content-center">


              <li class="nav-item">
                <a class="nav-link active" href="<?=base_url().'pan_principal/index'?>">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCG7AIfiXkksRSm6FmFkJKXwVYVHMQTS7WicbpT3HsVwZC3NDP" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Panel Principal <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="<?=base_url().'subir/subir'?>">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfDIRlnX4uYsp1nZ9b19yFg8hGww8gkm6UlZujd829e7Hmrr6" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
                  Trámite <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="<?=base_url().'consulta/index'?>">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdyMV_nozFu4z8Iud39SgjEMw67FDF4O6Aaq98BulFMVNSp9J_hw" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Consultar Trámite <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgvHCXbyYnKwNgV3RvSW2tfLVcBse8QmwrBnLuQAJaB_gH6hDJ" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Cuaderno de trámites<span class="sr-only">(current)</span>
                </a>
              </li>

            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        </main>

</body></html>   