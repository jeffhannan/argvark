<?php
// Jeff Hannan

    define('USE_LOCALHOST', true);
    
    if (USE_LOCALHOST){
        define('DB_HOST', 'localhost');
        define('DB_USER', 'phpUserAdmin');
        define('DB_PASSWORD', '');
        define('DB_NAME', '781878_av2p');
        //define('DB_NAME', 'av2p_new');
    }
    else{
        include_once("../../mysql_connect_argvark.php");
    }
    
?>
