<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Subir una o varias imagenes al servidor</title>
</head>
 
<body style="align:center">
<font color="#2E64FE" face="arial">
<h5 align="center">SUBIR ARCHIVO</h5>
    <?php
    # definimos la carpeta destino
    $carpetaDestino="C:\Users\Kevin\Desktop\CIP-PUNO";
 
    # si hay algun archivo que subir
    if(isset($_FILES["archivo"]) && $_FILES["archivo"]["name"][0])
    {
 
        # recorremos todos los arhivos que se han subido
        for($i=0;$i<count($_FILES["archivo"]["name"]);$i++)
        {
 
            # si es un formato de imagen
            if($_FILES["archivo"]["type"][$i]=="text/xml" || $_FILES["archivo"]["type"][$i]=="application/pdf"||$_FILES["archivo"]["type"][$i]=="documento/pdf" ||$_FILES["archivo"]["type"][$i]=="image/jpeg" || $_FILES["archivo"]["type"][$i]=="image/pjpeg" || $_FILES["archivo"]["type"][$i]=="image/gif" || $_FILES["archivo"]["type"][$i]=="image/png")
            {
 
                # si exsite la carpeta o se ha creado
                if(file_exists($carpetaDestino) || @mkdir($carpetaDestino))
                {
                    $origen=$_FILES["archivo"]["tmp_name"][$i];
                    $destino=$carpetaDestino.$_FILES["archivo"]["name"][$i];
 
                    # movemos el archivo
                    if(@move_uploaded_file($origen, $destino))
                    {
                        echo "<br>".$_FILES["archivo"]["name"][$i]." movido correctamente";
                    }else{
                        echo "<br>No se ha podido mover el archivo: ".$_FILES["archivo"]["name"][$i];
                    }
                }else{
                    echo "<br>No se ha podido crear la carpeta: ".$carpetaDestino;
                }
            }else{
                echo "<br>".$_FILES["archivo"]["name"][$i]." -NO es imagen jpg, png o gif";
            }
        }
    }else{
        echo "<br>";
    }
    ?>
 
    <form action="<?php echo $_SERVER["PHP_SELF"]?>" method="post" enctype="multipart/form-data" name="inscripcion">
        <input type="file" name="archivo[]" multiple="multiple" class="btn btn-link">
        <input type="submit" value="Enviar"  class="btn btn-primary">
    </form>
</body>
</html>