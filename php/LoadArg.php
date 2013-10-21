<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/LoadArgUtils.php");
include_once("TableArguments/TableArguments.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $arg_value) = loadarg_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    // Make the main load query
    if ($success){ list($success, $error_message,
        // Get the arg record, from id
        $result_select) = tablearguments_get_arg_record($arg_value);
    }         
    
    // Create json output 
    if ($success){ list( 
        // Create json output
        $json) = tablearguments_create_json($result_select);
    }      
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
